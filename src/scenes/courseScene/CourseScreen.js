import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, PricingCard, ListItem, Avatar, Icon, Switch } from 'react-native-elements';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { NormalButton, AccordionListItem } from '../../components'
import { BASE_COLOR, WIDTH_SCREEN, MAX_UNITS, USER_INFO, DEFAULT_IMG } from '../../consts'
import { getAvatarTitle, capitalize } from '../../model'
import { getUser } from '../../model'
import CourseStyles from './CourseStyles'

export default CourseScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: {...course}.name,
      headerRight: () => (
        route.params.isOwner &&
        <Icon 
          name='edit'
          size={24}
          type='font-awesome'
          color={BASE_COLOR}
          onPress={() => {
            navigation.navigate('EditCourseScreen', {
              course: {...course}
            })
          }}
        />
      ),
    });
    getUser(course.creatorId).then((r) => {
      setCreator(r);
    });
  }, []);

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: course.units
    })
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={CourseStyles.container}>
        <Image 
          style={{
            resizeMode: 'stretch',
            width: WIDTH_SCREEN,
            height: Math.round(WIDTH_SCREEN * 0.5),
          }} 
          source={
            course.imgsrc ? 
            { uri: course.imgsrc }
            : 
            DEFAULT_IMG
          }
        />
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>About</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.description}>{course.description}</Text>
        </View>
        {
          course.units.length > 0 && 
          <View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Content</Text>
            </View>
            <View>
              {
                course.units.slice(0, MAX_UNITS).map((u, i) => (
                  <AccordionListItem navigation={navigation} item={u} key={i} number={i} />
                ))
              }
            </View>
            {
              course.units.length > MAX_UNITS ? 
              <View style={CourseStyles.contentCourseButton}>
                <NormalButton onPress={() => watchContentCourse()} title='Show all'/>
              </View>
              : 
              null
            }
          </View>
        }
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>Creator</Text>
        </View>
        {
          creator == null ?
          <View>
            <ActivityIndicator size="large" color={BASE_COLOR} />
          </View> 
          :
          <ListItem 
            containerStyle={{paddingHorizontal: 20}}
            onPress={() => {
              route.params.isOwner ?
              navigation.navigate('ProfileScreen')
              :
              navigation.navigate('UserScreen', {userInfo: creator})
            }}
          >
            <Avatar
              rounded
              title={getAvatarTitle(creator.name, creator.lastname)}
              containerStyle={{ 
                backgroundColor: BASE_COLOR 
              }}
            />
            <ListItem.Content>
              <ListItem.Title>{creator.name + ' ' +creator.lastname}</ListItem.Title>
              <ListItem.Subtitle>{capitalize(creator.role)}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron/>
          </ListItem>
        }
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>Category</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.description}>{course.category}</Text>
        </View>
        { 
          route.params.isOwner &&
          <View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Subscription included</Text>
            </View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.description}>{course.subscriptionIncluded}</Text>
            </View>
          </View>
        }
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>Tags</Text>
        </View>
        <View style={CourseStyles.text}>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
          }}>
            {
              course.tags.slice().map((tag, i) => (
                <View key={i} style={{
                  backgroundColor: BASE_COLOR,
                  borderRadius: 20,
                  marginHorizontal: 5
                }}>
                  <Text style={{color: 'white', margin: 10}}>{tag}</Text>
                </View>
              ))
            }
          </View>
        </View>
        {
          route.params.isOwner && 
          <View style={{ 
            paddingHorizontal: 20, 
            flexDirection: 'row', 
            alignItems: 'baseline', 
            justifyContent: 'space-between',
            paddingBottom: 20
          }}>
            <View>
              <Text style={CourseStyles.section}>Publish</Text>
            </View>
            <Switch value={course.published} color={BASE_COLOR} disabled={true}/>
          </View>
        }
        {
          !route.params.isOwner &&
          <PricingCard
            color={BASE_COLOR}
            title={course.subscriptionIncluded}
            price="$5"
            button={
              <NormalButton 
                title="SUBSCRIBE" 
                onPress={() => console.log(course)}
                icon={
                  <IconB
                    name="bookshelf" 
                    size={22} 
                    color="white"
                  />
                }
              />
            }
          />
        }
      </View>
    </ScrollView>
	)
}
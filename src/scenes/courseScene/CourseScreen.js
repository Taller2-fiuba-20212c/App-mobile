import React, {useEffect, useLayoutEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, PricingCard, ListItem, Avatar, Icon, Switch } from 'react-native-elements';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { NormalButton, AccordionListItem } from '../../components'
import { BASE_COLOR, WIDTH_SCREEN, MAX_UNITS, USER_INFO, DEFAULT_IMG } from '../../consts'
import { getAvatarTitle, capitalize, getCourse, getUser, getData } from '../../model'
import CourseStyles from './CourseStyles'

export default CourseScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(route.params.course);
  const [creator, setCreator] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    if (route.params?.course) {
      setCourse(route.params.course);
      getUser(route.params.course.creatorId).then((r) => {
        setCreator(r);
      }).catch(err => console.log(err.response));
      getData(USER_INFO).then((r) => {
        if (r.uid == route.params.course.creatorId) {
          setIsOwner(true);
          navigation.setOptions({
            headerShown: true,
            headerRight: () => (
              <Icon 
                name='edit'
                size={24}
                type='font-awesome'
                color={BASE_COLOR}
                onPress={() => {
                  navigation.navigate('EditCourseScreen', {
                    course: route.params.course
                  })
                }}
              />
            ),
          })
        }
      })
      setLoading(false)
      navigation.setOptions({
        title: route.params.course.name
      });
    }
  }, [route.params]);

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: course.units
    })
  }

	return (
    <View style={{flex: 1}}>
    {
      loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={CourseStyles.container}>
            <Image 
              style={{
                resizeMode: 'stretch',
                width: WIDTH_SCREEN,
                height: Math.round(WIDTH_SCREEN * 0.5),
              }} 
              source={
                course.image ? 
                { uri: course.image }
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
                  isOwner ?
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
                  <ListItem.Title>{creator.name + ' ' + creator.lastname}</ListItem.Title>
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
              isOwner &&
              <View>
                <View style={CourseStyles.text}>
                  <Text style={CourseStyles.section}>Subscription included</Text>
                </View>
                <View style={CourseStyles.text}>
                  <Text style={CourseStyles.description}>
                    {course.suscriptionIncluded[course.suscriptionIncluded.length - 1]}
                  </Text>
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
              isOwner && 
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
              !isOwner &&
              <PricingCard
                color={BASE_COLOR}
                title={course.suscriptionIncluded[course.suscriptionIncluded.length - 1]}
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
      }
    </View>
	)
}
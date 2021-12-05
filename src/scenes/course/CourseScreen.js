import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, PricingCard, ListItem, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { NormalButton, AccordionListItem } from './../../components'
import { BASE_COLOR, WIDTH_SCREEN, MAX_UNITS } from './../../consts'
import { getAvatarTitle, capitalize } from './../../model'
import { getUser } from './../../model'
import CourseStyles from './CourseStyles'

export default CourseScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [creator, setCreator] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: course.name,
    });
    getUser(course.creatorId).then((r) => {
      console.log(r);
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
          source={course.imgsrc}
        />
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>About</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.description}>{course.description}</Text>
        </View>
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
            onPress={() => navigation.navigate('UserScreen', {userInfo: creator})}
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
        <PricingCard
          color={BASE_COLOR}
          title={'Sub type'}
          price="$5"
          button={
            <NormalButton 
              title="SUBSCRIBE" 
              onPress={() => console.log(course)}
              icon={
                <Icon 
                  name="bookshelf" 
                  size={22} 
                  color="white"
                />
              }
            />
          }
        />
      </View>
    </ScrollView>
	)
}
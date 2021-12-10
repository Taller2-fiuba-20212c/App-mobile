import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, FAB, Icon } from 'react-native-elements';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { NormalButton, AccordionListItem } from '../../components'
import { BASE_COLOR, DEFAULT_IMG, WIDTH_SCREEN, MAX_UNITS, USER_INFO } from '../../consts'
import { getAvatarTitle, capitalize } from '../../model'
import { getUser, getData } from '../../model'
import EditCourseStyles from './EditCourseStyles'

export default EditCourseScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [creator, setCreator] = useState(null);
  const [isOwner, setIsOwner] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit course'
    });
    getUser(course.creatorId).then((r) => {
      console.log(r);
      setCreator(r);
    });
    getData(USER_INFO).then((user) => {
      user.uid == course.creatorId ?
      setIsOwner(true) :
      setIsOwner(false)
    })
  }, []);

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: course.units
    })
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={EditCourseStyles.container}>
        <View>
        <Image 
          style={{
            resizeMode: 'stretch',
            width: WIDTH_SCREEN,
            height: Math.round(WIDTH_SCREEN * 0.5),
          }} 
          source={
            course.imgsrc ? 
            course.imgsrc
            : 
            DEFAULT_IMG
          }
        />
        <View style={{
            position: 'absolute',
            top: Math.round(WIDTH_SCREEN * 0.5) - 56/2,
            left: WIDTH_SCREEN - 56,
          }}>
            <FAB 
              icon={
                <Icon 
                  name='edit'
                  size={24}
                  type='font-awesome'
                  color={'white'}
                />
              }
              color={BASE_COLOR}
            />
          </View>
        </View>
        <View style={EditCourseStyles.text}>
          <Text style={EditCourseStyles.section}>About</Text>
        </View>
        <View style={EditCourseStyles.text}>
          <Text style={EditCourseStyles.description}>{course.description}</Text>
        </View>
        {
          course.units && 
          <View>
            <View style={EditCourseStyles.text}>
              <Text style={EditCourseStyles.section}>Content</Text>
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
              <View style={EditCourseStyles.contentCourseButton}>
                <NormalButton onPress={() => watchContentCourse()} title='Show all'/>
              </View>
              : 
              null
            }
          </View>
        }
      </View>
    </ScrollView>
	)
}
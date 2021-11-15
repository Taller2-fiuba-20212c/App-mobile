import React from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { ListItem, Tab } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { NormalButton, ShortCardCourse, LongCardCourse } from './../../components'
import PrincipalStyles from './PrincipalStyles'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const courseMockup = {
  imgsrc: require('../../../assets/python.jpg'),
  name: 'COURSE NAME',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  subType: 'subType',
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],
  units: ['Unit1', 'Unit2', 'Unit3', 'Unit4'],
  exams: ['Exam1', 'Exam2', 'Exam3', 'Exam4'],
  // consults: List[Consult] = [],
  teachers: ['Teacher1', 'Teacher2', 'Teacher3'],
  colaborators: ['Colaborator1', 'Colaborator2', 'Colaborator3'],
  students: ['Student1', 'Student2', 'Student3'],
  creatorId: 'CreatorID',
  creationDate: 'ceationDate',
  lastModificationDate: 'lastModificationDate'
}

const courses = [
  courseMockup, courseMockup, courseMockup, courseMockup, courseMockup
]

export default PrincipalScreen = ({navigation}) => {
  const _renderItem = ({item, index}) => {
    return (
      <ShortCardCourse course={item}/>
    );
  }

  const watchCourse = () => {
    navigation.navigate('CourseScreen', { 
      course: courseMockup,
    })
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={PrincipalStyles.container}>
        <View style={PrincipalStyles.text}>
          <Text onPress={() => watchCourse()} style={PrincipalStyles.section}>Your courses</Text>
        </View>
        <Carousel 
          data={courses} 
          renderItem={_renderItem}
          sliderWidth={SLIDER_WIDTH}
          itemWidth={ITEM_WIDTH}
        />
        <View style={PrincipalStyles.text}>
          <Text style={PrincipalStyles.section}>Top courses</Text>
        </View>
        <View style={PrincipalStyles.topCourses}>
          {
            courses.map((l, i) => (
              <ListItem 
                key={i} 
                containerStyle={{ 
                  padding: 0,
                }}
              >
                <ListItem.Content style={{
                  // backgroundColor:'red',
                }}>
                  <LongCardCourse course={l} />
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </View>
    </ScrollView>
	)
}
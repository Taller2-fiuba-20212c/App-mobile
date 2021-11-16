import React from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { ListItem } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { ShortCardCourse, LongCardCourse } from './../../components'
import PrincipalStyles from './PrincipalStyles'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

const classMock = {
  video: 'video url',
  name: 'class name'
}

const unit = {
  name: 'unit name',
  // #PDFS, TEXT or VIDEO,
  contentType: 'content type',
  // #Video: {videoId: xxx},
  // #Text: {text: xxx},
  // #PDFs: {fileId: xxx},
  content: [classMock, classMock, classMock, classMock],
  creatorId: 'creatorId',
  creationDate: 'ceationDate',
  lastModificationDate: 'lastModificationDate'
}

const courseMock = {
  imgsrc: require('../../../assets/python.jpg'),
  name: 'COURSE NAME',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  subType: 'subType',
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],
  units: [unit, unit, unit, unit, unit, unit, unit, unit],
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
  courseMock, courseMock, courseMock, courseMock, courseMock
]

export default PrincipalScreen = ({navigation}) => {
  const _renderItem = ({item, index}) => {
    return (
      <ShortCardCourse navigation={navigation} course={item}/>
    );
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={PrincipalStyles.container}>
        <View style={PrincipalStyles.text}>
          <Text style={PrincipalStyles.section}>Your courses</Text>
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
                <ListItem.Content>
                  <LongCardCourse navigation={navigation} course={l} />
                </ListItem.Content>
              </ListItem>
            ))
          }
        </View>
      </View>
    </ScrollView>
	)
}
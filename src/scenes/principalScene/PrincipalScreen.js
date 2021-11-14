import React from 'react'
import { Text, View, ScrollView } from 'react-native'
import { ListItem, Tab } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { MessageButton, ShortCardCourse } from './../../components'
import PrincipalStyles from './PrincipalStyles'

let courseMockup = {
  title: 'COURSE TITLE',
  imgsrc: require('../../../assets/python.jpg'),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

let courses = [
  courseMockup, courseMockup, courseMockup, courseMockup, courseMockup
]

export default PrincipalScreen = () => {
  const _renderItem = ({item, index}) => {
    return (
      <ShortCardCourse course={item}/>
    );
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={PrincipalStyles.container}>
        <Text style={PrincipalStyles.section}>Your courses</Text>
        <Carousel 
          data={courses} 
          renderItem={_renderItem}
          itemWidth={360}
          sliderWidth={360}
        />
        <Text style={PrincipalStyles.section}>Top courses</Text>
        <View style={PrincipalStyles.topCourses}>
        {
          courses.map((l, i) => (
            <ListItem key={i}>
              <ListItem.Content>
                <ShortCardCourse course={l} />
              </ListItem.Content>
            </ListItem>
          ))
        }
        </View>
      </View>
    </ScrollView>
	)
}

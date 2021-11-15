import React from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { ListItem, Tab } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { MessageButton, ShortCardCourse, LongCardCourse } from './../../components'
import PrincipalStyles from './PrincipalStyles'

const SLIDER_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);
const ITEM_HEIGHT = Math.round(ITEM_WIDTH * 3 / 4);

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
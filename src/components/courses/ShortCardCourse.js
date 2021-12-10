import React from 'react'
import { Text, TouchableNativeFeedback } from 'react-native'
import { Card } from 'react-native-elements'
import { DEFAULT_IMG } from './../../consts'

export default ShortCardCourse = ({course, navigation}) => {

  const watchCourse = () => {
    navigation.navigate('CourseScreen', { 
      course: course,
    })
  }

  return (
    <TouchableNativeFeedback onPress={() => watchCourse()}>
    <Card 
      containerStyle={{
        padding:0, 
        borderRadius: 20,
        elevation: 5,
      }}
    >
      <Card.Image 
        source={course.imgsrc ? course.imgsrc : DEFAULT_IMG } 
        style={{ paddingBottom: 20, borderTopLeftRadius: 20, borderTopRightRadius: 20 }}
      >
      </Card.Image>
      <Card.Title style={{ 
        marginTop: 10,
        marginBottom: 0
      }}>
        {course.name}
      </Card.Title>
      <Text 
        style={{ flex: 1, padding: 10 }}
        ellipsizeMode='tail'
        numberOfLines={3}
      >
        {course.description}
      </Text>
    </Card>
    </TouchableNativeFeedback>
  )
}
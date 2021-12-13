import React from 'react'
import { Text, View, TouchableNativeFeedback } from 'react-native'
import { Card } from 'react-native-elements'
import { DEFAULT_IMG } from './../../consts'

export default LongCardCourse = ({course, navigation}) => {

  const watchCourse = () => {
    navigation.navigate('CourseScreen', { 
      course: course,
    })
  }

  return (
    <TouchableNativeFeedback onPress={() => watchCourse()}>
    <Card 
    containerStyle={{ 
      flex:1, 
      width: '90%',
      height: '40%',
      borderRadius: 20,
      elevation: 5,
    }}
    >
      <Card.Title>{course.name}</Card.Title>
      <Card.Divider/>
      {
        <View style={{ 
          flexDirection: 'row',
        }}>
          <Card.Image 
            source={course.imgsrc ? {uri: course.imgsrc} : DEFAULT_IMG} 
            style={{ width: 100, height: 50 }}
            containerStyle={{ paddingRight: 10 }}
          />
          <View style={{ 
            flex: 1
          }}>
            <Text 
              style={{ 
                marginBottom: 10,
                flex: 1
              }}
              ellipsizeMode='tail'
              numberOfLines={3}
            >
              {course.description}
            </Text>
          </View>
        </View>
      }
    </Card>
    </TouchableNativeFeedback>
  )
}
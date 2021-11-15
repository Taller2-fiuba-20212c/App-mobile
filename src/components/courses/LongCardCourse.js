import React from 'react'
import { Text, View, Pressable } from 'react-native'
import { Card } from 'react-native-elements'

export default LongCardCourse = ({course}) => {
  return (
    <Card 
    containerStyle={{ 
      flex:1, 
      width: '90%',
      height: '40%'
    }}
    >
      <Card.Title>{course.title}</Card.Title>
      <Card.Divider/>
      {
        <View style={{ 
          flexDirection: 'row',
        }}>
          <Card.Image 
            source={course.imgsrc} 
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
  )
}
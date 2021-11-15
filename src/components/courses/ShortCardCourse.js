import React from 'react'
import { Text } from 'react-native'
import { Card } from 'react-native-elements'

export default ShortCardCourse = ({course}) => {
  return (
    <Card containerStyle={{padding:0}}>
      <Card.Image 
        source={course.imgsrc} 
        style={{ paddingBottom: 20 }}
      >
      </Card.Image>
      <Card.Title style={{ 
        marginTop: 10,
        marginBottom: 0
      }}>
        {course.title}
      </Card.Title>
      <Text 
        style={{ flex: 1, padding: 10 }}
        ellipsizeMode='tail'
        numberOfLines={3}
      >
        {course.description}
      </Text>
    </Card>
  )
}
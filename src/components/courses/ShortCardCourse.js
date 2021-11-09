import React from 'react'
import { View, Text, Image } from 'react-native'
import { Card, ListItem, Button, Icon } from 'react-native-elements'

export default ShortCardCourse = ({course}) => {
  return (
    <Card>
    <Card.Title>{course.title}</Card.Title>
    <Card.Divider/>
    <Card.Image source={course.imgsrc}>
    </Card.Image>
    <Text style={{marginBottom: 10}}>
      {course.description}
    </Text>
  </Card>
  )
}
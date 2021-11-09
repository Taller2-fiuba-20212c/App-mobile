import React from 'react'
import { Text, View } from 'react-native'
import { MessageButton, ShortCardCourse } from './../../components'
import PrincipalStyles from './PrincipalStyles'

let courseMockup = {
  title: 'COURSE TITLE',
  imgsrc: require('../../../assets/python.jpg'),
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
}

export default PrincipalScreen = () => {
	return (
    <View style={PrincipalStyles.container}>
      <View style={PrincipalStyles.messageContainer}>
        <MessageButton />
      </View>
      <Text style={PrincipalStyles.section}>Your courses</Text>
      <View style={PrincipalStyles.courses}>
        <ShortCardCourse course={courseMockup}/>
      </View>
      <Text style={PrincipalStyles.section}>Top courses</Text>
      {/* <View style={PrincipalStyles.topCourses}>
      </View> */}
    </View>
	)
}

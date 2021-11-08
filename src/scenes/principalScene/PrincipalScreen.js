import React from 'react'
import { Text, View } from 'react-native'
import { MessageButton } from './../../components'
import PrincipalStyles from './PrincipalStyles'

export default PrincipalScreen = () => {
	return (
    <View style={PrincipalStyles.container}>
      <View style={PrincipalStyles.messageContainer}>
        <MessageButton />
      </View>
      <Text style={PrincipalStyles.section}>Your courses</Text>
      {/* <View style={PrincipalStyles.courses}>
      </View> */}
      <Text style={PrincipalStyles.section}>Top courses</Text>
      {/* <View style={PrincipalStyles.topCourses}>
      </View> */}
    </View>
	)
}

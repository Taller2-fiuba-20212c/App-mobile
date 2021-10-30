import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { NormalButton } from './../components'
import UserStyles from './../style/UserStyles'

export default LoginScreen = ({navigation, route}) => {
  const checkInfo = () => {
    navigation.navigate('ProfileScreen', {
      userInfo: route.params.userInfo
    })
  }

	return (
		<View style={UserStyles.container}>
			<View>
				<Text style={UserStyles.tittle}>Welcome to Ubademy</Text>
			</View>
			<View>
				<NormalButton 
          onPress={() => checkInfo()}
          title="Go to user information"
        />
			</View>
		</View>
	)
}

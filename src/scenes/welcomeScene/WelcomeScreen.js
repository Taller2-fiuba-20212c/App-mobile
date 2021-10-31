import React from 'react'
import { Text, View } from 'react-native'
import { NormalButton } from './../../components'
import WelcomeStyles from './WelcomeStyles'

export default WelcomeScreen = ({navigation}) => {
  const handleStart = () => {
    navigation.navigate('LoginScreen')
  }

	return (
    <View style={WelcomeStyles.principalContainer}>
      <View style={WelcomeStyles.titleContainer}>
        <Text style={WelcomeStyles.title}>Ubademy</Text>
      </View>
      <View style={WelcomeStyles.bottomContainer}>
        <NormalButton onPress={() => handleStart()} title='Get started!'/>
      </View>
    </View>
	)
}

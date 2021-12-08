import React, { useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { getData } from './../../model'
import WelcomeStyles from './WelcomeStyles'
import AppLoading from 'expo-app-loading';
import { USER_INFO } from './../../consts'

export default WelcomeScreen = ({navigation}) => {
  const [nextHop, setNextHop] = useState(null)

  const handleStart = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: nextHop }]
    })
  }

  const loged = async () => {
    return getData(USER_INFO)
		.then(user => {
      user == null ? setNextHop('LoginScreen') : setNextHop('PrincipalScreen');
		})
  }

	return (
    <View style={WelcomeStyles.principalContainer}>
      <View style={WelcomeStyles.titleContainer}>
        <Text style={WelcomeStyles.title}>Ubademy</Text>
      </View>
      <View style={WelcomeStyles.bottomContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <AppLoading
          startAsync={loged}
          onFinish={() => handleStart()}
          onError={(e) => console.error(e)}
        />
      </View>
    </View>
	)
}

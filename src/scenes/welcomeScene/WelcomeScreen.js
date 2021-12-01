import React, { useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { NormalButton } from './../../components'
import AsyncStorage from '@react-native-async-storage/async-storage';
import WelcomeStyles from './WelcomeStyles'
import AppLoading from 'expo-app-loading';
import { USER_INFO } from './../../consts'

export default WelcomeScreen = ({navigation}) => {
  const [nextHop, setNextHop] = useState(null)

  const handleStart = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: nextHop}]
    })
  }

  const getData = async (key_name) => {
    try {
      const data = await AsyncStorage.getItem(key_name)
      return data != null ? JSON.parse(data) : null;
    } catch(e) {
      // error reading value
      console.error(e);
    }
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

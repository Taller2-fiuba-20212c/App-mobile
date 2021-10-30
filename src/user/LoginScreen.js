import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { NormalButton, NormalInput, EmailInput } from './../components'
import UserStyles from './../style/UserStyles'
import { login } from './../rest/UbademyAPI'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ACCESS_TOKEN, REFRESH_TOKEN, FAKE_PASSWORD } from  './../consts'

export default LoginScreen = (props) => {
  const initialState = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(initialState);

  const handleChangeText = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const storeData = async (key_name, value) => {
    try {
      await AsyncStorage.setItem(key_name, value)
    } catch (e) {
      console.error(e)
    }
  }

  const handleLogin = async () => {
    const {
      accessToken, active, created_on, email, id, lastname, name, refreshToken, uid
    } = await login(user.email, user.password)
    storeData(ACCESS_TOKEN, accessToken)
    storeData(REFRESH_TOKEN, refreshToken)

    props.navigation.navigate('WelcomeScreen', {
      userInfo: {
        name: name,
        lastname: lastname,
        email: email,
        password: FAKE_PASSWORD,
      }
    })
  }

	return (
		<View style={UserStyles.container}>
			<View>
				<Text style={UserStyles.tittle}>Ubademy</Text>
			</View>
			<View>
        <EmailInput onChangeText={(value) => handleChangeText(value, "email")} />
			</View>
			<View>
        <NormalInput 
          onChangeText={(value) => handleChangeText(value, "password")} 
          placeholder='Password' 
          secureTextEntry={true} 
          iconName='lock' 
        />
			</View>
			<View>
				<NormalButton 
          onPress={() => handleLogin()}
          title="Sign in"
        />
			</View>
			<View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Don't have an account?
					<Text 
						style={UserStyles.signInUp} 
						onPress={() => props.navigation.navigate('CreateUserScreen')}
					> Sign up</Text>
				</Text>
			</View>
		</View>
	)
}

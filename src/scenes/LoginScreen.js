import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { NormalButton, NormalInput, EmailInput,PasswordInput } from './../components'
import UserStyles from './../style/UserStyles'
import { login } from './../rest/UbademyAPI'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { USER_INFO, FAKE_PASSWORD } from  './../consts'

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
    const userLoged = await login(user.email, user.password)
    storeData(USER_INFO, JSON.stringify(userLoged))

    props.navigation.reset({
      index: 0,
      routes: [{ name: 'PrincipalScreen'}]
    })
  }

	return (
		<View style={UserStyles.container}>
			<View>
				<Text style={UserStyles.title}>Login</Text>
			</View>
			<View>
        <EmailInput onChangeText={(value) => handleChangeText(value, "email")} />
			</View>
			<View>
        <PasswordInput 
          onChangeText={(value) => handleChangeText(value, "password")} 
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
				</Text>
        <Text style={{textAlign: 'center'}}>
          <Text 
            style={UserStyles.signInUp} 
            onPress={() => props.navigation.navigate('RegisterScreen')}
          >Sign up </Text>
          |
          <Text 
            style={UserStyles.signInUp} 
            onPress={() => props.navigation.reset({
              index: 0,
              routes: [{ name: 'PrincipalScreen'}]
            })}
          > Browse</Text>
        </Text>
			</View>
		</View>
	)
}

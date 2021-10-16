import React, { useState } from 'react'
import { SafeAreaView, ScrollView, Text, View } from 'react-native'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'
import NormalButton from './../components/NormalButton'
import UserStyles from '../style/UserStyles'
import { register } from './../rest/UbademyAPI'

export default CreateUserScreen = ({navigation}) => {
  const initialState = {
    name: '',
    lastname: '',
    email: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState(initialState);

  const createNewUser = async () => {
    await register(userInfo.email, userInfo.password, userInfo.name, userInfo.lastname)
    .then(response => console.log(response))
    .catch(err => {})
    navigation.navigate('ProfileScreen', {
      userInfo: {
        name: "Alex",
        lastname: "Arbieto",
        email: "alexander@gmail.com",
        password: "123456"
      }
    })
  }

  const handleChangeText = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

	return (
    <View style={UserStyles.container}>
    <ScrollView>
      <View>
				<Text style={UserStyles.tittle}>Register</Text>
			</View>
      <View>
        <NormalInput 
          onChangeText={(value) => handleChangeText(value, "name")} 
          placeholder='Name' 
          iconName='user' 
        />
			</View>
      <View>
        <NormalInput 
          onChangeText={(value) => handleChangeText(value, "lastname")} 
          placeholder='Last name' 
          iconName='user' 
        />
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
        <NormalInput placeholder='Confirm password' secureTextEntry={true} iconName='lock' />
			</View>
			<View>
				<NormalButton title="Sign up" onPress={() => createNewUser()}/>
			</View>
      <View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Have an account?
					<Text 
						style={UserStyles.signInUp} 
						onPress={() => navigation.navigate('LoginScreen')}
					> Sign in</Text>
				</Text>
			</View>
		
    </ScrollView>
    </View>
	)
}

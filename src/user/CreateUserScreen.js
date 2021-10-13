import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'
import BirthdayInput from './../components/inputs/BirthdayInput'
import NormalButton from './../components/NormalButton'
import UserStyles from '../style/UserStyles'

export default CreateUserScreen = ({navigation}) => {
  const initialState = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    birthday: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState(initialState);

  const createNewUser = () => {
    navigation.navigate('ProfileScreen', {
      userInfo: {
        name: "Alex",
        lastname: "Arbieto",
        username: "alex1161",
        birthday: "20-02-1999",
        email: "alexander@gmail.com",
        password: "123456"
      }
    })
  }

  const handleChangeText = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

	return (
    <ScrollView>
		<View style={UserStyles.container}>
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
        <NormalInput 
          onChangeText={(value) => handleChangeText(value, "username")} 
          placeholder='Username' 
          iconName='user' 
        />
			</View>
      <View>
				<EmailInput onChangeText={(value) => handleChangeText(value, "email")} />
			</View>
      <View>
				<BirthdayInput onChangeText={(value) => handleChangeText(value, "birthday")} />
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
		</View>
    </ScrollView>
	)
}

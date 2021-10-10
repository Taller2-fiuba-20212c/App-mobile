import React, { useState } from 'react'
import { Text, View } from 'react-native'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'
import BirthdayInput from './../components/inputs/BirthdayInput'
import NormalButton from './../components/NormalButton'
import createUserStyles from './../style/CreateUserStyles'

import axios from 'axios';

export default CreateUserScreen = (props) => {
  const initialState = {
    name: '',
    lastname: '',
    username: '',
    email: '',
    birthday: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState(initialState);

  const saveNewUser = () => {
    console.log(userInfo)
    // axios({
    //   method: "POST",
    //   url: "http://localhost:3000/users/create",
    //   data: {
    //     name: userInfo.name,
    //     lastname: userInfo.lastname,
    //     email: userInfo.email,
    //     birthday: userInfo.birthday
    //   },
    // })
    // .then(response => console.log(response.data))
    // .catch(err => console.log(err))
    axios({
      url: 'http://localhost:3000/users/ping'
    })
    .then(response => console.log(response))
    .catch(err => console.log(err))
  };

  const handleChangeText = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

	return (
		<View style={createUserStyles.container}>
      <View>
				<Text style={createUserStyles.tittle}>Register</Text>
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
				<NormalButton onPress={() => saveNewUser()} title="Sign up"/>
			</View>
      <View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Have an account?
					<Text 
						style={createUserStyles.signIn} 
						onPress={() => props.navigation.navigate('LoginScreen')}
					> Sign in</Text>
				</Text>
			</View>
		</View>
	)
}

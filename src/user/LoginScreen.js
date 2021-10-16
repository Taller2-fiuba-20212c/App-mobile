import React, { useState } from 'react'
import { Text, View } from 'react-native'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import UserStyles from './../style/UserStyles'
import { login } from './../rest/UbademyAPI'

export default LoginScreen = (props) => {
  const initialState = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(initialState);

  const handleChangeText = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const handleLogin = async () => {
    await login(user.email, user.password)
    .then(response => console.log(response))

    props.navigation.navigate('ProfileScreen', {
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

	return (
		<View style={UserStyles.container}>
			<View>
				<Text style={UserStyles.tittle}>Ubademy</Text>
			</View>
			<View>
        <NormalInput 
          onChangeText={(value) => handleChangeText(value, "email")} 
          placeholder='Email' 
          iconName='mail' 
        />
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

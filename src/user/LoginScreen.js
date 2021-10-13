import React, { useState } from 'react'
import { Text, View } from 'react-native'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import UserStyles from './../style/UserStyles'

export default LoginScreen = (props) => {
  const initialState = {
    name: '',
    password: '',
  }
  const [login, setLogin] = useState(initialState);

  const handleChangeText = (value, name) => {
    setLogin({ ...login, [name]: value });
  };

  const handleLogin = () => {
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
          onChangeText={(value) => handleChangeText(value, "name")} 
          placeholder='Username' 
          iconName='user' 
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

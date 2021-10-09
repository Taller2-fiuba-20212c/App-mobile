import React from 'react'
import { Text, View } from 'react-native'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import loginStyles from './../style/LoginStyles'

export default LoginScreen = (props) => {
	return (
		<View style={loginStyles.container}>
			<View>
				<Text style={loginStyles.tittle}>Ubademy</Text>
			</View>
			<View>
        <NormalInput placeholder='Name' iconName='user' />
			</View>
			<View>
        <NormalInput placeholder='Password' password={true} iconName='lock' />
			</View>
			<View>
				<NormalButton title="Sign in"/>
			</View>
			<View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Don't have an account?
					<Text 
						style={loginStyles.signUp} 
						onPress={() => props.navigation.navigate('CreateUserScreen')}
					> Sign up</Text>
				</Text>
			</View>
		</View>
	)
}

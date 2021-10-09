import React from 'react'
import { Text, View } from 'react-native'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'
import BirthdayInput from './../components/inputs/BirthdayInput'
import NormalButton from './../components/NormalButton'
import createUserStyles from './../style/CreateUserStyles'

export default CreateUserScreen = (props) => {
	return (
		<View style={createUserStyles.container}>
      <View>
				<Text style={createUserStyles.tittle}>Register</Text>
			</View>
      <View>
        <NormalInput placeholder='Name' iconName='user' />
			</View>
      <View>
        <NormalInput placeholder='Last name' iconName='user' />
			</View>
			<View>
        <NormalInput placeholder='Username' iconName='user' />
			</View>
      <View>
				<EmailInput/>
			</View>
      <View>
				<BirthdayInput/>
			</View>
			<View>
        <NormalInput placeholder='Password' password={true} iconName='lock' />
			</View>
      <View>
        <NormalInput placeholder='Confirm password' password={true} iconName='lock' />
			</View>
			<View>
				<NormalButton title="Sign up"/>
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

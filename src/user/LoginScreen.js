import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Input, FAB, Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import loginStyles from './../style/LoginStyles'
import * as constants from  './../Constants'

export default LoginScreen = (props) => {
	return (
		<View style={loginStyles.container}>
			<View>
				<Text style={loginStyles.tittle}>Ubademy</Text>
			</View>
			<View>
				<Input
					placeholder='Username'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color={constants.BASE_COLOR}
						/>
					}
				/>
			</View>
			<View>
				<Input 
					placeholder="Password" 
					secureTextEntry={true} 
					leftIcon={
						<Icon
							name='lock'
							size={24}
							color={constants.BASE_COLOR}
						/>
					}
				/>
			</View>
			<View>
				<Button 
					buttonStyle={{
						backgroundColor: constants.BASE_COLOR
					}}
          title="Sign in"
				/>
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

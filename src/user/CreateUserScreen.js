import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Input, FAB, Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import createUserStyles from './../style/CreateUserStyles'
import * as constants from  './../Constants'

export default CreateUserScreen = (props) => {

	return (
		<View style={createUserStyles.container}>
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
					placeholder='Email'
					leftIcon={
						<Icon
							name='mail'
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
          title="Sign up"
				/>
			</View>
			<View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Don't have an account?
					<Text 
						style={createUserStyles.signUp} 
						onPress={() => props.navigation.navigate('CreateUserScreen')}
					> Sign up</Text>
				</Text>
			</View>
		</View>
	)
}

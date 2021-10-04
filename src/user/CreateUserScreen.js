import React, { useState } from 'react'
import { View, Text, ScrollView, Button } from 'react-native'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

export default CreateUserScreen = () => {

	return (
		<ScrollView>
			<View>
				<Input
					placeholder='First name'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
						/>
					}
					/>
			</View>
			<View>
				<Input
					placeholder='Last name'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color='black'
						/>
					}
					/>
			</View>
			<View>
				<Input
					placeholder='Mail'
					leftIcon={{ name: 'mail' }}
				/>
			</View>
			<View>
				<Input
					placeholder='INPUT WITH ERROR MESSAGE'
					errorStyle={{ color: 'red' }}
					errorMessage='ENTER A VALID ERROR HERE'
				/>
			</View>
			<View>
				<Input placeholder="Password" secureTextEntry={true} />
			</View>
	 
		</ScrollView>
	)
}

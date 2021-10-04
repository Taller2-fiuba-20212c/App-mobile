import React from 'react'
import { Text, View, ScrollView, StyleSheet } from 'react-native'
import { Input, FAB, Divider, Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';

const baseColor = '#145A32'

export default LoginUserScreen = (props) => {
	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.tittle}>Ubademy</Text>
			</View>
			<View>
				<Input
					placeholder='Username'
					leftIcon={
						<Icon
							name='user'
							size={24}
							color={baseColor}
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
							color={baseColor}
						/>
					}
				/>
			</View>
			<View>
				<Button 
					buttonStyle={{
						backgroundColor: baseColor
					}}
          title="Sign in"
				/>
			</View>
			<View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Don't have an account?
					<Text 
						style={styles.signUp} 
						onPress={() => props.navigation.navigate('CreateUserScreen')}
					> Sign up</Text>
				</Text>
			</View>
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		flex:1
	},
	
	tittle: {
		padding: 20,
		fontWeight: "bold",
		fontSize: 40,
		textAlign: "center",
	},

	signUp: {
		fontWeight: "bold", 
		color: baseColor
	}
})

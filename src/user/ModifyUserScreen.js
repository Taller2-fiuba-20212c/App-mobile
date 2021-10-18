import React from 'react'
import { View, Text } from 'react-native'
import UserStyles from './../style/UserStyles'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'

export default ModifyUserScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;

  const handleSaveUser = () => {
    navigation.navigate('WelcomeScreen')
  }

	return (
		<View style={UserStyles.container}>
      <View>
				<Text style={UserStyles.tittle}>Modify user</Text>
			</View>
      <View>
        <NormalInput 
          value={userInfo.name}
          placeholder='Name' 
          iconName='user' 
        />
			</View>
      <View>
        <NormalInput 
          value={userInfo.lastname}
          placeholder='Last name' 
          iconName='user' 
        />
			</View>
      <View>
				<EmailInput validate={true} value={userInfo.email} />
			</View>
			<View>
        <NormalInput 
          value={userInfo.password}
          placeholder='Password' 
          secureTextEntry={true} 
          iconName='lock' 
        />
			</View>
			<View>
				<NormalButton onPress={() => handleSaveUser()} title="Save"/>
			</View>
		</View>
	)
}

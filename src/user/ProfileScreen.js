import React from 'react'
import { View, Text } from 'react-native'
import UserStyles from './../style/UserStyles'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'
import BirthdayInput from './../components/inputs/BirthdayInput'

export default ProfileScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const disabledValue = true;

  const goToModifyUser = () => {
    navigation.navigate('ModifyUserScreen', {
      userInfo
    })
  }

	return (
		<View style={UserStyles.container}>
      <View>
				<Text style={UserStyles.tittle}>Profile</Text>
			</View>
      <View>
        <NormalInput 
          disabled={true}
          value={userInfo.name}
          placeholder='Name' 
          iconName='user' 
        />
			</View>
      <View>
        <NormalInput 
          disabled={true}
          value={userInfo.lastname}
          placeholder='Last name' 
          iconName='user' 
        />
			</View>
			<View>
        <NormalInput 
          disabled={true}
          value={userInfo.username}
          placeholder='Username' 
          iconName='user' 
        />
			</View>
      <View>
				<EmailInput disabled={true} value={userInfo.email} />
			</View>
      <View>
				<BirthdayInput disabled={true} value={userInfo.birthday} />
			</View>
			<View>
        <NormalInput 
          value={userInfo.password}
          placeholder='Password' 
          disabled={true}
          secureTextEntry={true} 
          iconName='lock' 
        />
			</View>
			<View>
				<NormalButton onPress={() => goToModifyUser()} title="Edit"/>
			</View>
		</View>
	)
}

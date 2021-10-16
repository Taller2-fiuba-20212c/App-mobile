import React from 'react'
import { View, Text } from 'react-native'
import { Button } from 'react-native-elements';
import UserStyles from './../style/UserStyles'
import NormalButton from './../components/NormalButton'
import NormalInput from './../components/inputs/NormalInput'
import EmailInput from './../components/inputs/EmailInput'

export default ProfileScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const disabledValue = true;

  const goToModifyUser = () => {
    navigation.navigate('ModifyUserScreen', {
      userInfo
    })
  }

  const deleteUser = () => {
    
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
				<EmailInput disabled={true} value={userInfo.email} />
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
      <View style={{paddingTop: 10}}>
				<Button title="Delete" onPress={() => deleteUser()}buttonStyle={{
          backgroundColor: "#a30000" 
        }}/>
			</View>
		</View>
	)
}

import React, { useLayoutEffect } from 'react'
import { View } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserStyles from './../style/UserStyles'
import { capitalize, getAvatarTitle } from './../model'
import { NormalInput, EmailInput } from './../components'
import { BASE_COLOR } from  './../consts'

export default UserScreen = ({navigation, route}) => {
  const userInfo = route.params.userInfo;
  const disabledValue = true;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: userInfo.name + ' ' + userInfo.lastname
    });
  });

	return (
    <View style={UserStyles.container}>
      <View style={{ 
        alignItems: 'center'
      }}>
        <Avatar
          rounded
          size='xlarge'
          title={getAvatarTitle(userInfo.name, userInfo.lastname)}
          containerStyle={{ 
            backgroundColor: BASE_COLOR 
          }}
        />
      </View>
      <View>
        <NormalInput 
          disabled={disabledValue}
          value={userInfo.name}
          placeholder='Name' 
          iconName='user' 
        />
      </View>
      <View>
        <NormalInput 
          disabled={disabledValue}
          value={userInfo.lastname}
          placeholder='Last name' 
          iconName='user' 
        />
      </View>
      <View>
        <NormalInput 
          disabled={disabledValue}
          value={capitalize(userInfo.role)}
          placeholder='Role' 
          iconName='graduation-cap' 
        />
      </View>
      <View>
        <EmailInput 
          disabled={disabledValue} 
          value={userInfo.email} 
        />
      </View>
    </View>
	)
}

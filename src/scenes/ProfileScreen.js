import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserStyles from './../style/UserStyles'
import { getData } from './../model'
import { NormalButton, NormalInput, EmailInput } from './../components'
import { BASE_COLOR, USER_INFO } from  './../consts'

const USER = {
  name: 'Alexander',
  lastname: 'Arbieto',
  email: 'alexander@gmail.com',
  role: 'Student',
}

export default ProfileScreen = ({navigation, route}) => {
  const [userInfo, setUserInfo] = useState(null);
  const disabledValue = true;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Profile',
    });
  });

  const goToModifyUser = () => {
    // navigation.navigate('ModifyUserScreen', {
    //   userInfo
    // })
  }

  useEffect(() => {
    getData(USER_INFO)
    .then(r => setUserInfo(r))
  }, [])

  const getTitle = () => {
    return userInfo.name[0].toUpperCase() + userInfo.lastname[0].toUpperCase()
  }

	return (
    <View style={{flex: 1}}>
    {
      userInfo != null ?
      <View style={UserStyles.container}>
        <View style={{ 
          alignItems: 'center'
        }}>
          <Avatar
            rounded
            size='xlarge'
            title={getTitle()}
            containerStyle={{ 
              backgroundColor: BASE_COLOR 
            }}
          >
            {/* <Avatar.Accessory size={45} /> */}
          </Avatar>
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
            value={userInfo.role}
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
        <View>
          <NormalButton onPress={() => goToModifyUser()} title="Edit"/>
        </View>
      </View>
      :
      <View style={ UserStyles.container }>
        <Text style={{ fontSize: 20, textAlign: 'center'}}>Have not logged in yet?</Text>
        <NormalButton 
          title='Sing in' onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'LoginScreen'}]
            })
          }}
        />
      </View>
    }
    </View>
	)
}

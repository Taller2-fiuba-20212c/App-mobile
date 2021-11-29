import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserStyles from './../style/UserStyles'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NormalButton, NormalInput, EmailInput } from './../components'
import { DANGGER_COLOR, USER_INFO, FAKE_PASSWORD } from  './../consts'


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

  const getData = async (key_name) => {
    try {
      const data = await AsyncStorage.getItem(key_name)
      const dataObject = data != null ? JSON.parse(data) : null;
      setUserInfo(dataObject)
    } catch(e) {
      // error reading value
      console.error(e);
    }
  }

  useEffect(() => {
    getData(USER_INFO)
  }, [])

	return (
    <View style={{flex: 1}}>
    {
      userInfo !== null ?
      <View style={UserStyles.container}>
        <View style={{  }}>
          <Avatar
            rounded
            source={{
              uri:
                'https://uifaces.co/our-content/donated/6MWH9Xi_.jpg',
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
          <EmailInput disabled={disabledValue} value={userInfo.email} />
        </View>
        <View>
          <PasswordInput 
            value={userInfo.password} 
            disabled={disabledValue}
            hideVisibility={true}
          />
        </View>
        <View>
          <NormalButton onPress={() => goToModifyUser()} title="Edit"/>
        </View>
      </View>
      :
      <View>
        <Text>Sign Up</Text>
      </View>
    }
    </View>
	)
}

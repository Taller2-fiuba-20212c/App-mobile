import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text } from 'react-native'
import { Avatar } from 'react-native-elements'
import UserStyles from './../style/UserStyles'
import { getData, capitalize, getAvatarTitle } from './../model'
import { NormalButton, NormalInput, EmailInput } from './../components'
import { BASE_COLOR, USER_INFO } from  './../consts'
import { useGlobalAuthActionsContext } from '../model/ContextFactory'
import { removeData } from '../model/Utils'

export default ProfileScreen = ({navigation, route}) => {
  const setAppAuthContext = useGlobalAuthActionsContext();
  const [userInfo, setUserInfo] = useState(null);
  const disabledValue = true;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: userInfo ? 
        userInfo.name + ' ' + userInfo.lastname
        : 
        'Profile',
    });
  });

  const goToModifyUser = () => {
    navigation.navigate('ModifyUserScreen')
  }

  const goToCreateCourse = () => {
    navigation.navigate('CreateCourseScreen')
  }

  useEffect(() => {
    getData(USER_INFO)
    .then(r => setUserInfo(r))
  }, [])

  const handleLogout = async () => {
    await removeData(USER_INFO);
    setAppAuthContext(prevState => ({ ...prevState, user: undefined }));
    navigation.reset({
      index: 0,
      routes: [{ name: 'LoginScreen'}]
    })
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
        <View>
          <NormalButton onPress={() => goToModifyUser()} title="Edit Profile"/>
        </View>
        <View>
          <NormalButton onPress={() => handleLogout()} title="Sign out"/>
        </View>
        {
          userInfo.role == 'PROFESSOR' ? 
          <View style={{ paddingVertical: 10 }}>
            <NormalButton onPress={() => goToCreateCourse()} title="Create new course"/>
          </View>
          :
          null
        }
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

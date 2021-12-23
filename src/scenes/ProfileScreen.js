import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'
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
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getData(USER_INFO)
      .then(r => {
        setUserInfo(r);
        setLoading(false);
      })
    })

    return unsubscribe;
  }, [navigation])

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
      loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        userInfo != null ?
        <View style={UserStyles.container}>
          <View style={{ 
            alignItems: 'center'
          }}>
            <Avatar
              rounded
              source={userInfo.image ? { uri: userInfo.image } : null}
              size='xlarge'
              title={getAvatarTitle(userInfo.name, userInfo.lastname)}
              containerStyle={{ 
                backgroundColor: userInfo.image ? 'white' : BASE_COLOR
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

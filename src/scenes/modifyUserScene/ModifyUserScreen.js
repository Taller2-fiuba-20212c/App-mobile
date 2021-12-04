import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ActivityIndicator, Alert, ScrollView } from 'react-native'
import { getData, storeData, modifyUser, getAvatarTitle } from './../../model'
import { Avatar } from 'react-native-elements'
import { NormalButton, NormalInput, EmailInput, HorizontalBoxes } from './../../components'
import { BASE_COLOR, USER_INFO } from  './../../consts'
import ModifyUserStyles from './ModifyUserStyles'

export default ModifyUserScreen = ({navigation}) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false)

  const handleError = (err) => {
    switch (err.response.status){
      case 400: {
        Alert.alert('Bad request', err.response.data.errors[0].param + ': ' + err.response.data.errors[0].msg);
        break;
      }
      case 404: {
        console.log(err.response);
        break;
      }
      default: {
        Alert.alert('Something went wrong');
        break;
      }
    }
  }

  const saveChange = async () => {
    setLoading(true);
    await modifyUser(
      userInfo.uid, userInfo.email, userInfo.password, 
      userInfo.role, userInfo.name, userInfo.lastname
    )
    .then(r => {
      setLoading(false);
      storeData(USER_INFO, JSON.stringify(r));
      navigation.navigate('ProfileScreen')
    })
    .catch(err => handleError(err))
    setLoading(false);
  }

  useEffect(() => {
    getData(USER_INFO)
    .then(r => {
      setUserInfo(r);
      setLoadingScreen(false);
    })
  }, []);

  const handleChange = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleErrorEmail = (value) => {
    setDisableButton(value)
  }

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit Profile',
    });
  });

	return (
    
		<View style={{flex: 1}}>
      {
        loadingScreen ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'  }}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        <View style={ModifyUserStyles.container}>
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            keyboardShouldPersistTaps='always' 
            contentContainerStyle={{ 
              flexGrow: 1, 
              justifyContent: 'center' 
            }}
          >
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
                value={userInfo.name}
                onChangeText={(value) => handleChange(value, "name")} 
                placeholder='Name' 
                iconName='user' 
              />
              <View>
                <NormalInput 
                  value={userInfo.lastname}
                  onChangeText={(value) => handleChange(value, "lastname")} 
                  placeholder='Last name' 
                  iconName='user' 
                />
              </View>
              <View>
                <EmailInput 
                  value={userInfo.email}
                  validate={true} 
                  onChangeText={(value) => handleChange(value, "email")}
                  error={(value) => handleErrorEmail(value)}
                />
              </View>
              <View>
                <Text 
                  style={{
                    paddingLeft: 10, 
                    color: 'gray', 
                    fontWeight: 'bold',
                    fontSize: 16
                  }}
                >Role</Text>
                <HorizontalBoxes 
                  value={userInfo.role} 
                  onChange={(value) => handleChange(value, 'role')}
                />
              </View>
              {
                loading ? 
                <ActivityIndicator size="large" color={BASE_COLOR} />
                :
                <View>
                  <NormalButton 
                    disabled={disableButton}
                    title="save" 
                    onPress={() => saveChange()}
                  />
                </View>
              }
            </View>
          </ScrollView>
        </View>
      }
		</View>
	)
}


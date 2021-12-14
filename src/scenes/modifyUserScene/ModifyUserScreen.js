import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getData, storeData, modifyUser, getAvatarTitle } from './../../model'
import { Avatar } from 'react-native-elements'
import { 
  NormalButton, NormalInput, EmailInput, HorizontalBoxes, Alert 
} from './../../components'
import { BASE_COLOR, USER_INFO, ROLES_REGISTER } from  './../../consts'
import ModifyUserStyles from './ModifyUserStyles'

export default ModifyUserScreen = ({navigation}) => {
  const [userInfoSaved, setUserInfoSaved] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(false)
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  });

  const handleError = (err) => {
    switch (err.response.status){
      case 400: {
        setAlertInfo({
          title: err.response.data.errors[0].param, 
          msg: err.response.data.errors[0].msg
        });
        break;
      }
      default: {
        setAlertInfo({
          title: 'Something went wrong',
          msg: ''
        });
        break;
      }
    }

    setVisible(true)
  }

  const modifyDataSaved = (r) => {
    const aux = Object.assign({}, userInfoSaved);
    const newUserInfo = Object.assign(aux, r);
    storeData(USER_INFO, JSON.stringify(newUserInfo));
  }

  const saveChange = async () => {
    setLoading(true);
    await modifyUser(
      userInfo.uid, userInfo.email, userInfo.role, 
      userInfo.name, userInfo.lastname, userInfo.active
    )
    .then(r => {
      setLoading(false);
      modifyDataSaved(r);
      navigation.navigate('ProfileScreen')
    })
    .catch(err => handleError(err))
    setLoading(false);
  }

  useEffect(() => {
    getData(USER_INFO)
    .then(r => {
      setUserInfo(r);
      setUserInfoSaved(r);
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
                  options={ROLES_REGISTER}
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
            <Alert 
              isVisible={visible}
              alertInfo={alertInfo}
              onBackdropPress={() => setVisible(false)}
              onButtonPress={() => setVisible(false)}
            />
          </ScrollView>
        </View>
      }
		</View>
	)
}


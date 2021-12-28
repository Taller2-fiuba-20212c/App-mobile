import React, { useState, useEffect, useLayoutEffect } from 'react'
import { View, Text, ActivityIndicator, ScrollView } from 'react-native'
import { getData, storeData, modifyUser, getAvatarTitle } from './../../model'
import { Avatar } from 'react-native-elements'
import * as ImagePicker from 'expo-image-picker';
import { NormalButton, NormalInput, Alert, MultiSelect } from './../../components'
import { BASE_COLOR, USER_INFO, CATEGORIES_TYPES } from  './../../consts'
import ModifyUserStyles from './ModifyUserStyles'
import { useGlobalAuthActionsContext } from '../../model/ContextFactory'

const categories = CATEGORIES_TYPES.map((c,i) => {
  return {
    description: c,
    id: i + 1
  }
})

export default ModifyUserScreen = ({navigation}) => {
  const setAppAuthContext = useGlobalAuthActionsContext();
  const [selected, setSelected] = useState([])
  const [userInfoSaved, setUserInfoSaved] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadingScreen, setLoadingScreen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true)
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

  const changeImg = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          setAlertInfo({ 
            title: NORMAL_ERROR_TITLE, 
            msg: getErrorPermissionMsg('camera roll permissions', 'change this image')
          })
          setVisible(true)
          return
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
  
      if (!result.cancelled) {
        handleChange(
          'data:image/png;base64,' + result.base64, 
          'image'
        )
      }
    })();
  }

  const modifyDataSaved = async (r) => {
    const aux = Object.assign({}, userInfoSaved);
    const newUserInfo = Object.assign(aux, r);
    await storeData(USER_INFO, JSON.stringify(newUserInfo));
    return
  }

  const saveChange = async () => {
    setLoading(true);
    let newUserInfo = {
      email: userInfo.email,
      role: userInfo.role,
      name: userInfo.name,
      lastname: userInfo.lastname,
      active: userInfo.active,
    };

    if (userInfoSaved.image != userInfo.image) {
      newUserInfo = {
        ...newUserInfo,
        image: userInfo.image
      }
    }

    await modifyUser(userInfo.uid, newUserInfo)
    .then(r => {
      setAppAuthContext(prevState => ({ ...prevState, user: { ...r, accessToken: prevState.user.accessToken, refreshToken: prevState.user.refreshToken }}));
      modifyDataSaved(r).then(r => {
        setLoading(false);
        navigation.navigate('User')
      })
    })
    .catch((err) => handleError(err));
  }

  useEffect(() => {
    getData(USER_INFO)
    .then(r => {
      setUserInfoSaved(r);
      setUserInfo(r);
      setSelected(r.categories.map(c => c.description));
      setLoadingScreen(false);
    })
  }, []);

  const equalObject = (o1, o2) => {
    if (o1 == null || o2 == null) {
      return true
    }
    
    for(var p in o1){
      if(o1.hasOwnProperty(p)){
        if(o1[p] !== o2[p] && p !== 'categories'){
          return false;
        }
      }
    }
    for(var p in o2){
      if(o2.hasOwnProperty(p)){
        if(o1[p] !== o2[p] && p !== 'categories'){
          return false;
        }
      }
    }

    if (o1.categories.length != o2.categories.length) {
      return false;
    }

    return o1.categories.every(e1 => 
      o2.categories.some(e2 => 
        e1.description == e2.description
      )
    )
  }

  useEffect(() => {
    console.log(userInfo)
    console.log(userInfoSaved)
    console.log(equalObject(userInfo, userInfoSaved))
    setDisableButton(
      equalObject(userInfo, userInfoSaved)
      ||
      userInfo.name == ''
      ||
      userInfo.lastname == ''
    );
  }, [userInfo]);

  const handleChange = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit Profile',
    });
  });

  const handleSelect = (values) => {
    setUserInfo({
      ...userInfo,
      categories: categories.filter(c => values.includes(c.description))
    })
  }

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
                source={userInfo.image ? { uri: userInfo.image } : null}
                size='xlarge'
                title={getAvatarTitle(userInfoSaved.name, userInfoSaved.lastname)}
                containerStyle={{ 
                  backgroundColor: userInfo.image ? 'white' : BASE_COLOR 
                }}
              >
                <Avatar.Accessory name='edit' onPress={() => changeImg()} size={40} />
              </Avatar>
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
              <Text 
                style={{
                  paddingLeft: 10, 
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}
              >Preferred categories</Text>
              <View style={{ paddingHorizontal: 10, paddingBottom: 20 }} >
                <MultiSelect 
                  options={CATEGORIES_TYPES} 
                  placeholder='Select a subscription' 
                  value={userInfo ? userInfo.categories.map(c => c.description) : []}
                  onChange={(values) => handleSelect(values)}
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


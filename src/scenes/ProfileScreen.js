import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, ActivityIndicator, ScrollView, Clipboard, Alert, ToastAndroid, TouchableOpacity, StyleSheet } from 'react-native'
import { Avatar, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/Entypo';
import UserStyles from './../style/UserStyles'
import { getData, capitalize, getAvatarTitle } from './../model'
import { NormalButton, NormalInput, MultiSelect, EmailInput } from './../components'
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

  const handleAddressCopy = (content) => {
    Clipboard.setString(content);
    ToastAndroid.showWithGravity(
      "Address copied to clipboard.",
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  }

  const handleSecretCopy = (content) => {
    Alert.alert(
      "Copy wallet secret?",
      "This is sensitive data, don't share it with anyone!",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Copy",
          onPress: () => {
            ToastAndroid.showWithGravity(
              "Secret copied to clipboard.",
              ToastAndroid.SHORT,
              ToastAndroid.CENTER
            )
            Clipboard.setString(content);
          },
          style: "accept",
        },
      ],
      {
        cancelable: true
      }
    );
  }

  
  //https://github.com/mdmoin7/react-native-hide-show-password/blob/master/PasswordTextBoxNative.js
  
  const WalletDisplay = (props) => {
  
    const height = (20);
    const styles = StyleSheet.create({
      container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'stretch',
        borderColor: "#6002EE",
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "#6002EE"
      },
      icons: {
        right: 5,
        textAlign: 'center',
        textAlignVertical: 'center',
      },
    });

    return (
      <View style={{ flexDirection: 'row', paddingBottom: 15, }} >
        <View style={{ flex: 12 }} >
          <TouchableOpacity 
            style={styles.container}
            onPress={()=>handleAddressCopy(props.address)}
          >
            <Input 
              style={{
                height: height,
                flex: 1,
                alignSelf: 'center',
                paddingHorizontal: (5),
              }}
              labelStyle={{ alignSelf: 'center', color: '#fff' }}
              disabledInputStyle={{ color: '#fff', fontSize: (17), opacity: 1 }}
              disabled={disabledValue}
              value={String(props.address).substring(0,6)+"..."+String(props.address).substring(38)}
              placeholder='Wallet address' 
              label="Wallet address"
              leftIcon={<Icon name="wallet" color='#fff' size={20} />}
              rightIcon={<Icon name="copy" color='#fff' size={20} />}
            />
          </TouchableOpacity>
        </View>
        <View flex={1}></View>
        <View style={{ flex: 8 }} >
          <TouchableOpacity 
            style={styles.container}
            onPress={()=>handleSecretCopy(props.secret)}  
          >
            <Input 
              style={{
                height: height,
                flex: 1,
                alignSelf: 'center',
                paddingHorizontal: (5),
              }}
              labelStyle={{ alignSelf: 'center', color: '#fff' }}
              disabled={disabledValue}
              value={"*******"}
              secureTextEntry
              label='Wallet secret' 
              disabledInputStyle={{ color: '#fff', opacity: 1 }}
              leftIcon={<Icon name="lock" color='#fff' size={20} />}
              rightIcon={<Icon name="copy" color='#fff' size={20} />}
            />
          </TouchableOpacity>
        </View>
      </View>
    )
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
          <ScrollView showsVerticalScrollIndicator={false}>
          <View style={{ 
            alignItems: 'center'
          }}>
            <Avatar
              rounded
              source={userInfo.image ? { uri: userInfo.image } : null}
              size={130}
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
          <Text 
            style={{
              paddingLeft: 10, 
              paddingBottom: 10,
              color: 'gray', 
              fontWeight: 'bold',
              fontSize: 16
            }}
          >Preferred categories</Text>
          <View style={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            paddingBottom: 20
          }}>
            {
              userInfo.categories.slice().map((s, i) => (
                <View key={i} style={{
                  backgroundColor: BASE_COLOR,
                  borderRadius: 20,
                  marginHorizontal: 5,
                  marginVertical: 2
                }}>
                  <Text style={{color: 'white', margin: 10}}>{s.description}</Text>
                </View>
              ))
            }
          </View>
          <View>
            <WalletDisplay
              address={userInfo.address}
              secret={userInfo.secret}
            />
          </View>
          <View>
            <NormalButton onPress={() => goToModifyUser()} title="Edit Profile"/>
          </View>
          <View style={{ paddingVertical: 10 }}>
            <NormalButton onPress={() => handleLogout()} title="Sign out" />
          </View>
          </ScrollView>
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

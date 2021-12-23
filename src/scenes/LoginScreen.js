import React, { useState } from 'react'
import { Text, View, ActivityIndicator } from 'react-native'
import { NormalButton, Alert, EmailInput,PasswordInput } from './../components'
import UserStyles from './../style/UserStyles'
import { login, storeData } from './../model'
import { USER_INFO, BASE_COLOR } from  './../consts'

export default LoginScreen = ({navigation}) => {
  const initialState = {
    email: '',
    password: '',
  }

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  });

  const handleChangeText = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const handleError = (err) => {
    if (err.response?.status) {
      switch (err.response.status){
        case 400: {
          setAlertInfo({
            title: err.response.data.errors[0].param, 
            msg: err.response.data.errors[0].msg
          });
          break;
        }
        case 403: {
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
    }

    setVisible(true)
  }

  const handleLogin = async () => {
    setLoading(true);
    login(user.email, user.password)
    .then(r => {
      storeData(USER_INFO, JSON.stringify(r)).then(r => {
        setLoading(false);
        navigation.reset({
          index: 0,
          routes: [{ name: 'PrincipalScreen'}]
        })
      })
    })
    .catch(e => handleError(e));
    setLoading(false);
  }

	return (
		<View style={UserStyles.container}>
			<View>
				<Text style={UserStyles.title}>Login</Text>
			</View>
			<View>
        <EmailInput onChangeText={(value) => handleChangeText(value, "email")} />
			</View>
			<View>
        <PasswordInput 
          onChangeText={(value) => handleChangeText(value, "password")} 
        />
			</View>
      {
        loading ? 
        <ActivityIndicator size="large" color={BASE_COLOR} />
        :
        <View>
          <NormalButton 
            onPress={() => handleLogin()}
            title="Sign in"
          />
        </View>
      }
			<View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Don't have an account?
				</Text>
        <Text style={{textAlign: 'center'}}>
          <Text 
            style={UserStyles.signInUp} 
            onPress={() => navigation.navigate('RegisterScreen')}
          >Sign up </Text>
          |
          <Text 
            style={UserStyles.signInUp} 
            onPress={() => navigation.reset({
              index: 0,
              routes: [{ name: 'PrincipalScreen'}]
            })}
          > Browse</Text>
        </Text>
			</View>
      <Alert 
        isVisible={visible}
        alertInfo={alertInfo}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
		</View>
    
	)
}

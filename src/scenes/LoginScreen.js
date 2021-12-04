import React, { useState } from 'react'
import { Text, View, Alert, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, EmailInput,PasswordInput } from './../components'
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

  const handleChangeText = (value, name) => {
    setUser({ ...user, [name]: value });
  };

  const handleError = (e) => {
    switch (e.response.status){
      case 400: {
        Alert.alert('Bad request', e.response.data.errors[0].param + ': ' + e.response.data.errors[0].msg);
        break;
      }
      case 403: {
        Alert.alert('Bad request', e.response.data.errors[0].param + ': ' + e.response.data.errors[0].msg);
        break;
      }
      default: {
        Alert.alert('Something went wrong');
        break;
      }
    }
  }

  const handleLogin = async () => {
    setLoading(true);
    await login(user.email, user.password)
    .then(r => {
      setLoading(false);
      storeData(USER_INFO, JSON.stringify(userLoged));
      navigation.reset({
        index: 0,
        routes: [{ name: 'PrincipalScreen'}]
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
		</View>
	)
}

import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, ActivityIndicator } from 'react-native'
import { 
  NormalButton, NormalInput, EmailInput, PasswordInput, HorizontalBoxes, Alert 
} from './../../components'
import RegisterStyles from './RegisterStyles'
import { BASE_COLOR, USER_INFO, ROLES_REGISTER, MIN_USER_PASSWORD_LENGTH } from './../../consts'
import { register, storeData } from './../../model'

export default RegisterScreen = ({navigation, route}) => {
  const initialState = {
    name: route.params?.user?.name,
    lastname: route.params?.user?.lastname,
    email: route.params?.user?.email,
    role: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState(initialState);
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState(initialState.email === undefined);
  const [loading, setLoading] = useState(false);

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
        let msg;
        let title;
        if (err.response.data?.errors[0].param == 'email') {
          title = 'Sorry'
          msg = err.response.data.errors[0].msg;
        } else {
          title = 'Something went wrong';
          msg = '';
        }
        setAlertInfo({
          title: title,
          msg: msg
        });
        break;
      }
    }

    setVisible(true)
  }

  const createNewUser = async () => {
    if (userInfo.password.length < MIN_USER_PASSWORD_LENGTH) {
      setAlertInfo({
        title: 'Sorry!',
        msg: 'Password is too short, minimun lenght: 6'
      })
      setVisible(true)
      return
    }

    setLoading(true);
    await register(
      userInfo.email, userInfo.password, userInfo.role, 
      userInfo.name, userInfo.lastname, route.params?.user.uid
    )
    .then(r => {
      setLoading(false);
      storeData(USER_INFO, JSON.stringify(r));
      navigation.navigate('ExtraInfoScreen', {
        userInfo: r
      });
    })
    .catch(err => {
      console.log(err.response)
      setLoading(false);
      handleError(err)
    })
  } 

  useEffect(() => {
    setDisableButton(
      Object.values(userInfo).some(x => x == null || x == '') || error
    );
  }, [userInfo, error]);

  const handleChange = (value, name) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleErrorEmail = (value) => {
    setError(value);
  };

	return (
    <View style={RegisterStyles.container}>
    <ScrollView 
      showsVerticalScrollIndicator={false} 
      keyboardShouldPersistTaps='always' 
      contentContainerStyle={{ 
        flexGrow: 1, 
        justifyContent: 'center' 
      }}
    >
      <View>
				<Text style={RegisterStyles.title}>Register</Text>
			</View>
      <View>
        <NormalInput 
          onChangeText={(value) => handleChange(value, "name")} 
          placeholder='Name' 
          iconName='user'
          defaultValue={initialState.name}
        />
			</View>
      <View>
        <NormalInput 
          onChangeText={(value) => handleChange(value, "lastname")} 
          placeholder='Last name' 
          iconName='user' 
          defaultValue={initialState.lastname}
        />
			</View>
      <View>
				<EmailInput 
          validate={true} 
          onChangeText={(value) => handleChange(value, "email")} 
          error={(value) => handleErrorEmail(value)}
          disabled={initialState.email != undefined}
          defaultValue={initialState.email}
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
        <HorizontalBoxes options={ROLES_REGISTER} onChange={(value) => handleChange(value, 'role')}/>
      </View>
			<View>
        <PasswordInput 
          onChangeText={(value) => handleChange(value, "password")} 
        />
			</View>
      {
        loading ? 
        <ActivityIndicator size="large" color={BASE_COLOR} />
        :
        <View>
          <NormalButton 
            disabled={disableButton} 
            title="Sign up" 
            onPress={() => createNewUser()}
          />
			  </View>
      }
      <View style={{padding: 20}}>
				<Text style={{textAlign: 'center'}}>
					Have an account?
					<Text 
						style={RegisterStyles.signInUp} 
						onPress={() => navigation.navigate('LoginScreen')}
					> Sign in</Text>
				</Text>
			</View>
    </ScrollView>
    <Alert 
      isVisible={visible}
      alertInfo={alertInfo}
      onBackdropPress={() => setVisible(false)}
      onButtonPress={() => setVisible(false)}
    />
    </View>
	)
}
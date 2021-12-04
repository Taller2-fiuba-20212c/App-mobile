import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Alert, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, EmailInput, PasswordInput } from './../../components'
import { CheckBox, Icon } from 'react-native-elements'
import RegisterStyles from './RegisterStyles'
import { BASE_COLOR } from './../../consts'
import { register } from './../../model'

const ROLES_REGISTER = ['STUDENT', 'COLABORATOR', 'PROFESSOR']

export default RegisterScreen = ({navigation}) => {
  const initialState = {
    name: '',
    lastname: '',
    email: '',
    role: '',
    password: '',
  }
  const [userInfo, setUserInfo] = useState(initialState);
  const [disableButton, setDisableButton] = useState(true);
  const [error, setError] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleError = (err) => {
    switch (err.response.status){
      case 400: {
        Alert.alert('Bad request', err.response.data.errors[0].param + ': ' + err.response.data.errors[0].msg);
        break;
      }
      default: {
        Alert.alert('Something went wrong');
        break;
      }
    }
  }

  const createNewUser = async () => {
    setLoading(true);
    await register(
      userInfo.email, userInfo.password, userInfo.role, 
      userInfo.name, userInfo.lastname
    )
    .then(r => {
      setLoading(false);
      navigation.navigate('LoginScreen')
    })
    .catch(err => handleError(err))
    setLoading(false);
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
        />
			</View>
      <View>
        <NormalInput 
          onChangeText={(value) => handleChange(value, "lastname")} 
          placeholder='Last name' 
          iconName='user' 
        />
			</View>
      <View>
				<EmailInput 
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
        <HorizontalBoxes onChange={(value) => handleChange(value, 'role')}/>
      </View>
			<View>
        <PasswordInput 
          onChangeText={(value) => handleChange(value, "password")} 
        />
			</View>
      <View>
        {/* <PasswordInput 
          onChangeText={(value) => handleChange(value, "password")} 
          confirm={true}
        /> */}
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
    </View>
	)
}

const HorizontalBoxes = ({onChange}) => {
  const [selected, setSelected] = useState(null);

  const handlePress = (newSelected) => {
    setSelected(newSelected);
    onChange(newSelected);
  }

  function capitalize(string) {
    const s = string.toLowerCase();
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

  return (
    <View style={{ flexDirection: 'row' }}>
    <CheckBox
      title={capitalize(ROLES_REGISTER[0])}
      containerStyle ={{
        backgroundColor: 'transparent', 
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0
      }}
      checkedIcon={
        <Icon
          name="radio-button-checked"
          type="material"
          color={BASE_COLOR}
          size={25}
        />
      }
      uncheckedIcon={
        <Icon
          name="radio-button-unchecked"
          type="material"
          color="grey"
          size={25}
        />
      }
      checked={selected == ROLES_REGISTER[0]}
      onPress={() => handlePress(ROLES_REGISTER[0])}
    />
    <CheckBox
      containerStyle ={{
        backgroundColor: 'transparent', 
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0
      }}
      title={capitalize(ROLES_REGISTER[1])}
      checkedIcon={
        <Icon
          name="radio-button-checked"
          type="material"
          color={BASE_COLOR}
          size={25}
        />
      }
      uncheckedIcon={
        <Icon
          name="radio-button-unchecked"
          type="material"
          color="grey"
          size={25}
        />
      }
      checked={selected == ROLES_REGISTER[1]}
      onPress={() => handlePress(ROLES_REGISTER[1])}
    />
    <CheckBox
      containerStyle ={{
        backgroundColor: 'transparent', 
        borderWidth: 0,
        flex: 1,
        paddingHorizontal: 0
      }}
      title={capitalize(ROLES_REGISTER[2])}
      checkedIcon={
        <Icon
          name="radio-button-checked"
          type="material"
          color={BASE_COLOR}
          size={25}
        />
      }
      uncheckedIcon={
        <Icon
          name="radio-button-unchecked"
          type="material"
          color="grey"
          size={25}
        />
      }
      checked={selected == ROLES_REGISTER[2]}
      onPress={() => handlePress(ROLES_REGISTER[2])}
    />
    </View>
  )
}

import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import NormalInput from './NormalInput';
import { BASE_COLOR } from  '../../consts'

export default PasswordInput = (props) => {
  const [visibility, setVisibility] = useState(true)

  return (
    <NormalInput
      {...props}
      placeholder={
        props.confirm ? 'Confirm password' : 'Password'
      }
      secureTextEntry={visibility} 
      iconName='lock' 
      rightIcon={
        props.hideVisibility ? null :
        <Icon
          name='eye'
          size={24}
          color={BASE_COLOR}
          onPress={() => setVisibility(!visibility)}
        />
      }
    />
  )
}
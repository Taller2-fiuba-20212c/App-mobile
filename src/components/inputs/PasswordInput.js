import React, { useState, useEffect } from 'react'
import Icon from 'react-native-vector-icons/Entypo';
import NormalInput from './NormalInput';
import { BASE_COLOR } from  '../../consts'

export default PasswordInput = (props) => {
  const [visibility, setVisibility] = useState(true)
  const [eyeIcon, setEyeIcon] = useState(
    <Icon
      name='eye'
      size={24}
      color={BASE_COLOR}
      onPress={() => setVisibility(!visibility)}
    />
  )

  useEffect(() => {
    let actualIcon = visibility ? 
      <Icon
        name='eye'
        size={24}
        color={BASE_COLOR}
        onPress={() => setVisibility(!visibility)}
      />
      :
      <Icon
        name='eye-with-line'
        size={24}
        color={BASE_COLOR}
        onPress={() => setVisibility(!visibility)}
      />
    setEyeIcon(actualIcon)
  }, [visibility])

  return (
    <NormalInput
      {...props}
      placeholder={
        props.confirm ? 'Confirm password' : 'Password'
      }
      secureTextEntry={visibility} 
      iconName='lock' 
      rightIcon={props.hideVisibility ? null : eyeIcon}
    />
  )
}
import React from 'react'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import * as constants from  '../../Constants'

export default PasswordInput = (props) => {
  return (
    <Input
      placeholder={props.placeholder}
      secureTextEntry={props.password}
      leftIcon={
        <Icon
          name={props.iconName}
          size={24}
          color={constants.BASE_COLOR}
        />
      }
    />
  )
}
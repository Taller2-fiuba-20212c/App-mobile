import React from 'react'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { BASE_COLOR } from  '../../consts'

export default NormalInput = (props) => {
  return (
    <Input
      {...props}
      leftIcon={
        <Icon
          name={props.iconName}
          size={24}
          color={BASE_COLOR}
        />
      }
      labelStyle={{
        color: 'gray'
      }}
    />
  )
}
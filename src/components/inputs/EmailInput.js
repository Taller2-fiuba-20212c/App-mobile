import React, { useState } from 'react'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import * as constants from  './../../Constants'

export default EmailInput = (props) => {
  const [e, setE] = useState(props.value)

  const validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    if (!reg.test(email)) {
      setE('Invalidad email address!')
    } else { 
      setE(null)
    }
    props.onChangeText(email)
  }

  return (
    <Input
      value={props.value}
      disabled={props.disabled}
      placeholder='Email'
      onChangeText={email => {validate(email)}}
      errorStyle={{ color:'red' }}
      errorMessage={e}
      leftIcon={
        <Icon
          name='mail'
          size={24}
          color={constants.BASE_COLOR}
        />
      }
    />
  )
}
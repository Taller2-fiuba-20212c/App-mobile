import React, { useState, useEffect } from 'react'
import { Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { BASE_COLOR } from  './../../consts'

export default EmailInput = (props) => {
  const [email, setEmail] = useState(props.value)
  const [error, setError] = useState(null)

  useEffect(() => {
    (!props.validate || (validate(email) || (email == null))) ? 
      setError(null) : 
      setError('Invalidad email address!')
  }, [email])

  const handleChangeText = (newEmail) => {
    setEmail(newEmail)
    if (props.onChangeText) {
      props.onChangeText(newEmail)
    }
  }

  const validate = (email) => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    return reg.test(email)
  }

  return (
    <Input
      value={email}
      disabled={props.disabled}
      placeholder='Email'
      onChangeText={newEmail => handleChangeText(newEmail)}
      errorStyle={{ color:'red' }}
      errorMessage={error}
      leftIcon={
        <Icon
          name='mail'
          size={24}
          color={BASE_COLOR}
        />
      }
    />
  )
}
import React from 'react'
import { Button, FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Entypo';
import { BASE_COLOR } from './../consts'
import { Text, View } from 'react-native'

export default MessageButton = () => {
	return (
    <FAB
      color='white'
      icon={
        <Icon 
          name='chat'
          size={24}
          color={BASE_COLOR}
        />
      }
    />
	)
}

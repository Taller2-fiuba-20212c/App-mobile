import React, { useState } from 'react'
import { Text, View } from 'react-native'
import { Overlay, Icon, Button } from 'react-native-elements'
import AlertStyles from './AlertStyles'
import { capitalize } from './../../model'

export default Alert = (props) => {
  return (
    <Overlay 
      isVisible={props.isVisible} 
      onBackdropPress={() => props.onBackdropPress()}
      overlayStyle={AlertStyles.container}
    >
      <Text style={AlertStyles.textPrimary}>{capitalize(props.alertInfo.title)}</Text>
      { props.alertInfo.msg == '' ? null :
        <Text style={AlertStyles.textSecondary}>{capitalize(props.alertInfo.msg)}</Text>
      }
      <Button
        title="Ok"
        buttonStyle={AlertStyles.button}
        onPress={() => props.onButtonPress()}
      />
    </Overlay>
  )
}
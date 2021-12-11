import React from 'react'
import { Text } from 'react-native'
import { Overlay, Button } from 'react-native-elements'
import AlertStyles from './AlertStyles'
import { capitalize } from './../../model'

export default Alert = (props) => {
  return (
    <Overlay 
      animationType='fade'
      statusBarTranslucent={true}
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
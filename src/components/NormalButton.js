import React from 'react'
import { Button } from 'react-native-elements';
import * as constants from  './../Constants'

export default NormalButton = (props) => {
  return (
    <Button 
      {...props}
      buttonStyle={{ 
        backgroundColor: constants.BASE_COLOR 
      }}
    />
  )
}
import React from 'react'
import { Button } from 'react-native-elements';
import { BASE_COLOR } from './../consts'

export default NormalButton = (props) => {
  return (
    <Button 
      {...props}
      buttonStyle={{ 
        backgroundColor: BASE_COLOR 
      }}
    />
  )
}
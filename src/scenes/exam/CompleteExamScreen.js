import React, { useEffect } from 'react'
import { Text } from 'react-native'

export default CompleteExamScreen = ({navigation, route}) => {
  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: route.title
    })
  }, [])

  return (
    <Text>Leggo aqui</Text>
  )
}
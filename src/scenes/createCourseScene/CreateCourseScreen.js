import React, { useState, useEffect } from 'react'
import { ScrollView, Text, View, Alert, ActivityIndicator } from 'react-native'
import { 
  NormalButton, NormalInput, EmailInput, PasswordInput, HorizontalBoxes 
} from './../../components'
import CreateCourseStyles from './CreateCourseStyles'
import { BASE_COLOR, USER_INFO } from './../../consts'
import { register, storeData } from './../../model'

export default CreateCourseScreen = ({navigation}) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Course',
    });
  }, []);

  return (
    <View style={CreateCourseStyles.container}>
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        keyboardShouldPersistTaps='always' 
        contentContainerStyle={{ 
          flexGrow: 1, 
          justifyContent: 'center' 
        }}
      >
        <View>
          <NormalInput 
            // onChangeText={(value) => handleChange(value, "name")} 
            placeholder='Name' 
            iconName='user' 
          />
        </View>
        <View>
          <NormalInput 
            // onChangeText={(value) => handleChange(value, "Description")} 
            placeholder='Description' 
            iconName='user' 
            maxLength={300}
          />
        </View>
      </ScrollView>
    </View>
  )
}
import React, { useEffect } from 'react';
import { Text, View, ScrollView } from 'react-native'
import { NormalButton, NormalInput } from './../../components'

export default CreateExamScreen = ({navigation, route}) => {
  // const unit = route.params.unit

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create exam'
    });
  }, []);

  return (
    <View style={{ flex: 1, paddingHorizontal: 20 }}>
      <ScrollView 
        keyboardShouldPersistTaps='always' 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ 
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View style={{ paddingTop: 20 }}>
            <NormalInput 
              label='Title'
              placeholder='Title'
            />
            <NormalInput 
              label='Description'
              placeholder='Description'
            />
            <NormalButton title="Add question"/>
          </View>
          <View style={{ paddingVertical: 20 }}>
            <NormalButton title="Create exam"/>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}
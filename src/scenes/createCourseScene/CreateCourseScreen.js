import React, { useState, useEffect } from 'react'
import { ScrollView, View } from 'react-native'
import { NormalInput } from './../../components'
import CreateCourseStyles from './CreateCourseStyles'

export default CreateCourseScreen = ({navigation}) => {
  const [disableButton, setDisableButton] = useState(true);
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    description: '',
  });

  const handleChange = (value, name) => {
    setBasicInfo({ ...basicInfo, [name]: value });
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create Course',
    });
  }, [])

  useEffect(() => {
    setDisableButton(
      Object.values(basicInfo).some(x => x == null || x == '') 
    );
  }, [basicInfo]);

  const goNext = () => {
    const courseInfo = {
      name: basicInfo.name,
      description: basicInfo.description
    }

    navigation.navigate('CreateCourseSecondScreen', {
      courseInfo: courseInfo
    })
  }

  return (
    <View style={CreateCourseStyles.container}>
      <ScrollView 
        keyboardShouldPersistTaps='always' 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
      <View style={{ 
        flex: 1,
        justifyContent: 'space-between'
      }}>
        <View>
          <View>
            <NormalInput 
              containerStyle={{
                paddingTop: 20,
                height: 110
              }}
              onChangeText={(value) => handleChange(value, "name")} 
              label="Name"
              placeholder='Name' 
            />
          </View>
          <View>
            <NormalInput 
              onChangeText={(value) => handleChange(value, "description")} 
              containerStyle={{ height: 80 }}
              multiline={true}
              numberOfLines={3}
              label='Description'
              placeholder='Description' 
              maxLength={300}
            />
          </View>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <NormalButton 
            disabled={disableButton}
            title='Next' 
            onPress={() => goNext()}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  )
}

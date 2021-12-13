import React, {useEffect, useState} from 'react'
import { View, ScrollView } from 'react-native'
import { NormalButton, NormalInput, Alert } from '../../components'
import CreateUnitStyles from './CreateUnitStyles'

export default CreateUnitScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [disableButton, setDisableButton] = useState(true);
  const [unit, setUnit] = useState({
    name: '',
    videoId: ''
  });
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  });
  const [error, setError] = useState(false);

  const handleChange = (value, name) => {
    setUnit({ ...unit, [name]: value });
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create unit'
    });
  }, []);

  useEffect(() => {
    setDisableButton(
      Object.values(unit).some(x => x == null || x == '')
    );
  }, [unit]);

  const createUnit = () => {
    if (error) {
      setVisible(true)
      return
    }
    const courseInfo = {
      ...course,
      units: course.units.concat([unit]),
    }
    console.log(courseInfo);

    navigation.navigate('EditCourseScreen', {
      course: courseInfo
    })
  }

  return (
    <View style={CreateUnitStyles.container}>
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
              containerStyle={{
                paddingTop: 20,
                height: 110
              }}
              onChangeText={(url) => {
                var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                var match = url.match(regExp);
                if (match && match[2].length == 11) {
                  handleChange(match[2], "videoId")
                  setError(false)
                } else {
                  setAlertInfo({
                    title: "Error",
                    msg: 'Invalid video link'
                  })
                  handleChange(url, "videoId")
                  setError(true)
                }
              }} 
              label="Video link"
              placeholder='Video' 
            />
          </View>
        </View>
        <View style={{ paddingBottom: 10 }}>
          <NormalButton 
            disabled={disableButton}
            title='Create unit' 
            onPress={() => createUnit()}
          />
        </View>
      </View>
      <Alert 
        isVisible={visible}
        alertInfo={alertInfo}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
      </ScrollView>
    </View>
  )
}
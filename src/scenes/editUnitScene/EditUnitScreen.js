import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView } from 'react-native'
import { NormalButton, NormalInput, Alert } from '../../components'

export default EditUnitScreen = ({route, navigation}) => {
  const oldUnit = route.params.unit;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create unit'
    });
  }, []);

  const [disableButton, setDisableButton] = useState(true);
  const [unit, setUnit] = useState({
    name: oldUnit.name,
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
    setDisableButton(
      Object.values(unit).some(x => x == null || x == '')
    );
  }, [unit]);

  const save = () => {
    if (error) {
      setVisible(true);
      return
    }

    navigation.navigate('EditCourseScreen', {
      newUnit: {
        ...oldUnit,
        name: unit.name,
        content: {
          videoId: unit.videoId
        }
      },
      newUnitNumber: route.params.number
    })
  }

  return (
    <View style={{ flex:1 ,paddingHorizontal: 20}}>
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
              value={unit.name}
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
            title='Save' 
            onPress={() => save()}
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
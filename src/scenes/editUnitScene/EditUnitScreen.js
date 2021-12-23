import React, {useEffect, useState, useRef} from 'react'
import { Text, View, ScrollView } from 'react-native'
import { NormalButton, NormalInput, Alert, HorizontalBoxes } from '../../components'
import { UNIT_TYPES, BASE_COLOR } from '../../consts'
import { validateUrl, getVideoId } from './../../model'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'

export default EditUnitScreen = ({route, navigation}) => {
  const oldUnit = route.params.unit;
  const RichText = useRef();

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Create unit'
    });
  }, []);

  const [disableButton, setDisableButton] = useState(true);
  const [unit, setUnit] = useState({
    ...oldUnit,
    content: {
      videoId: '',
      text: ''
    }
  });
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  });

  const handleChange = (value, name) => {
    setUnit({ ...unit, [name]: value });
  }

  useEffect(() => {
    setDisableButton(
      unit.name == '' || unit.contentType == '' ||
      (unit.contentType == 'TEXT' && unit.content.text == '') ||
      (unit.contentType == 'VIDEO' && unit.content.videoId == '')
    );
  }, [unit]);

  const save = () => {
    if (unit.contentType == 'VIDEO') {
      if (!validateUrl(unit.content.videoId)) {
        setAlertInfo({
          title: "Error",
          msg: 'Invalid video link'
        })
  
        setVisible(true)
      } else {
        const now = new Date(Date.now());
        const newUnit = {
          ...unit,
          content: {
            videoId: getVideoId(unit.content.videoId)
          },
          lastModificationDate: now.toISOString(),
        }
        navigation.navigate('EditCourseScreen', {
          newUnit: newUnit,
          newUnitNumber: route.params.number
        })
      }
      return
    }

    const now = new Date(Date.now());
    const newUnit = {
      ...unit,
      content: {
        text: unit.content.text
      },
      lastModificationDate: now.toISOString(),
    }

    navigation.navigate('EditCourseScreen', {
      newUnit: newUnit,
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
          <Text style={{
            paddingLeft: 10, 
            color: 'gray', 
            fontWeight: 'bold',
            fontSize: 16
          }}>Type</Text>
          <HorizontalBoxes 
            options={UNIT_TYPES} 
            value={unit.contentType}
            onChange={(value) => {
              RichText.current?.blurContentEditor();
              handleChange(value.toUpperCase(), 'contentType');
            }}
          />
          {
            unit.contentType != '' &&
            (
              unit.contentType == UNIT_TYPES[0] ?
              <View>
                <Text style={{
                  paddingLeft: 10, 
                  color: 'gray', 
                  fontWeight: 'bold',
                  fontSize: 16
                }}>Text</Text>
                <RichEditor
                  ref={RichText}
                  initialContentHTML={unit.content.text}
                  placeholder={"Start Writing Here"}
                  onChange={(text) => handleChange({...unit.content, text: text}, 'content')}
                />
                <RichToolbar 
                  editor={RichText}
                  actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.insertBulletsList,
                    actions.insertOrderedList,
                    actions.setUnderline,
                    actions.undo,
                    actions.redo,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight
                  ]}
                  selectedIconTint={BASE_COLOR}
                />
              </View>
              :
              <View>
                <NormalInput 
                  containerStyle={{
                    paddingTop: 20,
                    height: 110
                  }}
                  onChangeText={(url) => handleChange({...unit.content, videoId: url}, "content")} 
                  label="Video link"
                  placeholder='Video' 
                />
              </View>
            )
          }
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
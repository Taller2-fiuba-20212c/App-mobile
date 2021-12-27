import React, {useEffect, useState, useRef} from 'react'
import { View, ScrollView, Text, ActivityIndicator } from 'react-native'
import { NormalButton, NormalInput, Alert, HorizontalBoxes } from '../../components'
import { UNIT_TYPES, BASE_COLOR } from '../../consts'
import { addUnit, validateUrl, getVideoId } from './../../model'
import { RichEditor, RichToolbar, actions } from 'react-native-pell-rich-editor'
import CreateUnitStyles from './CreateUnitStyles'

export default CreateUnitScreen = ({route, navigation}) => {
  const RichText = useRef();
  const [loading, setLoading] = useState(false);
  const [disableButton, setDisableButton] = useState(true);
  const [unit, setUnit] = useState({
    name: '',
    contentType: '',
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
    navigation.setOptions({
      headerShown: true,
      title: 'Create unit'
    });
  }, []);

  useEffect(() => {
    setDisableButton(
      Object.values(unit).some(x => x == null || x == '') || 
      (unit.contentType == 'TEXT' && unit.content.text == '') ||
      (unit.contentType == 'VIDEO' && unit.content.videoId == '')
    );
  }, [unit]);

  const createUnit = () => {
    setLoading(true)
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
          creatorId: route.params.creatorId,
          creationDate: now.toISOString(),
          lastModificationDate: now.toISOString(),
        }
        
        addUnit(route.params.courseId, newUnit).then((r) => {
          setLoading(false);
          navigation.navigate('CourseScreen', {
            course: r
          })
        }).catch((err) => console.error(err.response));
      }
      return
    }

    const now = new Date(Date.now());
    const newUnit = {
      ...unit,
      content: {
        text: unit.content.text
      },
      creatorId: route.params.creatorId,
      creationDate: now.toISOString(),
      lastModificationDate: now.toISOString(),
    }
    addUnit(route.params.courseId, newUnit).then((r) => {
      setLoading(false);
      navigation.navigate('CourseScreen', {
        course: r
      })
    }).catch((err) => console.error(err.response));
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
          <Text style={{
            paddingLeft: 10, 
            color: 'gray', 
            fontWeight: 'bold',
            fontSize: 16
          }}>Type</Text>
          <HorizontalBoxes 
            options={UNIT_TYPES} 
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
                }}>Content</Text>
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
                  value={unit.content.videoId}
                  onChangeText={(url) => handleChange({...unit.content, videoId: url}, "content")} 
                  label="Video link"
                  placeholder='Video' 
                />
              </View>
            )
          }
        </View>
        <View style={{ paddingVertical: 10 }}>
        { 
          loading ? 
          <ActivityIndicator size="large" color={BASE_COLOR} />
          :
          <NormalButton 
            disabled={disableButton}
            title='Create unit' 
            onPress={() => createUnit()}
          />
          }
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
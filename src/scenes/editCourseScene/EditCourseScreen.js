import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, FAB, Icon, Switch } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { NormalButton, NormalInput, AccordionListItem, Alert, MultiSelect } from '../../components'
import { 
  BASE_COLOR, NORMAL_ERROR_TITLE, DEFAULT_IMG, 
  WIDTH_SCREEN, MAX_UNITS, SUBCRIPTIONS_TYPES, CATEGORIES_TYPES
} from '../../consts'
import { getErrorPermissionMsg, getCourse, updateCourse } from '../../model'
import EditCourseStyles from './EditCourseStyles'
import TagInput from 'react-native-tags-input';

export default EditCourseScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
  })
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })

  const [newCourse, setNewCourse] = useState(route.params.course);

  useEffect(() => {
    if (route.params?.newUnit) {
      let units = newCourse.units.slice();
      units[route.params.newUnitNumber] = route.params.newUnit
      setNewCourse({
        ...newCourse,
        units: units
      })
    }

    if (route.params?.course) {
      navigation.setOptions({
        headerShown: true,
        title: 'Edit course'
      });
  
      setNewCourse(route.params.course);
      setTags({
        tag: '',
        tagsArray: route.params.course.tags
      })
      setLoading(false)
    }
  }, [route.params]);

  useEffect(() => {
    setDisabled(
      tags.tagsArray.length == 0
      ||
      newCourse.name == '' 
      || 
      newCourse.description == ''
    )
  }, [newCourse, tags])

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: newCourse.units
    })
  }

  const saveChanges = () => {
    setSaving(true)
    updateCourse({
      ...newCourse,
      tags: tags.tagsArray,
    })
    .then(r => {
      setSaving(false)
      console.log(r)
      navigation.navigate('CourseScreen', {
        course: {
          ...newCourse, 
          tags: tags.tagsArray,
        },
      })
    })
    .catch(err => {
      console.error(err.response)
      setSaving(false)
    })
  }

  const handleChange = (value, name) => {
    setNewCourse({ ...newCourse, [name]: value });
  };

  const changeImg = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          setAlertInfo({ 
            title: NORMAL_ERROR_TITLE, 
            msg: getErrorPermissionMsg('camera roll permissions', 'change this image')
          })
          setVisible(true)
          return
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        base64: true,
      });
  
      if (!result.cancelled) {
        handleChange(
          'data:image/png;base64,' + result.base64, 
          'image'
        )
      }
    })();
  }

  const handlePublish = () => {
    if (newCourse.units.length > 0) {
      handleChange(!newCourse.published, 'published')
    } else {
      setAlertInfo({
        title: NORMAL_ERROR_TITLE, 
        msg: getErrorPermissionMsg('at least 1 unit created', 'publish any course')
      })
      setVisible(true)
    }
  }

	return (
    <View style={{flex: 1}}>
    {
      loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
          <View style={EditCourseStyles.container}>
            <View>
            <Image 
              style={{
                resizeMode: 'stretch',
                width: WIDTH_SCREEN,
                height: Math.round(WIDTH_SCREEN * 0.5),
              }} 
              source={newCourse.image ? {uri: newCourse.image} : DEFAULT_IMG}
            />
            <View style={{
                position: 'absolute',
                top: Math.round(WIDTH_SCREEN * 0.5) - 56/2,
                left: WIDTH_SCREEN - 56,
              }}>
                <FAB 
                  onPress={() => changeImg()}
                  icon={
                    <Icon 
                      name='edit'
                      size={24}
                      type='font-awesome'
                      color={'white'}
                    />
                  }
                  color={BASE_COLOR}
                />
              </View>
            </View>
            <View style={{ paddingHorizontal: 20 }}>
              <View style={{ paddingTop: 10 }}>
                <Text style={EditCourseStyles.section}>Title</Text>
              </View>
              <NormalInput 
                placeholder='Title' 
                value={newCourse.name} 
                onChangeText={(value) => handleChange(value, "name")} 
              />
              <View>
                <Text style={EditCourseStyles.section}>About</Text>
              </View>
              <NormalInput 
                placeholder='Description' 
                multiline={true}
                numberOfLines={3}
                value={newCourse.description} 
                onChangeText={(value) => handleChange(value, "description")} 
              />
              {
                newCourse.units.length != 0 &&
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={EditCourseStyles.section}>Content</Text>
                </View>
              }
              {
                <View>
                  <View>
                    {
                      newCourse.units.slice(0, MAX_UNITS).map((u, i) => (
                        <AccordionListItem 
                          navigation={navigation} 
                          item={u} 
                          key={i} 
                          number={i} 
                          edit={true}
                        />
                      ))
                    }
                  </View>
                  {
                    newCourse.units.length > MAX_UNITS ? 
                    <View style={EditCourseStyles.contentCourseButton}>
                      <NormalButton onPress={() => watchContentCourse()} title='Show all'/>
                    </View>
                    : 
                    null
                  }
                </View>
              }
              <View style={{paddingTop: newCourse.units.length != 0 ? 20 : 0}} >
                <Text style={EditCourseStyles.section}>Subscription included</Text>
              </View>
              <View style={{ paddingHorizontal: 10 }} >
                <MultiSelect 
                  options={SUBCRIPTIONS_TYPES} 
                  placeholder='Select a subscription' 
                  value={newCourse.suscriptionIncluded[newCourse.suscriptionIncluded.length - 1]}
                  onChange={(value) => 
                    handleChange(
                      SUBCRIPTIONS_TYPES.filter((u, i) => 
                        i <= SUBCRIPTIONS_TYPES.indexOf(value)
                      ), 
                      'suscriptionIncluded'
                    )
                  }
                />
              </View>
              <View style={{paddingTop: 20}} >
                <Text style={EditCourseStyles.section}>Category</Text>
              </View>
              <View style={{ paddingHorizontal: 10 }} >
                <MultiSelect 
                  options={CATEGORIES_TYPES} 
                  placeholder='Select a category' 
                  value={newCourse.category}
                  onChange={(value) => handleChange(value, 'category')}
                />
              </View>
              <View style={{paddingTop: 20}} >
                <Text style={EditCourseStyles.section}>Associated hashtags</Text>
              </View>
              <View>
                <TagInput
                  updateState={setTags}
                  placeholder="Space to add tags..." 
                  tags={tags}
                  labelStyle={{
                    color: 'gray',
                    fontWeight: 'bold',
                    fontSize: 16,
                    paddingBottom: 5,
                  }}
                  inputContainerStyle={{
                    borderBottomColor: 'gray',
                    borderBottomWidth: 1,
                  }}
                  containerStyle={{
                    paddingBottom: 10, 
                  }}
                  tagStyle={{
                    backgroundColor: BASE_COLOR,
                    height: 30,
                    borderRadius: 20,
                  }}
                  tagTextStyle={{
                    color:'white',
                    fontSize: 16,
                    marginRight: 15
                  }}
                  deleteElement={
                    <Icon 
                      name="closecircleo" 
                      color='white'
                      type='antdesign'
                      size={19}
                    />
                  }
                  leftElement={
                    <Icon 
                      name={'tag-multiple'} 
                      type={'material-community'} 
                      color={BASE_COLOR}
                      size={24}
                    />
                  }
                  leftElementContainerStyle={{marginLeft: 0}}
                />
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <View>
                  <Text style={EditCourseStyles.section}>Publish</Text>
                </View>
                <Switch value={newCourse.published} color={BASE_COLOR} onChange={() => handlePublish()}/>
              </View>
              {
                saving ?
                <ActivityIndicator size="large" color={BASE_COLOR} />
                :
                <View style={{ paddingTop: 10, paddingBottom: 20 }}>
                  <NormalButton disabled={disabled} title='Save' onPress={() => saveChanges()} />
                </View>
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
      }
    </View>
	)
}
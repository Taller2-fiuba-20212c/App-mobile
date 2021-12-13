import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView } from 'react-native'
import { Image, FAB, Icon, Switch } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { NormalButton, NormalInput, AccordionListItem, Alert, MultiSelect } from '../../components'
import { 
  BASE_COLOR, NORMAL_ERROR_TITLE, DEFAULT_IMG, 
  WIDTH_SCREEN, MAX_UNITS, SUBCRIPTIONS_TYPES, CATEGORIES_TYPES
} from '../../consts'
import { getErrorPermissionMsg } from '../../model'
import EditCourseStyles from './EditCourseStyles'
import TagInput from 'react-native-tags-input';

export default EditCourseScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [image, setImage] = useState(
    course.imgsrc ? {uri: course.imgsrc} : DEFAULT_IMG
  );

  const [disabled, setDisabled] = useState(false)

  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })

  const [newCourse, setNewCourse] = useState({
    name: course.name,
    description: course.description,
    subscriptionIncluded: course.subscriptionIncluded,
    category: course.category
  });
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: course.tags
  })
  const [isPublish, setIsPublish] = useState(!(course.publish == null))

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit course'
    });
  }, []);

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
      content: course.units
    })
  }

  const saveChanges = () => {
    // put to endpoint
    const c = {
      ...course,
      imgsrc: image.uri,
      description: newCourse.description,
      name: newCourse.name,
      tags: tags.tagsArray,
      subscriptionIncluded: newCourse.subscriptionIncluded,
      category: newCourse.category,
      published: isPublish
    }

    console.log(c)

    navigation.navigate('CourseScreen', {
      course: {...c},
      isOwner: true
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
        setImage({uri: 'data:image/png;base64,' + result.base64});
      }
    })();
  }

  const createUnit = () => {
    navigation.navigate('CreateUnitScreen', {
      course: {
        ...course,
        imgsrc: image.uri,
        name: newCourse.name,
        description: newCourse.description,
        tags: tags.tagsArray,
        subscriptionIncluded: newCourse.subscriptionIncluded,
        category: newCourse.category,
        published: isPublish
      }
    })
  }

  const createExam = () => {
    navigation.navigate('CreateExamScreen', {
      course: {
        ...course,
        imgsrc: image.uri,
        description: newCourse.description,
        tags: tags.tagsArray,
        name: newCourse.name,
        subscriptionIncluded: newCourse.subscriptionIncluded,
        category: newCourse.category,
        published: isPublish
      }
    })
  }

  const handlePublish = () => {
    if (course.units.length > 0) {
      setIsPublish(!isPublish)
    } else {
      setAlertInfo({
        title: NORMAL_ERROR_TITLE, 
        msg: getErrorPermissionMsg('at least 1 unit created', 'publish any course')
      })
      setVisible(true)
    }
  }

	return (
    <ScrollView keyboardShouldPersistTaps='always' showsVerticalScrollIndicator={false}>
      <View style={EditCourseStyles.container}>
        <View>
        <Image 
          style={{
            resizeMode: 'stretch',
            width: WIDTH_SCREEN,
            height: Math.round(WIDTH_SCREEN * 0.5),
          }} 
          source={image}
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
            value={newCourse.description} 
            onChangeText={(value) => handleChange(value, "description")} 
          />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={EditCourseStyles.section}>Content</Text>
            <View style={{ flexDirection: 'row' }}>
              <View style={{ marginRight: 10 }} >
                <NormalButton title='Add Unit' onPress={() => createUnit()}/>
              </View>
              <NormalButton title='Add Exam' onPress={() => createExam()}/> 
            </View>
          </View>
          {
            <View>
              <View>
                {
                  course.units.slice(0, MAX_UNITS).map((u, i) => (
                    <AccordionListItem item={u} key={i} number={i} />
                  ))
                }
              </View>
              {
                course.units.length > MAX_UNITS ? 
                <View style={EditCourseStyles.contentCourseButton}>
                  <NormalButton onPress={() => watchContentCourse()} title='Show all'/>
                </View>
                : 
                null
              }
            </View>
          }
          <View style={{paddingTop: 20}} >
            <Text style={EditCourseStyles.section}>Subscription included</Text>
          </View>
          <View style={{ paddingHorizontal: 10 }} >
            <MultiSelect 
              options={SUBCRIPTIONS_TYPES} 
              placeholder='Select a subscription' 
              value={newCourse.subscriptionIncluded}
              onChange={(value) => handleChange(value, 'subscriptionIncluded')}
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
            <Switch value={isPublish} color={BASE_COLOR} onChange={() => handlePublish()}/>
          </View>
          <View style={{ paddingTop: 10, paddingBottom: 20 }}>
            <NormalButton disabled={disabled} title='Save' onPress={() => saveChanges()} />
          </View>
        </View>
      </View>
      <Alert 
        isVisible={visible}
        alertInfo={alertInfo}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
    </ScrollView>
	)
}
import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Image, FAB, Icon } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import { NormalButton, AccordionListItem, Alert } from '../../components'
import { BASE_COLOR, NORMAL_ERROR_TITLE, DEFAULT_IMG, WIDTH_SCREEN, MAX_UNITS, USER_INFO } from '../../consts'
import { getErrorPermissionMsg } from '../../model'
import { getUser, getData } from '../../model'
import EditCourseStyles from './EditCourseStyles'

export default EditCourseScreen = ({route, navigation}) => {
  const course = route.params.course;
  const [creator, setCreator] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [image, setImage] = useState(
    course.imgsrc ? course.imgsrc : DEFAULT_IMG
  );
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Edit course'
    });
    getUser(course.creatorId).then((r) => {
      setCreator(r);
    });
    getData(USER_INFO).then((user) => {
      user.uid == course.creatorId ?
      setIsOwner(true) :
      setIsOwner(false)
    })
  }, []);

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: course.units
    })
  }

  const changeImg = async () => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          setVisible(true)
          return
        }
      }
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
  
      if (!result.cancelled) {
        setImage({...image, uri: result.uri});
      }
    })();
  }

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
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
        <View style={EditCourseStyles.text}>
          <Text style={EditCourseStyles.section}>About</Text>
        </View>
        <View style={EditCourseStyles.text}>
          <Text style={EditCourseStyles.description}>{course.description}</Text>
        </View>
        {
          course.units && 
          <View>
            <View style={EditCourseStyles.text}>
              <Text style={EditCourseStyles.section}>Content</Text>
            </View>
            <View>
              {
                course.units.slice(0, MAX_UNITS).map((u, i) => (
                  <AccordionListItem navigation={navigation} item={u} key={i} number={i} />
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
      </View>
      <Alert 
        isVisible={visible}
        alertInfo={{ title: NORMAL_ERROR_TITLE, msg: getErrorPermissionMsg('camera roll', 'change this image')}}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
    </ScrollView>
	)
}
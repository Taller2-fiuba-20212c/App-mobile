import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator } from 'react-native'
import { NormalInput, Alert } from './../../components'
import { BASE_COLOR, USER_INFO, NORMAL_ERROR_TITLE } from '../../consts'
import { getPlace, getData, getErrorPermissionMsg, createCourse } from './../../model'
import { Icon } from 'react-native-elements'
import TagInput from 'react-native-tags-input';
import CreateCourseStyles from './CreateCourseStyles'

export default CreateCourseScreen = ({navigation, route}) => {
  const [place, setPlace] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
  })
  const [creating, setCreating] = useState(false);
  const [creatorId, setCreatorId] = useState('');
  const [loading, setLoading] = useState(true);

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Almost ready!',
    });

    getPlace()
    .then((p) => {
      setPlace(p);
      setLoading(false)
    })
    .catch((err) => {
      console.log(err);
      setVisible(true)
      setLoading(false)
    });

    getData(USER_INFO).then(user => {
      setCreatorId(user.uid)
    })
  }, [])

  useEffect(() => {
    setDisableButton(
      tags.tagsArray.length == 0 || place == null
    );
  }, [place, tags]);

  const handleCreateCourse = () => {
    setCreating(true);
    // post courses
    const courseInfo = {
      ...route.params.courseInfo,
      country: place[0].country,
      tags: tags.tagsArray,
      creatorId: creatorId,
      units: []
    }
    
    console.log(courseInfo)
    createCourse(courseInfo)
    .then(r => console.log(r))
    .catch(e => {
      console.error(e.response)
    })
    setCreating(false);
    // navigation.navigate('CourseScreen', {
    //   course: courseInfo,
    //   isOwner: true
    // })
  }

  return (
    <View style={CreateCourseStyles.container}>
      <ScrollView 
        keyboardShouldPersistTaps='always' 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
      {
        !loading ?
        <View style={{ 
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View>
            <View >
              <NormalInput 
                containerStyle={{paddingTop: 20, height: 100}}
                label={'Country'}
                value={place ? place[0].country : place}
                disabled={true}
                placeholder='Country'
                iconName='location-pin'
              />
            </View>
            <View>
              <TagInput
                updateState={setTags}
                placeholder="Space to add tags..." 
                tags={tags}
                label='Associated hashtags'
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
          </View>
          <View style={{ paddingBottom: 10 }}>
          {
            creating ? 
            <ActivityIndicator size="large" color={BASE_COLOR} />  
            :
            <NormalButton 
              disabled={disableButton}
              title='Create course' 
              onPress={() => handleCreateCourse()}
            />
          }
          </View>
        </View>
        :
        <View style={ExtraInfoStyles.loading}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
      }
      </ScrollView>
      <Alert 
        isVisible={visible}
        alertInfo={{ title: NORMAL_ERROR_TITLE, msg: getErrorPermissionMsg('location permissions', 'create a course')}}
        onBackdropPress={() => setVisible(false)}
        onButtonPress={() => setVisible(false)}
      />
    </View>
  )
}

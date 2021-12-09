import React, { useState, useEffect } from 'react'
import { ScrollView, View, ActivityIndicator, LogBox } from 'react-native'
import { NormalInput, Dropdown } from './../../components'
import { BASE_COLOR } from '../../consts'
import { getPlace } from './../../model'
import { Icon } from 'react-native-elements'
import TagInput from 'react-native-tags-input';
import CreateCourseStyles from './CreateCourseStyles'

export default CreateCourseScreen = ({navigation}) => {
  const [selectedTeams, setSelectedTeams] = useState([])
  const [place, setPlace] = useState(null);
  const [disableButton, setDisableButton] = useState(true);
  const [basicInfo, setBasicInfo] = useState({
    name: '',
    description: '',
  });
  const [tags, setTags] = useState({
    tag: '',
    tagsArray: []
  })

  const handleChange = (value, name) => {
    setBasicInfo({ ...basicInfo, [name]: value });
  }

  useEffect(() => {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    navigation.setOptions({
      headerShown: true,
      title: 'Create Course',
    });
  
    getPlace().then((p) => {
      setPlace(p)
    });
  }, [])

  useEffect(() => {
    setDisableButton(
      Object.values(basicInfo).some(x => x == null || x == '') 
      || 
      selectedTeams.length == 0 
      || 
      place == null
    );
  }, [place, selectedTeams, basicInfo]);

  const createCourse = () => {
    // post courses
    const courseInfo = {
      country: place.country,
      hashtags: selectedTeams.map((i) => {
        return i.item
      }),
      name: basicInfo.name,
      description: basicInfo.description
    }
    console.log(courseInfo);
  }

  return (
    <View style={CreateCourseStyles.container}>
      {
        place ?
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
            <View >
              <NormalInput 
                containerStyle={{paddingTop: 20, height: 110}}
                label={'Country'}
                value={place[0].country}
                disabled={true}
                placeholder='Country'
                iconName='location-pin'
              />
            </View>
            <View>
              <NormalInput 
                containerStyle={{height: 90}}
                onChangeText={(value) => handleChange(value, "name")} 
                label="Name"
                placeholder='Name' 
                iconName='user' 
              />
            </View>
            <View>
              <NormalInput 
                onChangeText={(value) => handleChange(value, "description")} 
                containerStyle={{ height: 80 }}
                label='Description'
                placeholder='Description' 
                iconName='user' 
                maxLength={300}
              />
            </View>
            <View>
              <TagInput
                updateState={setTags}
                placeholder="Tags..." 
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
            <View style={{ paddingHorizontal: 10 }}>
              <Dropdown 
                label='Associated hashtags' 
                onChange={(newSelected) => setSelectedTeams(newSelected)} 
              />
            </View>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <NormalButton 
              disabled={disableButton}
              title='Create course' 
              onPress={() => createCourse()}
            />
          </View>
        </View>
        </ScrollView>
        :
        <View style={ExtraInfoStyles.loading}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
      }
    </View>
  )
}

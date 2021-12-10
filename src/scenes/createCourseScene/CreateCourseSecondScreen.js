import React, { useState, useEffect } from 'react'
import { View, ActivityIndicator } from 'react-native'
import { Dropdown } from './../../components'
import { BASE_COLOR, CATEGORIES_TYPES, SUBCRIPTIONS_TYPES } from '../../consts'
import CreateCourseStyles from './CreateCourseStyles'

const categories = CATEGORIES_TYPES.map((c) => {
  return {
    item: c,
    id: c.toUpperCase()
  }
})

const subsLevels = SUBCRIPTIONS_TYPES.map((c) => {
  return {
    item: c,
    id: c.toUpperCase()
  }
})

export default CreateCourseSecondScreen = ({navigation, route}) => {
  const [category, setCategory] = useState({});
  const [subLevel, setSubLevel] = useState({});
  const [disableButton, setDisableButton] = useState(true);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Basic information',
    });
  }, []);

  useEffect(() => {
    setDisableButton(
      Object.values(category).length == 0 ||
      Object.values(subLevel).length == 0
    );
  }, [category, subLevel]);

  const createCourse = () => {
    const courseInfo = {
      ...route.params.courseInfo,
      category: category.item,
      suscriptionIncluded: subLevel.item,
    }
    console.log(courseInfo);

    navigation.navigate('CreateCourseThirdScreen', params={
      courseInfo: courseInfo
    })
  }

  function onChangeCategory() {
    return (val) => setCategory(val)
  }

  function onChangeSubLevel() {
    return (val) => setSubLevel(val)
  }

  return (
    <View style={CreateCourseStyles.container}>
      {
        true ?
        <View style={{ 
          flex: 1,
          justifyContent: 'space-between'
        }}>
          <View>
            <View style={{ 
              paddingHorizontal: 10 ,
              paddingTop: 20
            }}>
              <Dropdown 
                label='Category' 
                value={category}
                options={categories}
                onChange={onChangeCategory()} 
                isMulti={false}
              />
            </View>
            <View style={{ 
              paddingHorizontal: 10 ,
              paddingTop: 20
            }}>
              <Dropdown 
                label='Subcription level' 
                value={subLevel}
                options={subsLevels}
                onChange={onChangeSubLevel()} 
                isMulti={false}
              />
            </View>
          </View>
          <View style={{ paddingBottom: 10 }}>
            <NormalButton 
              disabled={disableButton}
              title='Almost done!' 
              onPress={() => createCourse()}
            />
          </View>
        </View>
        :
        <View style={ExtraInfoStyles.loading}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
      }
    </View>
  )
}

import React, {useLayoutEffect, useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { ShortCardCourse, LongCardCourse } from './../../components'
import { BASE_COLOR, WIDTH_SCREEN, USER_INFO } from './../../consts';
import { getCourses, getData } from './../../model'
import PrincipalStyles from './PrincipalStyles'

const SLIDER_WIDTH = WIDTH_SCREEN;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

const classMock = {
  videoID: 'TFBfUorLbss',
  name: 'class name'
}

const unit = {
  name: 'unit name',
  // #PDFS, TEXT or VIDEO,
  contentType: 'content type',
  // #Video: {videoId: xxx},
  // #Text: {text: xxx},
  // #PDFs: {fileId: xxx},
  content: [classMock, classMock, classMock, classMock],
  creatorId: 'creatorId',
  creationDate: 'ceationDate',
  lastModificationDate: 'lastModificationDate'
}

const courseMock = {
  imgsrc: require('../../../assets/python.jpg'),
  name: 'Course name',
  description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  subType: 'subType',
  tags: ['Tag1', 'Tag2', 'Tag3', 'Tag4'],
  units: [unit, unit, unit, unit, unit, unit, unit, unit, unit, unit, unit, unit, unit],
  exams: ['Exam1', 'Exam2', 'Exam3', 'Exam4'],
  // consults: List[Consult] = [],
  teachers: ['Teacher1', 'Teacher2', 'Teacher3'],
  colaborators: ['Colaborator1', 'Colaborator2', 'Colaborator3'],
  students: ['Student1', 'Student2', 'Student3'],
  creatorId: 'CreatorID',
  creationDate: 'ceationDate',
  lastModificationDate: 'lastModificationDate'
}

// const courses = [
//   courseMock, courseMock, courseMock, courseMock, courseMock
// ]

export default PrincipalScreen = ({navigation}) => {
  const [courses, setCourses] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProf, setIsProf] = useState(false)

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Ubademy',
      headerRight: () => (
        <Icon 
          name='chatbubble-ellipses'
          size={24}
          type='ionicon'
          color={BASE_COLOR}
          containerStyle={{
            paddingRight: 20
          }}
        />
      ),
    });
  });

  useEffect(() => {
    getCourses().then((r) => setCourses(r));
    getData(USER_INFO).then((user) => {
      if (user) {
        if (user.role == 'PROFESSOR') {
          setIsProf(true);
        }
      }

      setLoading(false);
    })
    return () => {
      setCourses([]);
    };
  }, [])

  const _renderItem = ({item, index}) => {
    return (
      <View style={{paddingBottom: 5}}>
        <ShortCardCourse navigation={navigation} course={{...item, 'imgsrc': require('../../../assets/python.jpg')}}/>
      </View>
    );
  }

  const goToCreateCourse = () => {
    navigation.navigate('CreateCourseScreen')
  }

	return (
    <View 
      style={{ flex: 1 }}
    >
      {
        loading ? 
        <View style={PrincipalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false} >
        <View style={PrincipalStyles.container}>
          <View style={PrincipalStyles.YourCoursesContainer}>
            <Text style={PrincipalStyles.section}>Your courses</Text>
            {
              isProf ? 
              <NormalButton 
                title="Add course"
                onPress={() => goToCreateCourse()}
              />
              :
              null
            }
          </View>
          {
            courses == null ? 
            <ActivityIndicator size="large" color={BASE_COLOR} />
            :
            <Carousel 
              data={courses} 
              renderItem={_renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            />
          }
          <View style={PrincipalStyles.text}>
            <Text style={PrincipalStyles.section}>Top courses</Text>
          </View>
          <View style={PrincipalStyles.topCourses}>
            {
              courses == null ? 
              <ActivityIndicator size="large" color={BASE_COLOR} />
              :
              courses.map((l, i) => (
                <ListItem 
                  key={i} 
                  containerStyle={{ 
                    padding: 0,
                    paddingVertical: 5
                  }}
                >
                  <ListItem.Content>
                    <LongCardCourse navigation={navigation} course={{...l, 'imgsrc': require('../../../assets/python.jpg')}} />
                  </ListItem.Content>
                </ListItem>
              ))
            }
          </View>
        </View>
        </ScrollView>
      }
    </View>
	)
}
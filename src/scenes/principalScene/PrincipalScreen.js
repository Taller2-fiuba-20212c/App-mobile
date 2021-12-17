import React, {useLayoutEffect, useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { ShortCardCourse, LongCardCourse } from './../../components'
import { BASE_COLOR, WIDTH_SCREEN, USER_INFO } from './../../consts';
import { getCourses, getData, getTop5 } from './../../model'
import PrincipalStyles from './PrincipalStyles'

const SLIDER_WIDTH = WIDTH_SCREEN;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default PrincipalScreen = ({navigation}) => {
  const [courses, setCourses] = useState(null)
  const [top5, setTop5] = useState(null)
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
          onPress={() => navigation.navigate('ChatScreen')}
        />
      ),
    });
  });

  useEffect(() => {
    getTop5()
    .then((r) => {
      setTop5(r)
    })
    .catch((e) => console.log(e.response))

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
        <ShortCardCourse navigation={navigation} course={item}/>
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
              top5 == null ? 
              <ActivityIndicator size="large" color={BASE_COLOR} />
              :
              top5.map((l, i) => (
                <ListItem 
                  key={i} 
                  containerStyle={{ 
                    padding: 0,
                    paddingVertical: 5
                  }}
                >
                  <ListItem.Content>
                    <LongCardCourse navigation={navigation} course={l} />
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
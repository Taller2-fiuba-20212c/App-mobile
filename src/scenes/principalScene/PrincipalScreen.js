import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { ShortCardCourse, LongCardCourse } from './../../components'
import { BASE_COLOR, WIDTH_SCREEN, USER_INFO } from './../../consts';
import { getCourses, getData, getTop5, getRecommendations } from './../../model'
import PrincipalStyles from './PrincipalStyles'
import OfferSubscription from './OfferSubscription'

const SLIDER_WIDTH = WIDTH_SCREEN;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default PrincipalScreen = ({navigation}) => {
  const [courses, setCourses] = useState(null)
  const [top5, setTop5] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProf, setIsProf] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [visible, setVisible] = useState(false);

  const handleSuscriptionOffer = () => {
    setVisible(true)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Ubademy',
      headerRight: () => (
        isUser &&
        <View style={{flexDirection: 'row'}}>
          <Icon 
            name='shopping-cart'
            size={24}
            type='FontAwesome'
            color={BASE_COLOR}
            containerStyle={{
              paddingRight: 20
            }}
            onPress={() => handleSuscriptionOffer()}
          />
          <Icon 
            name='chatbubble-ellipses'
            size={24}
            type='ionicon'
            color={BASE_COLOR}
            containerStyle={{
              paddingRight: 20
            }}
            onPress={() => navigation.navigate("ChatsStack")}
          />
        </View>
      ),
    });
  }, [isUser]);

  const getCoursesNeeded = async () => {
    try {
      setTop5(null);
      setCourses(null);

      const top = await getTop5()
      setTop5(top)

      const c = await getCourses()
      setCourses(c)

      const user = await getData(USER_INFO)
      if (user) {
        setIsProf(user.role == 'PROFESSOR');
        setIsUser(true);
      }
    } catch (e) {
      throw e;
    }
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getCoursesNeeded()
      .then((r) => setLoading(false))
      .catch(e => console.log(e.response))
    });

    return unsubscribe;
  }, [navigation])

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
              data={courses.slice(1).slice(-5)} 
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
        <OfferSubscription 
          isVisible={visible}
          onBackdropPress={() => setVisible(false)}
          onButtonPress={() => setVisible(false)}
        />
        </ScrollView>
      }
    </View>
	)
}
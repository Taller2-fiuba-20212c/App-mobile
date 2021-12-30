import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { ListItem, Icon } from 'react-native-elements'
import Carousel from 'react-native-snap-carousel';
import { ShortCardCourse, LongCardCourse } from './../../components'
import { BASE_COLOR, WIDTH_SCREEN, USER_INFO } from './../../consts';
import { getCourses, getData, storeData, getTop5, unsubscribe } from './../../model'
import PrincipalStyles from './PrincipalStyles'
import OfferSubscription from './OfferSubscription'
import AskUnsubscription from './AskUnsubscription'

const SLIDER_WIDTH = WIDTH_SCREEN;
const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 0.7);

export default PrincipalScreen = ({navigation}) => {
  const [courses, setCourses] = useState(null)
  const [top5, setTop5] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isProf, setIsProf] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [visible, setVisible] = useState(false);
  const [uid, setUid] = useState(null)
  const [userHasSubscription, setUserHasSubscription] = useState(false)

  const [askVisible, setAskVisible] = useState(false)

  const handleSuscriptionOffer = () => {
    setVisible(true)
  }

  const handleUnsubscription = () => {
    setAskVisible(true)
  }

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: 'Ubademy',
      headerRight: () => (
        isUser &&
        <View style={{flexDirection: 'row'}}>
          {
            userHasSubscription ?
            <Icon 
              name='remove-shopping-cart'
              size={24}
              type='MaterialIcons'
              color={BASE_COLOR}
              containerStyle={{
                paddingRight: 20
              }}
              onPress={() => handleUnsubscription()}
            />
            :
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
            
          }
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
  }, [isUser, userHasSubscription]);

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
        setUid(user.uid)
        setUserHasSubscription(user.subscription != undefined)
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
          {
            isUser &&
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
          }
          {
            isUser && 
            (courses == null ? 
            <ActivityIndicator size="large" color={BASE_COLOR} />
            :
            <Carousel 
              data={courses.slice(1).slice(-5)} 
              renderItem={_renderItem}
              sliderWidth={SLIDER_WIDTH}
              itemWidth={ITEM_WIDTH}
            />)
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
          uid={uid}
          onBackdropPress={() => setVisible(false)}
          onButtonPress={() => setVisible(false)}
        />
        <AskUnsubscription
          isVisible={askVisible}
          uid={uid}
          onBackdropPress={() => setAskVisible(false)}
          onButtonPress={() => setAskVisible(false)}
        />
        </ScrollView>
      }
    </View>
	)
}
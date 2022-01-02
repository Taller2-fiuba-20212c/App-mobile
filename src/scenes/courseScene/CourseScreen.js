import React, {useEffect, useState} from 'react'
import { Text, View, ScrollView, ActivityIndicator } from 'react-native'
import { Button, Image, PricingCard, ListItem, Avatar, Icon, Switch } from 'react-native-elements';
import IconB from 'react-native-vector-icons/MaterialCommunityIcons';
import { NormalButton, AccordionListItem, Alert } from '../../components'
import { BASE_COLOR, WIDTH_SCREEN, MAX_UNITS, USER_INFO, SUBCRIPTIONS_TYPES, DEFAULT_IMG, NORMAL_ERROR_TITLE } from '../../consts'
import { getAvatarTitle, capitalize, getErrorPermissionMsg, getUser, getData, subscribeCourse, unsubscribeCourse } from '../../model'
import CourseStyles from './CourseStyles'
import OfferSubscription from './../principalScene/OfferSubscription'

const PRICES = [1,2,3,5]
const COLORS = ['#CD7F32', 'silver', 'gold', '#9AC5DB'] 

export default CourseScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(true)
  const [course, setCourse] = useState(route.params.course);
  const [creator, setCreator] = useState(null);
  const [colaborators, setColaborators] = useState([])
  const [visible, setVisible] = useState(false);
  const [alertInfo, setAlertInfo] = useState({
    title: '',
    msg: ''
  })
  const [userPermission, setUserPermission] = useState({
    owner: false,
    suscripted: false,
    colaborator: false,
  });
  const [uid, setUid] = useState('')
  const [subscribing, setSubscribing] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [userSubscription, setUserSubscription] = useState(null)

  const updatePermissions = (userData, courseData) => {
    setUserPermission({
      ...userPermission, 
      owner: userData.uid == courseData.creatorId,
      suscripted: courseData.students.includes(userData.uid),
      colaborator: courseData.collaborators.includes(userData.uid)
    });

    setUid(userData.uid);
  }

  const buildCollabs = async (collabsId) => {
    try {
      let collabsInfo = []
      for (let c of collabsId) {
        const collabInfo = await getUser(c)
        collabsInfo.push(collabInfo);
      }
      
      return collabsInfo
    } catch (e) {
      console.log(e)
      throw e;
    }
  }

  useEffect(() => {
    if (route.params?.course) {
      setCourse(route.params.course);
      buildCollabs(route.params.course.collaborators).then(r => {
        setColaborators(r);
      })
      .catch(err => console.log(err.response));
      
      getUser(route.params.course.creatorId).then((r) => {
        setCreator(r);
      }).catch(err => console.log(err.response));
      getData(USER_INFO).then((r) => {
        if (!r) {
          return
        }
        setIsUser(true)
        setUserSubscription(r.subscription)
        updatePermissions(r, route.params.course);
        if (r.uid == route.params.course.creatorId) {
          navigation.setOptions({
            headerShown: true,
            headerRight: () => (
              <Icon 
                name='edit'
                size={24}
                type='font-awesome'
                color={BASE_COLOR}
                onPress={() => {
                  navigation.navigate('EditCourseScreen', {
                    course: route.params.course
                  })
                }}
              />
            ),
          })
        }
      })
      setLoading(false)
      navigation.setOptions({
        title: route.params.course.name
      });
    }
  }, [route.params]);

  const watchContentCourse = () => {
    navigation.navigate('ContentCourseScreen', {
      content: course.units,
      userPermission: userPermission,
      cid: course.id,
    })
  }

  const createUnit = () => {
    navigation.navigate('CreateUnitScreen', {
      courseId: course.id,
      creatorId: course.creatorId
    })
  }

  const createExam = () => {
    if (course.units.length == 0) {
      setAlertInfo({
        title: NORMAL_ERROR_TITLE, 
        msg: getErrorPermissionMsg('at least 1 unit created', 'add an exam')
      })

      setVisible(true)
      return
    } else if (course.units.every(u => u.exam)){
      setAlertInfo({
        title: NORMAL_ERROR_TITLE, 
        msg: "There's no more units to add an exam"
      })

      setVisible(true)
      return
    }
    navigation.navigate('CreateExamScreen', {
      courseId: course.id,
      creatorId: course.creatorId,
      unitsNames: course.units.filter(u => u.exam == null).map(u => u.name)
    })
  }

  const handleAddCollaborators = () => {
    navigation.navigate('AddCollaboratorsScreen', {
      cid: course.id,
      collaborators: course.collaborators
    })
  }

  const [offerVisible, setOfferVisible] = useState(false)
  const [errorSubVisible, setErrorSubVisible] = useState(false)

  const handlePressSubscribe = () => {
    if (!isUser) {
      setAlertInfo({
        title: 'Sorry!',
        msg: 'You need an account to subscribe'
      })
      setVisible(true)
      return
    }

    // if (!userSubscription) {
    //   setErrorSubVisible(true)
    //   return
    // }
    
    setSubscribing(true)
    // console.log({...course, image: null, units: []})
    subscribeCourse(course.id, uid)
    .then(r => {
      setSubscribing(false)
      setCourse(r)
      setUserPermission({...userPermission, suscripted: true})
    })
    .catch(err => {
      console.log(err.response)
      setSubscribing(false)
    })
  }

  const [unsubscribing, setUnsubscribing] = useState(false)

  const handlePressUnsubscribe = () => {
    setUnsubscribing(true)
    unsubscribeCourse(course.id, uid)
    .then(r => {
      console.log(r)
      setCourse(r)
      setUserPermission({...userPermission, suscripted: false})
      setUnsubscribing(false)
    })
    .catch(err => {
      console.log(err.response)
      setUnsubscribing(false)
    })
  }

	return (
    <View style={{flex: 1}}>
    {
      loading ?
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <ActivityIndicator size="large" color={BASE_COLOR} />
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={CourseStyles.container}>
            <Image 
              style={{
                resizeMode: 'stretch',
                width: WIDTH_SCREEN,
                height: Math.round(WIDTH_SCREEN * 0.5),
              }} 
              source={
                course.image ? 
                { uri: course.image }
                : 
                DEFAULT_IMG
              }
            />
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>About</Text>
            </View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.description}>{course.description}</Text>
            </View>
            <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={CourseStyles.section}>Content</Text>
              {
                userPermission.owner &&
                <View style={{ flexDirection: 'row' }}>
                  <View style={{ marginRight: 10 }} >
                    <NormalButton title='Add Unit' onPress={() => createUnit()}/>
                  </View>
                  <NormalButton title='Add Exam' onPress={() => createExam()}/> 
                </View>
              }
            </View>
            {
              course.units.length > 0 && 
              <View>
                <View>
                  {
                    course.units.slice(0, MAX_UNITS).map((u, i) => (
                      <AccordionListItem 
                        navigation={navigation} 
                        item={u} 
                        key={i} 
                        number={i} 
                        cid = {course.id}
                        uid = {uid}
                        userPermission={userPermission}
                      />
                    ))
                  }
                </View>
                {
                  course.units.length > MAX_UNITS ? 
                  <View style={CourseStyles.contentCourseButton}>
                    <NormalButton onPress={() => watchContentCourse()} title='Show all'/>
                  </View>
                  : 
                  null
                }
              </View>
            }
            {
              (userPermission.owner || userPermission.colaborator) &&
              <View style={{ paddingHorizontal: 20, paddingTop: 10 }}>
                <NormalButton title='Watch resolved exams' onPress={() => navigation.navigate('ListExamsScreen', { 
                  exams: course.units.filter(u => u.exam != null).map(u => {
                    return {
                      unitName: u.name,
                      exam: u.exam
                    }
                  }),
                  cid: course.id
                })} />
                <View style={{ paddingTop: 10 }}>
                  <NormalButton title='List students' onPress={() => navigation.navigate('ListStudentsScreen', { 
                    cid: course.id
                  })} />
                </View>
              </View>
            }
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Creator</Text>
            </View>
            {
              creator == null ?
              <View>
                <ActivityIndicator size="large" color={BASE_COLOR} />
              </View> 
              :
              <ListItem 
                containerStyle={{paddingHorizontal: 20}}
                onPress={() => {
                  userPermission.owner ?
                  navigation.navigate('ProfileScreen')
                  :
                  navigation.navigate('UserScreen', {userInfo: creator})
                }}
              >
                <Avatar
                  rounded
                  title={getAvatarTitle(creator.name, creator.lastname)}
                  source={creator.image ? { uri: creator.image } : null}
                  containerStyle={{ 
                    backgroundColor: creator.image ? 'white' : BASE_COLOR 
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{creator.name + ' ' + creator.lastname}</ListItem.Title>
                  <ListItem.Subtitle>{capitalize(creator.role)}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron/>
              </ListItem>
            }
            {
              userPermission.owner ?
              <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={CourseStyles.section}>Collaborators</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <NormalButton title='Add Collaborators' onPress={() => handleAddCollaborators()}/>
                  </View>
              </View>
              :
              course.collaborators.length != 0 &&
              <View style={{ paddingHorizontal: 20 }}>
                <Text style={CourseStyles.section}>Collaborators</Text>
              </View>
            }
            {
              course.collaborators.length == colaborators.length ?
              colaborators.map((c,j) => (
                <ListItem 
                  key={j}
                  containerStyle={{paddingHorizontal: 20}}
                  onPress={() => {
                    uid == c.uid ?
                    navigation.navigate('ProfileScreen')
                    :
                    navigation.navigate('UserScreen', {userInfo: c})
                  }}
                >
                  <Avatar
                    rounded
                    title={getAvatarTitle(c.name, c.lastname)}
                    source={c.image ? { uri: c.image } : null}
                    containerStyle={{ 
                      backgroundColor: c.image ? 'white' : BASE_COLOR 
                    }}
                  />
                  <ListItem.Content>
                    <ListItem.Title>{c.name + ' ' + c.lastname}</ListItem.Title>
                    <ListItem.Subtitle>{capitalize(c.role)}</ListItem.Subtitle>
                  </ListItem.Content>
                  <ListItem.Chevron/>
                </ListItem>
              ))
              :
              <ActivityIndicator size="large" color={BASE_COLOR} />
            }
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Country</Text>
            </View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.description}>{course.country}</Text>
            </View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Category</Text>
            </View>
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.description}>{course.category}</Text>
            </View>
            { 
              userPermission.owner &&
              <View>
                <View style={CourseStyles.text}>
                  <Text style={CourseStyles.section}>Subscription included</Text>
                </View>
                <View style={CourseStyles.text}>
                  <Text style={CourseStyles.description}>
                    {course.suscriptionIncluded[course.suscriptionIncluded.length - 1]}
                  </Text>
                </View>
              </View>
            }
            <View style={CourseStyles.text}>
              <Text style={CourseStyles.section}>Tags</Text>
            </View>
            <View style={CourseStyles.text}>
              <View style={{
                display: 'flex',
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
                {
                  course.tags.slice().map((tag, i) => (
                    <View key={i} style={{
                      backgroundColor: BASE_COLOR,
                      borderRadius: 20,
                      marginHorizontal: 5
                    }}>
                      <Text style={{color: 'white', margin: 10}}>{tag}</Text>
                    </View>
                  ))
                }
              </View>
            </View>
            {
              userPermission.owner && 
              <View style={{ 
                paddingHorizontal: 20, 
                flexDirection: 'row', 
                alignItems: 'baseline', 
                justifyContent: 'space-between',
                paddingBottom: 20
              }}>
                <View>
                  <Text style={CourseStyles.section}>Publish</Text>
                </View>
                <Switch value={course.published} color={BASE_COLOR} disabled={true}/>
              </View>
            }
            {
              !userPermission.owner &&
              (
                (userPermission.suscripted && isUser) ?
                (
                  <View style={{ padding: 20 }} >
                  {
                    unsubscribing ? 
                    <ActivityIndicator size="large" color={'red'} />
                    :
                    <Button 
                      title="Unsubscribe" 
                      buttonStyle={{ backgroundColor: 'red' }} 
                      onPress={() => handlePressUnsubscribe()}
                    />
                    }
                  </View>
                )
                :
                <PricingCard
                  color={COLORS[SUBCRIPTIONS_TYPES.indexOf(course.suscriptionIncluded[course.suscriptionIncluded.length - 1])]}
                  title={course.suscriptionIncluded[course.suscriptionIncluded.length - 1]}
                  price={'$' + PRICES[SUBCRIPTIONS_TYPES.indexOf(course.suscriptionIncluded[course.suscriptionIncluded.length - 1])]}
                  info={['Total access', 'Content & Exams']}
                  button={
                    subscribing ?
                    <ActivityIndicator size="large" color={COLORS[SUBCRIPTIONS_TYPES.indexOf(course.suscriptionIncluded[course.suscriptionIncluded.length - 1])]} />
                    :
                    <Button 
                      buttonStyle={{
                        backgroundColor: COLORS[SUBCRIPTIONS_TYPES.indexOf(course.suscriptionIncluded[course.suscriptionIncluded.length - 1])]
                      }}
                      title="SUBSCRIBE" 
                      onPress={() => handlePressSubscribe()}
                      icon={
                        <IconB
                          name="bookshelf" 
                          size={22} 
                          color="white"
                        />
                      }
                    />
                  }
                />
              )
            }
          </View>
          <Alert 
            isVisible={visible}
            alertInfo={alertInfo}
            onBackdropPress={() => setVisible(false)}
            onButtonPress={() => setVisible(false)}
          />
          <Alert 
            isVisible={errorSubVisible}
            alertInfo={{
              title: 'Sorry!',
              msg: "You can't subscribe to this course, Do you want to buy a subscription?"
            }}
            onBackdropPress={() => setErrorSubVisible(false)}
            onButtonPress={() => {
              setOfferVisible(true)
              setErrorSubVisible(false)
            }}
          />
          <OfferSubscription 
            isVisible={offerVisible}
            uid={uid}
            onBackdropPress={() => setOfferVisible(false)}
            onButtonPress={() => setOfferVisible(false)}
          />
        </ScrollView>
      }
    </View>
	)
}
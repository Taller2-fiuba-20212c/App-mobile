import React, {useEffect} from 'react'
import { Text, View, ScrollView, Dimensions } from 'react-native'
import { Image, PricingCard, ListItem } from 'react-native-elements';
import { NormalButton } from './../../components'
import { BASE_COLOR } from './../../consts'
import CourseStyles from './CourseStyles'

const SCREEN_WIDTH = Dimensions.get('window').width;
const ITEM_WIDTH = Math.round(SCREEN_WIDTH * 0.7);

export default CourseScreen = ({route, navigation}) => {
  const course = route.params.course;

  useEffect(() => {
    navigation.setOptions({
      title: course.name,
    });
  });

	return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={CourseStyles.container}>
        <Image 
          style={{
            resizeMode: 'stretch',
            width: SCREEN_WIDTH,
            height: Math.round(SCREEN_WIDTH * 0.5),
          }} 
          source={course.imgsrc}
        />
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>About</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.description}>{course.description}</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.section}>Teachers</Text>
        </View>
        <View style={CourseStyles.text}>
          <Text style={CourseStyles.description}>{course.description}</Text>
        </View>
        <View style={CourseStyles.lessonsButton}>
          <NormalButton title='Lessons'/>
        </View>
        <PricingCard
          color={BASE_COLOR}
          title={course.subType}
          price="$5"
          button={{ title: 'GET STARTED', icon: 'flight-takeoff' }}
        />
      </View>
    </ScrollView>
	)
}
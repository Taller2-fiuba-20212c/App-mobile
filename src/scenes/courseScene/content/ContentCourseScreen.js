import React from 'react';
import { View, ScrollView } from 'react-native'
import { AccordionListItem } from '../../../components'

export default ContentCourseScreen = ({route, navigation}) => {
  const content = route.params.content;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {
          content.map((u, i) => (
            <AccordionListItem navigation={navigation} item={u} key={i} number={i} />
          ))
        }
      </View>
    </ScrollView>
  )
}
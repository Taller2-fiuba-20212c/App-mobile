import React from 'react';
import { View, ScrollView } from 'react-native'
import { AccordionListItem } from './../../../components'

export default ContentCourseScreen = ({route}) => {
  const content = route.params.content;

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        {
          content.map((u, i) => (
            <AccordionListItem item={u} key={i} number={i} />
          ))
        }
      </View>
    </ScrollView>
  )
}
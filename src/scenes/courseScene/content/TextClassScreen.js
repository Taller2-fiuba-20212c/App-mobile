import React, { useEffect } from 'react';
import { View } from 'react-native'
import { WIDTH_SCREEN } from './../../../consts'
import RenderHtml from 'react-native-render-html';

export default TextClassScreen = ({ navigation, route }) => {

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: route.params.title
    });
  }, []);

  return (
    <View style={{paddingHorizontal: 20, paddingTop: 20}}>
      <RenderHtml
        contentWidth={WIDTH_SCREEN}
        source={{html: route.params.text}}
      />
    </View>
  )
}
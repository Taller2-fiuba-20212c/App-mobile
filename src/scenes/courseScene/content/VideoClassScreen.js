import React, {useEffect} from 'react';
import { View, Text } from 'react-native'
import { WIDTH_SCREEN } from './../../../consts'
import { YoutubeVideo } from './../../../components'

export default VideoClassScreen = ({navigation, route}) => {
  const videoId = route.params.unit.videoId;
  const title = route.params.unit.name;

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      title: title
    });
  }, []);

  return (
    <View 
      style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
    >
      <YoutubeVideo 
        height={WIDTH_SCREEN*0.56}
        width={WIDTH_SCREEN}
        videoId={videoId}
      />
    </View>
  )
}
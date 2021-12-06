import React from 'react';
import { View } from 'react-native'
import YoutubePlayer from "react-native-youtube-iframe";
import { WIDTH_SCREEN, WINDOW_HEIGHT } from '../../../consts'

export default VideoClassScreen = ({route}) => {
  const videoID = route.params.videoID;

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <YoutubePlayer 
        height={WINDOW_HEIGHT*0.40}
        width={WIDTH_SCREEN}
        videoId={videoID}
        play={true}
      />
    </View>
  )
}
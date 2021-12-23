import React, { useRef, useState, useEffect } from 'react';
import { ActivityIndicator, AppState, StyleSheet, View } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import { BASE_COLOR } from '../../consts';
import YoutubePreview from './YoutubePreview';

export default function YoutubeVideo({ videoId, height, width }) {
  const appState = useRef(AppState.currentState);
  const [ready, setReady] = useState(false);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    AppState.addEventListener("change", handleAppStateChange);

    return () => {
      AppState.removeEventListener("change", handleAppStateChange);
    }
  }, []);

  const handleAppStateChange = (nextAppState) => {
    if (appState.current == "active") {
      setPlaying(false);
    } 
  }

  return (
    <>
      <YoutubePlayer
        videoId={videoId}
        play={playing}
        height={ready ? height : 0}
        width={ready ? width : 0}
        onError={e => console.log(e)}
        onReady={() => setReady(true)}
        forceAndroidAutoplay={true}
      />
      {!ready && 
        <View style={styles.loadingContainer}>
          <ActivityIndicator style={styles.loadingSpinner} size='large' color={BASE_COLOR} />
          <YoutubePreview videoId={videoId} height={height} width={width} blurRadius={1} />
        </View>
      }
    </>
  )
}

const styles = StyleSheet.create({
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  loadingSpinner: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10
  }
})
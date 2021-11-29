import React from 'react';
import { Image } from 'react-native';

export default function YoutubePreview(props) {
  const DEFAULT_WIDTH = 160;
  const DEFAULT_HEIGHT = 300;
  const componentStyle = props.style || {};

  return (
    <Image 
      {...props}
      source={{ uri: `https://img.youtube.com/vi/${props.videoId}/0.jpg` }} 
      style={{ ...{ width: props.width || DEFAULT_WIDTH, height: props.height || DEFAULT_HEIGHT }, ...componentStyle }}
    />
  )
}
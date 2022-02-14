import React from 'react';
import {
  View,
  StyleSheet
} from 'react-native';
import styled from 'styled-components/native';
import Video from 'react-native-video';

class RNVideo extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: '#131313'
        }}
      >
        <Video 
          source={require('../../../../static/home_bg.mp4')}
          repeat
          resizeMode="cover"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
          }}
        />
      </View>
    );
  }
}

export default RNVideo;
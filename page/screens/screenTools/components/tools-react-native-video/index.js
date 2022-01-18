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
          style={{
            width: '100%',
            height: '100%'
          }}
        />
      </View>
    );
  }
}

export default RNVideo;
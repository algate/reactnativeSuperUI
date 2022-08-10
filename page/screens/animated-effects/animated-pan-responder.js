import React from 'react';
import {
  View
} from 'react-native';
import Video from 'react-native-video';
import { appStackNavigationOptions } from '../../config/navigation';

class AnimatedPanResponder extends React.Component {
  static options = appStackNavigationOptions(({ route }) => ({
    title: '日历',
    float: true
  }));

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
          source={require('../../static/hahaha.mp4')}
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

export default AnimatedPanResponder;
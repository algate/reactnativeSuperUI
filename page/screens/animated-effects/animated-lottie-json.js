import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Button,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaView
} from 'react-native';

// 加载Json动画
import LottieView from 'lottie-react-native';
// const GuideJson = require('../../static/json/B.json');
const GuideJson = require('../../static/json/complete.json');

export default ({navigation}) => {
  return <SafeAreaView>
    <LottieView
      style={{
        width: '100%'
      }}
      source={GuideJson}
      autoPlay
      loop={true}
    />
  </SafeAreaView>
}
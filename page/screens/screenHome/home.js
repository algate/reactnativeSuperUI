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

import Echarts from 'react-native-zy-echarts';

export default () => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: false,
        symbolSize: 10,
        symbol: 'circle',
        itemStyle: {
          color: "rgba(24, 167, 139, 1)"
        },
        lineStyle: {
          color: "rgba(3, 3, 3, 1)"
        }
      }
    ]
  };
  return <SafeAreaView>
    <Echarts option={option} height={300} />
  </SafeAreaView>
}
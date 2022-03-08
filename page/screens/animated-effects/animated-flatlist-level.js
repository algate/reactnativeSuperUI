import * as React from 'react';
import {
  StatusBar,
  FlatList,
  Image,
  Animated,
  Text,
  View,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Easing,
  SafeAreaViewBase,
  SafeAreaView
} from 'react-native';
import { system } from '../../config/system';
const { width, height } = system;
import image1 from './../../static/images/1.jpeg'
import image2 from './../../static/images/2.jpeg'
import image3 from './../../static/images/3.jpeg'
import image4 from './../../static/images/4.jpeg'
import image5 from './../../static/images/5.jpeg'
const DATA = [
  image1, image2, image3, image4, image5
]

const imageW = width * 0.7;
const imageH = imageW * 1.54;

export default () => {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  return (
    <View style={{ flex: 1, backgroundColor: '#000'}}>
      <StatusBar hidden/>
      <View style={
        [StyleSheet.absoluteFillObject]
      }>
        {DATA.map((image, index)=>{
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width
          ];
          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0]
          });
          return <Animated.Image
            key={`image-${index}`}
            source={image}
            style={[
              StyleSheet.absoluteFillObject,
              {
                opacity,resizeMode: 'cover',
                height,
                width
              }
            ]}
            blurRadius={10}
          ></Animated.Image>
        })}
      </View>
      <Animated.FlatList 
        data = {DATA}
        onScroll={
          Animated.event(
            [{
              nativeEvent: {contentOffset: {x: scrollX}}
            }],
            { useNativeDriver: true }
          )
        }
        keyExtractor = {(_, index) => index.toString()}
        horizontal
        pagingEnabled
        renderItem={({item}) => {
          return <View style={{
            width, justifyContent: 'center', alignItems: 'center',
            shadowColor: '#000',
            shadowOpacity: 1,
            shadowOffset: {
              width: 0,
              height: 0,
            },
            shadowRadius: 20

          }}>
            <Image source={item} style={{
              width: imageW,
              height: imageH,
              borderRadius: 16,
              resizeMode: 'cover'
            }} />
          </View>
        }}
      ></Animated.FlatList>
    </View>
  )
}
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
  SafeAreaView,
  Alert
} from 'react-native';
import BG_IMG from './../../static/images/1.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
import faker from 'faker';

faker.seed(10);
faker.locale = "zh_CN";

// lottie-json动画，好用的组件收藏，特效动画实例……

const TITLE = [
  'AnimateJsonB', 
  'AnimatedFlatList',
  'AnimatedFlatListLevel',
  'AntPanResponder', 
  'AnimatedGallery', 
  'NetworkOutline'
];
const INTRO = [
  'JSON动画 - lottie',
  '列表滚动动画 - Flatlist',
  '画廊水平滚动动画 - Flatlist',
  '手势滑动动画 - PanResponder',
  '画廊轮播动画 - Flatlist',
  '网络断开链接'
];
const TOOLS = [
  'lottie-react-view;Json;AE',
  'FlatList;Animated',
  'FlatList;Animated',
  'PanResponder;Animated',
  'FlatList;Animated',
  'Network;Reload'
];
const NAVIGATION = [
  'AnimatedLottieJson', 
  'AnimatedFlatList', 
  'AnimatedFlatListLevel', 
  'AnimatedPanResponder', 
  'AnimatedGallery', 
  'NetworkOutline'
];
const SOURCE = [
  '',
  'https://www.bilibili.com/video/BV1Tz4y12739?spm_id_from=333.1007.top_right_bar_window_custom_collection.content.click',
  'https://www.bilibili.com/video/BV1zX4y137vT?spm_id_from=333.999.0.0',
  '',
  'https://www.bilibili.com/video/BV15h411X7R1/?spm_id_from=333.788.recommend_more_video.-1',
  ''
];

const DATA = [...Array(TITLE.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    color: faker.internet.color(),
    title: TITLE[i],
    intro: INTRO[i],
    tools: TOOLS[i],
    navigation: NAVIGATION[i],
    source: SOURCE[i]
  };
})
// const BG_IMG = faker.image.imageUrl();
const SPACING = 15;
const ITEM_SIZE =  113;

export default ({ navigation }) => {
  const scrollY = React.useRef(new Animated.Value(0)).current;
  return <View style={{
    flex: 1, backgroundColor: '#fff'
  }}>
    <Image source={BG_IMG} 
      style={StyleSheet.absoluteFillObject}
      blurRadius={10}
    />
    <Animated.FlatList 
      data={DATA}
      onScroll={Animated.event(
        [{
          nativeEvent: {contentOffset: {y: scrollY}}
        }],
        { useNativeDriver: true }
      )}
      keyExtractor={item => item.key}
      contentContainerStyle={{
        padding: SPACING,
        paddingTop: StatusBar.currentHeight || 42
      }}
      renderItem={({item, index})=>{
        const inputRange = [
          -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 1)
        ];
        const opacityInputRange = [
          -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + .5)
        ];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [
            1, 1, 1, .6
          ]
        })
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [
            1, 1, 1, .6
          ]
        })
        return <Animated.View 
          style={{
            flexDirection: 'row', 
            padding: SPACING, 
            marginBottom: SPACING, 
            backgroundColor: 'rgba(255,255,255, .8)', 
            borderRadius: 12,
            shadowColor: '#000',
            shadowOffset: {
              widht: 0,
              height: 10
            },
            shadowOpacity: .3,
            shadowRadius: 20,
            opacity,
            transform: [{scale}]
          }}
        >
          <TouchableOpacity
            style={{
              flex: 1,
              flexDirection: 'row', 
            }}
            onPress={() => {
              if(item.navigation) {
                // if(item.navigation === 'AnimatedPanResponder') {
                //   Alert.alert('查无此项');
                //   return;
                // }
                navigation.navigate(item.navigation)
              } else {
                Alert.alert('跳转', '没有地址');
              }
            }}
          >
            <View style={{flex: 1}}>
              <Text style={{fontSize: 22, fontWeight: '700'}}>{index+1}. {item.title}</Text>
              <Text style={{fontSize: 18, opacity: .7, marginTop: 10, marginBottom: 8}} 
                numberOfLines={1}
              >{item.intro}</Text>
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {/* 想要换行包一层 - 设置flexWrap */}
                {item.tools.split(';').map((tool) => {
                  return <View key={tool} style={{
                    flexDirection: 'row',
                    padding: 6,
                    backgroundColor: '#70E4FF',
                    borderRadius: 5,
                    alignItems: 'center',
                    marginRight: 6
                  }}>
                    <Ionicons style={{marginRight:4}} name={'pricetags-outline'} size={16} color={'#FF5A5D'} />
                    <Text style={{
                      color: '#333',
                      fontWeight: '500'}}>{tool}</Text>
                  </View>
                })}
              </View>
              {/* 有navigation可以预览，否则无法预览 */}
              {!!item.source && <TouchableOpacity
                style={{flexDirection: 'row', marginTop: 8, justifyContent: 'flex-end', alignItems: 'center'}}
                onPress={()=>{
                  Clipboard.setString(item.source);
                  Toast.show('链接复制成功', {position: Toast.positions.CENTER,});
                }}
              >
                <Ionicons name={'link'} size={20} color={'#396'} />
                <Text style={{
                  color: '#396',
                  marginLeft: 6,
                  fontWeight: '500'
                }}>{'特效外部连接'}</Text>
              </TouchableOpacity>}
            </View>
          </TouchableOpacity>
        </Animated.View>
      }}>
    </Animated.FlatList>
  </View>
}
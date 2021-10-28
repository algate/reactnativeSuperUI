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
const { width, height } = Dimensions.get('screen');
import BG_IMG from './../../static/images/1.jpeg';
import Ionicons from 'react-native-vector-icons/Ionicons';
import faker from 'faker';

faker.seed(10);
faker.locale = "zh_CN";

// lottie-json动画，好用的组件收藏，特效动画实例……

const TITLE = ['RN组件库工具箱','AnimateJsonB', 'AnimatedFlatList', 'AntPanResponder', 'AnimatedGallery'];
const INTRO = [
  '组件工具箱 - Tools',
  'JSON动画 - lottie',
  '列表滚动动画 - Flatlist',
  '手势滑动动画 - PanResponder',
  '画廊轮播动画 - Flatlist'
];
const NPM = [
  'https://www.npmjs.com/package/lottie-react-native',
  'https://space.bilibili.com/53564048?spm_id_from=333.788.b_765f7570696e666f.2',
  '',
  'forbid'
]; 
const TOOLS = [
  'node_modules;components',
  'lottie-react-view;Json;AE',
  'FlatList;Animated',
  'PanResponder;Animated',
  'FlatList;Animated'
];
// const NAVIGATION = ['AnimatedLottieJson', 'AnimatedFlatList', 'AnimatedHomeGuide', 'AnimatedGallery'];
const NAVIGATION = ['ComponentsTools', 'AnimatedLottieJson', 'AnimatedFlatList', '', 'AnimatedGallery'];

const DATA = [...Array(TITLE.length).keys()].map((_, i) => {
  return {
    key: faker.datatype.uuid(),
    image: faker.image.avatar(),
    
    color: faker.internet.color(),
    title: TITLE[i],
    intro: INTRO[i],
    npm: NPM[i],
    tools: TOOLS[i],
    navigation: NAVIGATION[i]
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
                navigation.navigate(item.navigation)
              } else {
                if(item.npm === 'forbid') {
                  Alert.alert('此项禁止访问');
                  return;
                }
                Alert.alert('跳转', '没有地址');
              }
            }}
          >
            <View style={{flex: 1}}>
              <Text style={{fontSize: 22, fontWeight: '700'}}>{index+1}. {item.title}</Text>
              <Text style={{fontSize: 18, opacity: .7, marginTop: 10, marginBottom: 8}} 
                numberOfLines={1}
              >{item.intro}</Text>
              {/* <Text style={{fontSize: 16, opacity: .8, color: item.color, fontWeight: '600'}}>{item.tools || item.address}</Text> */}
              <View style={{flexWrap: 'wrap', flexDirection: 'row'}}>
                {/* 想要换行包一层 - 设置flexWrap */}
                {item.tools.split(';').map((tool) => {
                  return <View style={{
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
            </View>
          </TouchableOpacity>
        </Animated.View>
      }}>
    </Animated.FlatList>
  </View>
}
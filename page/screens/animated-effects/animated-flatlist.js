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
const { width, height } = Dimensions.get('screen');
import BG_IMG from './../../static/images/1.jpeg';
import faker from 'faker';

faker.seed(10);
faker.locale = "zh_CN";

const DATA = [...Array(30).keys()].map((_, i) => {
  return {
    // key: faker.random.uuid(),
    key: faker.datatype.uuid(),
    image: faker.image.avatar(),
    name: faker.name.findName(),
    jobTitle: faker.name.jobTitle(),
    email: faker.internet.email()
  };
})
// const BG_IMG = faker.image.imageUrl();
const SPACING = 20;
const AVATAR_SIZE = 70;
const ITEM_SIZE = AVATAR_SIZE + SPACING * 3;

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
          -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + 2)
        ];
        const opacityInputRange = [
          -1, 0, ITEM_SIZE * index, ITEM_SIZE * (index + .5)
        ];
        const scale = scrollY.interpolate({
          inputRange,
          outputRange: [
            1, 1, 1, 0
          ]
        })
        const opacity = scrollY.interpolate({
          inputRange: opacityInputRange,
          outputRange: [
            1, 1, 1, 0
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
          <Image 
            source={{uri: item.image}}
            style={{
              width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE, marginRight: SPACING/2
            }}></Image>
          <View style={{flex: 1}}>
            <Text style={{fontSize: 22, fontWeight: '700'}}>{item.name}</Text>
            <Text style={{fontSize: 18, opacity: .7}} 
              numberOfLines={1}
            >{item.jobTitle}</Text>
            <Text style={{fontSize: 14, opacity: .8, color: '#09c'}}>{item.email}</Text>
          </View>
        </Animated.View>
      }}>
    </Animated.FlatList>
  </View>
}
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
import { system } from '../../config/system';
const { width, height } = system;
import image1 from './../../static/images/1.jpeg'
import image2 from './../../static/images/2.jpeg'
import image3 from './../../static/images/3.jpeg'
import image4 from './../../static/images/4.jpeg'
import image5 from './../../static/images/5.jpeg'
const DATA = [
  image1, image2, image3, image4, image5, image1, image2, image3, image4, image5
]

const IMAGE_SIZE = 80;
const SPACING = 20;

/* const API_URL = "https://api.pexels.com/v1/search?query=nature&orientation=portrait&size=small&per_page=20";

const fetchImagsFromPexels = async () => {
  const data = await fetch(API_URL, {
    headers: {
      // 'Authorization': API_KEY
    }
  });

  const { photos } = await data.json();
  return photos;
} */

export default ({navigation}) => {
  /* const [images, setImages] = React.useState(null);

  React.useEffect(() => {
    const fetchImages = async () => {
      const images = await fetchImagsFromPexels();
      setImages(images);
    }

    fetchImages();
  }, []) */

  // console.log(images);

  /* if(!images) {
    return <Text>Loading</Text>
  } */

  const topRef = React.useRef();
  const thumbRef = React.useRef();

  const [activeIndex, setActiveIndex] = React.useState(0);

  const scrollToActiveIndex = (index) => {
    setActiveIndex(index);
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if(index * (IMAGE_SIZE + SPACING) - IMAGE_SIZE / 2 > width / 2) {
      thumbRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + SPACING) - width / 2 + IMAGE_SIZE / 2,
        animated: true
      })
    } else {
      thumbRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      })
    }
  }

  return<View style={{
    flex: 1,
    backgroundColor: '#000'
  }}>
    <FlatList
      ref={topRef}
      data={DATA}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={ev => {
        scrollToActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width));
      }}
      renderItem={({item})=>{
        return <View style={{width, height}}>
          <Image
            source={item}
            style={
              StyleSheet.absoluteFillObject,
              {
                resizeMode: 'cover',
                height,
                width
              }
            }
          ></Image>
        </View>
      }}
    ></FlatList>
    <FlatList
      ref={thumbRef}
      data={DATA}
      keyExtractor={(_, index) => index.toString()}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal: SPACING}}
      style={{
        position: 'absolute',
        bottom: IMAGE_SIZE
      }}
      renderItem={({item, index})=>{
        return <TouchableOpacity
          onPress={() => scrollToActiveIndex(index)}
        >
          <Image
              source={item}
              style={
                {
                  resizeMode: 'cover',
                  height: IMAGE_SIZE,
                  width: IMAGE_SIZE,
                  borderRadius: 12,
                  marginRight: SPACING,
                  borderWidth: 2,
                  borderColor: index === activeIndex ? "#fff" : 'transparent'
                }
              }
            ></Image>
          </TouchableOpacity>
      }}
    ></FlatList>
  </View>
}
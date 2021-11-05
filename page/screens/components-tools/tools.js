import * as React from 'react';
import {
  StatusBar,
  FlatList,
  SectionList,
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
import styled from 'styled-components/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-root-toast';
import faker from 'faker';

const DATA = [
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-snap-carousel',
    language: '轮播动画',
    descript: 'Swiper/carousel component for React Native featuring previews, multiple layouts, parallax images, performant handling of huge numbers of items, and more. Compatible with Android & iOS.',
    github: 'https://github.com/meliorence/react-native-snap-carousel',
    navigation: 'tools-react-native-snap-carousel'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-svg-transformer',
    language: 'RN中使用SVG文件',
    descript: 'React Native SVG transformer allows you to import SVG files in your React Native project the same way that you would in a Web application when using a library like SVGR to transform your imported SVG images into React components.',
    github: 'https://github.com/kristerkari/react-native-svg-transformer/blob/master/README.md',
    navigation: ''
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-vector-icons',
    language: 'RN中引入字体图标库',
    descript: 'Perfect for buttons, logos and nav/tab bars. Easy to extend, style and integrate into your project. If you want to use .svg files natively – try react-native-vector-image.',
    github: 'https://github.com/oblador/react-native-vector-icons',
    navigation: 'tools-react-native-vector-icons',
    open_url: 'https://oblador.github.io/react-native-vector-icons/'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-root-toast',
    language: 'RN中使用的Toast提示',
    descript: "In react native >= 0.62, the new LogBox component would impact this component's initialization. To make it work we have to explicitly insert a mount point in your app like this: import { RootSiblingParent } from 'react-native-root-siblings';",
    github: 'https://github.com/magicismight/react-native-root-toast',
    navigation: ''
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: '@react-native-community/clipboard',
    language: '复制到剪贴板',
    descript: 'NPM：yarn add @react-native-community/clipboard 或者GITHUB yarn add @react-native-clipboard/clipboard',
    github: 'https://github.com/react-native-clipboard/clipboard',
    npm: 'https://www.npmjs.com/package/@react-native-community/clipboard',
    navigation: ''
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'styled-components',
    language: '像普通CSS那样写样式',
    descript: 'Utilising tagged template literals (a recent addition to JavaScript) and the power of CSS, allows you to write actual CSS code to style your components. It also removes the mapping between components and styles – using components as a low-level styling construct could not be easier!styled-components',
    github: 'https://github.com/styled-components/styled-components',
    navigation: 'tools-styled-components',
    open_url: 'https://styled-components.com/docs/basics#react-native'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'lottie-react-native',
    language: 'RN加载JSON动画',
    descript: 'Lottie is a mobile library for Android and iOS that parses Adobe After Effects animations exported as JSON with bodymovin and renders them natively on mobile!',
    github: 'https://github.com/lottie-react-native/lottie-react-native',
    navigation: 'AnimatedLottieJson'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'faker',
    language: '很强大的虚拟数据',
    descript: 'generate massive amounts of realistic fake data in Node.js and the browser',
    github: 'https://github.com/Marak/faker.js',
    navigation: '',
    open_url: 'http://marak.github.io/faker.js/'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'moment',
    language: '强大的时间格式化工具',
    descript: 'A JavaScript date library for parsing, validating, manipulating, and formatting dates.',
    github: 'https://github.com/moment/moment',
    navigation: 'tools-moment',
    open_url: 'https://momentjs.com/'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-wechat-lib',
    language: '微信分享支付等功能',
    descript: 'WeChat login, share, favorite and payment for React-Native on iOS and Android',
    github: 'https://github.com/little-snow-fox/react-native-wechat-lib'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'react-native-qrcode-svg',
    language: '二维码生成工具',
    descript: 'A QR Code generator for React Native based on react-native-svg and javascript-qrcode.',
    github: 'https://github.com/awesomejerry/react-native-qrcode-svg'
  },
  {
    uuid: faker.datatype.uuid(),
    id: faker.datatype.number(),
    name: 'victory-native',
    language: 'RN中制作图表',
    descript: 'In this guide, we’ll show you how to get started with Victory Native and the React Native SVG dependency running in your React Native app for iOS and Android.',
    github: 'https://github.com/FormidableLabs/victory-native',
    navigation: 'tools-victory-native',
    open_url: 'https://formidable.com/open-source/victory/docs/native'
  }
];
const SPACING = 20;

const TextFontStyle = styled.Text`
  font-family: 'Helvetica Neue';
`;

export default ({navigation}) => {
  return <View>
    <FlatList
      data={DATA}
      keyExtractor={item => item.uuid}
      contentContainerStyle={{
        padding: SPACING,
        paddingLeft: SPACING / 2,
        paddingRight: SPACING / 2
      }}
      renderItem={({item, index}) => {
        return <View style={{
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
        }}>
          <View style={{flex: 1}}>
            <TextFontStyle style={{
              fontWeight: '500',
              fontSize: 20,
              marginBottom: 12
            }}>{index + 1}. {item.name}</TextFontStyle>
            <View style={{flexWrap: 'wrap'}}>
              {/* 想要换行包一层 - 设置flexWrap */}
              <View style={{
                flexDirection: 'row',
                padding: 6,
                backgroundColor: '#70E4FF',
                borderRadius: 5,
                marginBottom: 12,
                alignItems: 'center'
              }}>
                <Ionicons style={{marginRight:4}} name={'pricetags-outline'} size={16} color={'#FF5A5D'} />
                <Ionicons name={'language'} size={16} color={'#9D42FF'} />
                <Text style={{
                  marginLeft: 6,
                  color: '#333',
                  fontWeight: '500'}}>{item.language}</Text>
              </View>
            </View>
            <Text numberOfLines={3}>{item.descript}</Text>
            <View style={{
              flexDirection: 'row',
              marginTop: 12,
              justifyContent: 'space-between'
            }}>
              {/* Github访问地址 */}
              <TouchableOpacity 
                style={{flexDirection: 'row'}} 
                onPress={() => {
                  if(item.github) {
                    Clipboard.setString(item.github);
                    Toast.show('Github链接复制成功', {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.CENTER,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0
                    });
                  } else {
                    Clipboard.setString(item.name);
                    Toast.show('名称已复制-自行搜索', {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.CENTER,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0
                    });
                  }
                }}
              >
                <Ionicons name={item.github ? 'logo-github' : 'ios-copy'} size={16} color={'#207BFF'} />
                <Text style={{
                  color: '#207BFF',
                  marginLeft: 6
                }}>{item.github ? 'GITHUB地址' : '复制名称搜索'}</Text>
              </TouchableOpacity>
              {/* NPM链接 github与npm地址不一致显示 */}
              {!!item.npm && <TouchableOpacity 
                style={{flexDirection: 'row'}} 
                onPress={() => {
                  if(item.npm) {
                    Clipboard.setString(item.npm);
                    Toast.show('Npm链接复制成功', {
                      duration: Toast.durations.LONG,
                      position: Toast.positions.CENTER,
                      shadow: true,
                      animation: true,
                      hideOnPress: true,
                      delay: 0
                    });
                  } else {
                    Clipboard.setString(item.name);
                    Toast.show('名称已复制-自行搜索');
                  }
                }}
              >
                <Ionicons name={'ios-logo-npm'} size={18} color={'#338CFF'} />
                <Text style={{
                  color: '#3388EE',
                  marginLeft: 6,
                  fontWeight: '500'
                }}>{'NPM地址'}</Text>
              </TouchableOpacity>}
              {/* 有navigation可以预览，否则无法预览 */}
              {item.navigation ? <TouchableOpacity
                style={{flexDirection: 'row'}}
                onPress={()=>{
                  navigation.navigate(item.navigation);
                }}
              >
                <Ionicons name={'eye'} size={16} color={'#396'} />
                <Text style={{
                  color: '#396',
                  marginLeft: 6,
                  fontWeight: '500'
                }}>{'预览PREVIEW'}</Text>
              </TouchableOpacity> :
              <View style={{flexDirection: 'row'}}>
                <Ionicons name={'eye-off'} size={16} color={'#CCC'} />
                <Text style={{
                  color: '#CCC',
                  marginLeft: 6,
                  fontWeight: '500'
                }}>{'无法预览'}</Text>
              </View>}
              {/* H5访问地址 - http */}
              {!!item.open_url && <TouchableOpacity 
                style={{flexDirection: 'row'}} 
                onPress={() => {
                  Clipboard.setString(item.open_url);
                  Toast.show('H5链接复制成功', {position: Toast.positions.CENTER,});
                }}
              >
                <Ionicons name={'ios-copy'} size={15} color={'#FF7327'} />
                <Text style={{
                  color: '#FF7327',
                  marginLeft: 6,
                  fontWeight: '500'
                }}>H5访问</Text>
              </TouchableOpacity>}
            </View>
          </View>
        </View>
      }}
    >
    </FlatList>
  </View>
}
import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// tabbar
import TabBottomNavigation from '../screens/bottomTabBar/tabBar';

import Guide from '../screens/screenGuide/guide';
// import animatedHomeGuide from '../screens/screenHome/homeGuide';
import animatedLottieJson from '../screens/animated-effects/animated-lottie-json';
import animatedFlatList from '../screens/animated-effects/animated-flatlist';
import animatedGallery from '../screens/animated-effects/animated-gallery';

import componentsTools from '../screens/components-tools/tools';
import tools_reactNativeSnapCarousel from '../screens/components-tools/components/tools-react-native-snap-carousel';
import tools_reactNativeVectorIcons from '../screens/components-tools/components/tools-react-native-vector-icons';
import tools_styledComponents from '../screens/components-tools/components/tools-styled-components';
import tools_faker from '../screens/components-tools/components/tools-faker';
import tools_moment from '../screens/components-tools/components/tools-moment';

const RootStack = createNativeStackNavigator();

export default () => {
  return <RootStack.Navigator initialRouteName="Guide">
    <RootStack.Screen name='Guide' component={Guide} 
      options={{
        headerShown: false
      }}
    />

    {/* 底部菜单导航 */}
    <RootStack.Screen name='Tabs' component={TabBottomNavigation} options={{ headerShown: false }} />
    {/* center特效工具集 */}
    {/* <RootStack.Screen name='AnimatedHomeGuide' component={animatedHomeGuide} 
      options={{
        headerShown: false,
        animationEnabled: false,
        cardStyle: {
          backgroundColor: 'transparent',
        },
        detachPreviousScreen: false
      }}
    /> */}
    <RootStack.Screen name='AnimatedLottieJson' component={animatedLottieJson} />
    <RootStack.Screen name='AnimatedFlatList' component={animatedFlatList} />
    <RootStack.Screen name='AnimatedGallery' component={animatedGallery} />

    {/* RN组件工具库 */}
    <RootStack.Screen name='ComponentsTools' component={componentsTools} />
    <RootStack.Screen name='tools-react-native-snap-carousel' component={tools_reactNativeSnapCarousel} />
    <RootStack.Screen name='tools-react-native-vector-icons' component={tools_reactNativeVectorIcons} />
    <RootStack.Screen name='tools-styled-components' component={tools_styledComponents} />
    <RootStack.Screen name='tools-faker' component={tools_faker} />
    <RootStack.Screen name='tools-moment' component={tools_moment} />
  </RootStack.Navigator>
}
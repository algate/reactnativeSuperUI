import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// tabbar
import TabBottomNavigation from '../screens/bottomTabBar/tabBar';

import Guide from '../screens/screenGuide/guide';
import animatedLottieJson from '../screens/animatedEffects/animated-lottie-json';
import animatedEffects from '../screens/animatedEffects/animated-flatlist';

const RootStack = createNativeStackNavigator();

export default () => {
  return <RootStack.Navigator initialRouteName="Guide">
    <RootStack.Screen name='Guide' component={Guide} 
      options={{
        headerShown: false
      }}
    />
    <RootStack.Screen name='Tabs' component={TabBottomNavigation} options={{ headerShown: false }} />
    <RootStack.Screen name='AnimatedLottieJson' component={animatedLottieJson} />
    <RootStack.Screen name='AnimatedEffects' component={animatedEffects} />
  </RootStack.Navigator>
}

import * as React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screenHome/home';
import HomeScreenCenter from '../screenCenter/center';
import NoteScreen from '../screenNote/note';

const Tab = createBottomTabNavigator();

export default () => {
  return <Tab.Navigator
    initialRouteName="HomeNav"
    screenOptions={({ route }) => ({
      // headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // 此处介绍两种字体的引入方式
        if (route.name === 'TabHome') {
          iconName = focused ? 'app-store-ios' : 'app-store';   
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabHomeGuide') {
          iconName = focused ?  'aperture' : 'aperture-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabHomeCenter') {
          iconName = focused ?  'logo-apple' : 'logo-google-playstore';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabNote') {
          iconName = focused ? 'leaf' : 'leaf-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
    })}>
    <Tab.Screen name="TabHome" component={HomeScreen} options={{ headerShown: false }} />
    <Tab.Screen name="TabHomeCenter" component={HomeScreenCenter} options={{ headerShown: false }} />
    <Tab.Screen name="TabNote" component={NoteScreen} />
  </Tab.Navigator>
}
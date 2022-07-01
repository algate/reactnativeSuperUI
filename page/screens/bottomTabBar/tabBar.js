
import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screenHome/home';
import AnimatedScreen from '../screenAnimated/animated';
import ToolsScreen from '../screenTools/tools';
import SettingScreen from '../screenSetting/setting';

import { ThemeContext } from '../../components/context/theme';

const Tab = createBottomTabNavigator();

export default (props) => {
  const { navigation, route, theme } = props;
  const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);
  // const backgroundColor = "#ccc";
  return <Tab.Navigator
    initialRouteName="TabTools"
    screenOptions={({ route }) => ({
      // headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // 此处介绍两种字体的引入方式
        if (route.name === 'TabHome') {
          iconName = focused ? 'app-store-ios' : 'app-store';   
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabAnimated') {
          iconName = focused ?  'logo-apple' : 'logo-google-playstore';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabTools') {
          iconName = focused ? 'leaf' : 'leaf-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        } else if (route.name === 'TabSetting') {
          iconName = focused ?  'aperture' : 'aperture-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        }
      },
      // tabBarActiveTintColor: 'tomato',
      tabBarActiveTintColor: backgroundColor,
      // tabBarActiveTintColor: '#fff',
      tabBarInactiveTintColor: 'gray',
      // tabBarActiveBackgroundColor: backgroundColor,
      // tabBarStyle: { position: 'absolute' },
    })}>
    <Tab.Screen name="TabHome"
      options={{ 
        headerShown: false,
        headerTitle: '首页',
        headerLeft: null,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: backgroundColor,
        },
        headerTitleStyle:{
            color: '#fff',
        }
      }} 
    >
      {props => <HomeScreen {...props} theme={theme} />}
    </Tab.Screen>
    <Tab.Screen name="TabTools" component={ToolsScreen} options={{ headerShown: false }} />
    <Tab.Screen name="TabAnimated" component={AnimatedScreen} options={{ headerShown: false }} />
    <Tab.Screen name="TabSetting" component={SettingScreen} 
      options={{
        headerLeft: null,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: backgroundColor,
        },
        headerTitleStyle:{
            color: '#fff',
        },
        ...SettingScreen.options
      }} 
    />
  </Tab.Navigator>
}
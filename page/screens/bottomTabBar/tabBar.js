
import React, {useContext} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';

import HomeScreen from '../screenHome/home';
import HomeScreenCenter from '../screenCenter/center';
import NoteScreen from '../screenNote/note';
import SettingScreen from '../screenSetting/setting';

import { ThemeContext } from '../../components/context/theme';

const Tab = createBottomTabNavigator();

export default (props) => {
  const { navigation, route, theme } = props;
  const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);
  // const backgroundColor = "#ccc";
  return <Tab.Navigator
    initialRouteName="TabHome"
    screenOptions={({ route }) => ({
      // headerShown: false,
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        // 此处介绍两种字体的引入方式
        if (route.name === 'TabHome') {
          iconName = focused ? 'app-store-ios' : 'app-store';   
          return <FontAwesome name={iconName} size={size} color={color} />;
        } else if (route.name === 'Setting') {
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
    <Tab.Screen name="TabHomeCenter" component={HomeScreenCenter} options={{ headerShown: false }} />
    <Tab.Screen name="TabNote" component={NoteScreen} 
      options={{
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: backgroundColor,
        },
        headerTitleStyle:{
            color: '#fff',
        }
      }} 
    />
    <Tab.Screen name="Setting" component={SettingScreen} 
      options={{
        headerLeft: null,
        headerTitleAlign: 'center',
        headerStyle: {
            backgroundColor: backgroundColor,
        },
        headerTitleStyle:{
            color: '#fff',
        }
      }} 
    />
  </Tab.Navigator>
}
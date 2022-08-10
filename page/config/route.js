import React, { useContext } from "react";
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createStackNavigator } from '@react-navigation/stack';
// tabbar
import TabBottomNavigation from '../screens/bottomTabBar/tabBar';

import { ThemeContext } from '../components/context/theme';

import Guide from '../screens/screenGuide/guide';
// import animatedHomeGuide from '../screens/screenHome/homeGuide';
import animatedPanResponder from '../screens/animated-effects/animated-pan-responder';   // 待完善……
import animatedLottieJson from '../screens/animated-effects/animated-lottie-json';
import animatedFlatList from '../screens/animated-effects/animated-flatlist';
import animatedFlatListLevel from '../screens/animated-effects/animated-flatlist-level';
import animatedGallery from '../screens/animated-effects/animated-gallery';
import networkOutline from '../screens/screenAnimated/network-outline';

import tools_reactNativeSnapCarousel from '../screens/screenTools/components/tools-react-native-snap-carousel';
import tools_reactNativeVectorIcons from '../screens/screenTools/components/tools-react-native-vector-icons';
import tools_styledComponents from '../screens/screenTools/components/tools-styled-components';
import tools_faker from '../screens/screenTools/components/tools-faker';
import tools_moment from '../screens/screenTools/components/tools-moment';
import tools_victoryNative from '../screens/screenTools/components/tools-victory-native';
import tools_reactNativeVideo from '../screens/screenTools/components/tools-react-native-video';
import tools_reanimatedBottomSheet from '../screens/screenTools/components/tools-reanimated-bottom-sheet';
import tools_reactNativeBottomSheet from '../screens/screenTools/components/tools-react-native-bottom-sheet';
import tools_reactNativeSideMenu from '../screens/screenTools/components/tools-react-native-side-menu';
import tools_reactNativeImageCropPicker from '../screens/screenTools/components/tools-react-native-image-crop-picker';
import tools_reactNativeCalendars from '../screens/screenTools/components/tools-react-native-calendars';
import tools_reactNaviveSwipeListView from '../screens/screenTools/components/tools-react-native-swipe-list-view';

// 日历 - start - 📅
// import MenuScreen from '../screens/screenTools/components/tools-react-native-calendars/menuScreen';
import CalendarsScreen from '../screens/screenTools/components/tools-react-native-calendars/calendarScreen';
import AgendaScreen from '../screens/screenTools/components/tools-react-native-calendars/agendaScreen';
import CalendarsList from '../screens/screenTools/components/tools-react-native-calendars/calendarsList';
import HorizontalCalendarList from '../screens/screenTools/components/tools-react-native-calendars/horizontalCalendarList';
import ExpandableCalendarScreen from '../screens/screenTools/components/tools-react-native-calendars/ExpandableCalendarScreen';
import TimelineCalendarScreen from '../screens/screenTools/components/tools-react-native-calendars/timelineCalendarScreen';
import MyCalendarWeekScreen from '../screens/screenTools/components/tools-react-native-calendars/MyCalendarWeekScreen'
import MyCalendarMonthScreen from '../screens/screenTools/components/tools-react-native-calendars/MyCalendarMonthScreen'
import MyCalendarWeekSwipeScreen from '../screens/screenTools/components/tools-react-native-calendars/MyCalendarWeekSwipeScreen'
// 日历 - end - 📅

const RootStack = createStackNavigator();

export default ({theme}) => {
  const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);
  // const backgroundColor = "#ccc";
  // 要想改变TABS的默认显示菜单 - 去TABS组件下区修改
  return <RootStack.Navigator initialRouteName="Tabs">
    {/* <RootStack.Screen name='Guide' component={Guide} 
      options={{
        headerShown: false
      }}
    /> */}

    {/* 底部菜单导航 */}
    {/* <RootStack.Screen name='Tabs' component={TabBottomNavigation} 
      options={{ 
        headerShown: false
      }} 
    /> */}
    {/* 如果要传递额外的参数使用下边这种方式 （上边的方式无法传递多余的参数） */}
    <RootStack.Screen name='Tabs'
      options={{ 
        headerShown: false
      }}
    >
      {props => <TabBottomNavigation {...props} theme={theme} />}
    </RootStack.Screen>


    {/* center特效工具集 - 子菜单 */}
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
    <RootStack.Screen 
      name='AnimatedPanResponder' 
      component={animatedPanResponder}
      options={animatedPanResponder.options}
    />
    <RootStack.Screen 
      name='AnimatedLottieJson' 
      component={animatedLottieJson} 
    />
    <RootStack.Screen 
      name='AnimatedFlatList' 
      component={animatedFlatList} 
    />
    <RootStack.Screen 
      name='AnimatedFlatListLevel' 
      component={animatedFlatListLevel} 
    />
    <RootStack.Screen 
      name='AnimatedGallery' 
      component={animatedGallery} 
    />
    <RootStack.Screen 
      name='NetworkOutline' 
      component={networkOutline} 
    />

    {/* screenTools 工具库 - 子菜单 */}
    <RootStack.Screen 
      name='tools-react-native-snap-carousel' 
      component={tools_reactNativeSnapCarousel} 
    />
    <RootStack.Screen 
      name='tools-react-native-vector-icons' 
      component={tools_reactNativeVectorIcons} 
    />
    <RootStack.Screen 
      name='tools-styled-components' 
      component={tools_styledComponents} 
    />
    <RootStack.Screen 
      name='tools-faker' 
      component={tools_faker} 
    />
    <RootStack.Screen 
      name='tools-moment' 
      component={tools_moment} 
    />
    <RootStack.Screen 
      name='tools-victory-native' 
      component={tools_victoryNative} 
    />
    <RootStack.Screen 
      name='tools-react-native-video' 
      component={tools_reactNativeVideo} 
    />
    <RootStack.Screen 
      name='tools-reanimated-bottom-sheet' 
      component={tools_reanimatedBottomSheet} 
    />
    <RootStack.Screen 
      name='tools-react-native-bottom-sheet' 
      component={tools_reactNativeBottomSheet} 
    />
    <RootStack.Screen 
      name='tools-react-native-side-menu' 
      component={tools_reactNativeSideMenu} 
    />
    <RootStack.Screen 
      name='tools-react-native-image-crop-picker' 
      component={tools_reactNativeImageCropPicker} 
      options={tools_reactNativeImageCropPicker.options}
    />
    <RootStack.Screen 
      name='tools-react-native-calendars' 
      component={tools_reactNativeCalendars}
    />
      <RootStack.Screen 
        name='Calendars' 
        component={CalendarsScreen} 
      />
      <RootStack.Screen 
        name='Agenda' 
        component={AgendaScreen} 
      />
      <RootStack.Screen 
        name='CalendarsList' 
        component={CalendarsList} 
      />
      <RootStack.Screen 
        name='HorizontalCalendarList' 
        component={HorizontalCalendarList} 
      />
      <RootStack.Screen 
        name='ExpandableCalendar' 
        component={ExpandableCalendarScreen} 
      />
      <RootStack.Screen 
        name='TimelineCalendar' 
        component={TimelineCalendarScreen} 
      />
      <RootStack.Screen 
        name='MyCalendarWeek' 
        component={MyCalendarWeekScreen}
        options={MyCalendarWeekScreen.options}
      />
      <RootStack.Screen 
        name='MyCalendarMonth' 
        component={MyCalendarMonthScreen} 
        options={MyCalendarMonthScreen.options}
      />
      <RootStack.Screen 
        name='MyCalendarWeekSwipe' 
        component={MyCalendarWeekSwipeScreen} 
        options={MyCalendarWeekSwipeScreen.options}
      />
    <RootStack.Screen 
      name='tools-react-native-swipe-list-view' 
      component={tools_reactNaviveSwipeListView} 
      options={tools_reactNaviveSwipeListView.options}
    />
  </RootStack.Navigator>
}

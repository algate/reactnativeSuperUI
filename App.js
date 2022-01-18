/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import * as React from 'react';
import {
  StyleSheet,
  SafeAreaView,
  StatusBar,
  useColorScheme,
  NativeModules,
  LogBox
} from 'react-native';
import { DarkTheme,
  DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootStack from './page/config/route';

import { ThemeProvider } from './page/components/context/theme';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

console.log(__DEV__);

function initializeConsole(){
  LogBox.ignoreLogs(['Require cycle: node_modules/rn-fetch-blob/']);

  // Perf. improvement
  // See: http://reactnative.cn/docs/0.42/performance.html#console-log%E8%AF%AD%E5%8F%A5
  /* eslint-disable no-undef */
  if (!__DEV__) {
    const noop = () => {};
    global.console.debug = noop;
    global.console.info = noop;
    global.console.log = noop;
    global.console.warn = noop;
    global.console.error = noop;
  }
}

initializeConsole();

export default () => {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider>
      <NavigationContainer>
        <RootStack theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme} />
      </NavigationContainer>
    </ThemeProvider>
  );
}
 
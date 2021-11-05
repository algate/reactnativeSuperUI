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
} from 'react-native';
import { DarkTheme,
  DefaultTheme, NavigationContainer } from '@react-navigation/native';
import RootStack from './page/config/route';

import { ThemeProvider } from './page/components/context/theme';
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
 
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
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './page/config/route';

import { ThemeProvider } from './page/components/context/theme';

import { ActionSheetProvider } from './page/components/ActionSheet';

const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default () => {
  return (
    <ThemeProvider>
      <ActionSheetProvider>
        <NavigationContainer>
          <RootStack/>
        </NavigationContainer>
      </ActionSheetProvider>
    </ThemeProvider>
  );
}
 
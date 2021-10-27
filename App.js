/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 */

import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import RootStack from './page/config/route';

export default function App() {
  return (
    <NavigationContainer>
      <RootStack />
    </NavigationContainer>
  );
}
 
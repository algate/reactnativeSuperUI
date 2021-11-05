/* eslint-disable prettier/prettier */
import React, { useState, useEffect, createContext } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
 
export const ThemeContext = createContext({});
 
export const ThemeProvider = props => {
  const [backgroundColor, setBackgroundColor] = useState('#1677ff');
  useEffect(()=>{
    const queryThemeConfig = async () => {
      try {
        const cacheBackgroundColor = await AsyncStorage.getItem('@backgroundColor');
        if(cacheBackgroundColor!=null){
            setBackgroundColor(cacheBackgroundColor);
        }
      } catch (e) {
        // saving error
      }
    };
    queryThemeConfig().then(r => void(0) );
  },[]);
  return (
    <ThemeContext.Provider value={[backgroundColor, setBackgroundColor]}>
      {props.children}
    </ThemeContext.Provider>
  );
};
'use strict';
import React from 'react';
import { Dimensions, Image, TouchableOpacity, Animated, Platform } from "react-native";

// iPhoneX Xs
const X_WIDTH = 375;
const X_HEIGHT = 812;

// iPhoneXR XsMax
const XR_WIDTH = 414;
const XR_HEIGHT = 896;

// iPhone12
const IPHONE12_H = 844;
const IPHONE12_Max = 926;
const IPHONE12_Mini = 780;

// screen
const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

export const isiPhoneX = (() => {
  if (Platform.OS !== 'ios') {
    return false;
  }

  if (
    (SCREEN_HEIGHT === X_HEIGHT && SCREEN_WIDTH === X_WIDTH)
    || (SCREEN_HEIGHT === X_WIDTH && SCREEN_WIDTH === X_HEIGHT)
  ) {
    return true;
  }

  if (
    (SCREEN_HEIGHT === XR_HEIGHT && SCREEN_WIDTH === XR_WIDTH)
    || (SCREEN_HEIGHT === XR_WIDTH && SCREEN_WIDTH === XR_HEIGHT)
  ) {
    return true;
  }

  if (
    SCREEN_HEIGHT === IPHONE12_H ||
    SCREEN_HEIGHT === IPHONE12_Max ||
    SCREEN_HEIGHT === IPHONE12_Mini
  ) {
    return true;
  }

  return false;
})();

export const NAVIGATION_TOP_AREA_HEIGHT = (() => {
  if (Platform.OS === 'ios') {
    return isiPhoneX ? 88 : 64;
  }
  return 56;
})();

class NavigationScrollAnimator {
  inputValue = null;
  normalizedValue = null;

  constructor({ initialInput = null, inputRange = [0, NAVIGATION_TOP_AREA_HEIGHT] } = {}) {
    this.inputRange = inputRange;
    this.inputValue =
      new Animated.Value(!initialInput ? inputRange[0] : initialInput);
    this.normalizedValue = this.inputValue.interpolate({
      inputRange,
      outputRange: [0, 1],
      extrapolate: 'clamp'
    });

    this.scrollProps = {
      onScroll: Animated.event([{
        nativeEvent: {
          contentOffset: {
            y: this.inputValue
          }
        }
      }], {
        useNativeDriver: false,
      }),
      decelerationRate: 0.992,
      scrollEventThrottle: 1
    };
  }

  interpolate({ outputRange } = {}) {
    return this.inputValue.interpolate({
      inputRange: this.inputRange,
      outputRange: outputRange,
      extrapolate: 'clamp'
    });
  }
}

export function createNavigationScrollAnimator(options) {
  return new NavigationScrollAnimator(options);
}
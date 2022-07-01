'use strict';
import React from 'react';
import { Image, TouchableOpacity, Animated, Platform, Dimensions } from "react-native";
import { useRoute, useNavigationState } from '@react-navigation/native';
import isNil from 'lodash/isNil';
import isUndefined from 'lodash/isUndefined';
import styled from 'styled-components';
import Ionicons from 'react-native-vector-icons/Ionicons';

export const TOP_DANGER_HEIGHT = 44;
export const BOTTOM_DANGER_HEIGHT = 34;

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

/* export function ifiPhoneX (iphoneXStyle, regularStyle = {}) {
  if (isiPhoneX) {
    return iphoneXStyle;
  } else {
    return regularStyle;
  }
} */

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
      new Animated.Value(isNil(initialInput) ? inputRange[0] : initialInput);
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

export const NavigationIcon = styled(Image)`
  ${props => props.width ? `width: ${props.width}px;` : ''}
  ${props => props.height ? `height: ${props.height}px;` : ''}
`;

const _NavigationButton = styled(TouchableOpacity)`
  flex: none;
  flex-direction: row;
  align-items: center;
  align-self: stretch;
  margin: 0px 4px;
  ${(props) => {
    const screenWhiteSize = 20;
    if (props.left) {
      return `margin-left: ${screenWhiteSize}px`;
    } else if (props.right) {
      return `margin-right: ${screenWhiteSize}px`;
    }
    return '';
  }}
`;

export const NavigationButton = ({ children, badge = 0, ...props }) => (
  <_NavigationButton {...props}>
    {children}
    {/* {badge > 0 && <Badge number={badge}/>} */}
  </_NavigationButton>
);

export const NavigationIconButton = (props) => {
  const { icon, color = 'gray', ...otherProps } = props;
  return (
    <NavigationButton {...otherProps}>
      <Ionicons name={icon} size={24} color={color} />
    </NavigationButton>
  );
};

function useIsFirstRouteInParent() {
  const route = useRoute();
  const isFirstRouteInParent = useNavigationState(
    state => state.routes[0].key === route.key
  );

  return isFirstRouteInParent;
}

export const NavigationBackButton = (props) => {
  const isFirst = useIsFirstRouteInParent();
  if (isFirst) {
    return null;
  }

  return (
    <NavigationIconButton
      left
      icon={'chevron-back'}
      onPress={() => props.navigation.goBack()}
      {...props}
    />
  );
};
export const NavigationShareButton = (props) => {
  return (
    <NavigationIconButton
      icon={'share-social'}
      {...props}
    />
  );
};
export const NavigationDataButton = (props) => {
  return (
    <NavigationIconButton
      icon={'server'}
      {...props}
    />
  );
};

const absoluteFill = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const HeaderBackground = styled.View`
  ${absoluteFill}
  background-color: '#fff';
`;

const AnimatedBackground = styled(Animated.View)`
  ${absoluteFill}
  background-color: '#fff';
  border-bottom-color: 'gray';
`;

export const screenProps = {}; // TODO: 干掉这个

export function appStackNavigationOptions(navigationOptions = null) {
  const isFunc = (typeof navigationOptions) === 'function';
  return (props) => {
    const { navigation } = props;
    const { theme } = screenProps;
    let options = isFunc
      ? navigationOptions({ ...props, theme })
      : navigationOptions;
    options = options || {};
    console.log('options - 1', options);

    let {
      scrollAnimator = null,
      headerStyle = {},
      headerTitleStyle = {},
      backgroundStyle = {},
      headerLeft,
      headerRight,
      backIcon = 'chevron-back',
      showBorder = true,
      float = false,
      titleLevel = 2,
      dark = false,
      animateElements,
      ...otherNavigationOptions
    } = options;

    console.log('options - 2', options);

    let _headerLeft = null;
    if (headerLeft) {
      if (typeof headerLeft !== 'function') {
        _headerLeft = () => headerLeft;
      } else {
        _headerLeft = headerLeft;
      }
    } else if (headerLeft !== null) {
      _headerLeft = () => (
        <NavigationBackButton
          icon={backIcon}
          color={dark ? 'white' : 'gray'}
          navigation={navigation}
        />
      );
    }

    let _headerRight = null;
    if (headerRight) {
      if (typeof headerRight !== 'function') {
        _headerRight = () => headerRight;
      } else {
        _headerRight = headerRight;
      }
    }

    const titleFonts = ['headline', 'title2'];
    const opacity = scrollAnimator ? scrollAnimator.normalizedValue : 0;
    let animateElementList = animateElements;
    if (!scrollAnimator) {
      animateElementList = [];
    } else if (isUndefined(animateElements)) {
      animateElementList = float ? ['background', 'title'] : ['background'];
    }

    const backgroundColor = dark ? '#000' : '#fff';
    return {
      headerBackground: () => (
        <>
          {!float && <HeaderBackground style={{
            backgroundColor,
            ...headerStyle,
          }}/>}
          <AnimatedBackground
            showBorder={showBorder}
            style={{
              backgroundColor,
              ...backgroundStyle,
              opacity,
            }}
          />
        </>
      ),
      headerTitleStyle: {
        opacity: animateElementList.includes('title') ? opacity : 1,
        color: dark ? '#fff' : '#000',
        ...headerTitleStyle
      },
      headerLeft: _headerLeft,
      headerRight: _headerRight,
      headerTitleAllowFontScaling: false,
      headerTransparent: float,
      ...otherNavigationOptions
    };
  };
}
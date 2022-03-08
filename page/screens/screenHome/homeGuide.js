
import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions,
  Modal,
  View,
  Animated,
  PanResponder,
} from 'react-native';

import styled from 'styled-components/native';
import LogoSvg from '../../static/home/logo.svg';
// 手势四个状态svg
import LogoSvg1 from '../../static/home/1.svg';
import LogoSvg2 from '../../static/home/2.svg';
import LogoSvg3 from '../../static/home/3.svg';
import LogoSvg4 from '../../static/home/4.svg';

const Mask = styled(Animated.View)`
  height: ${height}px;
  width: ${width}px;
  background-color: #131313;
  position: absolute;
`;
const LogoGreeting = styled.View`
  position: absolute;
  bottom: 600px;
  width: 100%;
  align-items: center;
`;
const LogoGreetingFeedback = styled(Animated.Text)`
  position: absolute;
  top: 70px;
  color: #fff;
`;
const LogoBox = styled.View`
  position: absolute;
  left: 50%;
  bottom: 296px;
  transform: translateX(-61px);
`;
const LogoSvgBox = styled(Animated.View)`
  position: absolute;
  bottom: 0;
`;

const UnlockResponder = styled.View`
  width: 100%;
  height: 100%;
  background: #2dabff;
  position: absolute;
  bottom: 0;
  opacity: 0;
`;

const CircleButton = styled.TouchableOpacity`
  width: 44px;
  height: 44px;
  border: 2px solid rgba(255,255,255,.2);
  border-radius: 44px;
  position: absolute;
  bottom: 36px;
  left: 50%;
  transform: translateX(-22px);
  align-items: center;
  justify-content:center;
`;
const InnerCircle = styled.View`
  width: 20px;
  height: 20px;
  border-radius: 20px;
  border: 2px solid #fff;
`;

const HomeGuide = (props) => {
  return (
    <SafeAreaView style={{backgroundColor: '#131313'}}>
      <Text>说了禁止访问，请尊重下！👌</Text>
    </SafeAreaView>
  );
};

export default  HomeGuide;

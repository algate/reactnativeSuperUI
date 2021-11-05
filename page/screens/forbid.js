
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

const {width, height} = Dimensions.get('window');

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

const synsoluManager = {
  _status: 0,
  _greeting: ``
};
const Forbid = (props) => {
  const { navigation } = props;

  const { _status, _greeting } = synsoluManager;

  const aniValueFeedback = React.useRef(new Animated.Value(0)).current;

  const aniValueOpacity = React.useRef(new Animated.Value(0)).current;

  Animated.timing(aniValueOpacity, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: false
  }).start();

  const greetingsHello = ['','很糟糕','一般般','还不错','非常棒'];
  const greetingsHelloConfirm = [
    ['休息一下吧','照顾好自己','记得爱自己'],
    ['放松一下吧','早点休息哦','做点开心的事'],
    ['状态不错哦','保持好心态','继续加油吧'],
    ['元气满满啊','生龙活虎~','那可太好啦'],
  ];

  const [greetingHelloConfirm, setgreetingHelloConfirm] = useState('');

  // 手势滑动整个modal显示与隐藏
  
  const closeVisible = (status) => {
    if(status === 0) {
      // 保存问候语
      // synsoluManager.saveStatus(0);
      // synsoluManager.saveGreeing('');
      navigation.navigate('Tabs', {
        screen: 'TabHomeCenter'
      });
    } else {
      setStatusInit(false);
      aniValueFeedback.setValue(0.5);
      const item = greetingsHelloConfirm[status-1][Math.floor(Math.random()*3)];
      setgreetingHelloConfirm(item);

      // synsoluManager.saveStatus(status);
      // synsoluManager.saveGreeing(item);

      Animated.timing(aniValueFeedback, {
        toValue: 1, 
        duration: 1000,
        useNativeDriver: false,
      }).start(({finished})=>{
        Animated.timing(aniValueOpacity, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: false
        }).start(({finished})=> {
          navigation.navigate('Tabs', {
            screen: 'TabHomeCenter'
          });
        });
      });
    }
  }

  const [showGuideAE, setShowGuideAE] = useState(true);

  const setModalVisible = () => {
    // userSpace.userGuideManager.updateData('synsolu');
    setShowGuideAE(false);
  }

  const [status, setStatus] = React.useState(_status);

  const aniValue = React.useRef(new Animated.Value(0)).current;

  const [statusInit, setStatusInit] = React.useState(true);


  if(_status !== 0) {
    aniValue.setValue(_status);
  }

  const _panResponder = PanResponder.create({
    onStartShouldSetPanResponder: (evt, gestureState) => true,
    onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
    onMoveShouldSetPanResponder: (evt, gestureState) => true,
    onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
    onPanResponderMove: (_, { dy }) => {
      setStatusInit(false);
      const newValue = Math.max(0, Math.min(4, status - dy / 42));
      aniValue.setValue(newValue);
    },
    onPanResponderTerminationRequest: (evt, gestureState) => true,
    onPanResponderRelease: (_, { dy }) => {
      const lastValue = Math.max(0, Math.min(4, status - dy / 42));
      const toValue = Math.ceil(lastValue);
      // synsoluManager.saveStatus(toValue);
      setStatus(toValue);
      Animated.timing(aniValue, {
        toValue,
        duration: 100,
        useNativeDriver: false,
      }).start();
    },
    onPanResponderTerminate: (evt, gestureState) => {
      // 另一个组件已经成为了新的响应者，所以当前手势将被取消。
      // console.log('onPanResponderTerminate', gestureState);
    },
  });

  const aniValueFeedbackRange = aniValueFeedback.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, -14, -14]
  })

  return (
    <SafeAreaView style={{backgroundColor: '#131313'}}>
      <Modal
        transparent={true} 
        presentationStyle={'overFullScreen'}
        animationType={'fade'}>
        <Mask style={{
          opacity: aniValueOpacity.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 1, 1]
          })
        }}/>
        <Animated.View style={{
          flex: 1,
          opacity: aniValueOpacity.interpolate({
            inputRange: [0, 0.5, 1],
            outputRange: [0, 0, 1]
          })
        }}>
          <LogoGreeting>
            {_greeting&&statusInit ? (<Text style={{
              color: '#fff',
              fontSize: 28,
              fontWeight: '500',
              fontFamily: 'PingFang SC',
              position: 'absolute',
            }}>{_greeting}</Text>) : 
            (<Animated.View style={{
              position: 'absolute',
              opacity: aniValueFeedback.interpolate({
                inputRange: [0, 0.4, 1],
                outputRange: [1, 0, 0]
              })
            }}>
              <Animated.Text style={{
                color:'#fff',
                fontWeight: '500',
                fontFamily: 'PingFang SC',
                fontSize: aniValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [28, 16, 16]
                }),
                opacity: aniValue.interpolate({
                  inputRange: [0, 0.5, 1],
                  outputRange: [1, 0.4, 0.4]
                })
              }}>今天感觉怎么样</Animated.Text>
            </Animated.View>)}
            <Animated.View style={{
              position: 'absolute',
              opacity: aniValueFeedback.interpolate({
                inputRange: [0, 0.3, 0.8, 1],
                outputRange: [0, 0, 1, 1]
              })
            }}>
              {
                status > 0 ?<Animated.Text style={{
                  color:'#fff',
                  fontWeight: '500',
                  fontFamily: 'PingFang SC',
                  fontSize: aniValueFeedback.interpolate({
                    inputRange: [0, 0.3, 0.8, 1],
                    outputRange: [16, 16, 28, 28]
                  })
                }}>{greetingHelloConfirm}</Animated.Text> : null
              }
            </Animated.View>
            {statusInit?(<View style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}><LogoGreetingFeedback style={{
              color: '#fff',
              fontSize: 14,
              fontWeight: '500',
              opacity: 0.4
            }}>{greetingsHello[_status]}</LogoGreetingFeedback></View>):(<View style={{
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
            }}>
              <LogoGreetingFeedback style={{
                fontSize: Animated.add(aniValue.interpolate({
                  inputRange: [0, 0.5, 1, 1.2, 1.8, 2],
                  outputRange: [14, 28, 28, 14, 14, 14]
                }), aniValueFeedbackRange),
                opacity: aniValue.interpolate({
                  inputRange: [0, 0.5, 1, 1.2, 1.8, 2],
                  outputRange: [0, 1, 1, 0, 0, 0]
                })
              }}>{greetingsHello[1]}</LogoGreetingFeedback>
              <LogoGreetingFeedback style={{
                fontSize: Animated.add(aniValue.interpolate({
                  inputRange: [1, 1.5, 1.8, 2, 2.2, 3],
                  outputRange: [14, 14, 28, 28, 14, 14]
                }), aniValueFeedbackRange),
                opacity: aniValue.interpolate({
                  inputRange: [1, 1.5, 1.8, 2, 2.2, 3],
                  outputRange: [0, 0, 1, 1, 0,  0]
                })
              }}>{greetingsHello[2]}</LogoGreetingFeedback>
              <LogoGreetingFeedback style={{
                fontSize: Animated.add(aniValue.interpolate({
                  inputRange: [2, 2.5, 2.8, 3, 3.2, 4],
                  outputRange: [14, 14, 28, 28, 14, 14]
                }), aniValueFeedbackRange),
                opacity: aniValue.interpolate({
                  inputRange: [2, 2.5, 2.8, 3, 3.2, 4],
                  outputRange: [0, 0, 1, 1, 0, 0]
                })
              }}>{greetingsHello[3]}</LogoGreetingFeedback>
              <LogoGreetingFeedback style={{
                fontSize: Animated.add(aniValue.interpolate({
                  inputRange: [3, 3.5, 3.8, 4],
                  outputRange: [14, 14, 28, 28]
                }), aniValueFeedbackRange),
                opacity: aniValue.interpolate({
                  inputRange: [3, 3.5, 3.8, 4],
                  outputRange: [0, 0, 1, 1]
                })
              }}>{greetingsHello[4]}</LogoGreetingFeedback>
            </View>)}
          </LogoGreeting>
          <LogoBox>
            <LogoSvg />
            <LogoSvgBox style={{
              opacity: aniValue.interpolate({
                inputRange: [0, 3, 4],
                outputRange: [0, 0, 1],
              })
            }}>
              <LogoSvg4 />
            </LogoSvgBox>
            <LogoSvgBox style={{
              opacity: aniValue.interpolate({
                inputRange: [0, 2, 3, 4],
                outputRange: [0, 0, 1, 1],
              })
            }}>
              <LogoSvg3 />
            </LogoSvgBox>
            <LogoSvgBox style={{
              opacity: aniValue.interpolate({
                inputRange: [0, 1, 2, 4],
                outputRange: [0, 0, 1, 1],
              })
            }}>
              <LogoSvg2 />
            </LogoSvgBox>
            <LogoSvgBox style={{
              opacity: aniValue.interpolate({
                inputRange: [0, 1, 4],
                outputRange: [0, 1, 1],
              })
            }}>
              <LogoSvg1 />
            </LogoSvgBox>
          </LogoBox>
          <UnlockResponder {..._panResponder.panHandlers} />
          <CircleButton onPress={()=>{
              closeVisible(status)
            }}>
            <InnerCircle/>
          </CircleButton>
        </Animated.View>
        {/* 
          引导层:
          1. 触碰之后引导层隐藏
          2. 只有第一次需要引导动画 ing
          3. { !userSpace.userGuideManager.spectrumClicked && this.init ? <UserGuide /> : null }
          4. !userSpace.userGuideManager.synsoluClicked && 
         */}
      </Modal>
    </SafeAreaView>
  );
};

export default  Forbid;

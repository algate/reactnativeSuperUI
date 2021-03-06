import React from 'react';
import styled from 'styled-components/native';
import { TouchableOpacity, View, Text, Animated, Modal, Button } from 'react-native';
import { observer } from 'mobx-react';
import LinearGradient from 'react-native-linear-gradient';
import { runInAction, observable } from 'mobx';
import { system } from '../../../../../config/system';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';

const ActionLinearGradient = styled(LinearGradient).attrs(({opacity}) => ({
  colors: opacity ? ['#202020', '#2b2b2b'] : ['rgba(255,255,255,0.02)', 'rgba(255,255,255,0.1)'],
  start: { x: 0, y: 1 },
  end: { x: 1, y: 1 }
}))`
  height: 94px;
  padding: 16px;
  margin-left: 16px;
  margin-right: 16px;
  border-radius: 8px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  position: relative;
  z-index: 10;
`;

const Left = styled.View`
  flex-direction: row;
  flex: 1;
`;

const ActionIconContainer = styled.View`
  width: 50px;
  height: 50px;
  margin-right: 16px;
  border-radius: 25px;
  align-items: center;
  justify-content: center;
  background: ${({state}) => state === 'active' ? 'rgba(0,220,202,0.1)' : 'rgba(255, 255, 255, .1)'};
`;

const ActionContent = styled.View`
  flex: 1;
`;
const TopTitle = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Title = styled.Text`
  font-size: 20px;
  color: #fff;
`;
const TitleStage = styled.Text`
  background: rgba(0,220,202,0.2);
  justify-content: center;
  font-size: 12px;
  color: #fff;
  height: 20px;
  line-height: 20px;
  margin-left: 12px;
  padding: 0 8px;
  border-radius: 4px;
`;

const SubTitle = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, .3);
  margin-top: 4px;
`;

const Right = styled.View`
  width: 52px;
  margin-left: 16px;
  align-items: flex-end;
`;

const StatusText = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, .3);
`;

const ModalBox = styled.View`
  margin: 0 34px;
  border-radius: 8px;
  background: #fff;
  justify-content: space-between;
`;

const ModalTitle = styled.Text`
  font-size: 22px;
  font-weight: 500;
  text-align: center;
  margin-top: 32px;
`;

const ModalContent = styled.Text`
  font-size: 16px;
  line-height: 28px;
  margin: 13px 24px 24px;
  color: rgba(23,23,23,0.7);
`;

const ModalButton = styled.TouchableOpacity`
  border-top-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  padding: 24px;
`;

const ModalButtonText = styled.Text`
  font-size: 18px;
  line-height: 24px;
  font-weight: 500;
  text-align: center;
`;

const ACTION_STATUS = {
  // ?????????????????????????????????????????????
  planned: '?????????',
  active: '?????????',
  done: '?????????',
  expired: '?????????'
}

const SunLightTips = {
/* ?????????????????????[0,2]
- ??????????????? ???????????????????????????????????????
?????????????????????[3,7]
- ??????????????? ?????????????????????????????????????????????????????????????????????
????????????????????????8
- ??????????????? ????????????????????????????????????????????????????????? */
  level1: '???????????????????????????????????????',
  level2: '????????????????????????????????????????????????????????????',
  level3: '?????????????????????????????????????????????????????????',
  default: '????????????????????????????????????'
}


@observer
class CalendarActions extends React.Component {

  @observable tip;
  @observable visible = false;

  constructor(props) {
    super(props);
    this.getWeatherTips();
    this.left = new Animated.Value(system.width - 32);
    this.animation = Animated.loop(Animated.sequence([
      Animated.timing(this.left, {
        toValue: -system.width + 32,
        duration: 10000,
        useNativeDriver: false,
      })
    ]));
  }

  showImageDayOrNight(spaceTime) {
    if (spaceTime >= 6 && spaceTime < 19) {
      return 'day';
    } else {
      return 'night';
    }
  }

  async getWeatherTips() {
    /* const weather = await this.props.session.kvStore.getItem('weather_data');
    const uv = weather.find(w => w.id === 'uv'); */

    let tipGrade;

    // ?????????????????????
    const time = this.showImageDayOrNight(moment().get('hour'));

    if(time === 'day') {
      // ?????????????????????
      // const { level, value, grade, daily } = uv;

      const daily = true;
      const grade = 3;

      if(daily) {
        // const hasValue = value || /\d/.test(value);

        // const todayUV = daily.find(day => day.date === moment().format('YYYY-MM-DD'));
        // const { day, sunrise, sunset } = todayUV;
        const day = {
          weather: '???'
        };
        // ??????????????????
        if(day.weather === '???') {
          tipGrade = this.setGrade(grade);
        } else {
          tipGrade = 'level1';
        }
      } else {
        tipGrade = 'default';
      }
    } else {
      tipGrade = 'level1';
    }
    
    runInAction(() => this.tip = SunLightTips[tipGrade]);
  }

  setGrade(grade) {
    if (grade >= 0 && grade <= 2) {
      return 'level1';
    } else if (grade >= 3 && grade <= 7) {
      return 'level2';
    } else if (grade >= 8) {
      return 'level3';
    } else {
      return 'level1';
    }
  }

  _navigateToAction = (action) => {
    console.log(action);
  }

  renderAction = () => {
    const { data, opacity } = this.props;

    const action = data.item;
    const { type, state, date, progress, target, expired_finish } = action;

    const today = date === moment().format('YYYY-MM-DD');
    const showTip = state === 'active' && type === 'lack_of_sunlight';
    if(showTip) {
      this.animation.start();
    }
    
    const color = '#00DCCA';

    return <View style={{marginBottom: 16}}>
      <ActionLinearGradient opacity={opacity}>
        <Left>
          <ActionIconContainer state={state}>
            <AntDesign name={'dingding'} size={25} color={color} />
          </ActionIconContainer>
          <ActionContent>
            <TopTitle>
              <Title 
                numberOfLines={1}
                ellipsizeMode={'tail'}
              >LDSSB - {action.type.toUpperCase()}</Title>
            </TopTitle>
            <SubTitle 
              numberOfLines={1}
              ellipsizeMode={'tail'}
            >?????????????????????????????????</SubTitle>
          </ActionContent>
        </Left>
        <Right>
          { state === 'active' ?
            <AntDesign name={'arrowright'} size={16} color={'#fff'} /> :
            progress === target ? 
            <StatusText>?????????</StatusText> : 
            <StatusText>{ expired_finish ? '?????????' : ACTION_STATUS[state] }</StatusText>
          }
        </Right>
      </ActionLinearGradient>
      { showTip ? 
        <View style={{
          marginLeft: 16,
          marginRight: 16,
          overflow: 'hidden',
          backgroundColor: 'rgba(250, 250, 250, 0.06)',
          height: 44,
          borderBottomLeftRadius: 8,
          borderBottomRightRadius: 8,
          position: 'relative',
          top: -8,
          paddingLeft: 16
        }}>
          <Animated.View style={{
            position: 'relative',
            left: this.left,
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1
          }}>
            <AntDesign name={'infocirlceo'} size={16} color={'#fff'} />
            <Text style={{
              color: '#fff',
              fontSize: 16,
              marginLeft: 8
            }}>{this.tip}</Text>
          </Animated.View>
        </View> : 
        null }
    </View>
  }

  render() {
    const { data, opacity } = this.props;
    return <>
      <TouchableOpacity
        activeOpacity={opacity ? 1 : null}
        onPress={() => this._navigateToAction(data.item)}>
        {this.renderAction()}
      </TouchableOpacity>
      {/* ???????????? - ??????????????????????????? */}
      <Modal
        visible={this.visible}
        transparent={true}
      >
        <View style={{
          backgroundColor: `rgba(0, 0, 0, 0.5)`,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <ModalBox>
            <ModalTitle>????????????</ModalTitle>
            <ModalContent>???????????????????????????????????????????????????????????????????????????????????????????????????</ModalContent>
            <ModalButton onPress={() => {
              runInAction(() => {
                this.visible = false;
              })
            }}>
              <ModalButtonText>????????????</ModalButtonText>
            </ModalButton>
          </ModalBox>
        </View> 
      </Modal>
    </>
  }
}
export default CalendarActions;

import React from "react";
import { Text, View, Animated } from "react-native";
import moment from 'moment';
import styled from 'styled-components/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CalendarActions from './CalendarActions';
import NoCalendarData from '../img/default-calendar.svg';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { observer } from "mobx-react";
import { action, observable, runInAction, autorun } from "mobx";


const TodayTask = styled.View`
  background: #171717;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 24px 16px 16px 16px;
`;

const TaskTitle = styled.Text`
  font-size: 20px;
  color: #fff;
  font-weight: 500;
`;

const NoCalendarImg = styled(NoCalendarData)`
  height: 147px;
  width: 140px;
`;

const NoPediaContainer = styled.View`
  align-items: center;
  justify-content: center;
  background: #171717;
  margin-top: 108px;
`;

// hiddenrow
const HiddenViewBox = styled.View`
  flex-direction: row;
  margin: 0 16px;
  justify-content: space-between;
`;

const RowLeftBox = styled.View`
`;
const RowRightBox = styled.View`
  flex-direction: row;
`;

const ICON_COLORS = {
  edit: {
    color: '#fff',
    bgColor: 'rgba(255, 255, 255, 0.1)',
    iconName: 'EDIT'
  },
  punch: {
    color: '#00DCCA',
    bgColor: 'rgba(0,220,202,0.2)',
    iconName: 'CALENDAR_RIGHT',
    iconNameStop: 'CALENDAR_STOP'
  },
  delete: {
    color: '#F86060',
    bgColor: 'rgba(248,96,96,0.2)',
    iconName: 'DELETE'
  },
  disabled: {
    color: 'gray'
  }
};

const RowView = styled.TouchableOpacity`
  height: 94px;
  width: 64px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: ${({css}) => ICON_COLORS[css].bgColor};
`;
const RowViewDisabled = styled.View`
  height: 94px;
  width: 64px;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  background: ${({css}) => ICON_COLORS[css].bgColor};
`;

const IconView = styled(AntDesign).attrs(({css}) => ({
  color: ICON_COLORS[css].color
}))`
`;


@observer
class CalendarSwipeListViewTwo extends React.Component {

  @observable leftOpenValue = 72;
  @observable rightOpenValue = -72 * 2;
  @observable disableRightSwipe = false; 
  @observable disableLeftSwipe = false;

  @action.bound
  setRightOpenValue = () => {
    this.rightOpenValue = -72;
  }
  @action.bound
  setRightOpenValueDouble = () => {
    this.rightOpenValue = -72 * 2;
  }
  @action.bound
  setLeftDisabled = () => {
    this.disableRightSwipe = true;
  }
  @action.bound
  setLeftEnable = () => {
    this.disableRightSwipe = false;
  }

  /* 
   * 1. expired - expired_finish(true) => ?????????
   * 2. done(progress === target) => ?????????
   * 2. active => ??????
   * 3. planned => ?????????
  */

  renderItem  = (data) => {
    return <CalendarActions  data={data} opacity={true} navigation={this.props.navigation}/>
  }

  renderHiddenItem = (data) => {
    // console.log('renderHiddenItem', data)
    const action = data.item;
    const { type, state, target, expired_finish, progress } = action;

    // ?????????
    const isExpired = state === 'expired';

    // ??????????????????
    const expiredFinish = state === 'expired' && !expired_finish;

    // ????????? ??? ?????????
    const noPunchFlag = expired_finish || progress === target;
    
    return <HiddenViewBox>
      <RowLeftBox>
        {
          isExpired &&
          <RowViewDisabled css="edit">
            <IconView css="disabled" name={'edit'} size={24}/>
          </RowViewDisabled>
        }
        {
          !isExpired &&
          <RowView css="edit">
            <IconView css="edit" name={'edit'} size={24}/>
          </RowView>
        }
      </RowLeftBox>
      <RowRightBox>
        {
          noPunchFlag &&
          <RowViewDisabled css="punch">
            <IconView css="disabled" name={'check'} size={30}/>
          </RowViewDisabled>
        }
        {
          !noPunchFlag &&
          <RowView css="punch">
            <IconView css="punch" name={'pause'} size={30}/>
          </RowView>
        }
        <RowView css="delete" style={{marginLeft: 8}}>
          <IconView css="delete" name={'delete'} size={30}/>
        </RowView>
      </RowRightBox>
    </HiddenViewBox>
  }

  renderEmpty = () => {
    return <View>
      { this.props.date === moment().format('YYYY-MM-DD') && <TodayTask>
        <TaskTitle>????????????</TaskTitle>
        {/* <RecordsEntry onPress={() => this.props.navigation.navigate('RecordsList')}>
          ??????
        </RecordsEntry> */}
      </TodayTask> }
      <NoPediaContainer>
        <NoCalendarImg />
        <Text style={{color:'rgba(255, 255, 255, .5)', fontSize: 20, fontWeight: '600', marginTop: 20}}>???????????????????????????</Text>
        <Text style={{color:'rgba(255, 255, 255, .3)', fontSize: 16, marginTop: 8}}>???????????????????????????????????????</Text>
      </NoPediaContainer>
    </View>
  }

  onSwipeValueChange = (swipeData) => {
    // console.log('======swipeData', swipeData);
  }

  onRowDidOpen = rowKey => {
    console.log('?????? - This row opened', rowKey);
  }

  render () {
    const { actions, renderSectionHeader } = this.props;
    const key = actions.length ? actions[0].data[0].key : '';

    return <SwipeListView
      useSectionList={true}
      style={{
        backgroundColor: '#171717',
        height: 500
      }}
      // keyExtractor={item => {
      //   // ????????????sections?????????????????????key?????????????????????
      //   return item.id;
      // }}
      sections={actions}
      renderSectionHeader={renderSectionHeader}
      onSwipeValueChange={this.onSwipeValueChange}
      renderItem={this.renderItem}
      renderHiddenItem={this.renderHiddenItem}
      ListEmptyComponent={this.renderEmpty}
      leftOpenValue={this.leftOpenValue}
      rightOpenValue={this.rightOpenValue}
      // disableRightSwipe={this.disableRightSwipe} //??????????????????
      // disableLeftSwipe={this.disableLeftSwipe} //??????????????????????????????????????????????????? - ???????????????
      // previewFirstRow={false} //?????????????????????????????????
      // closeOnRowPress={false} //???????????????????????????????????????
      // closeOnScroll={true} //?????????listview????????????????????????
      // closeOnRowBeginSwipe={false} //????????????????????????????????????????????????

      previewRowKey={key} // ??????????????????key???
      previewOpenValue={-72} // ?????????????????????
      previewOpenDelay={3000}
      onRowDidOpen={this.onRowDidOpen}
    />
  }
}

export default CalendarSwipeListViewTwo;

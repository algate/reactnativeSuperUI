import React from "react";
import { Text, View, Animated } from "react-native";
import moment from 'moment';
import styled from 'styled-components/native';
import { SwipeListView } from 'react-native-swipe-list-view';
import CalendarActions from './CalendarActions';
import { observer } from "mobx-react";
import NoCalendarData from '../img/default-calendar.svg';


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

const TaskNofi = styled.Text`
  font-size: 16px;
  color: rgba(255, 255, 255, 0.3);
`;

const RecordsEntry = styled.Text`
  font-size: 16px;
  color: #00DCCA;
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




@observer
class CalendarSwipeListView extends React.Component {

  renderItem  = (data) => {
    return <CalendarActions  data={data} navigation={this.props.navigation}/>
  }

  renderEmpty = () => {
    return <View>
      { this.props.date === moment().format('YYYY-MM-DD') && <TodayTask>
        <TaskTitle>今日待办</TaskTitle>
        {/* <RecordsEntry onPress={() => this.props.navigation.navigate('RecordsList')}>
          记录
        </RecordsEntry> */}
      </TodayTask> }
      <NoPediaContainer>
        <NoCalendarImg />
        <Text style={{color:'rgba(255, 255, 255, .5)', fontSize: 20, fontWeight: '600', marginTop: 20}}>你这一天没有行动喔</Text>
        <Text style={{color:'rgba(255, 255, 255, .3)', fontSize: 16, marginTop: 8}}>去做点自己感兴趣的事情吧～</Text>
      </NoPediaContainer>
    </View>
  }

  render () {
    const { actions, renderSectionHeader, onSwipeValueChange, renderHiddenItem } = this.props;
    return <SwipeListView
      useSectionList={true}
      style={{
        backgroundColor: '#171717',
        height: 500
      }}
      sections={actions}
      renderSectionHeader={renderSectionHeader}
      onSwipeValueChange={onSwipeValueChange}
      renderItem={this.renderItem}
      renderHiddenItem={renderHiddenItem}
      ListEmptyComponent={this.renderEmpty}
      leftOpenValue={72}
      rightOpenValue={-150}
      disableRightSwipe={false} //禁止右侧滑动
      disableLeftSwipe={false} //禁止左侧侧滑动（行动无效或者完成后 - 禁止滑动）
      previewFirstRow={false} //第一行具有滑动预览效果
      closeOnRowPress={false} //当按下一行时，关闭打开的行
      closeOnScroll={true} //当滚动listview时，关闭打开的行
      closeOnRowBeginSwipe={false} //当行开始滑动打开时，关闭打开的行
    />
  }
}

export default CalendarSwipeListView;

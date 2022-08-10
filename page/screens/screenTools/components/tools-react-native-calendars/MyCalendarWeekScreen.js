import React from 'react';
import { Text, View, Animated } from 'react-native';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import moment from 'moment';
import { 
  appStackNavigationOptions, 
  NAVIGATION_TOP_AREA_HEIGHT 
} from '../../../../config/navigation';
import { calendarData } from './calendarDate';
import CalendarSwipeListView from './components/CalendarSwipeListView';
import AntDesign from 'react-native-vector-icons/AntDesign';


// Calendar
const WEEK_HEIGHT = 48; // react-native-calendars里这个值被写死了
const DAY_WIDTH = 36;

const CalendarContainer = styled.View`
  padding-top: ${({ headerHeight }) => headerHeight}px;
  padding-bottom: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  overflow: hidden;
  background-color: black;
`;

const MonthText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #fff;
  margin-left: 16px;
`;

const DayNamesContainer = styled.View`
  margin: 0 16px;
  margin-top: 8px;
  height: 28px;
  border-radius: 6px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DayName = styled.Text`
  width: ${DAY_WIDTH}px;
  text-align: center;
  font-size: 16px;
  line-height: 22px;
  opacity: ${({ highlight }) => highlight ? 1 : 0.8};
  color: #fff;
`;

const WeekContainer = styled.View`
  margin-top: 8px;
  height: ${WEEK_HEIGHT}px;
`;

const WEEK_THEME = {
  calendarBackground: 'transparent',
  stylesheet: {
    expandable: {
      main: {
        week: {
          height: WEEK_HEIGHT,
          paddingRight: 16,
          paddingLeft: 16,
          flexDirection: 'row',
          justifyContent: 'space-between',
        },
        dayContainer: {}, // 不要删
      }
    }
  }
};

const DayContainer = styled.TouchableOpacity`
  height: ${WEEK_HEIGHT}px;
  width: ${DAY_WIDTH}px;
  align-items: center;
  justify-content: center;
`;

const DayText = styled.Text`
  font-size: 20px;
  line-height: 24px;
  color: ${({ theme, state }) => {
    /* const { white, white30, green } = theme.colors; */
    const { white, white30, green } = { white: '#fff', white30: 'rgba(255, 255, 255, .3)', green: '#00DCCA'};
    return state === 'disabled' ? white30
      : state === 'selected' ? green
      : white;
  }};
`;

const MarkContainer = styled.View`
  margin-top: 4px;
  width: 12px;
  height: 12px;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background: #fff;
  background: #00DCCA;
`;

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

const RowView = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  flex: 1;
`;


@observer
class MyCalendarWeekScreen extends React.Component {

  static options = appStackNavigationOptions(({ route }) => ({
    title: '日历',
    float: true,
    // scrollAnimator: route.params?.scrollAnimator,    
    // ...TransitionPresets.ModalSlideFromBottomIOS
  }));

  constructor() {
    super();
  }

  @observable date = moment().format('YYYY-MM-DD');
  @observable month = moment().format('YYYY年MM月');
  @observable _value = {};

  @computed get actions() {
    // const { days } = this.props.calendarActions;
    // console.log(JSON.stringify(days, null, 2));

    const days = calendarData;

    console.log(days);

    const actions = days.find(day => day.date === this.date)?.actions ?? [];
    let sectionActions = [];
    const plannedActions = actions.filter(action => action.state === 'planned');
    const todayUnfinishedActionsCache = actions.filter(action => action.state === 'active');

    // 做动画使用的逻辑 - 不要删
    const todayUnfinishedActions = todayUnfinishedActionsCache.map(a => ({...a, key: a.type}));

    todayUnfinishedActions.forEach(a => {
      runInAction(() => {
        this._value[a.key] = new Animated.Value(0);
      })
    })

    const todayFinishedActions = actions.filter(action => action.state === 'done');
    const todayExpiredActions = actions.filter(action => action.state === 'expired');
    if(todayUnfinishedActions.length > 0) {
      sectionActions.push({
        title: '今日待办',
        data: todayUnfinishedActions,
        // 隐藏记录入口
        record: false
      });
      this.hasNoTodayUnfinishedAcions = false;
    } else {
      this.hasNoTodayUnfinishedAcions = true;
    }
    if(plannedActions.length > 0) {
      sectionActions.push({
        title: '未来待办',
        data: plannedActions,
        nofi: '不可提前完成'
      });
    }
    if (todayFinishedActions.length > 0) {
      sectionActions.push({
        title: '已完成',
        data: todayFinishedActions
      })
    }
    if (todayExpiredActions.length > 0) {
      sectionActions.push({
        title: '已过期',
        data: todayExpiredActions
      })
    }

    return sectionActions;
  }

  @computed get markedDates() {
    const markedDates = {};
    // this.props.calendarActions.days.forEach(day => {
    const days = calendarData;
    days.forEach(day => {
      markedDates[day.date] = day.status;
    });
    return markedDates;
  }

  onDateChanged = (date, updateSource) => {
    runInAction(() => this.date = date);
    // this.props.calendarActions.ensureData(date);
  };

  onMonthChange = (month, updateSource) => {
    runInAction(() => {
      this.month = moment(month.dateString).format('YYYY年MM月');
    });
  };

  renderHiddenItem = (data, map) => {
    const action = data.item;
    const { type, state, date, target } = action;
    
    return <View style={{
      flexDirection: 'row',
      justifyContent: 'flex-end',
      marginRight: 16,
      overflow: 'hidden'
    }}>
      <Animated.View style={{
        height: 94,
        width: 64,
        borderRadius: 8,
        backgroundColor: 'rgba(0,220,202,0.2)',
        position: 'relative',
        left: this._value[data.item.key].interpolate({
          inputRange: [-72, 0],
          outputRange: [0, 64],
          extrapolate: 'clamp',
        })
      }}>
        <RowView>
          <AntDesign name={'delete'} size={30} color={'#00DCCA'}/>
        </RowView>
      </Animated.View>
    </View>
  }

  onSwipeValueChange = (swipeData) => {
    // console.log('======swipeData', swipeData);
    const { key, value } = swipeData;
    if(key) {
      // 滑动动画
      // this.animatedValues[key].setValue(Math.abs(value));
      this._value[key].setValue(value);
    }
  }

  renderSectionHeader = ({section}) => {
    return <View>
      <TodayTask>
        <TaskTitle>{section.title}{
          section.nofi && <TaskNofi>{'  '}{section.nofi}</TaskNofi>
        }</TaskTitle>
        { section.record && <RecordsEntry onPress={() => this.props.navigation.navigate('RecordsList')}>
          记录
        </RecordsEntry> }
      </TodayTask>
    </View>
  }

  renderDayNames() {
    const dayNames = ['日', '一', '二', '三', '四', '五', '六'];
    const date = moment(this.date);
    const now = moment();
    if (
      date.weekYear() === now.weekYear()
      && date.week() === now.week()
    ) {
      dayNames[now.day()] = '今';
    }

    return (
      <DayNamesContainer>
        {dayNames.map((dayName, idx) => (
          <DayName key={idx} highlight={idx === date.day()}>
            {dayName}
          </DayName>
        ))}
      </DayNamesContainer>
    );
  }


  renderHeaderRecord = () => {
    return <View>
      { this.date === moment().format('YYYY-MM-DD') && <TodayTask>
        <TaskTitle>今日待办</TaskTitle>
        {false && <RecordsEntry onPress={() => this.props.navigation.navigate('RecordsList')}>
          记录
        </RecordsEntry>}
      </TodayTask>}
    </View>
  }

  render() {
    // 今日有行动，但是没有今日待办
    const showHeaderRecord = this.actions.length > 0 && this.hasNoTodayUnfinishedAcions;
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#171717'
      }}>
        <CalendarContainer headerHeight={91}>
          <MonthText>{this.month}</MonthText>
          {this.renderDayNames()}
          <WeekContainer>
            <CalendarProvider
              date={this.date}
              onDateChanged={this.onDateChanged}
              onMonthChange={this.onMonthChange}
            >
              <WeekCalendar
                hideDayNames
                allowShadow={false}
                theme={WEEK_THEME}
                markedDates={this.markedDates}
                dayComponent={({ date, state, marking, onPress }) => {
                  return (<DayContainer onPress={() => onPress(date)}>
                    <DayText state={state}>{date.day}</DayText>
                    <MarkContainer>
                      { marking === 'done'
                        ? <AntDesign name={'check'} size={12} color={'#00DCCA'} />
                        : marking === 'unfinished'
                        ? <Dot/>
                        : null
                      }
                    </MarkContainer>
                  </DayContainer>
                )}}
              />
            </CalendarProvider>
          </WeekContainer>
        </CalendarContainer>
        {
          showHeaderRecord && this.renderHeaderRecord() 
        }
        <CalendarSwipeListView
          date={this.date}
          actions={this.actions}
          onSwipeValueChange={this.onSwipeValueChange}
          renderSectionHeader={this.renderSectionHeader}
          navigation={this.props.navigation}
          renderHiddenItem={this.renderHiddenItem}
        />
      </View>
    );
  }
}

export default MyCalendarWeekScreen;

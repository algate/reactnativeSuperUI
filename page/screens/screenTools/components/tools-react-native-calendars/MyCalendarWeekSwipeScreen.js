import React from 'react';
import { Text, View, Animated } from 'react-native';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import moment from 'moment';
import { createNavigationScrollAnimator, 
  appStackNavigationOptions, 
  NAVIGATION_TOP_AREA_HEIGHT 
} from '../../../../config/navigation';
import { calendarData } from './calendarDate';
import CalendarSwipeListViewTwo from './components/CalendarSwipeListViewTwo';
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


@observer
class MyCalendarWeekSwipeScreen extends React.Component {

  static options = appStackNavigationOptions(({ route }) => ({
    title: '日历',
    float: true
  }));

  constructor() {
    super();
  }

  @observable date = moment().format('YYYY-MM-DD');
  @observable month = moment().format('YYYY年MM月');

  @computed get actions() {
    const days = calendarData;
    const actionDays = days.find(day => day.date === this.date)?.actions ?? [];

    const actions = actionDays.map((action, index) => ({
      ...action,
      key: action.id
    }));

    let sectionActions = [];
    const plannedActions = actions.filter(action => action.state === 'planned');
    const todayUnfinishedActions = actions.filter(action => action.state === 'active');
    const todayFinishedActions = actions.filter(action => action.state === 'done');
    const todayExpiredActions = actions.filter(action => action.state === 'expired');

    /* if(todayUnfinishedActions.length > 0) {
      sectionActions.push({
        title: '今日待办',
        data: todayUnfinishedActions,
        // 隐藏记录入口
        record: true
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
    } */

    if(this.date === moment().format("YYYY-MM-DD")) {
      if(todayUnfinishedActions.length > 0) {
        sectionActions.push({
          title: '今日待办',
          key: 'active',
          data: todayUnfinishedActions,
          // 隐藏记录入口
          record: true
        });
        this.hasNoTodayUnfinishedAcions = false;
      } else {
        this.hasNoTodayUnfinishedAcions = true;
      }
      if (todayFinishedActions.length > 0) {
        sectionActions.push({
          title: '已完成',
          key: 'done',
          data: todayFinishedActions
        })
      }
    }
    if(this.date < moment().format("YYYY-MM-DD")) {
      if (todayExpiredActions.length > 0) {
        sectionActions.push({
          title: '已过期',
          key: 'expired',
          data: todayExpiredActions
        })
      }
    }
    if(this.date > moment().format("YYYY-MM-DD")) {
      if(plannedActions.length > 0) {
        sectionActions.push({
          title: '未来待办',
          key: 'planned',
          data: plannedActions,
          nofi: '不可提前完成'
        });
      }
    }
    console.log('refresh === ');

    this.refresh = true;
    return sectionActions;
  }

  changeRefresh() {
    console.log('changrefresh');
    runInAction(() => {
      this.refresh = false;
    })
  }

  @computed get markedDates() {
    const markedDates = {};
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
                  return (<DayContainer onPress={() => {
                      onPress(date);
                      this.changeRefresh();
                    }}>
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
        { this.refresh &&
          <CalendarSwipeListViewTwo
            date={this.date}
            actions={this.actions}
            renderSectionHeader={this.renderSectionHeader}
            navigation={this.props.navigation}
          />
        }
      </View>
    );
  }
}

export default MyCalendarWeekSwipeScreen;

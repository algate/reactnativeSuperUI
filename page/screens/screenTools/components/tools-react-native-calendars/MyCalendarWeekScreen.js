import React from 'react';
import { Text } from 'react-native';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { CalendarProvider, WeekCalendar } from 'react-native-calendars';
import moment from 'moment';

const WEEK_HEIGHT = 48; // react-native-calendars里这个值被写死了
const DAY_WIDTH = 36;

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: stretch;
  background: #444;
`;

const CalendarContainer = styled.View`
  /* padding-top: 91px; */
  padding-bottom: 16px;
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
  overflow: hidden;
  background-color: black;
`;

const MonthText = styled.Text`
  margin-top: 12px;
  margin-left: 26px;
  font-size: 18px;
  font-weight: 600;
  line-height: 25px;
  color: #fff;
`;

const DayNamesContainer = styled.View`
  padding: 0 16px;
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
  color: #fff;
  opacity: ${({ highlight }) => highlight ? 1 : 0.5};
`;

const WeekContainer = styled.View`
  margin-top: 8px;
  height: ${WEEK_HEIGHT}px;
`;

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
    return state === 'disabled' ? 'gray'
      : state === 'selected' ? '#00DCCA'
      : '#fff';
  }};
`;

const MarkContainer = styled.View`
  margin-top: 4px;
  width: 12px;
  height: 20px;
  justify-content: center;
  align-items: center;
`;

const Dot = styled.View`
  width: 4px;
  height: 4px;
  border-radius: 2px;
  background-color: #00DCCA;
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

@observer
class MyCalendarWeekScreen extends React.Component {

  @observable date = moment().format('YYYY-MM-DD');
  @observable month = moment().format('YYYY年MM月');
  @observable enableStartDate = '2022-06-28';
  @observable enableEndDate = '2022-07-02';

  constructor() {
    super();
  }

  @computed get markedDates() {
    const markedDates = {
      '2022-06-22': { marked: 'done' },
      '2022-06-23': { marked: 'unfinished'},
    };
    return markedDates;
  }

  cancleDisabledStartEndDate = () => {
    runInAction(() => {
      this.enableStartDate = null;
      this.enableEndDate = null;
    });
  }

  onDateChanged = (date, updateSource) => {
    // runInAction(() => this.date = date);
  };

  onMonthChange = (month, updateSource) => {
    runInAction(() => {
      this.month = moment(month.dateString).format('YYYY年MM月');
    });
    console.log('month', this.month);
  };

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

  render() {
    console.log(this.month);
    return (
      <Container>
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
                  return (
                    <DayContainer onPress={() => onPress(date)}>
                      <DayText state={state}>{date.day}</DayText>
                      <MarkContainer>
                        { marking?.marked === 'done'
                          ? <Text style={{color: '#00DCCA'}}>✓</Text>
                          : marking?.marked === 'unfinished'
                          ? <Dot/>
                          : null
                        }
                      </MarkContainer>
                    </DayContainer>
                  )}
                }
              />
            </CalendarProvider>
          </WeekContainer>
        </CalendarContainer>
      </Container>
    )
  }
}

export default MyCalendarWeekScreen;

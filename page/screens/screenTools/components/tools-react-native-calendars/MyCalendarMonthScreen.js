import React from 'react';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';

const Months = ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月',]

LocaleConfig.locales['CN'] = {
  monthNames: Months,
  monthNamesShort: Months,
  dayNames: ['日', '一', '二', '三', '四', '五', '六'],
  dayNamesShort: ['日', '一', '二', '三', '四', '五', '六']
};
LocaleConfig.defaultLocale = 'CN';

const INITIAL_DATE = '2022-06-22';
const WEEK_HEIGHT = 48; 

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: stretch;
  background-color: #fff;
`;
const CalendarBox = styled.View.attrs((props) => {
  console.log(props.theme);
})``;

const WEEK_THEME = {
  // calendarBackground: 'transparent',
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
  },

  // backgroundColor: 'red',
  calendarBackground: '#ccc',

  // month
  monthTextColor: 'red',
  indicatorColor: 'red',    // loading指示器颜色
  textMonthFontSize: 18,
  textMonthFontWeight: '500',

  // date - font-weight
  textSectionTitleColor: '#000',
  textDayHeaderFontSize: 16,
  textDayHeaderFontWeight: '500',
  // date - disabled - color
  textSectionTitleDisabledColor: 'gray',

  // day - font-size
  textDayFontSize: 16,
  textDayFontWeight: '500',
  todayTextColor: '#00adf5',
  dayTextColor: '#000',
  selectedDayTextColor: 'red',
  textDisabledColor: 'gray',
  // day - background 
  selectedDayBackgroundColor: 'blue',
  // dot(marked)
  dotColor: '#00adf5',
  selectedDotColor: '#00adf5',

  // other
  // textDayFontFamily: 'Din Pro',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  
};

@observer
class MyCalendarMonthScreen extends React.Component {

  @observable date = moment().format('YYYY-MM-DD');
  @observable enableStartDate = '2022-06-28';
  @observable enableEndDate = '2022-07-02';


  @computed get markedDates() {
    const markedDates = {
      '2022-06-14': { selected: true, dotColor: '#50cebb' },
      '2022-06-15': { marked: true, dotColor: '#50cebb' },
      '2022-06-16': { marked: true, dotColor: '#50cebb' },
      
      '2022-06-28': { startingDay: true, color: '#50cebb', textColor: 'white' },
      '2022-06-29': { color: '#70d7c7', textColor: 'white' },
      '2022-06-30': { color: '#70d7c7', textColor: 'white', marked: true, dotColor: 'white' },
      '2022-07-01': { color: '#70d7c7', textColor: 'white' },
      '2022-07-02': { endingDay: true, color: '#50cebb', textColor: 'white' }
    };
    return markedDates;
  }

  cancleDisabledStartEndDate = () => {
    runInAction(() => {
      this.enableStartDate = null;
      this.enableEndDate = null;
    });
  }

  onMonthChange = (month, updateSource) => {
    console.log('onMonthChange', month);
  };

  onDayPress = (day) => {
    this.cancleDisabledStartEndDate();
    // console.log(day);
    /* runInAction(() => {
      this.date = day.dateString;
    }) */
  };

  render() {
    return (
      <Container>
        <CalendarBox>
          <CalendarList
            // date={this.date}

            markingType={'period'}
            markedDates={this.markedDates}
            // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
            // 可被选中的最小日期
            minDate={this.enableStartDate} 
            // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
            // 可被选中的最大日期
            maxDate={this.enableEndDate} 
            // 设置minDate和MaxDate之后是否允许选择范围之外的日期
            allowSelectionOutOfRange={true}

            theme={WEEK_THEME}
            // current={INITIAL_DATE}
            // 允许滚动到过去的最大月数
            pastScrollRange={0}
            // 可以滚动到未来的最长时间
            futureScrollRange={1}
            // 跨周滚动
            pagingEnabled
            // scrollEnabled

            onDayPress={this.onDayPress}
            
            horizontal
            // 是否使用不滚动的固定标题(当horizontal = true时) - 固定 month 和 date
            staticHeader={false}
            // 日历标题
            monthFormat={'yyyy M月'} 
            // 补齐月末月尾的日期 
            hideExtraDays={false} 
            // If firstDay=1 week starts from Monday. Note that dayNames and dayNamesShort should still start from Sunday
            firstDay={0}  // 一周的起始（日 - 0，一 - 1）
            hideDayNames={false}  // 隐藏星期
            onMonthChange={
              (month) => {
                console.log('onMonthChange', month)
              }
            }
            disableArrowLeft
            disableArrowRight

            // 在header出显示loading指示器
            displayLoadingIndicator={false}

            // 是否对选定的日期索引应用自定义禁用颜色 (周日和周六)
            disabledDaysIndexes={[0, 6]}

            // 是否禁用禁用天的所有触摸事件(可以使用' markddates '中的'disableTouchEvent'覆盖)
            // disableAllTouchEventsForDisabledDays
            // 是否禁用非活动日期的所有触摸事件(可以使用' markddates '中的'disableTouchEvent'覆盖)
            // disableAllTouchEventsForInactiveDays
          />
        </CalendarBox>
      </Container>
    )
  }
}

export default MyCalendarMonthScreen;

import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { computed, observable, runInAction } from 'mobx';
import { observer } from 'mobx-react';
import styled from 'styled-components/native';
import { CalendarList, LocaleConfig } from 'react-native-calendars';
import moment from 'moment';
import Dialog from '../../../../components/Dialog';
import { appStackNavigationOptions } from '../../../../config/navigation';
import { TransitionPresets } from '@react-navigation/stack';

const now = moment();

const Months = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
let dayNames = ['日', '一', '二', '三', '四', '五', '六'];
dayNames[now.day()] = '今';

LocaleConfig.locales['CN'] = {
  monthNames: Months,
  monthNamesShort: Months,
  dayNames: dayNames,
  dayNamesShort: dayNames
};
LocaleConfig.defaultLocale = 'CN';

const WEEK_HEIGHT = 48; 

const Container = styled.SafeAreaView`
  width: 100%;
  height: 100%;
  align-items: stretch;
  background: #FAFAFA;
`;
const CalendarBox = styled.View.attrs((props) => {
})``;

const HandleTipBox = styled.View`
  background: #fff;
  padding: 24px 16px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;
const TipTitle = styled.Text`
  font-size: 16px;
  line-height: 22px;
`;
const TipContent = styled.Text`
  font-size: 14px;
  line-height: 20px;
  margin-top: 8px;
  color: rgba(0,0,0,0.5);
`;

const HealthPlanListBox = styled.ScrollView`
  background: #fff;
`;

const PlanDataBox = styled.View`
  margin: 0 16px;
  margin-bottom: 16px;
  flex-direction: row;
  justify-content: space-between;
`;

const PlanData = styled.TouchableOpacity`
  height: 56px;
  border-radius: 8px;
  background: #F7F7F7;
  padding: 0 16px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlanDataNoPress = styled.View`
  height: 56px;
  border-radius: 8px;
  background: #F7F7F7;
  padding: 0 16px;
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const PlanNumBox = styled.View`
  background: #000; 
  border-radius: 4px;
  height: 18px;
  width: 42px;
  justify-content: center;
  align-items: center;
`;
const PlanNum = styled.Text`
  font-size: 10px;
  color: #fff;
`;
const PlanDate = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const BtnBox = styled.View`
  margin-left: 8px;
`;

const Btn = styled.TouchableOpacity`
  height: 56px;
  width: 92px;
  border-radius: 8px;
  border: 1px solid;
  justify-content: center;
  align-items: center;
`;

const BtnText = styled.Text`
  font-size: 18px;
  font-weight: 500;
`;

const RequestBtnBox = styled.View`
  position: absolute;
  bottom: 0;
  width: 100%;
  background: #fff;
  padding-top: 16px;
`;

const RequestBtn = styled.TouchableOpacity`
  margin: 0 16px;
  background: ${
    ({type}) => type === 'save' ? 
    '#00DCCA' : type === 'cancel' ? 
    '#F7F7F7' : '#fff'
  };
  border-radius: 28;
  height: 56px;
  justify-content: center;
  align-items: center;
  margin-bottom: 12px;
`;

const RequestBtnText = styled.Text`
  color: ${
    ({type}) => type === 'save' ? 
    '#fff' : type === 'cancel' ? 
    'rgba(0,0,0,0.3)' : 'rgba(250,107,107,0.8)'
  };
  font-size: 18px;
  font-weight: 500;
`;

const textColor = {
  textColor: '#fff'
};
const periodColor = {
  color: '#00DCCA'
};
const dotColor = {
  dotColor: '#fff'
};

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
    },
    day: {
      period: {
      }
    }
  },

  // backgroundColor: 'red',
  calendarBackground: '#FAFAFA',

  // month
  monthTextColor: '#000',
  indicatorColor: 'red',    // loading指示器颜色
  textMonthFontSize: 18,
  textMonthFontWeight: '500',

  // date
  textSectionTitleColor: '#000',
  textDayHeaderFontSize: 16,
  textDayHeaderFontWeight: '500',
  // (与 disabledDaysIndexes 属性相关联)
  textSectionTitleDisabledColor: '#999',

  // day
  textDayFontSize: 16,
  textDayFontWeight: '500',
  todayTextColor: '#00adf5',
  dayTextColor: '#000',
  selectedDayTextColor: '#000',
  textDisabledColor: 'gray',
  selectedDayBackgroundColor: '#fff',
  // dot(marked)(可以在 markedDates 中自定义颜色)
  dotColor: '#00DCCA',
  selectedDotColor: '#00adf5',

  // other - 字体
  // textDayFontFamily: 'Din Pro',
  // textMonthFontFamily: 'monospace',
  // textDayHeaderFontFamily: 'monospace',
  
};

const Num = ['一', '二', '三', '四', '五', '六', '七'];

@observer
class MyCalendarMonthScreen extends React.Component {

  static options = appStackNavigationOptions(({ theme }) => {
    return {
      title: '查看计划',
      dark: false,
      backIcon: 'logo-firebase',      
      headerStyle: {
        backgroundColor: '#FAFAFA',
      },
      ...TransitionPresets.ModalSlideFromBottomIOS,
    };
  });

  @observable markingType = 'dot';
  @observable date = moment().format('YYYY-MM-DD');
  @observable enableStartDate = '';
  @observable enableEndDate = '';
  @observable markedDates = {};

  @observable planDataScale = [];
  @observable planDataList = [];
  @observable index = 0;

  @observable requestBtn = false;
  @observable currentdate = '';

  constructor(props) {
    super(props);
    // 获取计划
    this.getPlans();
  }

  getPlans = async () => {
    // const { queryPlanScale } = this.props.calendarActions;
    // const plans  = await queryPlanScale();
    const plans = [
      {
        "type": "item",
        "section": "plan",
        "id": "random_basic_urinalysis",
        "name": "基础-随机尿液检测",
        "date": "2022-06-28",
        "adjustable_date": [
            "2022-06-28",
            "2022-07-04"
        ]
      },
      {
        "type": "item",
        "section": "plan",
        "id": "random_basic_urinalysis",
        "name": "基础-随机尿液检测",
        "date": "2022-07-05",
        "adjustable_date": [
            "2022-07-05",
            "2022-07-11"
        ]
      }
    ];
    const diffTime = moment(plans[0].adjustable_date[1]).diff(plans[0].adjustable_date[0]);
    this.spaceTime = diffTime/1000/60/60/24;
    /* this.planScale = [
      [
        "2022-06-28",
        "2022-07-04"
      ],
      [
        "2022-07-05",
        "2022-07-11"
      ]
    ]; */
    this.planScale = plans.map(plan => plan.adjustable_date);

    // 获取周期内的检测行动
    this.getActions(this.planScale);
  }

  getActions = async (planScale) => {
    const start = planScale[0][0];
    const end = planScale[planScale.length - 1][1];

    /* const { queryActions } = this.props.calendarActions;
    const actions = await queryActions(start, end); */
    const actions = [
      {
        date: "2022-06-28",
        actions: [
          {
            date: "2022-06-28",
            type: "random_basic_urinalysis"
          }
        ]
      },
      {
        date: "2022-07-06",
        actions: [
          {
            date: "2022-07-06",
            type: "random_basic_urinalysis"
          }
        ]
      }
    ];

    console.log('actions', actions);

    if(planScale.length !== actions.length) {
      planScale = this.filterScale(planScale, actions);
    }

    console.log('planScale', planScale);

    runInAction(() => {
      this.planDataList = actions.map(action => ({...action, show: false}));
      this.markedDates = this.setSelectedDate(this.planDataList);
      this.planDataScale = planScale;
    })
  }

  // 行动删除之后会导致 行动的数组和计划的数组不对应
  filterScale = (planScale, actions) => {
    let cacheScale = [];
    for(let i = 0; i < planScale.length; i++) {
      const start = planScale[i][0];
      const end = planScale[i][1];
      if(start === end) {
        if(actions.find(action => action.date === start)) {
          cacheScale.push(planScale[i]);
        }
      } else {
        let a = start;
        let arr = [a];
        while(a < end) {
          a = moment(a).add(1, 'day').format('YYYY-MM-DD');
          arr.push(a);
          if(a === end) {
            break;
          }
        }
        for(let j = 0; j < actions.length; j++) {
          if(arr.find(a => a === actions[j].date)){
            cacheScale.push(planScale[i]);
          }
        }
      }
    }
    return cacheScale;
  }

  // public - 日历中选中日期标记
  setSelectedDate = (dates) => {
    let obj = {};
    dates.forEach(data => {
      const date = data.date;
      obj[date] = {
        marked: true
      }
    })
    return obj;
  }

  showRequestBtn = () => {
    runInAction(() => {
      this.requestBtn = true;
    })
  }
  hideRequestBtn = () => {
    runInAction(() => {
      this.requestBtn = false;
    })
  }

  // 点击列表方法
  clickActionDate = (data, index) => {
    // 如果日期过期不支持修改
    if(data.date < moment().format('YYYY-MM-DD')) {
      Dialog.alert({
        title: '提示',
        message: '该行动已过期不支持修改',
        confirmText: '知道了'
      });
      return;
    }

    this.hideRequestBtn();
    if(data.show) {
      runInAction(() => {
        this.markingType = 'dot';
        this.enableStartDate = null;
        this.enableEndDate = null;
        this.markedDates = this.setSelectedDate(this.planDataList);

        this.planDataList[index].show = false;
      });
      return;
    }

    this.setMarkedDates();

    runInAction(() => {
      this.markingType = 'dot';
      this.markedDates = {
        [data.date]: {
          marked: true
        }
      }

      this.planDataList[index].show = true;
    });

    console.log(this.planDataList[index]);
  }

  // public
  setMarkedDates () {
    runInAction(() => {
      this.planDataList.map(data => data.show = false);
    });
  }

  // public 标记日历周期范围
  setPeriodDates (markedDate, start, end) {
    const style = {
      ...periodColor,
      ...textColor,
      ...dotColor
    };


    let a = start;
    let dateObj = {};

    if(start === end) {
      dateObj[start] = {
        ...style,
        startingDay: true
      }
      dateObj[end] = {
        ...style,
        endingDay: true
      }
    } else {
      dateObj[start] = {
        ...style,
        startingDay: true
      };
      while(a < end) {
        a = moment(a).add(1, 'day').format('YYYY-MM-DD');
        dateObj[a] = {
          ...style
        };
        if(a === end) {
          dateObj[end] = {
            ...style,
            endingDay: true
          }
        }
        if(a > end) {
          break;
        }
      }
    }

    dateObj[markedDate].marked = true;
    return dateObj;
  }

  // 点击编辑按钮
  cancleDisabledStartEndDate = (data, index) => {
    // 存储变化之前的日期
    this.cacheDate = JSON.parse(JSON.stringify(data.date));

    const startDate = this.planDataScale[index][0];
    const endDate = this.planDataScale[index][1];
    const dateArray = this.setPeriodDates(data.date, startDate, endDate);

    runInAction(() => {
      this.index = index;
      this.currentdate = data.date;

      this.enableStartDate = startDate;
      this.enableEndDate = endDate;
      this.markingType = 'period';
      this.markedDates = dateArray;
    });

    this.showRequestBtn();
  }

  onMonthChange = (month, updateSource) => {
    console.log('onMonthChange', month);
  };

  onDayPress = (day) => {
    if(day.dateString < moment().format('YYYY-MM-DD')) {
      return;
    }
    // 非编辑状态返回
    if(!this.requestBtn) {
      return;
    }
    // 不在编辑范围内
    if(!this.markedDates[day.dateString]) {
      return;
    }
    if(this.markedDates && Object.keys(this.markedDates).length) {
      if(this.markedDates[day.dateString]) {
        runInAction(() => {
          // 此处必须重新设置，否则this.markedDates设置marked不会生效
          this.planDataList[this.index].date = day.dateString;

          for(let date in this.markedDates){
            this.markedDates[date].marked = false;
          }
          this.markedDates[day.dateString].marked = true;

          this.currentdate = day.dateString;
        })
      }
    }
  };

  requestSave = () => {
    this.saveActions();
    runInAction(() => {
      this.requestBtn = false;
      this.markingType = 'dot';
      this.enableStartDate = null;
      this.enableEndDate = null;
      this.markedDates = {
        [this.currentdate]: {
          marked: true
        }
      }
    });
  }

  async _save(func, flag) {
    try {
      await func();

      const tip = flag === 'update' ?
        '修改' : '删除'

      const key = await Dialog.alert({
        // title: '提示',
        message: `${tip}成功了`,
        confirmText: '我知道了',
      });
      // 获取周期内的检测行动
      this.getActions(this.planScale);
    } catch {

    }
  }

  async saveActions() {
    /* const { calendarActions } = this.props; 
    let btn_cmd = "update_action";
    let create_params = {
      date: this.cacheDate,
      to_date: this.currentdate
    };
    const func = calendarActions.getActionCmd(btn_cmd);

    const actionID = this.planDataList[this.index].actions[0].type;

    let saveFunc = async () => {
      await func(actionID, { create_params })
    }

    await this._save(saveFunc, 'update'); */

    this.getActions(this.planScale);
  }


  requestCancel = () => {
    runInAction(() => {
      this.requestBtn = false;
      this.enableStartDate = null;
      this.enableEndDate = null;
      this.planDataList[this.index].show = false;
      this.markingType = 'dot';
      if(this.currentdate !== this.cacheDate) {
        this.planDataList[this.index].show = false;
        this.planDataList[this.index].date = this.cacheDate;
      }
      this.markedDates = this.setSelectedDate(this.planDataList);
    });
  }

  async removeActions() {
    /* const { calendarActions } = this.props; 
    let btn_cmd = "remove_action";
    let create_params = {
      date: this.cacheDate
    };
    const actionID = this.planDataList[this.index].actions[0].type;

    const func = calendarActions.getActionCmd(btn_cmd);

    let removeFunc = async () => {
      await func(actionID, { create_params })
    }

    await this._save(removeFunc, 'delete'); */


    this.getActions(this.planScale);
  }

  requestDelete = async () => {
    const key = await Dialog.confirm({
      title: '提示',
      message: '您是否删除当前检测',
      confirmText: '确定',
      cancelText: '取消'
    });
    if (key === 'confirm') {
      this.removeActions();
      this.hideRequestBtn();
      runInAction(() => {
        this.requestBtn = false;
        this.markingType = 'dot';
        this.enableStartDate = null;
        this.enableEndDate = null;
      });
    }
  }

  resetHealthPlan = async () => {
    const key = await Dialog.confirm({
      title: '提示',
      message: '您是否恢复默认检测计划',
      confirmText: '确定',
      cancelText: '取消'
    });
    if (key === 'confirm') {
      console.log('恢复默认');
    }
  }

  render() {
    return (
      <Container>
        <CalendarBox>
          <CalendarList
            // date={this.date}

            markingType={this.markingType}
            markedDates={this.markedDates}
            // 可被选中的最小日期
            minDate={this.enableStartDate}
            // 可被选中的最大日期
            maxDate={this.enableEndDate} 
            // 设置minDate和MaxDate之后是否允许选择范围之外的日期
            allowSelectionOutOfRange={true}

            theme={WEEK_THEME}
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
            monthFormat={'MMM'} 
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
            disabledDaysIndexes={[moment().day()]}

            // 是否禁用禁用天的所有触摸事件(可以使用' markddates '中的'disableTouchEvent'覆盖)
            // disableAllTouchEventsForDisabledDays
            // 是否禁用非活动日期的所有触摸事件(可以使用' markddates '中的'disableTouchEvent'覆盖)
            // disableAllTouchEventsForInactiveDays
          />
        </CalendarBox>
        <HandleTipBox>
          <TipTitle>
            {
              this.requestBtn ? 
              '点击以上日期进行选择' : 
              `默认规划：每${Num[this.spaceTime]}天一次A型尿液检测`
            }
          </TipTitle>
          <TipContent>
            {
              this.requestBtn ? 
              '只能在以上周期内进行日期选择' : 
              '点击对应检测，可进行时间调整'
            }
          </TipContent>
        </HandleTipBox>
        <HealthPlanListBox>
          {
            this.planDataList.map((data, index) => {
              return <PlanDataBox key={data.date}>
                <PlanData onPress={()=>this.clickActionDate(data, index)}>
                  <PlanNumBox><PlanNum>第{Num[index]}次</PlanNum></PlanNumBox>
                  <PlanDate>{data.date}{data.show}</PlanDate>
                </PlanData>
                {
                  data.show && <BtnBox>
                    <Btn onPress={() => 
                      this.cancleDisabledStartEndDate(data, index)}>
                      <BtnText>编辑</BtnText>
                    </Btn>
                  </BtnBox>
                }
              </PlanDataBox>
            })
          }
          {/* <PlanDataBox>
            <PlanData style={{
              justifyContent: 'center'
            }} onPress={this.resetHealthPlan}>
              <PlanDate>恢复默认检测计划</PlanDate>
            </PlanData>
          </PlanDataBox> */}
        </HealthPlanListBox>
        {
          this.requestBtn && <RequestBtnBox>
            <PlanDataBox>
              <PlanDataNoPress>
                <PlanNumBox><PlanNum>第{Num[this.index]}次</PlanNum></PlanNumBox>
                <PlanDate>{this.currentdate}</PlanDate>
              </PlanDataNoPress>
            </PlanDataBox>
            <RequestBtn type={'save'}
              onPress={this.requestSave}>
              <RequestBtnText type={'save'}>完成</RequestBtnText>
            </RequestBtn>
            <RequestBtn type={'cancel'} 
              onPress={this.requestCancel}>
              <RequestBtnText type={'cancel'}>取消</RequestBtnText>
            </RequestBtn>
            <RequestBtn type={'delete'}
              onPress={this.requestDelete}>
              <RequestBtnText type={'delete'} style={{
                fontWeight: '400'
              }}>删除此次检测</RequestBtnText>
            </RequestBtn>
          </RequestBtnBox>
        }
      </Container>
    )
  }
}


export default MyCalendarMonthScreen;

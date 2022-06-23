// 此文件 约等于 ./menuScreen.tsx;
import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, I18nManager, Switch} from 'react-native';
import testIDs from './testIDs';
import styled from 'styled-components';

const CalendarBtnBox = styled.View`
  flex-direction: row;
  justify-content: space-around;
`;

const CalendarBtn = styled.TouchableOpacity`
  padding: 8px 20px;
  border-radius: 8px;
  background: #00DCCA;
`;

const BtnText = styled.Text`
  color: #fff;
  font-size: 16px;
  font-weight: 500;
`;

const appIcon = require('./img/logo.png');

/* interface Props {
  componentId?: string;
  weekView?: boolean;
} */

export default class MenuScreen extends Component {

  state = {
    forceRTL: false
  }

  /* toggleRTL = (value) => {
    I18nManager.forceRTL(value);
    this.setState({forceRTL: value});
  } */

  renderEntry(testID, title, screen, options) {
    return (
      <TouchableOpacity
        testID={testID}
        style={styles.menu}
        onPress={() => this.openScreen(screen, options)}
      >
        <Text style={styles.menuText}>{title}</Text>
      </TouchableOpacity>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <ScrollView>
        <View style={styles.container} testID={testIDs.menu.CONTAINER}>
          <Image source={appIcon} style={styles.image}/>
          {this.renderEntry(testIDs.menu.CALENDARS, 'Calendars', 'Calendars')}
          {this.renderEntry(testIDs.menu.CALENDAR_LIST, 'Calendar List', 'CalendarsList')}
          {this.renderEntry(testIDs.menu.HORIZONTAL_LIST, 'Horizontal Calendar List', 'HorizontalCalendarList')}
          {this.renderEntry(testIDs.menu.AGENDA, 'Agenda', 'Agenda')}
          {this.renderEntry(testIDs.menu.EXPANDABLE_CALENDAR, 'Expandable Calendar', 'ExpandableCalendar')}
          {this.renderEntry(testIDs.menu.TIMELINE_CALENDAR, 'Timeline Calendar', 'TimelineCalendar')}
          {this.renderEntry(testIDs.menu.WEEK_CALENDAR, 'Week Calendar', 'ExpandableCalendar', {weekView: true})}
          {/* <View style={styles.switchContainer}>
            <Text>Force RTL</Text>
            <Switch value={this.state.forceRTL} onValueChange={this.toggleRTL}/>
          </View> */}

          {/* my-calendar */}
        </View>
        <CalendarBtnBox>
          <CalendarBtn onPress={() => {
            navigation.navigate('MyCalendarWeek');
          }}><BtnText>我的周日历</BtnText></CalendarBtn>
          <CalendarBtn onPress={() => {
            navigation.navigate('MyCalendarMonth');
          }}><BtnText>我的月日历</BtnText></CalendarBtn>
        </CalendarBtnBox>
      </ScrollView>
    );
  }

  pushScreen(screen, props) {
    const { navigation } = this.props;
    /* navigation.push(this.props.componentId, {
      component: {
        name: screen,
        passProps: props,
        options: {
          topBar: {
            title: {
              text: props?.weekView ? 'WeekCalendar' : screen
            },
            backButton: {
              testID: 'back',
              showTitle: false, // iOS only
              color: Platform.OS === 'ios' ? '#2d4150' : undefined
            }
          }
        }
      }
    }); */
    navigation.navigate(screen, props);
  }

  openScreen = (screen, options) => {
    this.pushScreen(screen, options);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  image: {
    margin: 30,
    width: 90,
    height: 90
  },
  menu: {
    width: 300,
    padding: 10,
    margin: 10,
    // backgroundColor: '#f2F4f5',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#7a92a5'
  },
  menuText: {
    fontSize: 18,
    color: '#2d4150'
  },
  switchContainer: {
    margin: 20
  }
});


// export default RNCalendars;

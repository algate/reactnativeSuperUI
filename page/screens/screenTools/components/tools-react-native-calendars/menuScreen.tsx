import React, {Component} from 'react';
import {Platform, StyleSheet, View, ScrollView, TouchableOpacity, Text, Image, I18nManager, Switch} from 'react-native';
import testIDs from './testIDs';

const appIcon = require('./logo.png');

interface Props {
  componentId?: string;
  weekView?: boolean;
}

export default class MenuScreen extends Component<Props> {
  state = {
    forceRTL: false
  }

  toggleRTL = (value) => {
    I18nManager.forceRTL(value);
    this.setState({forceRTL: value});
  }

  renderEntry(testID: string, title: string, screen: string, options?: any) {
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
          <View style={styles.switchContainer}>
            <Text>Force RTL</Text>
            <Switch value={this.state.forceRTL} onValueChange={this.toggleRTL}/>
          </View>
        </View>
      </ScrollView>
    );
  }

  pushScreen(screen: string, props?: Props) {
    const { navigation } = this.props;
    navigation.push(this.props.componentId, {
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
    });
  }

  openScreen = (screen: string, options: any) => {
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

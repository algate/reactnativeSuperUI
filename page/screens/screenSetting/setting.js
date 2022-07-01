import React, { useState, useContext } from "react";
import { FlatList, View, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from "react-native";
import { ThemeContext } from '../../components/context/theme';
import AsyncStorage from '@react-native-community/async-storage';
import { observer } from "mobx-react";

const themeData = [
    {
        text: 'Default',
        color: '#1677ff',
    },
    {
        text: 'Red',
        color: '#F44336',
    },
    {
        text: 'Pink',
        color: '#E91E63',
    },
    {
        text: 'Purple',
        color: '#9C27B0',
    },
    {
        text: 'DeepPurple',
        color: '#673AB7',
    },
    {
        text: 'Indigo',
        color: '#3F51B5',
    },
    {
        text: 'Blue',
        color: '#2196F3',
    },
    {
        text: 'LightBlue',
        color: '#03A9F4',
    },
    {
        text: 'Cyan',
        color: '#00BCD4',
    },
    {
        text: 'Teal',
        color: '#009688',
    },
    {
        text: 'Green',
        color: '#4CAF50',
    },
    {
        text: 'LightGreen',
        color: '#8BC34A',
    },
    {
        text: 'Lime',
        color: '#CDDC39',
    },
    {
        text: 'Yellow',
        color: '#FFEB3B',
    },
    {
        text: 'Amber',
        color: '#FFC107',
    },
    {
        text: 'Orange',
        color: '#FF9800',
    },
    {
        text: 'DeepOrange',
        color: '#FF5722',
    },
    {
        text: 'Brown',
        color: '#795548',
    },
    {
        text: 'Grey',
        color: '#9E9E9E',
    },
    {
        text: 'BlueGrey',
        color: '#607D8B',
    },
    {
        text: 'Black',
        color: '#000000',
    }
];
 
const Item = ({ item, onPress, style }) => (
    <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
        <Text style={styles.title}>{item.text}</Text>
    </TouchableOpacity>
);
 
const SettingScreen = () => {
  // useConetext 设置全局
  const [backgroundColor, setBackgroundColor] = useContext(ThemeContext);

  const saveThemeConfig = async (color) => {
      try {
          await AsyncStorage.setItem('@backgroundColor', color);
      } catch (e) {
          // saving error
      }
  };

  const renderItem = ({ item }) => {
    const backgroundColor = item.color;
    return (
      <Item
        item={item}
        onPress={() => {
          setBackgroundColor(item.color);
          saveThemeConfig(item.color);
        }}
        style={{ backgroundColor }}
      />
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={themeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.text}
      />
    </SafeAreaView>
  );
};
 
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    item: {
        padding: 20,
        marginVertical: 0,
        marginHorizontal: 0,
    },
    title: {
        fontSize: 22,
        color: '#ffffff',
    },
});
 
// export default SettingScreen;

@observer
class SettingClassScreen extends React.Component {

	static options = {
		title: 'TabSettings',
    float: true,
    headerTitleStyle: {
      color: '#fff'
    },
    headerShown: false,
    animationEnabled: false
  };

  constructor(props) {
    super(props);
  }
	
  render() {
		return <SettingScreen/>
	}
}

export default SettingClassScreen;
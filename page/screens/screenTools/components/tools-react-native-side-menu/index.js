import React from 'react';
import { View, Text, SafeAreaView, Button, Platform } from 'react-native';
import SideMenu from 'react-native-side-menu';
import styled from 'styled-components/native';
import { system } from '../../../../config/system';

console.log(system);

const UserInfo = styled.TouchableOpacity`
  background: rgba(0, 0, 0, .6);
`;

const UserName = styled(Text).attrs({
  color: 'white',
})`
  font-weight: 500;
`;

const instructions = Platform.select({
  ios: 'IOS-平台',
  android: 'Android-平台',
});

class Menu extends React.Component {
  constructor(props) {
    super();
  }
  render() {
    return <UserInfo>
      <UserName>{'RNSuperUI'}</UserName>
    </UserInfo>
  }
}

class ContentView extends React.Component {
  constructor(props) {
    super(props);
    const { openMenu } = props;
    this.openMenu = openMenu;
  }
  onPress = () => {
    this.openMenu();
  }
  render() {
    return (
      <>
        <Text style={{marginTop: 20}}>
          Home - 不知为何侧边栏没有隐藏
        </Text>
        <Text>
          Tools - 百思不得其解
        </Text>
        <Text>
          Animated - 还望各位能接单下
        </Text>
        <Text>
          Settings - 离谱儿！！！
        </Text>
        <Button onPress={this.onPress} title="打开Drawer"></Button>
      </>
    );
  }
}

class RNSideMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    }
  }

  openMenu = () => {
    this.setState({
      isOpen: true
    })
  }
  
  render() {
    return (
      <SideMenu
        menu={<Menu/>}
        isOpen={this.state.isOpen}
        openMenuOffset={system.width * 1 / 4}
        hiddenMenuOffset={20}
        onChange={(isOpen) => {
          console.log(isOpen);
          this.setState({
            isOpen: isOpen
          })
        }}
      >
        <ContentView openMenu={this.openMenu}/>
      </SideMenu>
    );
  }
}

export default RNSideMenu;

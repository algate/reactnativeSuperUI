'use strict';
import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components/native';
import ImageDark from '../../static/common/nonet_dark.svg';

const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background: #666;
`;

const BackgroundImage = () => {
  return <ImageDark style={{ width: 160, height: 160 }}/>;
};

const RetryButton = styled.TouchableOpacity`
  align-items: center;
  justify-content: center;
  padding: 10px 24px;
  border-width: 1px;
  border-radius: 4px;
  border-color: #BBB;
  margin-top: 24px;
`;

const Info = styled(Text)`
  color: ${props => (props.theme.dark ? 'rgba(255, 255, 255, .6)' : 'rgba(0, 0, 0, .6)')};
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
`;
/* const Info = styled(Text).attrs(({theme}) => ({
  color: theme.dark ? "#2dabff" : "#fff"
}))`
  color: ${props => props.theme.colors.text};
  font-weight: 600;
  font-size: 18px;
  margin-top: 12px;
`; */

class LoadFailedView extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme, onRetry } = this.props;

    const titleTop = '此页面是测试页面';
    const titleBottom = '不用检查网络(点击重新加载也没用)';
    const buttonText = '重新加载';

    return (
      <Container>
        <BackgroundImage/>
        {/* 
          primary: "rgb(0, 122, 255)"
          background: "rgb(242, 242, 242)"
          card: "rgb(255, 255, 255)"
          text: "rgb(28, 28, 30)"
          border: "rgb(216, 216, 216)"
          notification: "rgb(255, 59, 48)"
        */}
        <Info theme={theme}>{titleTop}</Info>
        <Info theme={theme}>{titleBottom}</Info>
        <RetryButton onPress={() => onRetry && onRetry()}>
          <Text style={{color: '#BBB'}}>{buttonText}</Text>
        </RetryButton>
      </Container>
    );
  }
}

export default LoadFailedView;
import React from 'react';
import { WebView } from 'react-native-webview';
import styled from 'styled-components';
import { Animated, Text, View, ScrollView } from 'react-native';
import { createNavigationScrollAnimator } from '../../../../config/navigation';

const UploadImage = styled.TouchableOpacity``

const absoluteFill = `
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

const AnimatedBackground = styled(Animated.View)`
  ${absoluteFill}
`;

class Faker extends React.Component {

  static options = props => {
    console.log(props);
    const opacity = scrollAnimator ? scrollAnimator.normalizedValue : 0;
    let animateElementList = props?.animateElements;
    if (!scrollAnimator) {
      animateElementList = [];
    } else if (isUndefined(animateElements)) {
      animateElementList = float ? ['background', 'title'] : ['background'];
    }
    return {
      headerBackground: () => (
        <AnimatedBackground
          style={{
            opacity
          }}
        />
      ),
      headerTitleStyle: {
        opacity: animateElementList.includes('title') ? opacity : 1
      }
    }
  }

  constructor(props) {
    super(props);
    this.scrollAnimator = createNavigationScrollAnimator();
    props.navigation.setParams({ scrollAnimator: this.scrollAnimator });
  }
  render() {
    return (
      <View style={{ height: '100%' }}>
        <ScrollView {...this.scrollAnimator.scrollProps}>
          <UploadImage>
            <Text>上传</Text>
          </UploadImage>
        </ScrollView>
      </View>
    );
  }
}

export default Faker;

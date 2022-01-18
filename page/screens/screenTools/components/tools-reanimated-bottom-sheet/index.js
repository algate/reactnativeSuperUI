import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import styled from 'styled-components/native';
import BottomSheet from 'reanimated-bottom-sheet';

class AnimatedBottomSheet extends React.Component {
  constructor(props) {
    super(props);
  }

  sheetRef = null;

  renderContent = () => (
    <View
      style={{
        backgroundColor: '#fff',
        padding: 16,
        height: 450,
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  )

  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: '#0DCC01',
      }}>
        <View
          style={{
            flex: 1,
            backgroundColor: '#0DCC01',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* <Button
            title="Open Bottom Sheet"
            onPress={() => this.sheetRef.snapTo(0)}
          /> */}
        </View>
        <BottomSheet
          ref={ref => this.sheetRef = ref}
          snapPoints={[450, 300, 80]}
          borderRadius={10}
          renderContent={this.renderContent}
          enabledContentTapInteraction={false}
        />
      </View>
    );
  }
}

export default AnimatedBottomSheet;
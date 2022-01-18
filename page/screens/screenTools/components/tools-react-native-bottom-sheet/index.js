import React from 'react';
import {
  View,
  Text,
  Button,
  SafeAreaView,
  StyleSheet
} from 'react-native';
import styled from 'styled-components/native';
import BottomSheet from '@gorhom/bottom-sheet';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

class RNBottomSheet extends React.Component {
  constructor(props) {
    super(props);
  }

  handleSheetChanges = (index) => {
    console.log('handleSheetChanges', index);
  }

  render() {
    return (
      <View style={styles.container}>
        <BottomSheet
          index={1}
          snapPoints={[80, '90%']}
          onChange={this.handleSheetChanges}
        >
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheet>
      </View>
    );
  }
}

export default RNBottomSheet;
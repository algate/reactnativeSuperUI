'use strict';
import React from 'react';
// import { withTheme } from 'styled-components';
import {
  ActionSheetProvider as ExpoActionSheetProvider, connectActionSheet
} from '@expo/react-native-action-sheet';

const ActionSheet = {
  showActionSheetWithOptions: () => {}
};

@connectActionSheet
class _ActionSheetHelper extends React.Component {
  componentDidMount() {
    const showActionSheetWithOptions = this.props.showActionSheetWithOptions;
    ActionSheet.showActionSheetWithOptions = (options = {}, callback) => {
      showActionSheetWithOptions({
        ...options,
        tintColor: 'gray',
        titleTextStyle: { textAlign: 'center', width: '100%'},
        textStyle: { textAlign: 'center', width: '100%'},
        separatorStyle: {
          // height: 0,
          borderBottomColor: 'gray',
        },
        showSeparators: true
      }, callback);
    };
  }

  shouldComponentUpdate() {
    return false;
  }

  render() {
    return null;
  }
}

// const ActionSheetHelper = withTheme(_ActionSheetHelper);

export class ActionSheetProvider extends React.Component {
  render() {
    return (
      <ExpoActionSheetProvider>
        <React.Fragment>
          <_ActionSheetHelper/>
          {this.props.children}
        </React.Fragment>
      </ExpoActionSheetProvider>
    );
  }
}

export default ActionSheet;

/*
 *     Dialog.js
 *     ~~~~~~~~~~~~~~~~~~~~~~~~~
 *
 *     This file created on: Wed May 22 2019
 *
 *     :copyright: (c) 2019 by wangchao@h2clab.com.
 *     :license: License :: Other/Proprietary License.
 */
'use strict';
import { Alert } from 'react-native';

function showDialog({ title, message, buttons }) {
  return new Promise((resolve) => {
    const alertButtons = buttons.map(button => ({
      text: button.text,
      onPress: () => resolve(button.key)
    }));
    Alert.alert(title, message, alertButtons, { cancelable: false });
  });
}


export default {
  confirm: ({ title, message, cancelText = '取消', confirmText = '确认' }) => {
    const buttons = [
      {
        key: 'cancel',
        text: cancelText
      },
      {
        key: 'confirm',
        text: confirmText
      }
    ];
    return showDialog({ title, message, buttons });
  },
  alert: ({ title, message, confirmText = '确认' }) => {
    const buttons = [{
      key: 'confirm',
      text: confirmText
    }];
    return showDialog({ title, message, buttons });
  },
};

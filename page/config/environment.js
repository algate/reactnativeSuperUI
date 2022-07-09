import { NativeModules } from 'react-native';

export const environment = (() => {
  let build_env = NativeModules.GetConfigs ? NativeModules.GetConfigs.buildEnvironment : 'debug';
  if (build_env == 'debug') {
    return require('../../config.debug.json');
  } else if (build_env == 'release') {
    return require('../../config.release.json');
  }
})();
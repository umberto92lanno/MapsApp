import {NativeModules} from 'react-native';

export interface INativeUtils {
  setTimer: (milliseconds: number) => Promise<null>;
}

export const setTimer = (milliseconds: number) => {
  const NativeUtils = NativeModules.NativeUtils as INativeUtils;
  return NativeUtils.setTimer(milliseconds);
};

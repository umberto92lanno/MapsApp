import {NativeModules, NativeEventEmitter} from 'react-native';

export interface NativeConstants {
  version: string;
}

export interface INativeUtils {
  setTimer: (milliseconds: number) => void;
  getDarkMode: () => Promise<boolean>;
  getConstants: () => NativeConstants;
  showAlert: (callback: (isSuccess: boolean) => void) => void;
}

export const setTimer = (milliseconds: number, callback: () => void) => {
  const NativeUtils = NativeModules.NativeUtils;
  const eventEmitter = new NativeEventEmitter(NativeUtils);
  eventEmitter.addListener('timerFired', callback);
  (NativeUtils as INativeUtils).setTimer(milliseconds);
};

export const isDarkMode = () => {
  const NativeUtils = NativeModules.NativeUtils as INativeUtils;
  console.log(NativeUtils, NativeModules);
  return NativeUtils.getDarkMode();
};

export const getInitialValues = () => {
  const NativeUtils = NativeModules.NativeUtils as INativeUtils;
  return NativeUtils.getConstants();
};

export const showAlert = (callback: (isSuccess: boolean) => void) => {
  const NativeUtils = NativeModules.NativeUtils as INativeUtils;
  return NativeUtils.showAlert(callback);
};

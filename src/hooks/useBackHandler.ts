import {useEffect} from 'react';
import {BackHandler} from 'react-native';

export const useBackHandler = (callback: () => boolean) => {
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', callback);
    return () => BackHandler.removeEventListener('hardwareBackPress', callback);
  }, [callback]);
};

import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {Alert, Platform, Linking} from 'react-native';
import {Permission} from 'react-native-permissions/src/types';

export const checkLocation = (permission: Permission) => {
  return check(permission);
};

export const requestLocation = async () => {
  const permission =
    Platform.OS === 'ios'
      ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
      : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
  const checkStatus = await checkLocation(permission);
  console.log(checkStatus);
  if (checkStatus !== RESULTS.DENIED) {
    // Nel caso in cui fosse necessario, mostrare alert per andare nelle impostazioni di sistema
    if (
      checkStatus === RESULTS.GRANTED ||
      checkStatus === RESULTS.LIMITED ||
      checkStatus === RESULTS.UNAVAILABLE
    ) {
      return true;
    }
    Alert.alert('Warning', 'request denied', [
      {
        text: 'Annulla',
      },
      {
        text: 'Vai a impostazioni',
        onPress: () => Linking.openSettings(),
      },
    ]);
    return false;
  }
  const status = await request(permission);
  return status === RESULTS.GRANTED;
};

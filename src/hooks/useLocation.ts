import {useEffect, useState} from 'react';
import Geolocation from '@react-native-community/geolocation';
import {LatLng} from 'react-native-maps';

export const useLocation = () => {
  const [position, setPosition] = useState<LatLng | undefined>();
  useEffect(() => {
    Geolocation.watchPosition(
      ({coords: {latitude, longitude}}) => setPosition({latitude, longitude}),
      error => {},
      {timeout: 5000, enableHighAccuracy: true, useSignificantChanges: false},
    );
    return () => Geolocation.stopObserving();
  }, []);
  return position;
};

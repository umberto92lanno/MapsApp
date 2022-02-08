import {useEffect, useState} from 'react';
import {LatLng} from 'react-native-maps';

export const useBikePolling = () => {
  const [bike, setBike] = useState<LatLng | undefined>();
  useEffect(() => {
    setInterval(() => {
      // chiamata api
      setBike({latitude: 45.697, longitude: 7.8953});
    }, 3000);
  }, []);
  return {
    bike,
  };
};

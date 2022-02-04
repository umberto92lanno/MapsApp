/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect, useState} from 'react';
import {
  Button,
  Image,
  Platform,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  MapEvent, Polygon,
} from "react-native-maps";
import {requestLocation} from './services/permissions/locationPermissions';
import {Images} from './assets/assets';

const markerCoords = [
  {latitude: -33.890542, longitude: 151.274856},
  {latitude: -33.923036, longitude: 151.259052},
  {latitude: -34.028249, longitude: 151.157507},
  {latitude: -33.80010128657071, longitude: 151.28747820854187},
  {latitude: -33.950198, longitude: 151.259302},
];

const App = () => {
  const [markers, setMarkers] = useState(markerCoords);
  const scheme = useColorScheme();
  useEffect(() => {
    if (Platform.OS === 'ios') {
      return;
    }
    requestLocation().then(console.log);
  }, []);

  const onPressMap = useCallback(
    ({nativeEvent}: MapEvent) => {
      const {coordinate} = nativeEvent;
      setMarkers([...markers, coordinate]);
    },
    [markers],
  );

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <MapView
        style={{flex: 1}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        showsMyLocationButton
        showsCompass
        onPress={onPressMap}
        onMapReady={() => console.log('mappa caricata')}
        // mapType="satellite"
        userInterfaceStyle={scheme ?? 'light'}
        mapPadding={{bottom: 30, top: 0, left: 0, right: 0}} // Utile a spostare il logo "Google"
        region={{
          latitude: -33.890542,
          longitude: 151.274856,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        <Polygon coordinates={markers} />
        {markers.map(coord => (
          <Marker icon={Images.marker} tracksViewChanges coordinate={coord}>
            <Callout
              style={{width: 100, height: 70}}
              onPress={() => console.log('marker premuto')}>
              <View style={{width: 100, height: 70}}>
                <Button
                  title="TAPPA QUI"
                  onPress={() => console.log('onPress button')}
                />
              </View>
            </Callout>
            {/*<Image source={Images.marker} />*/}
            {/*<View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'blue' }} />*/}
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

export default App;

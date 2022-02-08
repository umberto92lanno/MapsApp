import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {
  Circle,
  Geojson,
  Marker,
  Overlay,
  Polygon,
  Polyline,
  PROVIDER_GOOGLE,
} from 'react-native-maps';
import {Provider, useSelector} from 'react-redux';
import {useAppDispatch} from './hooks/useAppDispatch';
import {RootState, store} from './store/root.store';
import {getBikes} from './ui/book/book.selector';
import {bookActions} from './ui/book/book.slice';
import {Images} from './assets/assets';
import {MarkerPressable} from './components/markerPressable/markerPressable';
import { useBikePolling } from "./hooks/useBikePolling";
import { useLocation } from "./hooks/useLocation";
import { requestLocation } from "./services/permissions/locationPermissions";

enum RideType {
  scooter,
  all,
}

const polyline = [
  {latitude: 45.07616, longitude: 7.6603580000000004},
  {latitude: 45.083515, longitude: 7.662153},
  {latitude: 45.081182, longitude: 7.67094},
];

const Comp = () => {
  const dispatch = useAppDispatch();
  const markers = useSelector(getBikes);
  const [type, setType] = useState(RideType.all);
  const status = useSelector((state: RootState) => state.book.status);
  // const { bike } = useBikePolling();
  //
  // console.log('hook', bike);
  // useEffect(() => {
  //   requestLocation();
  // }, []);
  const positions = useLocation();
  console.log(positions);
  useEffect(() => {
    dispatch(bookActions.callMarkersLoading());
  }, [dispatch]);

  const markersFiltered = useMemo(() => {
    if (type === RideType.scooter) {
      return markers.filter(marker => marker.vehicle_type === 'scooter');
    }
    return markers;
  }, [markers, type]);

  const onPress = () => {
    setType(type === RideType.scooter ? RideType.all : RideType.scooter);
  };

  const onPressMarker = (id: string) => {
    console.log(markers.find(marker => marker.bike_id === id));
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      {status === 'loading' && (
        <View
          style={{
            zIndex: 1000,
            elevation: 1,
            ...StyleSheet.absoluteFillObject,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" />
        </View>
      )}
      <MapView
        showsUserLocation
        animationEnabled
        layoutAnimationConf={LayoutAnimation.Presets.linear}
        spiderLineColor="transparent"
        clusterColor="blue"
        provider={PROVIDER_GOOGLE}
        style={{flex: 1}}
        onMapReady={() => console.log('onMapReady')}
        initialRegion={{
          latitude: 45.078654,
          longitude: 7.674798,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}>
        {/*<Polyline coordinates={polyline} strokeColor="#FF0000" strokeWidth={4} />*/}
        {/*<Polygon coordinates={polyline} strokeColor="#FF0000" strokeWidth={4} fillColor="blue" />*/}
        {/*<Circle center={polyline[0]} radius={500} />*/}
        <Overlay
          bounds={[[45.07616, 7.6603580000000004], [45.081182, 7.67094]]}
          image={{
            uri: 'https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg',
          }}
        />
        {markersFiltered.slice(0, 99).map(marker => (
          <MarkerPressable
            // icon={{ uri: 'https://www.iconsdb.com/icons/download/barbie-pink/map-marker-2-64.png' }}
            icon={Platform.OS === 'android' ? marker.icon : undefined}
            image={Platform.OS === 'ios' ? marker.icon : undefined}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            onPress={onPressMarker}
            id={marker.bike_id}
          />
        ))}
      </MapView>
      <View style={{position: 'absolute', top: 50, right: 20, zIndex: 1000}}>
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 8,
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={onPress}>
          <Image
            source={{
              uri: 'https://www.iconsdb.com/icons/download/royal-blue/scooter-2-64.png',
            }}
            style={{width: 20, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <Comp />
    </Provider>
  );
};

export default App;

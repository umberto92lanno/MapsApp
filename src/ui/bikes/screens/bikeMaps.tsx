import React, {useEffect, useMemo, useState} from 'react';
import {
  ActivityIndicator,
  Alert,
  BackHandler,
  Image,
  LayoutAnimation,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-map-clustering';
import {Overlay, PROVIDER_GOOGLE} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {getBikes} from '../../book/book.selector';
import {RootState} from '../../../store/root.store';
import {useLocation} from '../../../hooks/useLocation';
import {MarkerPressable} from '../../../components/markerPressable/markerPressable';
import {useBikeMapLogic} from '../hooks/useBikeMapLogic';
import {useBackHandler} from '../../../hooks/useBackHandler';

const polyline = [
  {latitude: 45.07616, longitude: 7.6603580000000004},
  {latitude: 45.083515, longitude: 7.662153},
  {latitude: 45.081182, longitude: 7.67094},
];

const BikeMaps = () => {
  const markers = useSelector(getBikes);
  // const positions = useLocation();
  const {markersLoading, onPressFilter, markersFiltered, onPressMarker} =
    useBikeMapLogic(markers);
  const status = useSelector((state: RootState) => state.book.status);

  useBackHandler(() => {
    Alert.alert('Hold on!', 'Are you sure you want to go back?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
    return true;
  });

  useEffect(() => {
    console.log('markersLoading');
    markersLoading();
  }, [markersLoading]);

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
          bounds={[
            [45.07616, 7.6603580000000004],
            [45.081182, 7.67094],
          ]}
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
          onPress={onPressFilter}>
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

export default BikeMaps;

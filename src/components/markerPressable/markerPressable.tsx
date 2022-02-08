import React, {memo, useCallback} from 'react';
import {AnimatedRegion, LatLng, Marker} from 'react-native-maps';

export interface MarkerPressableProps {
  icon?: string;
  image?: string;
  coordinate: LatLng | AnimatedRegion;
  onPress: (id: string) => void;
  id: string;
}

export const MarkerPressable: React.FC<MarkerPressableProps> = memo(
  ({icon, image, coordinate, onPress, id}) => {
    const onLocalPress = useCallback(() => {
      onPress(id);
    }, [id, onPress]);
    return (
      <Marker
        icon={icon ? {uri: icon} : undefined}
        image={image ? {uri: image} : undefined}
        coordinate={coordinate}
        onPress={onLocalPress}
      />
    );
  },
);

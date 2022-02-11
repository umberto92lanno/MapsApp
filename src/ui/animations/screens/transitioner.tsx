import React, {
  memo,
  MutableRefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  Animated,
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

interface ComponentForTransitionProps {
  image: string;
  onPress: (element: MutableRefObject<View | null>, image: string) => void;
}

const dimension = Dimensions.get('window');

const ComponentForTransition: React.FC<ComponentForTransitionProps> = memo(
  ({image, onPress}) => {
    const element = useRef<View>(null);
    const onLPress = () => {
      onPress(element, image);
    };
    return (
      <TouchableWithoutFeedback onPress={onLPress}>
        <View
          ref={element}
          style={{width: 100, height: 100, overflow: 'hidden'}}>
          <Image
            source={{
              uri: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
            }}
            style={{
              width: dimension.width,
              height: dimension.height,
              resizeMode: 'cover',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  },
);

export const Transitioner = () => {
  const animated = useRef(new Animated.Value(0)).current;
  const [shadow, setShadow] = useState({x: 0, y: 0, image: ''});

  const onPress = (element: MutableRefObject<View | null>, image: string) => {
    if (!element.current) {
      return;
    }
    console.log(Dimensions.get('window'));
    element.current.measure((x, y, width, height, xx, yy) => {
      console.log(x, y, width, height, xx, yy);
      setShadow({x, y, image});
    });
  };

  const onLayout = () => {
    Animated.timing(animated, {
      toValue: 100,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {shadow.image !== '' && (
        <Animated.View
          onLayout={onLayout}
          style={{
            position: 'absolute',
            left: shadow.x,
            top: shadow.y,
            zIndex: 1000,
            overflow: 'hidden',
            // width: 100,
            // height: 100,
            // width: animated.interpolate({
            //   inputRange: [0, 100],
            //   outputRange: [100, dimension.width],
            //   extrapolate: 'clamp',
            // }),
            // height: animated.interpolate({
            //   inputRange: [0, 100],
            //   outputRange: [100, dimension.height],
            //   extrapolate: 'clamp',
            // }),
            transform: [
              {
                translateX: animated.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -(dimension.width / 2 - 50)],
                  extrapolate: 'clamp',
                }),
              },
              {
                translateY: animated.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, -(dimension.height / 2 - 50)],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          <Image
            source={{
              uri: shadow.image,
            }}
            style={{
              width: dimension.width,
              height: dimension.height,
              resizeMode: 'cover',
            }}
          />
        </Animated.View>
      )}
      {shadow.image === '' && (
        <ComponentForTransition
          image="https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg"
          onPress={onPress}
        />
      )}
    </View>
  );
};

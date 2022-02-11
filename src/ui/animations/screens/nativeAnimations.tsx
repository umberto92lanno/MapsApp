import React, {useCallback, useRef, useState} from 'react';
import {Animated, Easing, LayoutAnimation, View} from 'react-native';
import {AnimatedButton} from '../../../components/button/button';

export const NativeAnimations = () => {
  const animated = useRef(new Animated.Value(1)).current;
  const [expanded, setExpanded] = useState(false);

  const onPress = useCallback(() => {
    Animated.timing(animated, {
      duration: 300,
      toValue: expanded ? 1 : 3,
      useNativeDriver: true,
      // easing: Easing.back(1),
      // easing: Easing.bounce,
      // easing: Easing.ease,
      // easing: Easing.elastic(1),
    }).start(({finished}) => {
      if (finished) {
        console.log(finished);
      }
      setExpanded(!expanded);
    });
  }, [animated, expanded]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'blue',
            opacity: animated.interpolate({
              inputRange: [1, 3],
              outputRange: [0.5, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                scale: animated,
              },
              {
                rotate: animated.interpolate({
                  inputRange: [1, 3],
                  outputRange: ['0deg', '360deg'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        />
        <Animated.View
          style={{
            width: 100,
            height: 100,
            backgroundColor: 'red',
            opacity: animated.interpolate({
              inputRange: [1, 3],
              outputRange: [0.5, 1],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateX: animated.interpolate({
                  inputRange: [1, 3],
                  outputRange: [0, 100],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}
        />
      </View>
      <AnimatedButton title="Expand" onPress={onPress} />
    </View>
  );
};

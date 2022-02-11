import {View} from 'react-native';
import {AnimatedButton} from '../../../components/button/button';
import React, {useCallback, useRef} from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

export const NativeReAnimations = () => {
  const animated = useSharedValue(0);
  const rotateAnimated = useDerivedValue(() => {
    console.log(animated.value);
    return animated.value === 0 ? withTiming('0deg') : withTiming('360deg');
  }, [animated.value]);

  const squareStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animated.value, [0, 3], [0.5, 1]),
      transform: [
        {
          scale: interpolate(animated.value, [0, 3], [1, 3]),
        },
        {
          rotate: interpolate(animated.value, [0, 3], [0, 360]) + 'deg',
        },
      ],
    };
  });

  const squareRedStyles = useAnimatedStyle(() => {
    return {
      opacity: interpolate(animated.value, [0, 3], [0.5, 1]),
      transform: [
        {
          translateX: interpolate(animated.value, [0, 3], [0, 100]),
        },
      ],
    };
  });

  const onPress = useCallback(() => {
    animated.value = withTiming(animated.value === 3 ? 0 : 3, {duration: 300});
  }, [animated]);

  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Animated.View
          style={[
            {
              opacity: 1,
              width: 100,
              height: 100,
              backgroundColor: 'blue',
            },
            squareStyles,
          ]}
        />
        <Animated.View
          style={[
            {
              width: 100,
              height: 100,
              backgroundColor: 'red',
            },
            squareRedStyles,
          ]}
        />
      </View>
      <AnimatedButton title="Expand" onPress={onPress} />
    </View>
  );
};

import React, {memo, MutableRefObject, useRef, useState} from 'react';
import {Dimensions, Image, TouchableWithoutFeedback, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

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
              width: 100,
              height: 100,
              resizeMode: 'cover',
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  },
);
export const ReTransitioner = () => {
  const animated = useSharedValue(0);
  const [shadow, setShadow] = useState({x: 0, y: 0, image: ''});
  const [hideComponent, setHideComponent] = useState(false);

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
    animated.value = withTiming(100, {duration: 300});
    setHideComponent(true);
    // Animated.timing(animated, {
    //   toValue: 100,
    //   duration: 300,
    //   useNativeDriver: false,
    // }).start();
  };

  const shadowStyle = useAnimatedStyle(() => {
    return {
      width: interpolate(animated.value, [0, 100], [100, dimension.width]),
      height: interpolate(animated.value, [0, 100], [100, dimension.height]),
      transform: [
        {
          translateX: interpolate(
            animated.value,
            [0, 100],
            [0, -(dimension.width / 2 - 50)],
          ),
        },
        {
          translateY: interpolate(
            animated.value,
            [0, 100],
            [0, -(dimension.height / 2 - 50)],
          ),
        },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: interpolate(animated.value, [0, 100], [100, dimension.width]),
    height: interpolate(animated.value, [0, 100], [100, dimension.height]),
  }));

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      {shadow.image !== '' && (
        <Animated.View
          onLayout={onLayout}
          style={[
            {
              position: 'absolute',
              backgroundColor: 'black',
              left: shadow.x,
              top: shadow.y,
              zIndex: 1000,
              overflow: 'hidden',
            },
            shadowStyle,
          ]}>
          <Animated.Image
            source={{
              uri: shadow.image,
            }}
            style={[
              {
                resizeMode: 'contain',
              },
              imageStyle,
            ]}
          />
        </Animated.View>
      )}
      <ComponentForTransition
        image="https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg"
        onPress={onPress}
      />
    </View>
  );
};

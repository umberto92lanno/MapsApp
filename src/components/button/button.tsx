import React, {useRef} from 'react';
import {Animated, Easing, Text, TouchableWithoutFeedback} from 'react-native';

export interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
}

export const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  title,
  onPress,
}) => {
  const animated = useRef(new Animated.Value(1)).current;

  const onLPress = () => {
    Animated.parallel([
      Animated.timing(animated, {
        duration: 300,
        easing: Easing.bounce,
        toValue: 1.2,
        useNativeDriver: true,
      }),
      Animated.sequence([
        Animated.delay(50),
        Animated.timing(animated, {
          duration: 300,
          easing: Easing.bounce,
          toValue: 1,
          useNativeDriver: true,
        }),
      ]),
    ]).start();
    onPress();
  };

  const onPressIn = () => {
    Animated.timing(animated, {
      duration: 300,
      easing: Easing.bounce,
      toValue: 1.2,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.timing(animated, {
      duration: 300,
      easing: Easing.bounce,
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View
      style={{
        margin: 16,
        transform: [
          {
            scale: animated,
          },
        ],
      }}>
      <TouchableWithoutFeedback
        /*onPress={onLPress}*/ onPressIn={onPressIn}
        onPressOut={onPressOut}>
        <Animated.View
          style={{
            height: 40,
            backgroundColor: 'black',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            // transform: [
            //   {
            //     scale: animated,
            //   },
            // ],
          }}>
          <Text style={{color: 'white'}}>{title}</Text>
        </Animated.View>
      </TouchableWithoutFeedback>
    </Animated.View>
  );
};

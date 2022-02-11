import React, {useMemo} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  Text,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import {BottomTabBarProps} from '@react-navigation/bottom-tabs/lib/typescript/src/types';
import {ReTransitioner} from '../../../ui/reanimated/screens/reTransitioner';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import {ReParallaxScreen} from '../../../ui/reanimated/screens/reParallaxScreen';
import {NativeReAnimations} from '../../../ui/reanimated/screens/nativeReAnimations';
import {Transitioner} from '../../../ui/animations/screens/transitioner';
import {NativeAnimations} from '../../../ui/animations/screens/nativeAnimations';
import { ListReanimated } from "../../../ui/reanimated/screens/listReanimated";

const Tab = createBottomTabNavigator();

export const BottomTabBar = (props: BottomTabBarProps) => {
  const {width} = useWindowDimensions();
  const {
    insets,
    state: {routes},
    navigation,
  } = props;

  const position = useMemo(() => {
    const buttonSizeWidth = width / routes.length;
    return (buttonSizeWidth - 50) / 2;
  }, [routes.length, width]);

  const animation = useSharedValue(position);

  const animationScale = useDerivedValue(() => {
    const finalValues = routes.map(
      (route, id) => position + (width / routes.length) * id,
    );
    return finalValues.includes(animation.value)
      ? withTiming(1, {duration: 200})
      : withTiming(0.7, {duration: 400});
  }, [animation.value]);

  const circleStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: animation.value,
        },
        {
          scale: animationScale.value,
        },
      ],
    };
  });

  return (
    <View>
      <View style={{height: 60, flexDirection: 'row'}}>
        <Animated.View
          style={[
            {
              position: 'absolute',
              top: 10,
              width: 50,
              height: 50,
              borderRadius: 25,
              backgroundColor: 'red',
            },
            circleStyle,
          ]}
        />
        {routes.map((route, id) => (
          <TouchableWithoutFeedback
            key={route.key}
            onPress={() => {
              navigation.navigate(route.name);
              animation.value = withTiming(
                position + (width / routes.length) * id,
                {duration: 400},
              );
            }}>
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 10,
                  backgroundColor: 'yellow',
                }}
              />
              <Text>{route.name}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
      <View style={{height: insets.bottom}} />
    </View>
  );
};

export const BottomTab = () => {
  return (
    <Tab.Navigator tabBar={props => <BottomTabBar {...props} />}>
      <Tab.Screen name="Screen1" component={ListReanimated} />
      <Tab.Screen name="Screen2" component={ReParallaxScreen} />
      <Tab.Screen name="Screen3" component={NativeReAnimations} />
      <Tab.Screen name="Screen4" component={NativeAnimations} />
      <Tab.Screen name="Screen5" component={ReTransitioner} />
    </Tab.Navigator>
  );
};

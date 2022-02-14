import React, {
  memo,
  NamedExoticComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {
  Button,
  Dimensions,
  FlatList,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import Animated, {
  AnimateStyle,
  BaseAnimationBuilder,
  ComplexAnimationBuilder,
  EntryAnimationsValues,
  ExitAnimationsValues,
  Layout,
  LayoutAnimation,
  LayoutAnimationsValues,
  LightSpeedInLeft,
  SlideInLeft,
  SlideInRight,
  StyleProps,
  Transition,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

const data = [
  {title: 'data1', id: 1},
  {title: 'data2', id: 2},
  {title: 'data3', id: 3},
  {title: 'data4', id: 4},
  {title: 'data5', id: 5},
  {title: 'data6', id: 6},
  {title: 'data7', id: 7},
];

interface AnimatedRowProps {
  title: string;
  index: number;
}

const EnteringAnimationForList =
  ({delay = 0}) =>
  (values: EntryAnimationsValues): LayoutAnimation => {
    'worklet';
    const animations: AnimateStyle<StyleProps> = {
      originX: withDelay(
        delay,
        withTiming(values.targetOriginX, {duration: 400}),
      ),
      opacity: withTiming(1, {duration: 1000}),
    };
    const initialValues: StyleProps = {
      originX: -1000,
      opacity: 0,
    };
    return {
      animations,
      initialValues,
    };
  };

const ExitingAnimationForList = (
  values: ExitAnimationsValues,
): LayoutAnimation => {
  'worklet';
  const animations: AnimateStyle<StyleProps> = {
    originX: withTiming(-1000, {duration: 10000}),
    // opacity: withTiming(1, {duration: 1000}),
  };
  const initialValues: StyleProps = {
    originX: values.currentOriginX,
  };
  return {
    animations,
    initialValues,
  };
};

const AnimatedRow: NamedExoticComponent<AnimatedRowProps> = memo(
  ({title, index}) => {
    return (
      <Animated.View
        entering={EnteringAnimationForList({delay: 100 * index})}
        exiting={ExitingAnimationForList}
        style={{
          height: 60,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'grey',
          borderRadius: 8,
        }}>
        <Text>{title}</Text>
      </Animated.View>
    );
  },
);

export const ListReanimated = () => {
  const [localData, setLocalData] = useState(data);

  const renderItem = useCallback(({item, index}) => {
    return <AnimatedRow title={item.title} index={index} />;
  }, []);
  const ItemSeparatorComponent = useCallback(
    () => <View style={{height: 20}} />,
    [],
  );
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <Animated.FlatList
        data={localData}
        renderItem={renderItem}
        ItemSeparatorComponent={ItemSeparatorComponent}
        contentContainerStyle={{paddingHorizontal: 20}}
      />
      <Button
        title="Remove"
        onPress={() => {
          const dataToSplice = [...localData];
          dataToSplice.splice(0, 1);
          // setD([...d.splice(0, 1)]);
          setLocalData(dataToSplice);
        }}
      />
    </View>
  );
};

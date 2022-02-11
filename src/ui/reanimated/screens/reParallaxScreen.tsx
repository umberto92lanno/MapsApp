import React, {useCallback} from 'react';
import {Image, StyleSheet, useWindowDimensions, View} from 'react-native';
import Animated, {
  Extrapolation,
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

export const ReParallaxScreen = () => {
  const animated = useSharedValue(0);
  const renderItem = useCallback(() => {
    return (
      <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
    );
  }, []);
  const keyExtractor = useCallback((item, index) => `parallax_${index}`, []);

  const headerContainerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: animated.value,
      },
      {
        scale: interpolate(
          animated.value,
          [-150, -1],
          [1.8, 1.01],
          Extrapolation.CLAMP,
        ),
      },
    ],
  }));

  const shadowImageStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      animated.value,
      [0, 240],
      [0, 0.6],
      Extrapolation.CLAMP,
    ),
  }));

  const headerStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animated.value, [0, 340], [0, 1], Extrapolation.CLAMP),
  }));

  const ListHeaderComponent = useCallback(
    () => (
      <Animated.View style={headerContainerStyle}>
        <Animated.View
          style={[
            {
              ...StyleSheet.absoluteFillObject,
              backgroundColor: 'black',
              zIndex: 1000,
            },
            shadowImageStyle,
          ]}
        />
        <Image
          source={{
            uri: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
          }}
          style={{width: '100%', height: 400, resizeMode: 'cover'}}
        />
      </Animated.View>
    ),
    [headerContainerStyle, shadowImageStyle],
  );

  // const onScrollHandler = useAnimatedScrollHandler(({contentOffset}) => {
  //   animated.value = contentOffset.y;
  // });

  const flatList = useAnimatedRef<Animated.FlatList<any>>();
  const {width} = useWindowDimensions();
  const onScrollHandler = useAnimatedScrollHandler({
    onScroll: ({contentOffset}) => {
      animated.value = contentOffset.y;
    },
    onEndDrag: () => console.log('end_drag'),
    onMomentumEnd: ({contentOffset: {x}}) => {
      const localId = Math.round(x / width);
      console.log('on momentum end drag');
    },
  });

  return (
    <View>
      <Animated.View
        style={[
          {
            position: 'absolute',
            height: 60,
            backgroundColor: 'purple',
            zIndex: 1000,
            left: 0,
            right: 0,
            justifyContent: 'flex-end',
            padding: 10,
            elevation: 1,
          },
          headerStyle,
        ]}>
        <Animated.Text
          style={{
            fontSize: 18,
            color: 'white',
          }}>
          Parallax Screen
        </Animated.Text>
      </Animated.View>
      <Animated.FlatList
        ref={flatList}
        onScroll={onScrollHandler}
        scrollEventThrottle={16}
        ListHeaderComponent={ListHeaderComponent}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
        contentContainerStyle={{backgroundColor: 'white'}}
      />
    </View>
  );

  // return (
  //   <Animated.ScrollView
  //     scrollEventThrottle={16}
  //     onScroll={Animated.event(
  //       [{nativeEvent: {contentOffset: {y: animated}}}],
  //       {useNativeDriver: true},
  //     )}>
  //     <Animated.View
  //       style={{
  //         position: 'absolute',
  //         height: 60,
  //         backgroundColor: 'purple',
  //         zIndex: 1000,
  //         left: 0,
  //         right: 0,
  //         justifyContent: 'flex-end',
  //         padding: 10,
  //         opacity: animated.interpolate({
  //           inputRange: [0, 340],
  //           outputRange: [0, 1],
  //           extrapolate: 'clamp',
  //         }),
  //         transform: [{translateY: Animated.multiply(animated, 1)}],
  //       }}>
  //       <Text style={{fontSize: 18, color: 'white'}}>Parallax Screen</Text>
  //     </Animated.View>
  //     <Animated.View
  //       style={{
  //         transform: [
  //           {translateY: Animated.multiply(animated, 1)},
  //           {
  //             scale: animated.interpolate({
  //               inputRange: [-150, -1],
  //               outputRange: [1.8, 1.01],
  //               extrapolate: 'clamp',
  //             }),
  //           },
  //         ],
  //       }}>
  //       <Image
  //         source={{
  //           uri: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
  //         }}
  //         style={{width: '100%', height: 400, resizeMode: 'cover'}}
  //       />
  //     </Animated.View>
  //     <View style={{backgroundColor: 'white', padding: 10}}>
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //       <View style={{backgroundColor: 'blue', height: 80, marginBottom: 10}} />
  //     </View>
  //   </Animated.ScrollView>
  // );
};

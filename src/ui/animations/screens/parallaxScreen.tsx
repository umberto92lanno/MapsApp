import React, {useCallback, useRef} from 'react';
import {Animated, FlatList, Image, StyleSheet, Text, View} from 'react-native';

export const ParallaxScreen = () => {
  const animated = useRef(new Animated.Value(0)).current;
  const row = useRef(null);
  const renderItem = useCallback(() => {
    return (
      <View
        ref={row}
        style={{backgroundColor: 'blue', height: 80, marginBottom: 10}}
      />
    );
  }, []);
  const keyExtractor = useCallback((item, index) => `parallax_${index}`, []);
  const ListHeaderComponent = useCallback(
    () => (
      <Animated.View
        style={{
          transform: [
            {translateY: Animated.multiply(animated, 1)},
            {
              scale: animated.interpolate({
                inputRange: [-150, -1],
                outputRange: [1.8, 1.01],
                extrapolate: 'clamp',
              }),
            },
          ],
        }}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'black',
            zIndex: 1000,
            opacity: animated.interpolate({
              inputRange: [0, 240],
              outputRange: [0, 0.6],
              extrapolate: 'clamp',
            }),
          }}
        />
        <Image
          source={{
            uri: 'https://assets-global.website-files.com/6005fac27a49a9cd477afb63/6057684e5923ad2ae43c8150_bavassano_homepage_before.jpg',
          }}
          style={{width: '100%', height: 400, resizeMode: 'cover'}}
        />
      </Animated.View>
    ),
    [animated],
  );
  return (
    <View>
      <Animated.View
        style={{
          position: 'absolute',
          height: 60,
          backgroundColor: 'purple',
          zIndex: 1000,
          left: 0,
          right: 0,
          justifyContent: 'flex-end',
          padding: 10,
          elevation: 1,
          opacity: animated.interpolate({
            inputRange: [0, 340],
            outputRange: [1, 1],
            extrapolate: 'clamp',
          }),
          // transform: [{translateY: Animated.multiply(animated, 1)}],
        }}>
        <Animated.Text
          style={{
            fontSize: 18,
            color: 'white',
            transform: [
              {
                scale: animated.interpolate({
                  inputRange: [0, 240],
                  outputRange: [1, 0.8],
                  extrapolate: 'clamp',
                }),
              },
            ],
          }}>
          Parallax Screen
        </Animated.Text>
      </Animated.View>
      <Animated.FlatList
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {y: animated}}}],
          {useNativeDriver: true},
        )}
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

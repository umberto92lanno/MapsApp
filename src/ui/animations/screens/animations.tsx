import React, {useEffect, useState} from 'react';
import {
  Button,
  LayoutAnimation,
  Platform,
  Text,
  TouchableOpacity,
  UIManager,
  View,
} from 'react-native';

const Animations = () => {
  const [dimension, setDimension] = useState({
    width: 100,
    height: 50,
    fontSize: 30,
  });
  useEffect(() => {
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
  }, []);

  const onPress = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    // LayoutAnimation.configureNext(
    //   LayoutAnimation.create(
    //     300,
    //     LayoutAnimation.Types.linear,
    //     LayoutAnimation.Properties.scaleXY,
    //   ),
    // );
    setDimension({
      width: dimension.width === 200 ? 100 : 205,
      height: dimension.height === 100 ? 50 : 105,
      fontSize: dimension.fontSize === 40 ? 30 : 40,
    });
  };

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <View style={{width: dimension.width, height: dimension.height, backgroundColor: 'blue'}} />
      <Text style={{fontSize: dimension.fontSize}}>CIAO</Text>
      <Button title="Expand" onPress={onPress} />
      {/*<TouchableOpacity*/}
      {/*  style={{*/}
      {/*    width: dimension.width,*/}
      {/*    height: dimension.height,*/}
      {/*    backgroundColor: 'blue',*/}
      {/*    alignItems: 'center',*/}
      {/*    justifyContent: 'center',*/}
      {/*    borderRadius: 10,*/}
      {/*  }}*/}
      {/*  onPress={onPress}>*/}
      {/*  <Text>EXPAND</Text>*/}
      {/*</TouchableOpacity>*/}
    </View>
  );
};

export default Animations;

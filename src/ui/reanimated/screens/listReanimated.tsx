import React, {useState} from 'react';
import {Button, Dimensions, Text, View} from 'react-native';
import Animated, {
  Layout,
  LayoutAnimation,
  LayoutAnimationsValues,
  Transition,
  withDelay,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

// function CustomLayoutTransition(values) {
//   'worklet';
//   return {
//     animations: {
//       originX: withTiming(values.targetOriginX, {duration: 1000}),
//       originY: withDelay(
//         1000,
//         withTiming(values.targetOriginY, {duration: 1000}),
//       ),
//       width: withSpring(values.targetWidth),
//       height: withSpring(values.targetHeight),
//     },
//     initialValues: {
//       originX: values.currentOriginX,
//       originY: values.currentOriginY,
//       width: values.currentWidth,
//       height: values.currentHeight,
//     },
//   };
// }
//
// function Box({label, state}: {label: string; state: boolean}) {
//   const ind = label.charCodeAt(0) - 'A'.charCodeAt(0);
//   const delay = 300 * ind;
//   return (
//     <Animated.View
//       layout={CustomLayoutTransition}
//       style={[
//         { flex: 1, borderWidth: 1 },
//         {
//           flexDirection: state ? 'row' : 'row-reverse',
//           height: state ? 30 : 60,
//         },
//       ]}>
//       <Text> {label} </Text>
//     </Animated.View>
//   );
// }
//
// export function ListReanimated(): React.ReactElement {
//   const [state, setState] = useState(true);
//   return (
//     <View style={{marginTop: 30}}>
//       <View style={{height: 300}}>
//         <View style={{flexDirection: state ? 'row' : 'column'}}>
//           {state && <Box key="a" label="A" state={state} />}
//           <Box key="b" label="B" state={state} />
//           {!state && <Box key="a" label="A" state={state} />}
//           <Box key="c" label="C" state={state} />
//         </View>
//       </View>
//
//       <Button
//         onPress={() => {
//           setState(!state);
//         }}
//         title="toggle"
//       />
//     </View>
//   );
// }

// const CustomEnteringAnimation = (
//   values: LayoutAnimationsValues,
// ): LayoutAnimation => {
//   'worklet';
//
//   const animations = {
//     // your animations
//     originX: withTiming(values.targetOriginX, {duration: 2000}),
//   };
//   const initialValues = {
//     originX: -1000,
//     originY: values.currentOriginY,
//     width: values.currentWidth,
//     height: values.currentHeight,
//   };
//   const callback = (finished: boolean) => {
//     // optional callback that will fire when layout animation ends
//   };
//   return {
//     initialValues,
//     animations,
//   };
// };
//
// export const ListReanimated = () => {
//   return (
//     <View style={{flex: 1, justifyContent: 'center'}}>
//       <Animated.View
//         style={{height: 40, width: 300, backgroundColor: 'blue'}}
//         layout={CustomEnteringAnimation}
//       />
//     </View>
//   );
// };

const width = Dimensions.get('window').width;

function CardView() {
  const entering = targetValues => {
    'worklet';
    const animations = {
      originX: withTiming(targetValues.originX, {duration: 3000}),
      opacity: withTiming(1, {duration: 2000}),
      borderRadius: withDelay(4000, withTiming(30, {duration: 3000})),
      transform: [
        {rotate: withTiming('0deg', {duration: 4000})},
        {scale: withTiming(1, {duration: 3500})},
      ],
    };
    const initialValues = {
      originX: -width,
      opacity: 0,
      borderRadius: 10,
      transform: [{rotate: '90deg'}, {scale: 0.5}],
    };
    return {
      initialValues,
      animations,
    };
  };

  return (
    <Animated.View style={{height: 40, width: 200}} entering={entering}>
      <Text> Card Example </Text>
    </Animated.View>
  );
}

class AnimatedView extends React.Component {
  render() {
    return <View style={{height: 40, width: 300, backgroundColor: 'blue'}} />;
  }
}

const AnimatedPath = Animated.createAnimatedComponent(AnimatedView);

export const ListReanimated = () => {
  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      {/*<Animated.View*/}
      {/*  style={{height: 40, width: 300, backgroundColor: 'blue'}}*/}
      {/*  layout={CustomEnteringAnimation}*/}
      {/*/>*/}
      {/*<CardView />*/}
      <AnimatedPath layout={Layout.duration(3000)} />
    </View>
  );
};

import React from 'react';
import {Provider} from 'react-redux';
import BikeMaps from './ui/bikes/screens/bikeMaps';
import {store} from './store/root.store';
import Animations from './ui/animations/screens/animations';
import { NativeAnimations } from "./ui/animations/screens/nativeAnimations";
import { ParallaxScreen } from "./ui/animations/screens/parallaxScreen";
import { Transitioner } from "./ui/animations/screens/transitioner";
import { NativeReAnimations } from "./ui/reanimated/screens/nativeReAnimations";
import { ReParallaxScreen } from "./ui/reanimated/screens/reParallaxScreen";
import { ReTransitioner } from "./ui/reanimated/screens/reTransitioner";

const App = () => {
  return (
    <Provider store={store}>
      {/*<BikeMaps />*/}
      {/*<Animations />*/}
      {/*<NativeAnimations />*/}
      {/*<ParallaxScreen />*/}
      {/*<Transitioner />*/}
      {/*<NativeReAnimations />*/}
      <ReParallaxScreen />
      {/*<ReTransitioner />*/}
    </Provider>
  );
};

export default App;

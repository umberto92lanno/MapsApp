import React, {useEffect} from 'react';
import {Provider} from 'react-redux';
import BikeMaps from './ui/bikes/screens/bikeMaps';
import {store} from './store/root.store';
import Animations from './ui/animations/screens/animations';
import {NativeAnimations} from './ui/animations/screens/nativeAnimations';
import {ParallaxScreen} from './ui/animations/screens/parallaxScreen';
import {Transitioner} from './ui/animations/screens/transitioner';
import {NativeReAnimations} from './ui/reanimated/screens/nativeReAnimations';
import {ReParallaxScreen} from './ui/reanimated/screens/reParallaxScreen';
import {ReTransitioner} from './ui/reanimated/screens/reTransitioner';
import {NavigationContainer} from '@react-navigation/native';
import {BottomTab} from './services/navigation/stacks/bottom.tab';
import { getInitialValues, isDarkMode, setTimer, showAlert } from "./nativeModules/nativeUtils/nativeUtils";

const App = () => {
  useEffect(() => {
    // timer
    // setTimer(5000, (time) => console.warn('timer', time));
    // showAlert(console.log);
    //isDarkMode
    // isDarkMode().then(console.warn);
    // console.log('version', getInitialValues().version);
  }, []);
  return (
    <Provider store={store}>
      {/*<BikeMaps />*/}
      {/*<Animations />*/}
      {/*<NativeAnimations />*/}
      {/*<ParallaxScreen />*/}
      {/*<Transitioner />*/}
      {/*<NativeReAnimations />*/}
      {/*<ReParallaxScreen />*/}
      {/*<ReTransitioner />*/}
      <NavigationContainer>
        <BottomTab />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

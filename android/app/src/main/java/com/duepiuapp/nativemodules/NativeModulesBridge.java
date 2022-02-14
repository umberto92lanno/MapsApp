package com.duepiuapp.nativemodules;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;

import java.util.HashMap;
import java.util.Map;

public class NativeModulesBridge extends ReactContextBaseJavaModule {

    private static String MODULE_NAME = "NativeUtils";
    private ReactContext reactContext = null;
    private Utils utils = new Utils();

    @NonNull
    @Override
    public String getName() {
        return MODULE_NAME;
    }

    NativeModulesBridge(ReactContext reactContext) {
        this.reactContext = reactContext;
    }

    @Nullable
    @Override
    public Map<String, Object> getConstants() {
        Map<String, Object> constants = new HashMap<>();
        int androidVersion = utils.getAndroidVersion();
        constants.put("version", androidVersion);
        return constants;
    }

    @ReactMethod
    public void setTimer(int milliseconds) {
        final WritableMap map = Arguments.createMap();
        map.putInt("milliseconds", milliseconds);
        utils.setTimer(milliseconds, new UtilsCallback() {
            @Override
            public void success() {
                reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                       .emit("timerFired", map);
            }

            @Override
            public void error() {

            }
        });
    }

    @ReactMethod
    public void showAlert(Callback callback) {
        utils.showAlert(reactContext, new UtilsCallback() {
            @Override
            public void success() {
                callback.invoke(true);
            }

            @Override
            public void error() {
                callback.invoke(false);
            }
        });
    }

    @ReactMethod
    public void getDarkMode(Promise promise) {
        Boolean isDarkMode = utils.isDarkMode();
        promise.resolve(isDarkMode);
    }
}

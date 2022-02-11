package com.duepiuapp.nativemodules;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

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

    @ReactMethod
    public void setTimer(int milliseconds, Promise promise) {
        utils.setTimer(milliseconds, new UtilsCallback() {
            @Override
            public void success() {
                promise.resolve(null);
            }

            @Override
            public void error() {
                promise.reject(new Error());
            }
        });
    }
}

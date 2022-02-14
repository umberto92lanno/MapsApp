//
//  NativeModulesBridge.m
//  duepiuapp
//
//  Created by Umberto Lanno on 14/02/22.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(NativeUtils, RCTEventEmitter)

RCT_EXTERN_METHOD(getDarkMode:
                  (RCTPromiseResolveBlock)resolve
                  reject:(RCTPromiseRejectBlock)reject)

RCT_EXTERN_METHOD(showAlert:(RCTResponseSenderBlock)callback)

RCT_EXTERN_METHOD(setTimer:(nonnull NSNumber *)milliseconds)

@end

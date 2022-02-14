//
//  NativeModulesBridge.swift
//  duepiuapp
//
//  Created by Umberto Lanno on 14/02/22.
//

import Foundation

//@objc(NativeUtils)
//class NativeUtils: NSObject, RCTBridgeModule {
//  static func moduleName() -> String! {
//    return "NativeUtils"
//  }
//
//  var utils: Utils!
//
//  static func requiresMainQueueSetup() -> Bool {
//    return true
//  }
//
//  override init() {
//    super.init()
//    utils = Utils()
//  }
//
//
//  func constantsToExport() -> [AnyHashable : Any]! {
//    return [
//      "version": utils.getIosVersion(),
//    ]
//  }
//
//
//  @objc(getDarkMode:reject:)
//  func getDarkMode(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
//    resolve(utils.isDarkMode())
//  }
//
//  @objc(showAlert:)
//  func showAlert(callback: @escaping RCTResponseSenderBlock) {
//    DispatchQueue.main.async { [weak self] in
//      guard let weakSelf = self else { return }
//      weakSelf.utils.showAlert { success in
//        callback([NSNull(), success])
//      }
//    }
//  }
//}

@objc(NativeUtils)
class NativeUtils: RCTEventEmitter {
  override static func moduleName() -> String! {
    return "NativeUtils"
  }
  
  var utils: Utils!
  
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override init() {
    super.init()
    utils = Utils()
  }
  
  override func supportedEvents() -> [String]! {
    ["timerFired"]
  }
  
  override func constantsToExport() -> [AnyHashable : Any]! {
    return [
      "version": utils.getIosVersion(),
    ]
  }
  
  
  @objc(getDarkMode:reject:)
  func getDarkMode(resolve: RCTPromiseResolveBlock, reject: RCTPromiseRejectBlock) {
    resolve(utils.isDarkMode())
//    reject("Errore", "Numero Errore", "Messaggio Errore" as! Error)
  }
  
  @objc(showAlert:)
  func showAlert(callback: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async { [weak self] in
      guard let weakSelf = self else { return }
      weakSelf.utils.showAlert { success in
        callback([NSNull(), success])
      }
    }
  }
  
  @objc(setTimer:)
  func setTimer(milliseconds: NSNumber) {
    let seconds = (Double(exactly: milliseconds) ?? 1) / 1000
    DispatchQueue.main.async { [weak self] in
      guard let weakSelf = self else { return }
      weakSelf.utils.setTimer(seconds) {
        let dict = ["milliseconds": milliseconds]
        weakSelf.sendEvent(withName: "timerFired", body: dict)
      }
    }
  }
}

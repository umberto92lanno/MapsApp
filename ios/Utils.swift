//
//  Utils.swift
//  techcafe
//
//  Created by Umberto Lanno on 14/09/21.
//

import Foundation

class Utils {
  var timer: Timer?
  
  // constants
  func isDarkMode() -> Bool {
    if #available(iOS 12.0, *) {
      return UITraitCollection().userInterfaceStyle == .dark
    } else {
      return false
    }
  }
  func getIosVersion() -> String {
    return UIDevice.current.systemVersion
  }
  
  func setTimer(_ unitInSeconds: Double, callback: @escaping (() -> Void)) {
    timer = Timer.scheduledTimer(withTimeInterval: unitInSeconds, repeats: true) { timer in
      callback()
    }
    timer?.fire()
  }
  func avoidTimer() {
    timer?.invalidate()
  }
  
  func showAlert(callback: @escaping ((_ success: Bool) -> Void)) {
    let alert = UIAlertController(title: "Alert", message: "Message", preferredStyle: .alert)
    alert.addAction(UIAlertAction(title: "Cancel", style: .cancel, handler: { action in
      callback(false)
    }))
    alert.addAction(UIAlertAction(title: "OK", style: .default, handler: { action in
      callback(true)
    }))
    let window = UIApplication.shared.delegate?.window
    guard let wd = window else { return }
    guard let vc = wd?.rootViewController else { return }
    vc.present(alert, animated: true, completion: nil)
  }
  
  func showCGPoint(point: CGPoint, callback: @escaping ((_ point: CGPoint) -> Void)) {
    callback(point)
  }
}

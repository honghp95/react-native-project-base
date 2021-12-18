/**
 * Created by NganLang on 30/08/20.
 */
import messaging from '@react-native-firebase/messaging'
import LocalNotificationService from './LocalNotificationService'

export default class FCMService {
  register = onRegister => {
    this.checkPermission(onRegister)
    this.createNotificationListeners(onRegister)
  }

  checkPermission = onRegister => {
    messaging()
      .hasPermission()
      .then(enabled => {
        console.log(enabled)
        if (enabled === 1 || enabled === 2) this.getToken(onRegister)
        else this.requestPermission(onRegister)
      })
      .catch(error => {
        console.log('%c [FCMService] permission rejected', 'color:#4AF82F', error)
      })
  }

  getToken = onRegister => {
    messaging()
      .getToken()
      .then(fcmToken => {
        if (fcmToken) onRegister(fcmToken)
        else console.log('%c FCMService', 'color:#4AF82F', 'User does not have a device token')
      })
      .catch(error => {
        console.log('%c FCMService getToken rejected', 'color:#4AF82F', error)
      })
  }

  getTokenSendToServer = () => {
    return messaging().getToken()
  }

  requestPermission = onRegister => {
    messaging()
      .requestPermission()
      .then(() => {
        this.getToken(onRegister)
      })
      .catch(error => {
        console.log('%c FCMService requestPermission rejected', 'color:#4AF82F', error)
      })
  }

  deleteToken = () => {
    console.log('%c FCMService', 'color:#4AF82F', 'deleteToken')
    messaging()
      .deleteToken()
      .catch(error => {
        console.log('%c FCMService deleteToken rejected', 'color:#4AF82F', error)
      })
  }

  createNotificationListeners = () => {
    //When app is running but in background
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(remoteMessage);
      if (remoteMessage) {
        const notification = remoteMessage.notification
        this.onNotification(notification)
      }
    })

    //When app is opened from a quit state
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          const notification = remoteMessage.notification
          this.onNotification(notification)
        }
      })

    //Foreground state messages
    this.messageListener = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage);
      if (remoteMessage) {
        const notification = remoteMessage.notification
        this.onNotification(notification)
      }
    })
  }

  unRegister = () => {
    this.messageListener()
  }

  onNotification = notification => {
    LocalNotificationService.getInstance().showNotification(notification.title, notification.body)
  }
}

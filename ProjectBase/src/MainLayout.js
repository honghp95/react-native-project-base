/**
 * Created by Hong HP on 3/10/20.
 */
import React, {useEffect} from 'react'
import AppNavigation from './navigation/AppNavigator'
import Toast from './common/Toast'
import {Linking, StatusBar, StyleSheet, useWindowDimensions, View} from 'react-native'
import Alert from './common/Alert'
import {connect, useDispatch, useSelector} from 'react-redux'
import IndicatorDialog from './common/IndicatorDialog'
import CodePush from 'react-native-code-push'
import {buildEnv, codePushKey} from './constants/constants'
import RouteKey from './navigation/RouteKey'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {setDimension} from './Themes/Metrics'

function MainLayout(props) {
  const {showGlobalIndicator} = props
  const dispatch = useDispatch()
  const appStack = useSelector(state => state.app.appStack)
  const safeArea = useSafeAreaInsets()
  const {width, height} = useWindowDimensions()

  useEffect(() => {
    setDimension(width, height)
  }, [width, height])

  useEffect(() => {
    //TODO: Uncomment when use push notification
    /*const localNotificationService = new LocalNotificationService()
    const fcmServices = new FCMService()
    localNotificationService.configure()
    fcmServices.register(token => {
      console.log(token)
      dispatch(setNotificationToken(token))
    })*/
  }, [])

  useEffect(() => {
    if (appStack === RouteKey.MainStack) {
      handleDeepLink()
    }
  }, [appStack])

  function handleDeepLink() {
    Linking.getInitialURL().then(res => {
      //This function only work when disable debug mode.
      if (res?.url) {
      }
    })
    Linking.addEventListener('url', res => {
      if (res?.url) {
      }
    })
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" translucent backgroundColor={'transparent'} />
      <AppNavigation />
      <Alert />
      <Toast height={safeArea.top + 40} />
      {showGlobalIndicator && <IndicatorDialog message="Please wait...." />}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const codePushOptions = {
  checkFrequency: CodePush.CheckFrequency.MANUAL,
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: codePushKey[buildEnv],
}

export default connect(state => ({
  showGlobalIndicator: state.app.showGlobalIndicator,
  isShowRefuseTransferModal: state.app.isShowRefuseTransferModal,
}))(CodePush(codePushOptions)(MainLayout))

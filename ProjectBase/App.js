/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react'
import {connect, Provider} from 'react-redux'
import store from './src/redux/store'
import MainLayout from './src/MainLayout'
import {SafeAreaProvider} from 'react-native-safe-area-context'
import {Text, TextInput, UIManager} from 'react-native'
import {isIOS, responsiveFont} from './src/Themes/Metrics'
import './src/locale/I18nConfig'
import Fonts from './src/Themes/Fonts'
import Colors from './src/Themes/Colors'

console.disableYellowBox = true
Text.defaultProps = Text.defaultProps || {}
Text.defaultProps.style = {
  fontSize: responsiveFont(14),
  fontFamily: Fonts.AppleSDRegular,
  color: Colors.blackText,
}
Text.defaultProps.allowFontScaling = false
TextInput.defaultProps = {
  ...TextInput.defaultProps,
  allowFontScaling: false,
  underlineColorAndroid: 'transparent',
}

if (!isIOS() && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

const App: () => React$Node = () => {
  useEffect(() => {}, [])
  return (
    <SafeAreaProvider>
      <MainLayout />
    </SafeAreaProvider>
  )
}
const ConnectedApp = connect()(App)

export default function provider() {
  return (
    <Provider store={store}>
      <ConnectedApp />
    </Provider>
  )
}

/**
 * Created by NL on 03/08/21.
 */
import React from 'react'
import {StyleSheet, View} from 'react-native'
import {deviceHeight, deviceWidth} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import Header from '../common/Header'
import WebView from 'react-native-webview'
import {useDispatch} from 'react-redux'
import {setGlobalIndicatorVisibility} from '../redux/actions/app'

export default function WebViewScreen({route, navigation}) {
  const {url} = route.params || {}
  const dispatch = useDispatch()

  return (
    <View style={styles.container}>
      <Header title={'WebView'} />
      <WebView
        startInLoadingState
        scalesPageToFit
        showsVerticalScrollIndicator={false}
        bounces={false}
        source={{uri: url}}
        onLoadEnd={() => {
          dispatch(setGlobalIndicatorVisibility(false))
        }}
        onLoadStart={webViewState => {
          dispatch(setGlobalIndicatorVisibility(true))
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})

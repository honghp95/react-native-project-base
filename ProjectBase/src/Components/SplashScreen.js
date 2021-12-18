/**
 * Created by Hong HP on 3/9/20.
 */
import {View, StyleSheet, StatusBar} from 'react-native'
import React, {useEffect, useRef, useState} from 'react'
import {responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import {useDispatch} from 'react-redux'
import {loadBootstrap} from '../redux/actions/app'
import * as Progress from 'react-native-progress'
import CodePush from 'react-native-code-push'
import {buildEnv, codePushKey} from '../constants/constants'
import Colors from '../Themes/Colors'

const codePushOptions = {
  installMode: CodePush.InstallMode.IMMEDIATE,
  deploymentKey: codePushKey[buildEnv],
}

export default function SplashScreen(props) {
  const [receivedBytes, setReceivedBytes] = useState(0)
  const total = useRef(0)
  const dispatch = useDispatch()

  useEffect(() => {
    CodePush.sync(
      codePushOptions,
      status => {
        switch (status) {
          case CodePush.SyncStatus.UP_TO_DATE:
          case CodePush.SyncStatus.UNKNOWN_ERROR:
            dispatch(loadBootstrap())
            break
        }
      },
      ({receivedBytes, totalBytes}) => {
        total.current = totalBytes
        setReceivedBytes(receivedBytes)
      },
    )
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={Colors.primary} barStyle={'light-content'} />
      {!!total.current && (
        <View style={{position: 'absolute', bottom: responsiveHeight(50)}}>
          <Progress.Bar
            progress={receivedBytes / total.current}
            // progress={0.5}
            color={Colors.white}
            showsText
            width={responsiveWidth(250)}
          />
        </View>
      )}
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary,
  },
})

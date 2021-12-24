/**
 * Created by Hong HP on 3/9/20.
 */

import React, {useMemo, useState} from 'react'
import {View, StyleSheet, ScrollView, useWindowDimensions} from 'react-native'
import {useSafeAreaInsets} from 'react-native-safe-area-context'
import {useDispatch} from 'react-redux'

import Colors from '../../Themes/Colors'
import {responsiveHeight, responsiveWidth} from '../../Themes/Metrics'
import {userLogin} from '../../redux/actions/user'
import Toast from '../../common/Toast'
import {localize} from '../../locale/I18nConfig'
import ButtonView from '../../common/ButtonView'
import FloatTitleTextInput from '../../common/FloatTitleTextInput'

export default function LoginScreen(props) {
  const [username, setUsername] = useState(__DEV__ ? '' : '')
  const [password, setPassword] = useState(__DEV__ ? '' : '')
  const {width, height} = useWindowDimensions()
  const safeView = useSafeAreaInsets()
  const dispatch = useDispatch()

  function handleUserLogin() {
    if (!username || !password) {
      return Toast.info('Please input your email and password!')
    }
    dispatch(userLogin(username, password))
  }

  const isEnable = useMemo(() => {
    return !!username && !!password
  }, [username, password])

  return (
    <ScrollView style={{flex: 1}} bounces={false} showsVerticalScrollIndicator={false}>
      <View style={[styles.container, {paddingTop: safeView.top, width, height}]}>
        <FloatTitleTextInput
          placeholderTextInput={localize('loginScreen.email')}
          containerStyle={{marginVertical: responsiveHeight(10)}}
          onChangeText={setUsername}
          value={username}
        />
        <FloatTitleTextInput
          placeholderTextInput={localize('loginScreen.password')}
          containerStyle={{marginVertical: responsiveHeight(10)}}
          onChangeText={setPassword}
          value={password}
          isPassword
        />
        <ButtonView
          title={localize('loginScreen.login')}
          disabled={!isEnable}
          style={{marginTop: responsiveHeight(20)}}
          onPress={() => handleUserLogin()}
        />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(20),
  },
})

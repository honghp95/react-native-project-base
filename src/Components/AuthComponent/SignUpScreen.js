/**
 * Created by Hong HP on 3/11/20.
 */
import React, {useState} from 'react'
import {View, StyleSheet, ScrollView, Keyboard, Text} from 'react-native'
import {useDispatch} from 'react-redux'

import Colors from '../../Themes/Colors'
import ButtonView from '../../common/ButtonView'
import Fonts from '../../Themes/Fonts'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../../Themes/Metrics'
import TextInputView from '../../common/TextInputView'
import {localize} from '../../locale/I18nConfig'
import HeaderTitle from '../../common/HeaderTitle'
import Header from '../../common/Header'
import RouteKey from '../../navigation/RouteKey'
import {userRegister} from '../../redux/actions/user'
import {ResponseSuccess} from '../../constants/constants'
import {setGlobalIndicatorVisibility} from '../../redux/actions/app'
import Toast from '../../common/Toast'
import {FIELDS} from './components/constant'

function SignUpScreen({navigation, route}) {
  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState({})
  const [error, setError] = useState('')

  async function handleSignUp() {
    try {
      Keyboard.dismiss()
      dispatch(setGlobalIndicatorVisibility(true))
      const resExists = await checkExistingUser(userInfo.userName, userInfo.phone, userInfo.email)
      if (resExists.code !== ResponseSuccess) throw new Error(resExists?.message)
      dispatch(userRegister(userInfo))
    } catch (e) {
      dispatch(setGlobalIndicatorVisibility(false))
      Toast.info(e.message)
    }
  }

  const handleNavigationSignIn = () => {
    Keyboard.dismiss()
    navigation.navigate(RouteKey.LoginScreen)
  }

  const basicInfoItem = (item, index) => (
    <TextInputView
      keyboardType={item.keyboardType}
      key={index.toString()}
      placeholder={localize(item.key)}
      editable={item.editable}
      value={userInfo[item.key]}
      messageError={error[item.key]}
      secureTextEntry={item.secureTextEntry}
      onChangeText={text => {
        setUserInfo({...userInfo, [item.key]: text})
      }}
      inputStyle={{
        marginBottom: responsiveHeight(error[item.key] ? 0 : 15),
      }}
    />
  )

  function renderBasicInfo() {
    return <View>{FIELDS.map(basicInfoItem)}</View>
  }

  return (
    <View style={styles.container}>
      <Header />
      <HeaderTitle title={`${localize('welcome')}!`} subTitle={localize('signUpScreen.signUpGetStarted')} />
      <View style={{flex: 1}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardDismissMode={'on-drag'}
          keyboardShouldPersistTaps={'handled'}
          style={{marginTop: responsiveHeight(20)}}
          bounces={false}>
          {renderBasicInfo()}
          <View
            style={{
              justifyContent: 'space-between',
              flex: 1,
            }}>
            <ButtonView
              style={{marginTop: responsiveHeight(20)}}
              title={localize('create')}
              onPress={handleSignUp}
            />
          </View>
        </ScrollView>
        <Text style={styles.textStyle}>
          {localize('signUpScreen.alreadyHaveAccount') + ' '}
          <Text
            onPress={handleNavigationSignIn}
            style={{textDecorationLine: 'underline', fontFamily: Fonts.AppleSDSemiBold}}>
            {localize('signIn')}
          </Text>
        </Text>
      </View>
    </View>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: responsiveWidth(25),
  },
  icon: {
    width: responsiveHeight(20),
    height: responsiveWidth(20),
  },
  row: {
    flexDirection: 'row',
  },
  textStyle: {
    fontFamily: Fonts.AppleSDRegular,
    textAlign: 'center',
    marginBottom: responsiveHeight(30),
    fontSize: responsiveFont(11),
  },
})

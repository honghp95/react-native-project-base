/**
 * Created by NL on 02/08/21.
 */
import React from 'react'
import {Text, StyleSheet, View, Modal, TouchableOpacity, KeyboardAvoidingView} from 'react-native'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'
import {
  deviceHeight,
  deviceWidth,
  isIOS,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../Themes/Metrics'
import {localize} from '../locale/I18nConfig'
import ButtonView from './ButtonView'
import IndicatorDialog from './IndicatorDialog'
import Toast from './Toast'
import {useSelector} from 'react-redux'

export default function ModalView({visible, children, title, onClose, onSubmit, disabled = false}) {
  const showGlobalIndicator = useSelector(state => state.app.showGlobalIndicator)
  return (
    <Modal visible={visible} animationType={'fade'} onRequestClose={onClose} transparent={true}>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.backdropContainer,
            {
              width: deviceWidth(),
              height: deviceHeight(),
            },
          ]}
          activeOpacity={1}
          onPress={onClose}
        />
        <KeyboardAvoidingView
          behavior={isIOS() ? 'padding' : 'height'}
          style={{
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <View style={styles.content}>
            {!!title && <Text style={styles.title}>{title}</Text>}
            {children}
            <ButtonView
              title={localize('submit')}
              onPress={() => {
                onSubmit?.()
              }}
              disabled={disabled}
            />
            <ButtonView
              style={{backgroundColor: 'transparent'}}
              title={localize('cancel')}
              titleStyle={{color: Colors.primary}}
              onPress={onClose}
            />
          </View>
        </KeyboardAvoidingView>
      </View>
      {showGlobalIndicator && <IndicatorDialog message="Please wait...." />}
      <Toast height={40} />
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  backdropContainer: {
    backgroundColor: Colors.blackOpacity,
    position: 'absolute',
  },
  content: {
    backgroundColor: Colors.white,
    width: '90%',
    maxWidth: '90%',
    minWidth: '90%',
    paddingHorizontal: responsiveWidth(20),
    borderRadius: 10,
    paddingTop: responsiveHeight(24),
    paddingBottom: responsiveHeight(10),
  },
  title: {
    textAlign: 'center',
    fontFamily: Fonts.AppleSDBold,
    fontSize: responsiveFont(15),
    color: Colors.blackText,
  },
})

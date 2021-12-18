/**
 * Created by NL on 29/03/21.
 */
import React from 'react'
import {Text, StyleSheet, View, Modal, TouchableOpacity, Dimensions} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import ButtonView from './ButtonView'
import Colors from '../Themes/Colors'
import {
  deviceHeight,
  deviceWidth,
  isIOS,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import Row from './Row'
import {localize} from '../locale/I18nConfig'


export default function BottomSheet({
  visible,
  onClose,
  headerTitle,
  children,
  onConfirm,
  confirmButtonStyle,
  isShowCloseButton = true,
  titleStyle,
  containerStyle,
  titleContainerStyle,
  disabled,
  contentStyle,
  onCancel,
  hasButton = true,
  closeRight = false,
}) {
  return (
    <Modal animationType={'slide'} visible={visible} transparent onRequestClose={onClose}>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => {
            onClose?.()
          }}
          activeOpacity={1}
          style={[
            styles.backdropContainer,
            {
              width: deviceWidth(),
              height: deviceHeight(),
            },
          ]}
        />
        <View
          style={[
            styles.content,
            {
              paddingBottom: responsiveHeight(isIOS() ? 30 : 20),
            },
            containerStyle,
          ]}>
          {headerTitle && (
            <View style={[styles.titleContainer, titleContainerStyle]}>
              {isShowCloseButton && (
                <TouchableOpacity
                  onPress={() => {
                    if (!!onClose) onClose()
                  }}
                  style={{}}>
                  <MaterialIcons name={'close'} size={30} color={Colors.gray} />
                </TouchableOpacity>
              )}
              <Text style={[styles.title, titleStyle]}>{headerTitle}</Text>
              {closeRight && (
                <TouchableOpacity
                  onPress={() => {
                    if (!!onClose) onClose()
                  }}
                  style={{marginRight: responsiveWidth(10)}}>
                  <MaterialIcons name={'close'} size={30} color={Colors.gray} />
                </TouchableOpacity>
              )}
            </View>
          )}
          <View style={[styles.childrenContainer, contentStyle]}>{children}</View>
          {hasButton && (
            <Row style={styles.buttonContainer}>
              <ButtonView
                disabled={disabled}
                onPress={onCancel}
                title={localize('cancel')}
                style={[{backgroundColor: Colors.grayLight3, width: '48%'}, confirmButtonStyle]}
              />
              <ButtonView
                disabled={disabled}
                onPress={onConfirm}
                title={localize('confirm')}
                style={[{width: '48%'}, confirmButtonStyle]}
              />
            </Row>
          )}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropContainer: {
    backgroundColor: Colors.blackOpacity,
    position: 'absolute',
  },
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  childrenContainer: {
    paddingHorizontal: responsiveWidth(20),
  },
  title: {
    fontSize: responsiveFont(16),
    color: Colors.blackText,
    textAlign: 'center',
    fontFamily: Fonts.AppleSDSemiBold,
    flex: 1,
  },
  titleContainer: {
    backgroundColor: Colors.white,
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.grayLight3,
    maxHeight: 48,
    height: responsiveHeight(48),
  },
  buttonContainer: {justifyContent: 'space-between', paddingHorizontal: responsiveWidth(15)},
})

/**
 * Created by Hong HP on 3/10/20.
 */
import {TouchableOpacity, StyleSheet, Text} from 'react-native'
import React from 'react'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ButtonView({
  title,
  style,
  onPress,
  disabled,
  hasIcon,
  titleStyle,
  children,
  wrapper,
  topComponent,
  activeOpacity,
}) {
  return (
    <TouchableOpacity
      activeOpacity={activeOpacity}
      style={[styles.container, style, disabled && {backgroundColor: Colors.grayLight3}]}
      disabled={disabled}
      onPress={onPress}>
      {!!topComponent && topComponent}
      {title && (
        <Text style={[styles.textStyle, titleStyle, disabled && {color: Colors.placeholderText}]}>
          {title}
        </Text>
      )}
      {hasIcon && <MaterialIcons name={'arrow-forward'} color={Colors.white} size={25} />}
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    minHeight: 44,
    height: responsiveHeight(44),
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: Colors.primary,
  },
  textStyle: {
    color: Colors.blackText,
    fontSize: responsiveFont(15),
    fontFamily: Fonts.AppleSDSemiBold,
    textAlignVertical: 'center',
  },
})

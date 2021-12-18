/**
 * Created by Hong HP on 3/10/20.
 */

import React, {useState} from 'react'
import {Platform, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native'
import Colors from '../Themes/Colors'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Fonts from '../Themes/Fonts'
import VectorIconButton from './VectorIconButton'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {show} from 'yarn/lib/cli'

export default function TextInputView({
  value,
  onChangeText,
  title,
  secureTextEntry,
  placeholder,
  onSubmitEditing,
  style,
  titleStyle,
  isRequire,
  editable = true,
  inputStyle,
  multiline = false,
  icon,
  messageError,
  textInputStyle,
  keyboardType = 'default',
  onPress,
  maxLength,
  refs,
  scrollEnabled = false,
  autoFocus,
  onBlur,
  onFocus,
  infoMessage,
  leftIcon,
}) {
  const [showPassword, setShowPassword] = useState(false)
  const [isFocus, setFocus] = useState(false)

  return (
    <TouchableOpacity style={style} onPress={onPress} disabled={!onPress} activeOpacity={1}>
      {!!title && (
        <Text style={[styles.textStyle, titleStyle]}>
          {title}
          {isRequire && <Text style={{color: Colors.red}}> *</Text>}
        </Text>
      )}
      <View
        style={[
          styles.textInputContainer,
          inputStyle,
          messageError && {borderColor: Colors.redErrorText},
          isFocus && {borderColor: Colors.primary},
        ]}
        pointerEvents={editable ? 'auto' : 'none'}>
        {!!leftIcon && leftIcon}
        <TextInput
          autoFocus={autoFocus}
          value={value ? value.toString() : ''}
          ref={refs}
          style={[styles.textInput, textInputStyle, messageError && {color: Colors.redErrorText}]}
          onChangeText={text => {
            onChangeText && onChangeText(text)
          }}
          maxLength={maxLength}
          placeholder={placeholder}
          placeholderTextColor={Colors.placeholderText}
          keyboardType={keyboardType}
          underlineColorAndroid="transparent"
          secureTextEntry={secureTextEntry && !showPassword}
          onSubmitEditing={() => {
            if (onSubmitEditing) {
              onSubmitEditing()
            }
            setFocus(false)
          }}
          onBlur={() => {
            setFocus(false)
            onBlur?.()
          }}
          autoCapitalize="none"
          editable={editable}
          scrollEnabled={scrollEnabled}
          multiline={multiline}
          textAlignVertical={'top'}
          onFocus={() => {
            setFocus(true)
            onFocus?.()
          }}
        />
        {!!icon && icon}
        {!!secureTextEntry && (
          <VectorIconButton
            style={{marginRight: responsiveWidth(8)}}
            onPress={() => {
              setShowPassword(!showPassword)
            }}
            Component={MaterialCommunityIcons}
            name={!showPassword ? 'eye' : 'eye-off'}
            size={20}
            color={Colors.grayText}
          />
        )}
        {isFocus && value?.length > 0 && (
          <VectorIconButton
            hitSlop={{top: 10, right: 10, bottom: 10, left: 10}}
            style={{marginHorizontal: responsiveWidth(4)}}
            onPress={() => onChangeText?.('')}
            Component={AntDesign}
            name={'closecircle'}
            color={messageError ? Colors.redErrorText : Colors.grayLight}
            size={15}
          />
        )}
      </View>
      {!!infoMessage && (
        <Text style={[styles.textStyle, {marginTop: responsiveHeight(8)}]}>{infoMessage}</Text>
      )}
      {!!messageError && <Text style={styles.textError}>{messageError}</Text>}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputContainer: {
    paddingRight: responsiveWidth(1),
    height: responsiveHeight(40),
    minHeight: 40,
    borderColor: Colors.grayBold,
    borderBottomWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    flex: 1,
    color: Colors.blackText,
    paddingBottom: Platform.OS === 'ios' ? 0 : 5,
    textAlignVertical: 'center',
    fontFamily: Fonts.AppleSDRegular,
    fontSize: responsiveFont(14),
  },
  textStyle: {
    fontSize: responsiveFont(14),
    fontFamily: Fonts.AppleSDRegular,
    color: Colors.grayText,
  },
  textError: {
    fontSize: responsiveFont(12),
    color: Colors.redErrorText,
    fontFamily: Fonts.AppleSDRegular,
    marginTop: responsiveHeight(8),
  },
})

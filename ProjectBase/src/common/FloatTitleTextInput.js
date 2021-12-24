/**
 * Created by NL on 08/09/21
 */
import React, {forwardRef, useEffect, useImperativeHandle, useRef, useState} from 'react'
import {View, Animated, StyleSheet, TextInput, Text, TouchableOpacity} from 'react-native'
import Colors from '../Themes/Colors'
import {isIOS, responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import {isEmptyValues} from '../utilities/utils'
import VectorIconButton from './VectorIconButton'

const hitSlop = {top: 20}

function FloatTitleTextInput(
  {
    disabled,
    value,
    staticTitle,
    onChangeText,
    keyboardType = 'default',
    messageError,
    onPress,
    rootStyle,
    messageInfo,
    onSubmitEditing,
    titleStyle,
    editable = true,
    multiline = false,
    rightComponent,
    textInputStyle,
    maxLength,
    onFocus,
    onBlur,
    leftComponent,
    floatTitle,
    placeholderTextInput,
    blurOnSubmit,
    onEndEditing,
    selection,
    floatTitleStyle,
    autoFocus,
    autoCapitalize = 'none',
    isPassword = false,
    scrollEnabled = false,
    placeholderTextColor,
    contentStyle,
    pointerEvents = 'auto',
    containerStyle,
  },
  ref,
) {
  const [secureText, setSecureText] = useState(true)
  const [isFocusedState, setIsFocused] = useState(false)
  const [isFocusedInput, setIsFocusedInput] = useState(false)

  const inputRef = useRef(null)

  const topAnimated = useRef(new Animated.Value(0)).current

  const textColor = disabled ? Colors.grayText : !isEmptyValues(value) ? Colors.primary : Colors.grayLight

  useEffect(() => {
    if (value !== '' || isFocusedState) setIsFocused(true)
    else if (value === '' || value === null) setIsFocused(false)
  }, [value])

  useEffect(() => {
    if (isFocusedState || value !== '') {
      animateFocus()
    } else animateBlur()
  }, [isFocusedState])

  useImperativeHandle(ref, () => ({
    focus() {
      inputRef.current.focus()
    },
    blur() {
      inputRef.current.blur()
    },
  }))

  const handleFocus = () => {
    setIsFocusedInput(true)
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocusedInput(false)
    setIsFocused(false)
  }

  const setFocus = () => {
    if (editable) inputRef.current?.focus()
  }

  const setBlur = () => {
    inputRef.current?.blur()
  }

  const animateFocus = () => {
    Animated.timing(topAnimated, {
      toValue: isIOS() ? -25 : -25,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const animateBlur = () => {
    Animated.timing(topAnimated, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start()
  }

  const togglePasswordVisibility = () => {
    setSecureText(!secureText)
  }

  const onClearText = () => {
    onChangeText('')
    if (inputRef.current?.isFocused()) {
      return
    }
    //if input is not focused, run animateBlur
    setIsFocused(false)
  }

  const Wrapper = !!onPress ? TouchableOpacity : View

  return (
    <Wrapper hitSlop={hitSlop} onPress={onPress} style={rootStyle}>
      <View style={[styles.container, containerStyle]} pointerEvents={pointerEvents}>
        {!!floatTitle && (
          <Animated.Text
            onPress={setFocus}
            style={[
              styles.titleStyles,
              {
                transform: [
                  {
                    translateY: topAnimated,
                  },
                ],
                color: textColor,
              },
              floatTitleStyle,
            ]}>
            {floatTitle}
          </Animated.Text>
        )}
        <View
          style={[
            styles.content,
            {
              borderBottomColor: isFocusedState ? Colors.primary : Colors.grayLight,
            },
            contentStyle,
          ]}>
          {!!staticTitle && (
            <Text
              onPress={setFocus}
              style={[
                styles.titleStyles,
                {
                  bottom: 0,
                  top: -25,
                  color: textColor,
                },
                titleStyle,
              ]}>
              {staticTitle}
            </Text>
          )}
          {!!leftComponent && leftComponent}
          <TextInput
            autoFocus={autoFocus}
            selection={selection}
            value={value}
            ref={inputRef}
            style={[styles.textInput, textInputStyle]}
            onChangeText={text => {
              onChangeText && onChangeText(text)
            }}
            maxLength={maxLength}
            placeholder={placeholderTextInput}
            placeholderTextColor={placeholderTextColor || Colors.grayBold}
            keyboardType={keyboardType}
            underlineColorAndroid={'transparent'}
            secureTextEntry={isPassword !== undefined ? isPassword && secureText : false}
            onEndEditing={onEndEditing}
            blurOnSubmit={blurOnSubmit}
            onSubmitEditing={() => {
              onSubmitEditing?.()
              setIsFocused(false)
            }}
            autoCapitalize={autoCapitalize}
            editable={editable}
            scrollEnabled={scrollEnabled}
            multiline={multiline}
            textAlignVertical={'top'}
            onFocus={onFocus !== undefined ? onFocus : handleFocus}
            onBlur={onBlur !== undefined ? onBlur : handleBlur}
          />
          {isFocusedState && isFocusedInput && value?.length > 0 && pointerEvents !== 'none' && (
            <VectorIconButton
              style={{marginLeft: 5}}
              onPress={onClearText}
              Component={MaterialCommunityIcons}
              name={'close-circle'}
              size={18}
              color={Colors.grayLight}
            />
          )}
          {isPassword && (
            <VectorIconButton
              style={styles.iconContainer}
              onPress={togglePasswordVisibility}
              Component={MaterialCommunityIcons}
              name={secureText ? 'eye' : 'eye-off'}
              size={20}
              color={Colors.grayText}
            />
          )}
          {!!rightComponent && rightComponent}
        </View>
      </View>
      {!!messageError && <Text style={styles.txtMessageError}>{messageError}</Text>}
      {!!messageInfo && <Text style={styles.txtMessageInfo}>{messageInfo}</Text>}
    </Wrapper>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  titleStyles: {
    width: '100%',
    zIndex: 999,
    position: 'absolute',
    fontSize: responsiveFont(14),
    bottom: isIOS() ? 10 : 8,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingLeft: responsiveWidth(5),
    paddingRight: responsiveWidth(8),
    paddingBottom: isIOS() ? 10 : 0,
  },
  textInput: {
    flex: 1,
    color: Colors.black,
    fontSize: responsiveFont(14),
    paddingTop: 0,
    paddingBottom: 0,
  },
  txtMessageError: {
    fontSize: responsiveHeight(11),
    marginTop: responsiveHeight(3),
    color: Colors.red,
  },
  txtMessageInfo: {
    fontSize: responsiveHeight(11),
    marginTop: responsiveHeight(3),
    color: Colors.grayLight,
  },
  iconContainer: {marginLeft: responsiveWidth(8)},
})

export default forwardRef(FloatTitleTextInput)

import React, {useState} from 'react'
import {TouchableOpacity, StyleSheet, Animated, TextInput, View} from 'react-native'
import Colors from '../Themes/Colors'

import {responsiveHeight, responsiveWidth, responsiveFont} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {localize} from '../locale/I18nConfig'

export default function SearchBar({
  onChangeText,
  value,
  placeholder,
  autoFocus,
  onSubmitEditing,
  rightComponent,
  onPress,
  disabled,
  wrapperStyle,
  showSearchIcon = true,
  fontSize = responsiveFont(14),
  onBlur,
  returnKeyType,
  leftComponent,
  style,
  onFocus,
}) {
  const [isFocus, setFocus] = useState(false)

  return (
    <TouchableOpacity
      disabled={disabled}
      activeOpacity={1}
      onPress={() => {
        if (!!onPress) onPress()
      }}
      style={[styles.searchWrapper, style]}>
      <Animated.View pointerEvents={!!onPress ? 'none' : 'auto'} style={[styles.searchSection, wrapperStyle]}>
        {showSearchIcon && (
          <MaterialIcons
            name={'search'}
            color={Colors.grayText}
            size={20}
            style={{marginRight: responsiveWidth(6)}}
          />
        )}
        {!!leftComponent && leftComponent}
        <TextInput
          editable={!disabled}
          style={[styles.input, {fontSize: fontSize}]}
          value={value}
          autoFocus={autoFocus}
          onChangeText={onChangeText}
          underlineColorAndroid="transparent"
          placeholderTextColor={Colors.grayText}
          placeholder={placeholder || localize('search')}
          onSubmitEditing={onSubmitEditing}
          onFocus={() => {
            setFocus(true)
            onFocus?.()
          }}
          onBlur={() => {
            setFocus(false)
            onBlur?.()
          }}
          returnKeyType={returnKeyType}
        />
        {isFocus && value?.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              onChangeText('')
            }}
            style={{marginLeft: responsiveWidth(5)}}>
            <MaterialCommunityIcons name={'close-circle'} color={'#999999'} size={18} />
          </TouchableOpacity>
        )}

        {!!rightComponent && rightComponent}
      </Animated.View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  searchWrapper: {
    justifyContent: 'center',
    height: responsiveHeight(40),
    marginBottom: responsiveHeight(2),
  },
  searchSection: {
    height: responsiveHeight(40),
    // flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 10,
    minHeight: 40,
    paddingHorizontal: responsiveWidth(10),
  },
  input: {
    fontFamily: Fonts.AppleSDRegular,
    flex: 1,
    height: responsiveHeight(40),
    fontSize: responsiveFont(14),
    color: Colors.blackText,
  },
})

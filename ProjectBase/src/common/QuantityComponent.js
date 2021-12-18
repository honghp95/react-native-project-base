import React, {useEffect, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, TextInput, Text} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Themes/Colors'
import {isIOS, responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'

function QuantityComponent({value, setValue, maxValue = 999, style, buttonStyle, isUpdateNow, minValue = 0}) {
  const [inputValue, setInputValue] = useState(value)
  useEffect(() => {
    setInputValue(value)
  }, [value])
  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity
        style={[styles.buttonDecrease, buttonStyle]}
        onPress={() => {
          if (value > minValue) setValue(value - 1)
        }}>
        <MaterialIcons name={'remove'} color={Colors.white} size={25} />
      </TouchableOpacity>
      <TextInput
        numberOfLines={1}
        maxLength={3}
        style={styles.textInput}
        placeholder={'0'}
        placeholderTextColor={Colors.blackText}
        onChangeText={text => {
          if (+text <= maxValue) {
            if (isUpdateNow) {
              setValue(+text)
            } else {
              setInputValue(text)
            }
          }
        }}
        onBlur={() => {
          setValue(+inputValue)
        }}
        value={inputValue ? `${inputValue}` : ''}
        keyboardType={'number-pad'}
      />
      <TouchableOpacity
        style={[styles.buttonIncrease, buttonStyle]}
        onPress={() => {
          if (value < maxValue) setValue(value + 1)
        }}>
        <MaterialIcons name={'add'} color={Colors.white} size={25} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'row',
    height: responsiveHeight(36),
    alignItems: 'center',
    borderRadius: responsiveWidth(4),
  },
  buttonIncrease: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.primary,
    height: '100%',
    borderRadius: responsiveWidth(4),
  },
  buttonDecrease: {
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(5),
    backgroundColor: Colors.primary,
    borderRadius: responsiveWidth(4),
  },
  textInput: {
    fontSize: responsiveFont(17),
    textAlign: 'center',
    textAlignVertical: 'center',
    marginBottom: 0,
    paddingBottom: isIOS() ? 0 : 5,
    color: Colors.blackText,
    minWidth: responsiveWidth(56),
    fontFamily: Fonts.AppleSDRegular,
  },
})

export default QuantityComponent

/**
 * Created by Hong HP on 3/30/20.
 */
import {Text, TouchableOpacity, StyleSheet} from 'react-native'
import React from 'react'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors, {Opacity} from '../Themes/Colors'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'

export default function RadioButton({
  selected,
  onPress,
  size = 25,
  style,
  tintColor = Colors.primary,
  text,
  isIconRight = false,
  textStyle,
}) {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        style,
        selected && {
          borderColor: Colors.primary,
          borderWidth: 1,
          backgroundColor: Colors.primary + Opacity[12],
        },
      ]}
      onPress={() => {
        onPress?.()
      }}>
      {!isIconRight && (
        <MaterialIcons
          name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={size}
          color={selected ? tintColor : Colors.grayIcon}
        />
      )}
      <Text
        // numberOfLines={1}
        style={[
          styles.text,
          {
            color: selected ? tintColor : Colors.grayText,
          },
          textStyle,
        ]}>
        {text}
      </Text>
      {isIconRight && (
        <MaterialIcons
          name={selected ? 'radio-button-checked' : 'radio-button-unchecked'}
          size={size}
          color={selected ? tintColor : Colors.grayIcon}
        />
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.grayLight2,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(6),
    minHeight: 44,
    height: responsiveHeight(44),
  },
  text: {
    flex: 1,
    fontSize: responsiveFont(13.5),
    fontFamily: Fonts.AppleSDRegular,
    marginLeft: responsiveWidth(5),
    flexShrink: 1,
  },
})

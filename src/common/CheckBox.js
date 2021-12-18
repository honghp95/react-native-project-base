/**
 * Created by Hong HP on 4/6/20.
 */
import React from 'react'
import {Text, TouchableOpacity, View} from 'react-native'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'
import VectorIconButton from './VectorIconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function ({title, onPress, value, size = 22, style}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        {
          flexDirection: 'row',
          marginBottom: responsiveHeight(15),
        },
        style,
      ]}>
      <VectorIconButton
        disabled
        Component={MaterialIcons}
        name={value ? 'check-box' : 'check-box-outline-blank'}
        size={22}
        color={value ? Colors.primary : Colors.grayIcon}
        style={{marginRight: responsiveWidth(10)}}
      />
      <Text
        style={{
          fontFamily: Fonts.AppleSDRegular,
          color: Colors.blackText,
          fontSize: responsiveFont(14),
          flex: 1,
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

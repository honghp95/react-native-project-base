/**
 * Created by NganLang on 28/08/20.
 */
import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import Colors from '../Themes/Colors'
import {responsiveFont, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import {getInitials} from '../utilities/utils'

export default function AvatarName({fullName, style, size = 50}) {
  /**************************
   ======= Variables =======
   *************************/
  /**************************
   ======= Functions =======
   *************************/

  /**************************
   ======= Components ======
   *************************/

  /**************************
   ========== Main =========
   *************************/
  return (
    <View
      style={[
        styles.container,
        {width: responsiveWidth(size), borderRadius: responsiveWidth(size / 2)},
        style,
      ]}>
      <Text style={[styles.text]}>{getInitials(fullName)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    aspectRatio: 1,
    backgroundColor: Colors.grayText,
  },
  text: {
    color: Colors.white,
    fontSize: responsiveFont(16),
    fontFamily: Fonts.AppleSDRegular,
  },
})

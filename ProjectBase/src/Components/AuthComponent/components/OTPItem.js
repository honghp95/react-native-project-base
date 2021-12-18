/**
 * Created by Hong HP on 3/31/20.
 */

import {Text, TouchableOpacity, View, StyleSheet} from 'react-native'
import React from 'react'
import {responsiveFont} from '../../../Themes/Metrics'
import Colors, {Opacity} from '../../../Themes/Colors'
import Fonts from '../../../Themes/Fonts'

export default function OTPItem({code, index, onPress}) {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <View style={styles.contentContainer}>
        {/* show gray circle if code is empty */}
        {code[index] ? <Text style={styles.textCode}>{code[index]}</Text> : <View style={styles.circle} />}
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '15%',
    aspectRatio: 1,
    borderRadius: 4,
    backgroundColor: Colors.grayLight2 + Opacity[90],
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textCode: {
    fontSize: responsiveFont(20),
    fontFamily: Fonts.AppleSDSemiBold,
    color: Colors.blackText,
  },
  circle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: Colors.gray,
  },
})

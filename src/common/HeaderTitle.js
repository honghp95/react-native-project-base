import {Text, StyleSheet, View} from 'react-native'
import React from 'react'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import Fonts from '../Themes/Fonts'

/**
 * Created by Hong HP on 3/30/20.
 */
export default function ({title, subTitle, style, titleStyle, subStyle}) {
  return (
    <View style={style}>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
      {!!subTitle && <Text style={[styles.subTitle, subStyle]}>{subTitle}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: responsiveFont(28),
    color: Colors.blackText,
    fontFamily: Fonts.AppleSDSemiBold,
  },
  subTitle: {
    fontSize: responsiveFont(14),
    fontFamily: Fonts.AppleSDRegular,
    marginTop: responsiveHeight(5),
    color: Colors.blackText,
  },
})

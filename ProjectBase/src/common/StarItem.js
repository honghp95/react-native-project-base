/**
 * Created by NL on 07/07/21.
 */
import React from 'react'
import {StyleSheet, TouchableOpacity} from 'react-native'
import FastImage from 'react-native-fast-image'
import {responsiveWidth} from '../Themes/Metrics'

export default function StarItem({disabled, imgSource, size = 12}) {
  return (
    <TouchableOpacity disabled={disabled}>
      <FastImage source={imgSource} style={{width: responsiveWidth(size), aspectRatio: 1}} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

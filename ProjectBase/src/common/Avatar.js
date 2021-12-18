/**
 * Created by Hong HP on 4/1/20.
 */
import React from 'react'
import {TouchableOpacity, View} from 'react-native'
import {responsiveWidth} from '../Themes/Metrics'
import FastImage from 'react-native-fast-image'
import Images from '../Themes/Images'

export default function ({size, uri, style}) {
  return (
    <View
      style={{
        width: responsiveWidth(size),
        height: responsiveWidth(size),
        borderRadius: responsiveWidth(size) / 2,
        overflow: 'hidden',
        marginRight: 5,
        ...style,
      }}>
      <FastImage
        source={!!uri ? {uri: uri} : Images.defaultAvatar}
        style={{width: responsiveWidth(size), height: responsiveWidth(size)}}
        resizeMode={'cover'}
      />
    </View>
  )
}

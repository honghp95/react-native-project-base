/**
 * Created by NL on 20/04/21.
 */
import React from 'react'
import {StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native'

export default function Row({style, children, onPress, disabled = true}) {
  return (
    <TouchableOpacity
      disabled={!onPress}
      onPress={() => {
        onPress?.()
      }}
      style={[styles.container, style]}>
      {children}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
})

/**
 * Created by Hong HP on 3/27/21.
 */
import React from 'react'
import {TouchableOpacity} from 'react-native'

function VectorIconButton({
  Component,
  name,
  size,
  color,
  onPress,
  style,
  disabled,
  activeOpacity = 0,
  hitSlop,
}) {
  return (
    <TouchableOpacity
      hitSlop={hitSlop}
      disabled={disabled}
      style={style}
      onPress={() => onPress?.()}
      activeOpacity={activeOpacity}>
      <Component name={name} size={size} color={color} />
    </TouchableOpacity>
  )
}

export default VectorIconButton

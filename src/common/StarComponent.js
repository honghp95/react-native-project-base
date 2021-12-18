/**
 * Created by NL on 07/07/21.
 */
import React from 'react'
import {StyleSheet} from 'react-native'
import Row from './Row'
import VectorIconButton from './VectorIconButton'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Colors from '../Themes/Colors'

const STAR_VALUE = [1, 2, 3, 4, 5]

export default function StarComponent({disabled, style, value, onPress, size}) {
  return (
    <Row style={[styles.container, style]}>
      {STAR_VALUE.map((i, idx) => (
        <VectorIconButton
          key={idx}
          size={size}
          disabled={disabled}
          color={value - i < 0 ? Colors.placeholderText : Colors.primary}
          name={value < i && Math.abs(value - i) < 1 ? 'star-half-o' : value >= i ? 'star' : 'star'}
          Component={FontAwesome}
          onPress={() => onPress?.(i)}
        />
      ))}
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'space-between',
  },
})

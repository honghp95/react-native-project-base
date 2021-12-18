/**
 * Created by Hong HP on 3/10/20.
 */
import {Dimensions, Platform} from 'react-native'

const DESIGN_WIDTH = 375
const DESIGN_HEIGHT = 812
let {width, height} = Dimensions.get('window')

export function setDimension(w, h) {
  width = w
  height = h
}

export function responsiveWidth(value = 0) {
  if (isFoldable()) return value
  return (width * value) / DESIGN_WIDTH
}

export function responsiveHeight(value = 0) {
  return (height * value) / DESIGN_HEIGHT
}

export function responsiveFont(value = 0) {
  if (isFoldable()) return value
  if (isIOS()) return (width * value) / DESIGN_WIDTH
  else {
    return (width * value) / DESIGN_WIDTH
  }
}

export function deviceWidth() {
  return width
}

export function deviceHeight() {
  return height
}

export function isIOS() {
  return Platform.OS === 'ios'
}

export function isFoldable() {
  return width > 480
}

export const shadow = {
  shadowColor: '#000',
  shadowRadius: 5,
  elevation: 5,
  shadowOpacity: 0.1,
  shadowOffset: {width: 0, height: 3},
}

export const hitSlop = {
  top: 10,
  bottom: 10,
  right: 10,
  left: 10,
}

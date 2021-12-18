import React, {useRef} from 'react'
import {Animated} from 'react-native'

export default function useOpacityAnimation(inputRange) {
  // Title Animation
  const nativeScroll = useRef(new Animated.Value(0)).current
  const titleOpacity = nativeScroll.interpolate({
    inputRange,
    outputRange: [0.0, 1.0],
    extrapolate: 'clamp',
  })

  return [nativeScroll, titleOpacity]
}

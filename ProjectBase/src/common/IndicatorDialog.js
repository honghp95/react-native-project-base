import React, {useEffect, useState} from 'react'
import {View, StyleSheet, Dimensions, Animated, useWindowDimensions} from 'react-native'
import Colors, {Opacity} from '../Themes/Colors'
import Images from '../Themes/Images'

const {height} = Dimensions.get('screen')
export default function IndicatorDialog() {
  const [opacity] = useState(new Animated.Value(0))
  const [anim] = useState(new Animated.Value(1))
  const {width} = useWindowDimensions()

  useEffect(() => {
    // makes the sequence loop
    Animated.loop(
      // runs given animations in a sequence
      Animated.sequence([
        Animated.parallel([
          Animated.sequence([
            // increase opacity
            Animated.timing(opacity, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
            // decrease size
            Animated.timing(opacity, {
              toValue: 0,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            // increase size
            Animated.timing(anim, {
              toValue: 2,
              duration: 600,
              useNativeDriver: true,
            }),
            // decrease size
            Animated.timing(anim, {
              toValue: 1,
              duration: 600,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ]),
    ).start()
  }, [])

  return (
    <View style={[styles.container, {width, height}]}>
      <View style={styles.innerContainer}>
        <Animated.Image
          source={Images.logo}
          style={{
            transform: [{scale: anim}],
            opacity: opacity,
            width: 20,
            height: 20,
          }}
          resizeMode={'contain'}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    position: 'absolute',
    backgroundColor: Colors.blackText + Opacity[30],
  },
  innerContainer: {
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    width: 90,
    aspectRatio: 1,
    paddingBottom: 10,
  },
})

/**
 * Created by NganLang on 2019-07-19.
 */
import {useState, useEffect} from 'react'
import {Animated} from 'react-native'

export default function useFadeAnimation(doAnimation, duration, time) {
  const [animation] = useState(new Animated.Value(0))

  useEffect(() => {
    if (doAnimation) {
      if (time) {
        setTimeout(() => {
          Animated.timing(animation, {
            toValue: 1,
            duration,
            useNativeDriver: false,
          }).start()
        }, time)
      } else {
        Animated.timing(animation, {
          toValue: 1,
          duration,
          useNativeDriver: false,
        }).start()
      }
    } else
      Animated.timing(animation, {
        toValue: 0,
        duration,
        useNativeDriver: false,
      }).start()
  }, [doAnimation])

  return animation
}

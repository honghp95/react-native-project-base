/**
 * Created by Hong HP on 7/19/21.
 */
import React, {useRef, useState} from 'react'
import {View, StyleSheet, Animated, TouchableOpacity, Text, Image, Modal} from 'react-native'
import {deviceHeight, deviceWidth, isIOS, responsiveHeight, responsiveWidth, shadow} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import VectorIconButton from './VectorIconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import {getStatusBarHeight} from '../utilities/utils'


function FloatingButton({menu}) {
  const mainButton = useRef(new Animated.Value(0)).current
  const [showBackground, setShowBackground] = useState(false)
  const isOpen = useRef(false)

  function startAnimation() {
    if (!isOpen.current) {
      setShowBackground(true)
      open()
    } else {
      close()
    }
  }

  function open() {
    Animated.timing(mainButton, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false,
    }).start(() => (isOpen.current = true))
  }

  function close() {
    Animated.timing(mainButton, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start(() => {
      setShowBackground(false)
      isOpen.current = false
    })
  }

  const background = mainButton.interpolate({
    inputRange: [0, 1],
    outputRange: [Colors.primary, Colors.red],
  })

  const rotate = mainButton.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '135deg'],
  })

  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        {!showBackground && (
          <Animated.View
            style={[
              styles.button,
              {
                backgroundColor: background,
                transform: [{rotate: rotate}],
              },
            ]}>
            <VectorIconButton
              Component={MaterialIcons}
              name={'add'}
              size={30}
              color={Colors.white}
              activeOpacity={1}
              onPress={startAnimation}
            />
          </Animated.View>
        )}
      </View>
      <Modal visible={showBackground} transparent={true} animated={false} animationType={'none'}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'flex-end'}}>
          <View
            style={{
              top: deviceHeight() - responsiveHeight(540) - (isIOS() ? 0 : getStatusBarHeight()),
              position: 'absolute',
            }}>
            <Animated.View
              style={{
                opacity: mainButton,
                width: deviceWidth(),
                alignItems: 'flex-end',
                height: responsiveHeight(400),
              }}>
              {menu?.map((item, index) => {
                return (
                  <Animated.View
                    style={[
                      styles.itemMenu,
                      {
                        zIndex: 100 + index,
                        transform: [
                          {
                            translateY: mainButton.interpolate({
                              inputRange: [0, 1],
                              outputRange: [
                                responsiveHeight(400),
                                responsiveHeight(400) - (index + 1) * responsiveHeight(50),
                              ],
                            }),
                          },
                        ],
                      },
                    ]}
                    key={index.toString()}>
                    <View
                      style={{padding: responsiveWidth(5), backgroundColor: Colors.white, marginRight: 10}}>
                      <Text>{item.title}</Text>
                    </View>

                    <TouchableOpacity
                      style={styles.button}
                      onPress={() => {
                        setShowBackground(false)
                        startAnimation()
                        item?.onPress?.()
                      }}>
                      <Image
                        source={item.icon}
                        style={{width: responsiveWidth(24), height: responsiveWidth(24)}}
                      />
                    </TouchableOpacity>
                  </Animated.View>
                )
              })}
            </Animated.View>
            <View style={{alignItems: 'flex-end', width: deviceWidth()}}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Animated.View
                  style={{
                    opacity: mainButton,
                    padding: responsiveWidth(5),
                    backgroundColor: Colors.white,
                    marginRight: 10,
                  }}>
                  <Text>Close</Text>
                </Animated.View>
                <Animated.View
                  style={[
                    styles.button,
                    {
                      backgroundColor: background,
                      transform: [{rotate: rotate}],
                    },
                  ]}>
                  <VectorIconButton
                    Component={MaterialIcons}
                    name={'add'}
                    size={30}
                    color={Colors.white}
                    activeOpacity={1}
                    onPress={startAnimation}
                  />
                </Animated.View>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: responsiveWidth(0),
    top: deviceHeight() - responsiveHeight(140),
    alignItems: 'flex-end',
  },
  button: {
    width: responsiveWidth(40),
    height: responsiveWidth(40),
    borderRadius: responsiveWidth(20),
    marginRight: responsiveWidth(20),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.white,
    ...shadow,
  },
  itemMenu: {
    flexDirection: 'row',
    position: 'absolute',
    alignItems: 'center',
  },
})

export default FloatingButton

/**
 * Created by Hong HP on 11/17/19.
 */

import {Animated, StyleSheet, Text, TouchableOpacity, View, Image, useWindowDimensions} from 'react-native'
import React, {useRef} from 'react'
import RouteKey from './RouteKey'
import Colors from '../Themes/Colors'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import {SafeAreaView} from 'react-native-safe-area-context'
import {localize} from '../locale/I18nConfig'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Fonts from '../Themes/Fonts'

function CustomTabBar(props) {
  const {navigation, state} = props
  const selectedTabIndex = state.index
  const {width} = useWindowDimensions()
  const itemUnit = width / 5
  const pad = (itemUnit - responsiveWidth(60)) / 2
  const position = useRef(new Animated.Value(pad)).current

  function handleChangePosition(index) {
    Animated.timing(position, {
      toValue: pad + index * itemUnit,
      duration: 200,
      useNativeDriver: false,
    }).start()
  }

  function renderItem({route, title, selected, icon, activeColor, color, index}) {
    return (
      <TouchableOpacity
        activeOpacity={1}
        key={route}
        style={styles.itemContainer}
        onPress={() => {
          if (route) {
            handleChangePosition(index)
            navigation.navigate(route)
          }
        }}>
        {!!icon && (
          <Image
            source={icon}
            style={{
              width: responsiveWidth(24),
              height: responsiveWidth(24),
              tintColor: selected ? activeColor : Colors.placeholderText,
            }}
          />
        )}
        <Text style={[styles.title, selected && {color: activeColor}]}>{title}</Text>
      </TouchableOpacity>
    )
  }

  function renderMiddleItem() {
    return (
      <TouchableOpacity
        activeOpacity={1}
        style={[styles.middleContainer, {left: width / 2 - responsiveHeight(20)}]}
        onPress={() => {}}>
        <View style={{transform: [{rotate: '-45deg'}]}}>
          <MaterialIcons name={'add'} size={responsiveHeight(38)} color={Colors.white} />
        </View>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView edges={['bottom']} style={styles.container}>
      <View style={{height: 2, backgroundColor: Colors.grayLight2, width: '100%'}}>
        <Animated.View
          style={{
            width: responsiveWidth(60),
            height: 2,
            backgroundColor: Colors.primary,
            position: 'absolute',
            transform: [
              {
                translateX: position,
              },
            ],
          }}
        />
      </View>
      <View style={styles.wrapper}>
        {renderItem({
          route: RouteKey.HomeScreen,
          selected: selectedTabIndex === 0,
          color: Colors.grayLight,
          title: localize('tabBar.home'),
          activeColor: Colors.primary,
          icon: '',
          index: 0,
        })}
        {renderItem({
          route: '',
          selected: selectedTabIndex === 1,
          color: Colors.white,
          activeColor: Colors.primary,
          icon: '',
          title: localize('tabBar.favorite'),
          index: 1,
        })}
        <View style={{flex: 1}} />
        {renderMiddleItem()}
        {renderItem({
          route: '',
          selected: selectedTabIndex === 2,
          color: Colors.white,
          activeColor: Colors.primary,
          icon: '',
          title: localize('tabBar.message'),
          index: 3,
        })}
        {renderItem({
          route: '',
          selected: selectedTabIndex === 3,
          color: Colors.white,
          activeColor: Colors.primary,
          icon: '',
          title: localize('tabBar.account'),
          index: 4,
        })}
      </View>
    </SafeAreaView>
  )
}

export default CustomTabBar

const styles = StyleSheet.create({
  container: {
    maxHeight: 90,
    backgroundColor: Colors.white,
  },
  wrapper: {
    flexDirection: 'row',
    height: responsiveHeight(55),
    width: '100%',
  },
  itemContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  middleContainer: {
    width: responsiveHeight(40),
    height: responsiveHeight(40),
    borderRadius: responsiveHeight(15),
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: responsiveHeight(5),
    transform: [
      {
        rotate: '45deg',
      },
    ],
  },
  title: {
    fontSize: responsiveFont(12),
    color: Colors.placeholderText,
    fontFamily: Fonts.AppleSDRegular,
    marginBottom: 3,
  },
  icon: {
    width: responsiveWidth(50),
    height: responsiveWidth(50),
    marginTop: responsiveHeight(10),
  },
  addItemContainer: {
    flex: 1,
    height: responsiveHeight(117),
    backgroundColor: '#F7F7F7',
    borderRadius: responsiveWidth(6),
    alignItems: 'center',
    justifyContent: 'center',
  },
  menuTitle: {
    fontSize: responsiveFont(14),
    fontFamily: Fonts.AppleSDMedium,
  },
})

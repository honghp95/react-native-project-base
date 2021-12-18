import React from 'react'
import {StyleSheet, Platform, View, Text, TouchableOpacity, Animated} from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Themes/Colors'
import {useNavigation} from '@react-navigation/native'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import {SafeAreaView} from 'react-native-safe-area-context'

function Header({
  title,
  containerStyle = {},
  hasBackButton = true,
  leftComponent,
  centerComponent,
  rightComponent,
  titleColor = Colors.blackText,
  titleStyle,
  backButtonPress,
  rightStyle,
  transparent = false,
  leftStyle,
  centerStyle,
  headerContainerStyle,
}) {
  const navigation = useNavigation()
  return (
    <SafeAreaView
      edges={['top']}
      style={[!transparent && {backgroundColor: Colors.white}, headerContainerStyle]}>
      <View style={[styles.headerStyle, containerStyle]}>
        <View style={[{flex: 1, justifyContent: 'center'}, leftStyle]}>
          {hasBackButton && (
            <TouchableOpacity
              onPress={() => {
                if (backButtonPress) {
                  backButtonPress()
                } else {
                  navigation.pop()
                }
              }}>
              <MaterialIcons name={'arrow-back'} color={Colors.black} size={25} />
            </TouchableOpacity>
          )}
          {!!leftComponent && leftComponent}
        </View>

        <Animated.View
          style={[
            {
              flex: 4,
              justifyContent: 'center',
              alignItems: 'center',
            },
            centerStyle,
          ]}>
          {!!title && (
            <Text style={[styles.textTitle, {color: titleColor}, titleStyle]} numberOfLines={1}>
              {title}
            </Text>
          )}
          {!!centerComponent && centerComponent}
        </Animated.View>
        <View style={[{flex: 1, justifyContent: 'center'}, rightStyle]}>
          {!!rightComponent && rightComponent}
        </View>
      </View>
    </SafeAreaView>
  )
}

export default Header

const styles = StyleSheet.create({
  textTitle: {
    fontSize: responsiveFont(15),
    fontFamily: Fonts.AppleSDSemiBold,
    color: Colors.blackText,
  },
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(15),
    height: responsiveHeight(50),
  },
})

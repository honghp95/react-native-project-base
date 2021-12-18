/**
 * Created by NL on 07/07/21.
 */
import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import {localize} from '../locale/I18nConfig'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'
import Row from './Row'
import VectorIconButton from './VectorIconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

export default function CategorySession({
  style,
  title,
  children,
  titleStyle,
  onPressSeeAll,
  wrapperStyle,
  isShowSeeMoreButton = true,
  seeMoreButtonTitle,
  seeMoreButtonTitleStyle,
}) {
  /**************************
   ========== Redux =========
   *************************/

  /**************************
   ====== Route Params ======
   *************************/

  /**************************
   ======= Variables =======
   *************************/

  /**************************
   ======== Lifecycle =======
   **************************/

  /**************************
   ======= Functions =======
   *************************/

  /**************************
   ======= Components ======
   *************************/
  const seeAllButton = () => (
    <Row onPress={onPressSeeAll} style={{alignItems: 'center'}}>
      <Text style={[styles.seeAllText, seeMoreButtonTitleStyle]}>
        {seeMoreButtonTitle || localize('seeAll')}
      </Text>
      <VectorIconButton Component={MaterialIcons} name={'chevron-right'} size={18} color={Colors.grayText} />
    </Row>
  )
  /**************************
   ========== Main =========
   *************************/
  return (
    <View style={[styles.container, style]}>
      <Row
        style={[
          {
            alignItems: 'center',
            marginBottom: responsiveHeight(8),
          },
          wrapperStyle,
        ]}>
        <Text style={[styles.title, titleStyle]}>{title}</Text>
        {isShowSeeMoreButton && seeAllButton()}
      </Row>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: responsiveWidth(15),
  },
  title: {
    flex: 1,
    fontFamily: Fonts.AppleSDSemiBold,
    fontSize: responsiveFont(15),
    color: Colors.blackText,
  },
  seeAllText: {
    color: Colors.blackText,
    fontFamily: Fonts.AppleSDMedium,
    fontSize: responsiveFont(12),
  },
})

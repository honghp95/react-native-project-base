/**
 * Created by NL on 07/07/21.
 */
import React from 'react'
import {Text, StyleSheet, View} from 'react-native'
import Row from './Row'
import StarComponent from './StarComponent'
import {responsiveFont, responsiveWidth} from '../Themes/Metrics'
import Styles from '../Themes/Styles'
import {localize} from '../locale/I18nConfig'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'

export default function RatingComponent({
  rightComponent,
  starValue,
  textStyle,
  isShowStarValue,
  style,
  value = 0,
  size = 25,
  width,
  disabled = false,
  onPress,
}) {
  /*************************
   ====== Route Params ======
   *************************/

  /*************************
   ========== Redux =========
   *************************/

  /*************************
   ======= Variables =======
   *************************/

  /**************************
   ======== Lifecycle =======
   **************************/

  /*************************
   ======= Functions =======
   *************************/

  /*************************
   ======= Components ======
   *************************/

  /*************************
   ========== Main =========
   *************************/
  return (
    <Row style={[styles.container, style]}>
      <StarComponent
        style={{marginRight: responsiveWidth(5), width: width}}
        value={starValue}
        disabled={disabled}
        size={size}
        onPress={onPress}
      />
      {isShowStarValue && (
        <Text style={styles.starText}>
          {` ${starValue}`}
          <Text style={{fontFamily: Fonts.AppleSDRegular, color: Colors.grayText}}>{' | '}</Text>
        </Text>
      )}
      {!!value && (
        <Text
          style={[
            Styles.blackTextRegular,
            {fontSize: responsiveFont(10), flex: 1},
            isShowStarValue && styles.starText,
            textStyle,
          ]}>
          {`${value} ${localize('sold')}`}
        </Text>
      )}
      {!!rightComponent && rightComponent}
    </Row>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  starText: {
    fontFamily: Fonts.AppleSDMedium,
    fontSize: responsiveFont(12),
    color: Colors.blackText,
  },
})

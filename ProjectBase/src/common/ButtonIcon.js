/**
 * Created by Hong HP on 3/16/20.
 */

import {TouchableOpacity, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../Themes/Metrics';
import Colors from '../Themes/Colors';
import Fonts from '../Themes/Fonts';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function({
  title,
  style,
  onPress,
  disabled,
  icon,
  isRequire,
  titleStyle,
  value,
  placeholder,
}) {
  return (
    <View style={style}>
      {title && (
        <Text style={[styles.titleStyle, titleStyle]} numberOfLines={1}>
          {title}
          {isRequire && <Text style={{color: Colors.red}}> *</Text>}
        </Text>
      )}
      <TouchableOpacity
        style={[styles.container, {opacity: disabled ? 0.6 : 1}]}
        disabled={disabled}
        onPress={onPress}>
        {value ? (
          <Text style={styles.textStyle} numberOfLines={1}>
            {value}
          </Text>
        ) : (
          <Text style={styles.textStyle} numberOfLines={1}>
            {placeholder}
          </Text>
        )}
        <Ionicons name={icon} color={'#CECECE'} size={15} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: responsiveWidth(12),
    height: responsiveHeight(40),
    minHeight: 40,
    borderRadius: 3,
    marginBottom: 10,
    marginTop: 5,
    borderColor: Colors.grayLight,
    borderWidth: StyleSheet.hairlineWidth,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    color: Colors.grayLight,
    fontSize: 13,
    flex: 1,
  },
  titleStyle: {
    fontSize: 14,
    fontFamily: Fonts.robotoMedium,
  },
});

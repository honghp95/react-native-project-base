/**
 * Created by Hong HP on 4/6/20.
 */
import React from 'react';
import {Text, View} from 'react-native';
import RadioButton from './RadioButton';
import Fonts from '../Themes/Fonts';
import Colors from '../Themes/Colors';
import {responsiveFont, responsiveHeight} from '../Themes/Metrics';

export default function({onPress, title, value, style}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: responsiveHeight(10),
        },
        style,
      ]}>
      <RadioButton
        onPress={onPress}
        style={{marginRight: 5}}
        value={value}
        tintColor={Colors.secondary}
      />
      <Text
        style={{
          fontFamily: Fonts.SFProText_Medium,
          color: Colors.grayText,
          fontSize: responsiveFont(16),
        }}>
        {title}
      </Text>
    </View>
  );
}

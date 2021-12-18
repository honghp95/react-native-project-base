import {StyleSheet, Text, View} from 'react-native';
import Colors from '../Themes/Colors';
import React from 'react';
import {responsiveHeight, responsiveWidth} from '../Themes/Metrics';

/**
 * Created by Hong HP on 3/12/20.
 */
export default function Title({title, onPress}) {
  return (
    <View style={styles.titleWrapper}>
      <Text style={{flex: 1, fontWeight: 'bold'}}>{title}</Text>
      <Text style={{color: Colors.shamrock}}>View all</Text>
    </View>
  );
}
const styles = StyleSheet.create({
  titleWrapper: {
    paddingHorizontal: responsiveWidth(15),
    flexDirection: 'row',
    paddingVertical: responsiveHeight(20),
  },
});

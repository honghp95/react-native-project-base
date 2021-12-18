import React, {memo} from 'react'
import {StyleSheet, View, TouchableOpacity, Image} from 'react-native'
import Images from '../Themes/Images'
import {responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import PressAbleIcon from './PressAbleIcon'
import Colors from '../Themes/Colors'

function areEqual(prevProps, nextProps) {
  return (
    prevProps.url === nextProps.url &&
    prevProps.selected === nextProps.selected &&
    prevProps.isLastCol === nextProps.isLastCol
  )
}

type Props = {
  url: string,
  selected: boolean,
  isLastCol: boolean,
  onPress?: () => void,
  isLocal?: boolean,
  width?: number,
}

const ImageItem = (props: Props) => (
  <TouchableOpacity onPress={props.onPress} activeOpacity={0.9}>
    <Image
      source={{uri: props.url}}
      style={[styles.image, {marginRight: props.isLastCol ? 0 : responsiveWidth(2), width: props.width}]}
    />

    {props.selected && (
      <View style={[styles.image, styles.selectedOverlay]}>
        <PressAbleIcon iconSource={Images.markerIc} size={30} />
      </View>
    )}
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  image: {
    aspectRatio: 1,
    marginRight: responsiveWidth(2),
    marginBottom: responsiveHeight(2),
  },
  selectedOverlay: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
    ...StyleSheet.absoluteFillObject,
  },
})

export default React.memo(ImageItem, areEqual)

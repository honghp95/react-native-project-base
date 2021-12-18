/**
 * Created by NL on 06/04/21.
 */
import React from 'react'
import {StyleSheet, TouchableOpacity, View, Modal, StatusBar} from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import {useDispatch} from 'react-redux'
import {setGlobalIndicatorVisibility} from '../redux/actions/app'
import {
  deviceHeight,
  deviceWidth,
  isIOS,
  responsiveFont,
  responsiveHeight,
  responsiveWidth,
} from '../Themes/Metrics'
import Colors, {Opacity} from '../Themes/Colors'
import ButtonView from './ButtonView'
import {localize} from '../locale/I18nConfig'
import Images from '../Themes/Images'
import FastImage from 'react-native-fast-image'

const IMAGE_OPTION = {
  width: 500,
  height: 500,
  showsSelectedCount: true,
  mediaType: 'photo',
  multiple: true,
}

export default function ImagePickerDropDown({
  visible,
  onClose,
  onSelectImage,
  images = [],
  multiple = true,
  max = 12,
}) {
  /**************************
   ========== Redux =========
   *************************/
  const dispatch = useDispatch()
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
  const openCamera = () => {
    ImagePicker.openCamera({...IMAGE_OPTION, maxFiles: 12 - images?.length, multiple})
      .then(r => {
        onClose()
        if (multiple) {
          onSelectImage([{...r, isSelect: true, sourceURL: isIOS() ? r.sourceURL : r.path}])
        } else {
          onSelectImage({...r, isSelect: true, sourceURL: isIOS() ? r.sourceURL : r.path})
        }
      })
      .catch(e => {
        onClose()
      })
  }

  const pickImage = async () => {
    ImagePicker.openPicker({...IMAGE_OPTION, maxFiles: 12 - images?.length, multiple})
      .then(r => {
        onClose()
        if (multiple) {
          onSelectImage(
            r?.slice(0, max).map(i => ({...i, isSelect: true, sourceURL: isIOS() ? i.sourceURL : i.path})),
          )
        } else {
          onSelectImage({...r, isSelect: true, sourceURL: isIOS() ? r.sourceURL : r.path})
        }
      })
      .catch(e => {
        onClose()
      })
  }

  const handleUploadImage = async response => {
    dispatch(setGlobalIndicatorVisibility(false))
    if (response.didCancel) {
    } else if (response.errorCode) {
    } else {
      let uri = isIOS() ? response.uri : `file://${response.uri}`
      onSelectImage({...response, uri})
    }
  }
  /**************************
   ======= Components ======
   *************************/
  /**************************
   ========== Main =========
   *************************/
  return (
    <Modal animationType={'slide'} visible={visible} transparent onRequestClose={onClose}>
      <TouchableOpacity
        onPress={() => {
          onClose?.()
        }}
        activeOpacity={1}
        style={[
          styles.container,
          {
            width: deviceWidth(),
            height: deviceHeight() - StatusBar.currentHeight,
          },
        ]}>
        <View style={{paddingHorizontal: responsiveWidth(15), paddingBottom: responsiveHeight(30)}}>
          <View style={{borderRadius: 8, overflow: 'hidden'}}>
            <ButtonView
              activeOpacity={0.9}
              onPress={openCamera}
              title={localize('camera')}
              style={[styles.button, {flexDirection: 'row', alignItems: 'center'}]}
              titleStyle={styles.buttonTitle}
              topComponent={
                <FastImage source={Images.cameraIc} style={styles.buttonIcon} resizeMode={'contain'} />
              }
            />
            <View
              style={{width: '100%', height: StyleSheet.hairlineWidth, backgroundColor: Colors.grayLight2}}
            />
            <ButtonView
              activeOpacity={0.9}
              onPress={pickImage}
              title={localize('photos')}
              style={[styles.button, {flexDirection: 'row'}]}
              titleStyle={styles.buttonTitle}
              topComponent={
                <FastImage source={Images.photosIc} style={styles.buttonIcon} resizeMode={'contain'} />
              }
            />
          </View>
          <ButtonView
            activeOpacity={0.9}
            onPress={onClose}
            title={localize('cancel')}
            titleStyle={styles.buttonTitle}
            style={[styles.button, {marginTop: responsiveHeight(10), borderRadius: 8}]}
          />
        </View>
      </TouchableOpacity>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#040A01' + Opacity[30],
    justifyContent: 'flex-end',
  },
  button: {
    backgroundColor: Colors.white,
    borderRadius: 0,
  },
  separateLine: {width: '100%', height: 1, backgroundColor: Colors.grayLight2},
  buttonIcon: {
    width: responsiveWidth(14),
    aspectRatio: 1,
    marginRight: responsiveWidth(8),
    marginBottom: responsiveHeight(2.5),
  },
  buttonTitle: {
    fontSize: responsiveFont(13),
  },
})

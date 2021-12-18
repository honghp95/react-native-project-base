/**
 * Created by NL on 19/07/21.
 */
import React from 'react'
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native'
import Row from './Row'
import ImageItem from '../Components/ServiceComponent/Component/ImageItem'
import VectorIconButton from './VectorIconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Colors from '../Themes/Colors'
import {responsiveHeight, responsiveWidth} from '../Themes/Metrics'

export default function ImagePickerComponent({
  style,
  images,
  onSelectImage,
  onRemoveImage,
  onOpenImagePicker,
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
    <View style={style}>
      <Row style={styles.photoContainer}>
        {images?.length < 12 && (
          <TouchableOpacity onPress={() => onOpenImagePicker?.()} style={styles.addPhotoButton}>
            <VectorIconButton
              disabled
              Component={MaterialIcons}
              name={'add'}
              size={24}
              color={Colors.grayIcon}
            />
          </TouchableOpacity>
        )}
        {images.map((image, idx) => (
          <ImageItem
            image={image}
            key={idx}
            idx={idx}
            onSelectImage={() => onSelectImage(image)}
            onRemoveImage={() => onRemoveImage(image)}
            shift={images?.length < 12 ? 0 : 1}
          />
        ))}
      </Row>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  photoContainer: {
    marginTop: responsiveHeight(12),
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    width: '100%',
  },
  addPhotoButton: {
    width: responsiveWidth(76),
    marginRight: responsiveWidth(14),
    aspectRatio: 1,
    borderWidth: 1,
    borderColor: Colors.grayIcon,
    borderRadius: 6,
    borderStyle: 'dashed',
    backgroundColor: Colors.grayLight2,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

/**
 * Created by NL on 19/07/21.
 */
import React from 'react'
import {StyleSheet, View, Alert} from 'react-native'
import ButtonView from './ButtonView'
import FastImage from 'react-native-fast-image'
import Images from '../Themes/Images'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import DocumentItem from '../Components/ServiceComponent/Component/DocumentItem'
import Fonts from '../Themes/Fonts'
import Colors from '../Themes/Colors'
import DocumentPicker from 'react-native-document-picker'
import Toast from './Toast'

export default function DocumentComponent({style, onSetDocument, buttonTitle, documents, onRemoveDocument}) {
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
  const showDocumentPicker = async () => {
    try {
      let res = await DocumentPicker.pick({
        type: [
          DocumentPicker.types.pdf,
          DocumentPicker.types.doc,
          DocumentPicker.types.docx,
          DocumentPicker.types.xls,
          DocumentPicker.types.xlsx,
          DocumentPicker.types.images,
        ],
        allowMultiSelection: false,
      })
      res = res?.length === 1 ? res[0] : res
      //file size < 5Mb
      if (!res.size || res.uri.includes('storage/document'))
        return Toast.info('Can not send file from drive.')
      if (res.size > 5 * 1024 * 1024) {
        Alert.alert('', 'File size must less than 5Mb')
      } else {
        onSetDocument(res)
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the picker, exit any dialogs or menus and move on
      } else {
        throw err
      }
    }
  }
  /*************************
   ======= Components ======
   *************************/

  /*************************
   ========== Main =========
   *************************/
  return (
    <View style={style}>
      <ButtonView
        onPress={showDocumentPicker}
        style={styles.attachFileButton}
        title={buttonTitle}
        titleStyle={styles.itemTitle}
        topComponent={
          <FastImage
            source={Images.fileIc}
            style={{width: responsiveWidth(20), aspectRatio: 1, marginRight: responsiveWidth(2)}}
            resizeMode={'contain'}
          />
        }
      />
      {!!documents?.length && (
        <View style={{marginTop: responsiveHeight(20)}}>
          {documents.map((d, idx) => (
            <DocumentItem document={d} key={idx} onPress={() => onRemoveDocument(d)} />
          ))}
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemTitle: {
    fontSize: responsiveFont(14),
    fontFamily: Fonts.AppleSDRegular,
    color: Colors.grayText,
  },
  attachFileButton: {
    borderWidth: 1,
    borderColor: Colors.grayIcon,
    borderRadius: 10,
    borderStyle: 'dashed',
    backgroundColor: Colors.grayLight2,
    overflow: 'visible',
    flexDirection: 'row',
    marginTop: responsiveHeight(12),
  },
})

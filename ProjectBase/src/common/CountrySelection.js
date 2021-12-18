import React, {useEffect, useMemo, useState} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Modal, FlatList, Image} from 'react-native'
import {arrayContries, contries} from '../utilities/contries'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import SearchBar from './SearchBar'
import Fonts from '../Themes/Fonts'
import AntDesign from 'react-native-vector-icons/AntDesign'

function CountrySelection({value, onSelect}) {
  const [visible, setVisible] = useState(false)
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    setSearchText('')
  }, [visible])

  function renderItem({item, index}) {
    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          setVisible(false)
          onSelect(item)
        }}>
        <Image source={{uri: item.flag}} style={{width: 40, height: 20}} resizeMode={'contain'} />
        <Text style={{flex: 1}}>{item.name?.common}</Text>
        <Text>+{item?.callingCode?.[0]}</Text>
      </TouchableOpacity>
    )
  }

  const data = useMemo(() => {
    if (!searchText) return arrayContries
    return arrayContries.filter(item => item.name?.common?.includes(searchText))
  }, [searchText])

  return (
    <View style={{}}>
      <TouchableOpacity onPress={() => setVisible(!visible)} style={styles.valueContainer}>
        <Text style={styles.value}>(+{value?.callingCode?.[0]})</Text>
        <AntDesign name={'caretdown'} color={Colors.gray} />
      </TouchableOpacity>
      <Modal
        visible={visible}
        transparent={true}
        animated={true}
        animationType={'slide'}
        onRequestClose={() => {}}>
        <TouchableOpacity
          style={{flex: 1, backgroundColor: Colors.blackOpacity}}
          activeOpacity={1}
          onPress={() => setVisible(false)}>
          <View style={styles.container}>
            <SearchBar onChangeText={setSearchText} value={searchText} />
            <FlatList
              data={data}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    marginTop: responsiveHeight(100),
    borderTopLeftRadius: responsiveWidth(30),
    borderTopRightRadius: responsiveWidth(30),
    paddingTop: responsiveHeight(30),
    paddingHorizontal: responsiveWidth(12),
  },
  item: {
    height: responsiveHeight(40),
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.grayLight,
  },
  value: {
    fontFamily: Fonts.AppleSDRegular,
    fontSize: responsiveFont(16),
    color: Colors.blackText,
  },
  valueContainer: {
    width: responsiveWidth(80),
    alignItems: 'center',
    justifyContent: 'space-between',
    height: responsiveHeight(30),
    flexDirection: 'row',
    paddingHorizontal: responsiveWidth(10),
    borderRightWidth: 1,
    borderColor: Colors.gray,
  },
})
export default CountrySelection

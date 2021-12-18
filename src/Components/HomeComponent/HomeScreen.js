/**
 * Created by Hong HP on 5/1/20.
 */
import React, {useEffect} from 'react'
import {StyleSheet, View} from 'react-native'
import {responsiveWidth} from '../../Themes/Metrics'
import Colors from '../../Themes/Colors'
import Header from '../../common/Header'
import VectorIconButton from '../../common/VectorIconButton'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

function HomeScreen({navigation}) {
  useEffect(() => {}, [])

  return (
    <View style={styles.container}>
      <Header
        hasBackButton={false}
        transparent={true}
        centerStyle={{flex: 3}}
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <VectorIconButton
              Component={MaterialIcons}
              name={'search'}
              size={25}
              color={Colors.gray}
              style={{marginRight: responsiveWidth(10)}}
            />
            <VectorIconButton
              Component={MaterialIcons}
              name={'notifications-none'}
              size={25}
              color={Colors.gray}
            />
          </View>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
})

export default HomeScreen

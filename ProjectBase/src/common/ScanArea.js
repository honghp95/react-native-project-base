/**
 * Created by Hong HP on 1/20/19.
 */
import React from 'react'
import {View} from 'react-native'

export default class ScanArea extends React.Component {
  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center'}}>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}} />
        <View style={{width: '100%', flexDirection: 'row'}}>
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}} />
          <View style={{width: 200, height: 200, borderWidth: 2, borderColor: '#008eff'}} />
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.7)'}} />
        </View>
        <View style={{backgroundColor: 'rgba(0,0,0,0.7)', flex: 1}} />
      </View>
    )
  }
}

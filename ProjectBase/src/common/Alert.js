import React, {Component} from 'react'
import {View, StyleSheet, TouchableOpacity, Text, Modal, Image} from 'react-native'
import Fonts from '../Themes/Fonts'
import Emitter from '../utilities/Emitter'
import ButtonView from './ButtonView'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import Colors from '../Themes/Colors'
import FastImage from 'react-native-fast-image'
import Images from '../Themes/Images'

export default class Alert extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      message: '',
      isVisible: false,
      buttons: [],
    }
  }
  /**
   * Show Alert text box
   * @param title title of alert text box
   * @param message message of alert text box
   * @param buttons of type {title: string, primary: bool, onPress: func}
   */
  static alert(title, message, buttons = null, type) {
    let actions = buttons
    if (actions === null) {
      actions = [
        {
          text: 'OK',
          primary: true,
          onPress: () => {},
        },
      ]
    }
    Emitter.emit('SHOW_ALERT', {title, message, buttons: actions, type})
  }

  componentDidMount() {
    Emitter.on('SHOW_ALERT', data => {
      this.setState({
        ...data,
        isVisible: true,
      })
    })
  }

  componentWillUnmount() {
    Emitter.rm('SHOW_ALERT')
  }

  _hide = () => {
    // eslint-disable-next-line no-undef
    requestAnimationFrame(() => {
      this.setState({isVisible: false})
    })
  }

  render() {
    const {isVisible, title, message, buttons, type} = this.state
    return (
      <Modal visible={isVisible} transparent={true} onRequestClose={() => {}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            backgroundColor: 'rgba(0,0,0,0.3)',
          }}>
          <View style={styles.container}>
            {!!type && (
              <FastImage
                source={type === 'success' ? Images.tickInsideCircleIc : Images.errorAlertIc}
                style={styles.alertIcon}
                resizeMode={'contain'}
              />
            )}
            <View style={styles.messageWrapper}>
              {!!title && <Text style={styles.title}>{title}</Text>}
              <Text style={styles.message}>{message}</Text>
            </View>
            <View style={styles.actions}>
              {buttons.map((action, index) => (
                <ButtonView
                  style={[{width: '100%'}, !action.primary && styles.secondaryButton]}
                  key={index.toString()}
                  title={action.text}
                  titleStyle={[!action.primary && styles.secondaryText]}
                  onPress={() => {
                    this._hide()
                    action?.onPress?.()
                  }}
                />
              ))}
            </View>
          </View>
        </View>
      </Modal>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    flexDirection: 'column',
    borderRadius: 10,
    width: '85%',
    alignItems: 'center',
    overflow: 'hidden',
    paddingVertical: responsiveHeight(24),
  },
  title: {
    fontFamily: Fonts.AppleSDBold,
    fontSize: responsiveFont(15),
    color: Colors.blackText,
    textTransform: 'capitalize',
  },
  message: {
    marginTop: responsiveHeight(10),
    fontFamily: Fonts.AppleSDRegular,
    fontSize: responsiveFont(12),
    color: Colors.blackText,
    textAlign: 'center',
  },
  messageWrapper: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: responsiveWidth(10),
  },
  actions: {
    width: '100%',
    paddingHorizontal: responsiveWidth(20),
    marginTop: responsiveHeight(20),
  },
  primary: {},
  secondaryButton: {
    backgroundColor: 'transparent',
    marginTop: responsiveHeight(3),
  },
  secondaryText: {
    color: Colors.primary,
  },
  alertIcon: {
    width: responsiveWidth(45),
    aspectRatio: 1,
    marginBottom: responsiveHeight(25),
  },
})

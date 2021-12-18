import React from 'react'
import {StyleSheet, Animated, Text, StatusBar} from 'react-native'
import Colors from '../Themes/Colors'
import {getStatusBarHeight} from '../utilities/utils'
import Emitter from '../utilities/Emitter'
import {isIOS, responsiveFont, responsiveWidth} from '../Themes/Metrics'
import {SafeAreaInsetsContext} from 'react-native-safe-area-context'
import Fonts from '../Themes/Fonts'

class Toast extends React.PureComponent {
  // Static methods
  static success(text) {
    Emitter.emit('SHOW_TOAST_MESSAGE', {message: text, type: 'success'})
  }

  static error(text) {
    Emitter.emit('SHOW_TOAST_ERROR', {message: text, type: 'error'})
  }

  static info(text) {
    Emitter.emit('SHOW_TOAST_INFO', {message: text, type: 'info'})
  }

  constructor(props) {
    super()
    this.state = {
      message: '',
      type: 'success',
    }
    console.log(props.height)
    this.offset = new Animated.Value(props.height)

    this.opacity = new Animated.Value(0)
  }

  componentDidMount() {
    Emitter.on('SHOW_TOAST_MESSAGE', this.displayMessage)
    Emitter.on('SHOW_TOAST_ERROR', this.displayMessage)
    Emitter.on('SHOW_TOAST_INFO', this.displayMessage)
  }

  componentWillUnmount() {
    Emitter.rm('SHOW_TOAST_MESSAGE')
    Emitter.rm('SHOW_TOAST_ERROR')
    Emitter.rm('SHOW_TOAST_INFO')
  }

  displayMessage = ({message, type}) => {
    const {height} = this.props
    window.cancelAnimationFrame(this.frameID)

    this.offset.setValue(height * -1)
    this.setState({message, type})
    this.frameID = window.requestAnimationFrame(() => {
      Animated.sequence([
        Animated.delay(100), // Fade In
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),

        Animated.delay(3000), // Fade Out
        Animated.parallel([
          Animated.timing(this.opacity, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }),
          Animated.timing(this.offset, {
            toValue: height * -1,
            duration: 300,
            useNativeDriver: true,
          }),
        ]),
      ]).start()
    })
  }

  _messageColor = () => {
    const {type} = this.state

    if (type === 'success') {
      return Colors.primary
    }
    if (type === 'info') {
      return '#FFC700'
    }
    return Colors.white
  }

  render() {
    const {message, type} = this.state
    const {height} = this.props
    return (
      <Animated.View
        style={[
          styles.container,
          {
            height: height,
            transform: [{translateY: this.offset}],
            opacity: this.opacity,
            backgroundColor: this._messageColor(),
          },
        ]}
        pointerEvents="none">
        <Text style={[styles.textStyle, {color: type === 'error' ? Colors.red : Colors.blackText}]}>
          {message}
        </Text>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    zIndex: 9999,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: responsiveWidth(8),
  },
  textStyle: {
    fontFamily: Fonts.AppleSDRegular,
    fontSize: responsiveFont(14),
    color: Colors.blackText,
    marginBottom: 8,
    textAlign: 'center',
  },
})

export default Toast

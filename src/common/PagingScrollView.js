/* eslint-disable */
import React from 'react'
import {View, ScrollView, StyleSheet, InteractionManager, TouchableOpacity, Text} from 'react-native'
import Colors from '../Themes/Colors'
import {responsiveFont, responsiveHeight, responsiveWidth} from '../Themes/Metrics'
import RouteKey from '../navigation/RouteKey'
import Fonts from '../Themes/Fonts'

export default class PagingScrollView extends React.Component {
  constructor() {
    super()
    this.state = {
      index: 0,
      loaded: false,
    }
    this.timeInterval = ''
  }

  componentWillUnmount() {
    clearInterval(this.timeInterval)
  }

  componentDidMount() {
    if (this.props.scrollOverTime) this.scrollOverTime()
    InteractionManager.runAfterInteractions(() => {
      this.setState({loaded: true})
    })
  }

  scrollOverTime = () => {
    const {onChangeBanner} = this.props
    this.timeInterval = setInterval(() => {
      const {index} = this.state
      if (!this.scrollRef) return
      if (index >= this.props.total - 1) {
        this.scrollRef.scrollTo({x: 0, y: 0, animated: true})
        this.setState({index: 0})
        // !!onChangeBanner && onChangeBanner(0)
      } else {
        this.scrollRef.scrollTo({x: this.scrollWidth * (index + 1), y: 0, animated: true})
        this.setState({index: index + 1})
        // !!onChangeBanner && onChangeBanner(index + 1)
      }
    }, 5000)
  }

  renderPagination = () => {
    const {dot, total} = this.props
    const {index} = this.state
    if (total <= 1) return null
    const {activeDot, activeDotStyle, dotStyle} = this.props
    const dots = []
    const ActiveDot = activeDot || <View style={[styles.dot, activeDotStyle]} />
    const Dot = dot || <View style={[styles.dot, dotStyle]} />
    for (let i = 0; i < total; i++) {
      dots.push(i === index ? React.cloneElement(ActiveDot, {key: i}) : React.cloneElement(Dot, {key: i}))
    }
    return dots
  }

  onScrollEnd(e) {
    const {onChangeBanner} = this.props
    let contentOffset = e.nativeEvent.contentOffset
    let viewSize = e.nativeEvent.layoutMeasurement
    let pageNum = Math.floor(contentOffset.x / viewSize.width)
    !!onChangeBanner && onChangeBanner(pageNum)
    this.setState({index: pageNum})
  }

  handleNextAction = () => {
    const {index} = this.state
    const {total, finishAction} = this.props
    if (index < total - 1) {
      this.scrollRef.scrollTo({x: this.scrollWidth * (index + 1), y: 0, animated: true})
      this.setState({index: index + 1})
    } else {
      finishAction(RouteKey.MainStack)
    }
  }

  render() {
    const {index, loaded} = this.state
    const {
      style,
      children,
      finishAction,
      actionContainer,
      total,
      dotContainerStyle,
      hasAction,
      scrollEnabled = true,
    } = this.props
    if (!loaded) return null
    return (
      <View style={[style]}>
        <ScrollView
          ref={(el) => (this.scrollRef = el)}
          onLayout={(event) => {
            this.scrollWidth = event.nativeEvent.layout.width
          }}
          horizontal
          pagingEnabled
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={scrollEnabled}
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={(evt) => {
            this.onScrollEnd(evt)
          }}>
          {children}
        </ScrollView>
        <View style={[styles.dotContainer, dotContainerStyle]}>{this.renderPagination()}</View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  dot: {
    width: responsiveWidth(8),
    height: responsiveWidth(8),
    borderRadius: responsiveWidth(8) / 2,
    marginHorizontal: 5,
    marginVertical: 3,
    backgroundColor: Colors.secondary,
  },
  actionContainer: {
    flexDirection: 'row',
    height: responsiveHeight(40),
    position: 'absolute',
    zIndex: 0,
    bottom: responsiveHeight(20),
    width: '100%',
    justifyContent: 'space-between',
  },
  dotContainer: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    position: 'absolute',
    zIndex: 0,
    bottom: responsiveHeight(20),
    width: '50%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  actionButton: {
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  lastAction: {
    fontFamily: Fonts.robotoRegular,
    fontSize: responsiveFont(16),
    color: Colors.white,
  },
  action: {
    fontFamily: Fonts.robotoRegular,
    fontSize: responsiveFont(14),
    color: Colors.darkGray,
  },
  buttonLeft: {
    backgroundColor: Colors.background,
    paddingHorizontal: responsiveWidth(10),
    justifyContent: 'center',
    height: responsiveHeight(40),
    borderTopRightRadius: responsiveHeight(20),
    borderBottomRightRadius: responsiveHeight(20),
    width: responsiveWidth(110),
    alignItems: 'center',
  },
  buttonRight: {
    backgroundColor: Colors.primary,
    paddingHorizontal: responsiveWidth(10),
    justifyContent: 'center',
    height: responsiveHeight(40),
    width: responsiveWidth(110),
    alignItems: 'center',
    borderTopLeftRadius: responsiveHeight(20),
    borderBottomLeftRadius: responsiveHeight(20),
  },
})

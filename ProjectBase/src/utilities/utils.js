/**
 * Created by Hong HP on 3/10/20.
 */
import {Dimensions, Platform, StatusBar} from 'react-native'

export function getStatusBarHeight(skipAndroid = false) {
  if (Platform.OS === 'ios') {
    return isIphoneX() ? 44 : 24
  }

  if (skipAndroid) {
    return 0
  }

  return StatusBar.currentHeight
}

export function isIphoneX() {
  const dimen = Dimensions.get('window')
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812 || dimen.height === 896 || dimen.width === 896)
  )
}

export function validateEmail(email) {
  const re =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(email)
}

export function validatePassword(pass) {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return re.test(pass)
}

export function validateUsername(username) {
  const re = /^[a-zA-Z0-9]+$/
  return re.test(username)
}

export function isObjectEmpty(object) {
  if (!object) return true
  if (typeof object !== 'object') return true
  if (Object.values(object).length === 0) return true
  return false
}


export function isEmptyValues(value) {
  return (
    value === undefined ||
    value === 'undefined' ||
    value === null ||
    value === 'null' ||
    value === NaN ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
}

export const formatBytes = (bytes, decimals = 2) => {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const dm = decimals < 0 ? 0 : decimals
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i]
}

export function removeDuplicates(originalArray, prop) {
  let i
  let newArray = []
  let lookupObject = {}

  for (i in originalArray) {
    lookupObject[originalArray[i][prop]] = originalArray[i]
  }

  for (i in lookupObject) {
    newArray.push(lookupObject[i])
  }
  return newArray
}

export const convertArrayToObjectByKey = (arr, key) => {
  return arr.reduce((obj, item) => {
    obj[item[key]] = item
    return obj
  }, {})
}

export function getInitials(string) {
  if (!string) return ''
  let names = string.split(' '),
    initials = names[0].substring(0, 1).toUpperCase()

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase()
  }
  return initials
}

export const deleteProps = (obj, prop) => {
  for (const p of prop) {
    delete obj[p]
  }
}

export function capitalizeFirstLetter(string) {
  if (!string) return ''
  return string?.charAt(0)?.toUpperCase() + string?.slice(1)
}

export function stringToNumber(string) {
  if (typeof string === 'number') return string
  if (!string) return null
  return +string.replace(/[^0-9]+/g, '')
}

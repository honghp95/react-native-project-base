/**
 * Created by Hong HP on 3/16/20.
 */
import {getWithTimeout, postWithTimeout} from './networking'
import {baseUrl} from '../constants/constants'
import {getWithCheckingToken} from './NetworkingAuth'

export function registerUser(data) {
  return postWithTimeout(`${baseUrl}/user/sign-up`, {}, data)
}

export function userLogin(userName, password) {
  return postWithTimeout(
    `${baseUrl}/user/login`,
    {},
    {
      userName,
      password,
    },
  )
}

export function getUserInfo() {
  return getWithCheckingToken(`${baseUrl}/user/me`)
}

export function getRefreshToken(refreshToken) {
  return postWithTimeout(
    `${baseUrl}/user/token`,
    {},
    {
      refreshToken,
    },
  )
}

export function getAllAirLines() {
  return getWithTimeout('https://api.instantwebtools.net/v1/airlines', {})
}

export function getPassengers(page, size) {
  return getWithTimeout(`https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`, {})
}

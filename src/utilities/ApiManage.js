/**
 * Created by Hong HP on 3/16/20.
 */
import {postWithTimeout} from './networking'
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

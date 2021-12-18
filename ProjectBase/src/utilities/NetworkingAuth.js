/**
 * Created by Hong HP on 4/27/18.
 */
/*eslint-disable*/
import {
  getWithTimeout,
  postWithTimeout,
  deleteWithTimeout,
  putWithTimeout,
  patchWithTimeout,
} from './networking'
// import jwt_decode from 'jwt-decode'
import {ERROR_STATUS, STATUS_CODE} from '../constants/constants'
import store from '../redux/store'
import {userLogout} from '../redux/actions/user'
import {getLocale} from '../locale/I18nConfig'

let accessToken = ''
let refreshToken = ''
let expTime = ''

export async function getAccessToken() {
  // if (Date.now() / 1000 > expTime && refreshToken) {
  // const res = await getRefreshToken(refreshToken)
  // if (res.code === STATUS_CODE.success) {
  //   AsyncStorage.setItem('token', JSON.stringify({...res.data, refreshToken: refreshToken}))
  //   setTokenData(res.data?.idToken, refreshToken)
  // }
  // }
  return accessToken
}

export function getToken() {
  return accessToken
}

export function clearToken() {
  accessToken = ''
}

//TODO: add lib jwt_decode to check expire time
export function setTokenData(t, r) {
  // const decode = jwt_decode(t)
  refreshToken = r
  accessToken = t
  // expTime = decode.exp
}

export function getWithCheckingToken(api, headers) {
  if (!headers || !headers['token'])
    headers = {
      ...headers,
    }
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      lang: getLocale(),
    }
    return getWithTimeout(api, headers).then(data => {
      if (ERROR_STATUS.includes(data.status)) {
        store.dispatch(userLogout())
        return data
      }
      return data
    })
  })
}

export function postWithCheckingToken(api, headers, body) {
  if (!headers || !headers['token'])
    headers = {
      ...headers,
    }
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      lang: getLocale(),
    }
    return postWithTimeout(api, headers, body).then(data => {
      if (ERROR_STATUS.includes(data.status) && !api?.includes('sign-out')) {
        store.dispatch(userLogout())
        return data
      }
      return data
    })
  })
}

export function putWithCheckingToken(api, headers, body) {
  if (!headers || !headers['token'])
    headers = {
      ...headers,
    }
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      lang: getLocale(),
    }
    return putWithTimeout(api, headers, body).then(data => {
      if (ERROR_STATUS.includes(data.status)) {
        store.dispatch(userLogout())
        return data
      }
      return data
    })
  })
}

export function deleteWithCheckingToken(api, headers, body) {
  if (!headers || !headers['token'])
    headers = {
      ...headers,
    }
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      lang: getLocale(),
    }
    return deleteWithTimeout(api, headers, body).then(data => {
      if (ERROR_STATUS.includes(data.status)) {
        store.dispatch(userLogout())
        return data
      }
      return data
    })
  })
}

export function patchWithCheckingToken(api, headers, body) {
  if (!headers || !headers['token'])
    headers = {
      ...headers,
    }
  return getAccessToken().then(token => {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
      lang: getLocale(),
    }
    return patchWithTimeout(api, headers, body).then(data => {
      if (ERROR_STATUS.includes(data.status)) {
        store.dispatch(userLogout())
        return data
      }
      return data
    })
  })
}

/**
 * Created by Hong HP on 3/12/20.
 */

export const USER_REGISTER = 'USER_REGISTER'
export function userRegister(payload) {
  return {
    type: USER_REGISTER,
    payload,
  }
}

export const CONFIRM_CODE = 'CONFIRM_CODE'
export function confirmCode(email, code) {
  return {
    type: CONFIRM_CODE,
    email,
    code,
  }
}

export const USER_LOGIN = 'USER_LOGIN'
export function userLogin(username, password) {
  return {
    type: USER_LOGIN,
    username,
    password,
  }
}

export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS'
export function userLoginSuccess(payload, route) {
  return {
    type: USER_LOGIN_SUCCESS,
    payload,
    route,
  }
}

export const GET_USER_INFO = 'GET_USER_INFO'
export function getUserInfo() {
  return {
    type: GET_USER_INFO,
  }
}

export const GET_USER_INFO_SUCCESS = 'GET_USER_INFO_SUCCESS'
export function getUserInfoSuccess(payload) {
  return {
    type: GET_USER_INFO_SUCCESS,
    payload,
  }
}

export const UPDATE_USER_INFO = 'UPDATE_USER_INFO'
export function updateUserInfo(payload, avatar) {
  return {
    type: UPDATE_USER_INFO,
    payload,
    avatar,
  }
}

export const UPDATE_USER_INFO_SUCCESS = 'UPDATE_USER_INFO_SUCCESS'

export function updateUserInfoSuccess(payload) {
  return {
    type: UPDATE_USER_INFO_SUCCESS,
    payload,
  }
}

export const GET_ACCOUNT_DETAILS = 'GET_ACCOUNT_DETAILS'

export function getAccountDetails(session) {
  return {
    type: GET_ACCOUNT_DETAILS,
    session,
  }
}

export const GET_ACCOUNT_DETAILS_SUCCESS = 'GET_ACCOUNT_DETAILS_SUCCESS'
export function getAccountDetailsSuccess(accountDetails) {
  return {
    type: GET_ACCOUNT_DETAILS_SUCCESS,
    accountDetails,
  }
}

export const FORGOT_PASSWORD = 'FORGOT_PASSWORD'

export function forgotPassword(email, session) {
  return {
    type: FORGOT_PASSWORD,
    email,
    session,
  }
}

export const USER_LOGOUT = 'USER_LOGOUT'
export function userLogout() {
  return {
    type: USER_LOGOUT,
  }
}

export const USER_LOGOUT_SUCCESS = 'USER_LOGOUT_SUCCESS'
export function userLogoutSuccess() {
  return {
    type: USER_LOGOUT_SUCCESS,
  }
}

export const USER_SIGN_UP = 'USER_SIGN_UP'
export function userSignup(payload) {
  return {
    type: USER_SIGN_UP,
    payload,
  }
}

export const USER_LOGIN_WITH_SOCIAL = 'USER_LOGIN_WITH_SOCIAL'
export function userLoginWithSocial(provider) {
  return {
    type: USER_LOGIN_WITH_SOCIAL,
    provider,
  }
}

export const SET_CHAT_INFO = 'SET_CHAT_INFO'
export function setChatInfo(payload) {
  return {
    type: SET_CHAT_INFO,
    payload,
  }
}

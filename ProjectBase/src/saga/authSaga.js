/**
 * Created by Hong HP on 3/12/20.
 */

import {call, put, takeLatest, delay} from 'redux-saga/effects'
import {
  CONFIRM_CODE,
  GET_USER_INFO,
  UPDATE_USER_INFO,
  USER_LOGIN,
  USER_LOGOUT,
  USER_REGISTER,
  getUserInfoSuccess,
  USER_SIGN_UP,
  USER_LOGIN_WITH_SOCIAL,
} from '../redux/actions/user'
import {
  getCategory,
  LOAD_BOOTSTRAP_SUCCESS,
  setAppStack,
  setGlobalIndicatorVisibility,
} from '../redux/actions/app'
import Toast from '../common/Toast'
import RouteKey from '../navigation/RouteKey'
import {getUserInfo, userLogin} from '../utilities/ApiManage'
import {STATUS_CODE} from '../constants/constants'
import {navigate, replace} from '../navigation/NavigationService'
import {ResponseSuccess} from '../constants/constants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import {setTokenData} from '../utilities/NetworkingAuth'

function* userRegisterSaga(action) {
  try {
    yield put(setGlobalIndicatorVisibility(true))
  } catch (e) {
    Toast.info(e.message)
  } finally {
    yield put(setGlobalIndicatorVisibility(false))
  }
}

function* userLoginSaga(action) {
  try {
    yield put(setGlobalIndicatorVisibility(true))
    // const res = yield call(userLogin, action.username, action.password)
    // if (res.code !== ResponseSuccess) throw new Error(res.message)
    // yield call(AsyncStorage.setItem, 'token', JSON.stringify(res.data?.tokens))
    // setTokenData(res.data?.tokens?.idToken, res.data?.tokens.refreshToken)
    // yield put(getUserInfoSuccess(res.data?.userInfo))
    yield delay(1000)
    yield put(setAppStack(RouteKey.MainStack))
  } catch (e) {
    Toast.info(e.message)
  } finally {
    yield put(setGlobalIndicatorVisibility(false))
  }
}

function* updateUserInfoSaga(action) {
  try {
    yield put(setGlobalIndicatorVisibility(true))
  } catch (e) {
    console.log(e)
    yield put(setGlobalIndicatorVisibility(false))
  }
}

function* userLogoutSaga(action) {
  try {
    yield call(AsyncStorage.removeItem, 'token')
    Toast.info('Logout successfully!')
  } catch (e) {
    console.log('userLogout: ', e)
    yield call(AsyncStorage.removeItem, 'token')
  }
}

function* getUserInfoSaga() {
  try {
    const resUserInfo = yield call(getUserInfo)
    if (resUserInfo.code !== STATUS_CODE.success) throw new Error(resUserInfo.message)
    yield put(getUserInfoSuccess(resUserInfo.data))
  } catch (e) {}
}

export default [
  takeLatest(USER_LOGIN, userLoginSaga),
  takeLatest(UPDATE_USER_INFO, updateUserInfoSaga),
  takeLatest(GET_USER_INFO, getUserInfoSaga),
  takeLatest(USER_LOGOUT, userLogoutSaga),
  takeLatest(USER_REGISTER, userRegisterSaga),
]

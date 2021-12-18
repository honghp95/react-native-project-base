/**
 * Created by Hong HP on 3/12/20.
 */
import {call, put, takeLatest} from 'redux-saga/effects'
import {getUserInfoSuccess} from '../redux/actions/user'
import {changeLanguage, LOAD_BOOTSTRAP, loadBootstrapSuccess, setAppStack} from '../redux/actions/app'
import AsyncStorage from '@react-native-async-storage/async-storage'
import RouteKey from '../navigation/RouteKey'
import {setTokenData} from '../utilities/NetworkingAuth'
import {getUserInfo} from '../utilities/ApiManage'
import {setLocale} from '../locale/I18nConfig'
import {STATUS_CODE} from '../constants/constants'

function* loadBootstrap() {
  try {
    //Check Login
    const tokenString = yield call(AsyncStorage.getItem, 'token')
    //Get app language
    const language = yield call(AsyncStorage.getItem, 'language')
    if (!!language) {
      yield put(changeLanguage(language))
      setLocale(language)
    }
    if (!tokenString) throw new Error('Token do not existed!')
    const tokenObj = JSON.parse(tokenString)
    setTokenData(tokenObj?.idToken, tokenObj.refreshToken)
    const resUserInfo = yield call(getUserInfo)
    if (resUserInfo.code !== STATUS_CODE.success) throw new Error(resUserInfo.message)
    yield put(getUserInfoSuccess(resUserInfo.data))

    //Put Main Stack
    yield put(loadBootstrapSuccess(RouteKey.MainStack))
  } catch (e) {
    yield put(setAppStack(RouteKey.AuthStack))
    console.log(e.message)
  }
}

export default [takeLatest(LOAD_BOOTSTRAP, loadBootstrap)]

/*eslint-disable*/
/**
 * Created by Hong HP on 7/11/18.
 */

import {all} from 'redux-saga/effects'
import appSaga from './appSaga'
import authSaga from "./authSaga";

function* rootSaga() {
  yield all([...appSaga, ...authSaga])
}

export default rootSaga

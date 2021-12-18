/**
 * Created by Hong HP on 3/9/20.
 */

import {combineReducers} from 'redux'
import appReducer from './reducers/app'
import userReducer from './reducers/user'

export default combineReducers({
  app: appReducer,
  user: userReducer,
})

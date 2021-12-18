/**
 * Created by Hong HP on 3/9/20.
 */
import {
  GET_USER_INFO_SUCCESS,
  SET_CHAT_INFO,
  UPDATE_USER_INFO_SUCCESS,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
} from '../actions/user'

export default function user(state, action) {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      }
    case USER_LOGOUT:
      return {
        ...state,
        userInfo: {},
      }
    case UPDATE_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: {
          ...state.userInfo,
          ...action.payload,
        },
      }
    case GET_USER_INFO_SUCCESS:
      return {
        ...state,
        userInfo: action.payload,
      }
    case SET_CHAT_INFO:
      return {
        ...state,
        chatInfo: action.payload,
      }
    default:
      return {
        ...state,
      }
  }
}

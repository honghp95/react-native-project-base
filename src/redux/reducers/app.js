/**
 * Created by Hong HP on 3/9/20.
 */
import {
  SET_GLOBAL_INDICATOR_VISIBILITY,
  CHANGE_LANGUAGE,
  LOAD_BOOTSTRAP_SUCCESS,
  FINISH_ONBOARDING,
  SET_APP_STACK,
  SET_SELLER_TRANSFER_MENU_VISIBILITY,
  GET_CATEGORY_SUCCESS,
  SET_REFUSE_TRANSFER_MODAL_VISIBILITY,
  SET_DEVICE_TOKEN,
  SET_NOTIFICATION_TOKEN,
  SET_REFUSE_TRANSFER_MODAL_ROLE,
} from '../actions/app'
import {USER_LOGIN_SUCCESS, USER_LOGOUT} from '../actions/user'
import RouteKey from '../../navigation/RouteKey'

export default function app(state = {}, action) {
  switch (action.type) {
    case SET_GLOBAL_INDICATOR_VISIBILITY:
      return {
        ...state,
        showGlobalIndicator: action.visible,
      }
    case CHANGE_LANGUAGE:
      return {
        ...state,
        language: action.language,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        appStack: action.route,
      }
    case LOAD_BOOTSTRAP_SUCCESS:
    case SET_APP_STACK:
      return {
        ...state,
        appStack: action.route,
      }
    case FINISH_ONBOARDING:
      return {
        ...state,
        appStack: RouteKey.LoginScreen,
      }
    case USER_LOGOUT:
      return {
        ...state,
        appStack: RouteKey.AuthStack,
      }
    case SET_SELLER_TRANSFER_MENU_VISIBILITY:
      return {
        ...state,
        isShowSellerTransferMenu: action.visible,
      }
    case GET_CATEGORY_SUCCESS:
      return {
        ...state,
        categories: action.payload,
      }
    case SET_REFUSE_TRANSFER_MODAL_VISIBILITY:
      return {
        ...state,
        isShowRefuseTransferModal: action.visible,
      }
    case SET_NOTIFICATION_TOKEN:
      return {
        ...state,
        deviceToken: action.deviceToken,
      }
    case SET_REFUSE_TRANSFER_MODAL_ROLE:
      return {
        ...state,
        refuseTransferModalRole: action.role,
      }
    default:
      return state
  }
}

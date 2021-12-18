export const CHANGE_LANGUAGE = 'CHANGE_LANGUAGE'

export function changeLanguage(selectedLanguage) {
  return {
    type: CHANGE_LANGUAGE,
    language: selectedLanguage,
  }
}

export const SET_GLOBAL_INDICATOR_VISIBILITY = 'SET_GLOBAL_INDICATOR_VISIBILITY'

export function setGlobalIndicatorVisibility(visible) {
  return {
    type: SET_GLOBAL_INDICATOR_VISIBILITY,
    visible,
  }
}

export const SET_APP_STACK = 'SET_APP_STACK'

export function setAppStack(route) {
  return {
    type: SET_APP_STACK,
    route,
  }
}

export const FINISH_ONBOARDING = 'FINISH_ONBOARDING'
export const LOAD_BOOTSTRAP = 'LOAD_BOOTSTRAP'

export function loadBootstrap() {
  return {
    type: LOAD_BOOTSTRAP,
  }
}

export const LOAD_BOOTSTRAP_SUCCESS = 'LOAD_BOOTSTRAP_SUCCESS'

export function loadBootstrapSuccess(route) {
  return {
    type: LOAD_BOOTSTRAP_SUCCESS,
    route,
  }
}

export const SET_SELLER_TRANSFER_MENU_VISIBILITY = 'SET_SELLER_TRANSFER_MENU_VISIBILITY'

export function setSellerTransferMenuVisibility(visible) {
  return {
    type: SET_SELLER_TRANSFER_MENU_VISIBILITY,
    visible,
  }
}

export const GET_CATEGORY = 'GET_CATEGORY'

export function getCategory(payload) {
  return {
    type: GET_CATEGORY,
    payload,
  }
}

export const GET_CATEGORY_SUCCESS = 'GET_CATEGORY_SUCCESS'

export function getCategorySuccess(payload) {
  return {
    type: GET_CATEGORY_SUCCESS,
    payload,
  }
}

export const SET_REFUSE_TRANSFER_MODAL_VISIBILITY = 'SET_REFUSE_TRANSFER_MODAL_VISIBILITY'

export function setRefuseTransferModalVisibility(visible) {
  return {
    type: SET_REFUSE_TRANSFER_MODAL_VISIBILITY,
    visible,
  }
}

export const SET_DEVICE_TOKEN = 'SET_DEVICE_TOKEN'

export function setDeviceToken(token) {
  return {
    type: SET_DEVICE_TOKEN,
    token,
  }
}

export const SET_NOTIFICATION_TOKEN = 'SET_NOTIFICATION_TOKEN'

export function setNotificationToken(payload) {
  return {
    type: SET_NOTIFICATION_TOKEN,
    deviceToken: payload,
  }
}

export const SET_REFUSE_TRANSFER_MODAL_ROLE = 'SET_REFUSE_TRANSFER_MODAL_ROLE'

export function setRefuseTransferModalRole(role) {
  return {
    type: SET_REFUSE_TRANSFER_MODAL_ROLE,
    role,
  }
}

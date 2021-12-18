// /**
//  * Created by NL on 18/06/21.
//  */
// import {KakaoOAuthToken, login, logout, unlink, getProfile} from '@react-native-seoul/kakao-login'
// import store from '../redux/store'
// import {setGlobalIndicatorVisibility} from '../redux/actions/app'
//
// export function loginKakaoTalk() {
//   return login()
//     .then(res => {
//       return res
//     })
//     .catch(e => {
//       store.dispatch(setGlobalIndicatorVisibility(false))
//       console.log('%c KakaoTalk', 'color:#4AF82F', e)
//     })
// }
//
// export function logoutKakaoTalk() {
//   return logout()
//     .then(res => {
//       return res
//     })
//     .catch(e => console.log('%c KakaoTalk', 'color:#4AF82F', e))
// }

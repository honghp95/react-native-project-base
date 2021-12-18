/**
 * Created by HongHP on 16/06/20.
 */
import I18n from 'i18n-js'
import en from './en'

I18n.locale = __DEV__ ? 'en' : 'en'
I18n.fallbacks = true
I18n.translations = {
  en,
}
export function setLocale(locale) {
  I18n.locale = locale
}

export function getLocale() {
  return I18n.locale
}

export function localize(text) {
  return I18n.t(text)
}

export default I18n

import RouteKey from '../navigation/RouteKey'
import {getLocale} from '../locale/I18nConfig'

/**
 * Created by Hong HP on 3/9/20.
 */

export default {
  app: {
    showGlobalIndicator: false,
    appStack: RouteKey.SplashScreen,
    language: getLocale(),
  },
}

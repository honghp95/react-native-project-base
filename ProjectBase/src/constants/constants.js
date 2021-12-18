/**
 * Created by Hong HP on 4/6/20.
 */
import {Platform} from 'react-native'
// import { getReadableVersion } from 'react-native-device-info'

const env = {
  dev: 'dev',
  production: 'production',
  staging: 'staging',
  test: 'test',
}

const url = {
  dev: '',
  production: '',
  staging: '',
  test: '',
}

const wsUrl = {
  dev: '',
  production: '',
  staging: '',
  test: '',
}

export const codePushKey = Platform.select({
  ios: {
    staging: '',
    production: '',
    dev: '',
  },
  android: {
    staging: '',
    production: '',
    dev: '',
  },
})

export const buildEnv = env.staging

export const baseUrl = url[buildEnv]

export const baseWSUrl = wsUrl[buildEnv]

export const ResponseSuccess = 200

export const STATUS_CODE = {
  success: 200,
  unauthorized: 401,
}

export const ROLE = {
  admin: 1,
}

export const ERROR_STATUS = [401, 410]

// export const Version = `${getReadableVersion()}.23 - ${buildEnv}`
export const Version = `1.0.0.0.0 - ${buildEnv}`

/*eslint-disable*/
import {userLogout} from '../redux/actions/user'
import {ERROR_STATUS} from '../constants/constants'
import store from '../redux/store'

function timeout(request, duration, api) {
  return new Promise((resolve, reject) => {
    let timeout = setTimeout(() => {
      resolve({})
    }, duration)

    request.then(
      res => {
        clearTimeout(timeout)
        timeout = null
        resolve(res)
      },
      err => {
        clearTimeout(timeout)
        timeout = null
        resolve({})
      },
    )
  })
}

export function getWithTimeout(api, headers) {
  return timeout(get(api, headers), 60000, api)
}

export function get(api, headers) {
  return fetch(api, {
    method: 'get',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...headers,
    },
  })
    .then(response => {
      return response.json().then(data => {
        console.log('%cnetworking get', 'color:#4AF82F', api, data)
        return {data, status: response.status}
      })
    })
    .catch(err => {
      console.log('There is an error occurred while requesting api', err, api)
      return {data: null}
    })
}

export function patchWithTimeout(api, headers, body) {
  return timeout(patch(api, headers, body), 60000, api)
}

export function patch(api, headers, body) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)
  let heads = {}
  if (headers['Content-Type'])
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  else
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

  return fetch(api, {
    method: 'patch',
    headers: heads,
    body: body,
  })
    .then(response => {
      return response.json().then(data => {
        console.log('%cnetworking patch', 'color:#4AF82F', body, api, data)
        return {data, status: response.status}
      })
    })
    .catch(err => {
      console.log('There is an error occurred while requesting api', err, api)
      return {data: null}
    })
}

export function postWithTimeout(api, headers, body) {
  return timeout(post(api, headers, body), 60000, api)
}

export function post(api, headers, body) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  let heads = {}
  if (headers['Content-Type'])
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }
  else
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

  return fetch(api, {
    method: 'post',
    headers: heads,
    body: body,
  })
    .then(response => {
      return response.json().then(data => {
        console.log('%cnetworking post', 'color:#4AF82F', body, api, data)
        return {data, status: response.status}
      })
    })
    .catch(err => {
      console.log('There is an error occurred while requesting api', err, api)
      return {data: null}
    })
}
export function deleteWithTimeout(api, headers, body) {
  console.log('deleteWithTimeout')
  return timeout(_delete(api, headers, body), 30000, api)
}

export function _delete(api, headers, body) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  let heads = {}
  if (headers['Content-Type'])
    heads = {
      ...headers,
      Accept: 'application/json',
    }
  else
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

  return fetch(api, {
    method: 'delete',
    headers: heads,
    body: body,
  })
    .then(response => {
      if (ERROR_STATUS.includes(response.status)) {
        store.dispatch(userLogout())
        return
      }
      return response.json().then(data => {
        return {data, status: response.status}
      })
    })
    .catch(err => {
      console.log('There is an error occurred while requesting api', err, api)
      return {data: null}
    })
}

export function putWithTimeout(api, headers, body) {
  console.log('putWithTimeout')
  return timeout(put(api, headers, body), 30000, api)
}

export function put(api, headers, body) {
  if (typeof body === 'object' && body.constructor !== FormData) body = JSON.stringify(body)

  let heads = {}
  if (headers['Content-Type'])
    heads = {
      ...headers,
      Accept: 'application/json',
    }
  else
    heads = {
      ...headers,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    }

  return fetch(api, {
    method: 'put',
    headers: heads,
    body: body,
  })
    .then(response => {
      console.log(response)
      return response.json().then(data => {
        console.log(data)
        return {data, status: response.status}
      })
    })
    .catch(err => {
      console.log('There is an error occurred while requesting api', err, api)
      return {data: null}
    })
}

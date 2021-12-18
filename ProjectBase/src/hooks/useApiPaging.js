import React, {useEffect, useState, useRef} from 'react'
import {useDispatch} from 'react-redux'
import {setGlobalIndicatorVisibility} from '../redux/actions/app'
import {STATUS_CODE} from '../constants/constants'
import {userLogout} from '../redux/actions/user'

type Props = {
  url: String,
  filter: Object,
  api: Function,
  callback: Function,
  isShowIndicator: Boolean,
}

const INITIAL_PAGE = 1
let timeout = ''

export default function useApiPaging({isShowIndicator = true, ...config}: Props, deps) {
  const dispatch = useDispatch()
  const currentPage = useRef(INITIAL_PAGE)
  const [firstTimeLoading, setFirstTimeLoading] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState([])
  const [ended, setEnded] = useState(false)
  //Refresh dependencies
  const [refresh, setRefresh] = useState(false)
  //Pull to refresh status
  const [pullToRefresh, setPullToRefresh] = useState(false)
  const total = useRef(0)

  const asyncRequest = async () => {
    firstTimeLoading && isShowIndicator && dispatch(setGlobalIndicatorVisibility(true))
    const res = await config.api(currentPage.current)
    if (res?.code === STATUS_CODE.unauthorized) {
      dispatch(userLogout())
      return
    }
    if (res?.code !== STATUS_CODE.success) throw new Error(res?.message)
    let data = res?.data?.results
    total.current = res?.data?.total || 0
    if (!data?.length) {
      setEnded(true)
    }
    setData(prevState => [...prevState, ...data])
    config?.callback?.(data, pullToRefresh)
    setLoading(false)
    setFirstTimeLoading(false)
    setPullToRefresh(false)
    dispatch(setGlobalIndicatorVisibility(false))
  }

  const fetchMore = () => {
    if (ended || loading) return
    setLoading(true)
    currentPage.current += 1
    asyncRequest()
  }

  const fetchRefresh = (refreshing = true) => {
    setData(config.defaultValue || [])
    currentPage.current = INITIAL_PAGE
    setRefresh(!refresh)
    setPullToRefresh(refreshing)
    setEnded(false)
    total.current = 0
  }

  const fetchUpdateData = newData => {
    setData(newData)
  }

  useEffect(() => {
    currentPage.current = INITIAL_PAGE
    if (deps?.length > 0) {
      setData(config.defaultValue || [])
    }
    setLoading(true)
    setEnded(false)
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      asyncRequest().catch(e => {
        console.log(e)
        setError(true)
        setLoading(false)
        dispatch(setGlobalIndicatorVisibility(false))
      })
    }, 500)
  }, [...deps, refresh])

  return {
    data,
    status: {ended, loading, error, refresh, pullToRefresh},
    fetchMore,
    fetchRefresh,
    fetchUpdateData,
    total: total.current,
  }
}

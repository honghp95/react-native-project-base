/**
 * Created by NL on 20/07/21.
 */
import {useDispatch} from 'react-redux'
import {useEffect, useState} from 'react'
import {setGlobalIndicatorVisibility} from '../redux/actions/app'
import {STATUS_CODE} from '../constants/constants'
import Toast from '../common/Toast'

export default function useAPI(api, deps) {
  const dispatch = useDispatch()
  const [data, setData] = useState([])

  const [firstTimeLoading, setFirstTimeLoading] = useState(true)
  const [ended, setEnded] = useState(false)

  const asyncRequest = async () => {
    firstTimeLoading && dispatch(setGlobalIndicatorVisibility(true))
    const res = await api()
    if (res?.code !== STATUS_CODE.success) throw new Error(res?.message)
    let data = res?.data?.results || res?.data
    if (!data?.length) {
      setEnded(true)
    }
    setData(data)
    setFirstTimeLoading(false)
    dispatch(setGlobalIndicatorVisibility(false))
  }

  useEffect(() => {
    asyncRequest().catch(e => {
      Toast.info(e.message)
      dispatch(setGlobalIndicatorVisibility(false))
    })
  }, [...deps])

  return {
    data,
  }
}

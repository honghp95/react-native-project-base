import React, {useState, useEffect} from 'react'
import Toast from '../common/Toast'

export default function useGetAPI(api) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])

  let isSubscribe = true

  useEffect(() => {
    fetchData().then()
    return () => (isSubscribe = false)
  }, [])

  const fetchData = async () => {
    try {
      const res = await api()
      if (res?.status !== 200) throw res?.message
      if (isSubscribe && res.status === 200) {
        setData(res?.data || null)
      }
    } catch (error) {
      Toast.error('Something went wrong')
      console.log('%c useAPI', 'color:#4AF82F', error)
    } finally {
      isSubscribe && setIsLoading(false)
    }
  }

  return {isLoading, data}
}

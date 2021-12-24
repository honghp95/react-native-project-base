import React, {useState, useEffect} from 'react'
import Toast from '../common/Toast'

export default function useApiPagination(api) {
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [page, setPage] = useState(1)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const [pullRefresh, setPullRefresh] = useState(false)

  const size = 20
  let isSubscribe = true

  useEffect(() => {
    fetchData().then()
    return () => (isSubscribe = false)
  }, [page, pullRefresh])

  const fetchData = async () => {
    try {
      const res = await api(page, size)
      if (res?.status !== 200) throw res?.message
      if (isSubscribe && res.status === 200) {
        setPullRefresh(false)
        setIsLoadingMore(false)
        //Pull to refresh or first time run
        if (page === 1) return setData(res?.data)
        setData(prevData => [...prevData, ...res?.data])
      }
    } catch (error) {
      Toast.error('Something went wrong')
      console.log('%c useApiPagination', 'color:#4AF82F', error)
    } finally {
      isSubscribe && setIsLoading(false)
    }
  }

  const fetchMore = () => {
    if (!isLoadingMore) {
      setIsLoadingMore(true)
      setPage(page + 1)
    }
  }

  const fetchRefresh = () => {
    setPullRefresh(true)
    setPage(1)
  }

  return {
    isLoading,
    isLoadingMore,
    data,
    page,
    setPage,
    pullRefresh,
    fetchMore,
    fetchRefresh,
  }
}

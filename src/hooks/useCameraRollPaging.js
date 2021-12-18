// import {useState, useRef} from 'react'
// import CameraRoll from '@react-native-community/cameraroll'
// import {useFocusEffect} from '@react-navigation/native'
// import {InteractionManager} from 'react-native'
// import React from 'react'
//
// function useCameraRollPaging(groupName = 'Recent Photos', limit = 30) {
//   const [data, setData] = useState([])
//   const cursor = useRef(undefined)
//   const ended = useRef(false)
//   const [loading, setLoading] = useState(true)
//   const [refreshing, setRefreshing] = useState(true)
//   const loadingMore = useRef(false)
//
//   async function getPhotos(isSubscribed = true, prevData = []) {
//     if (!isSubscribed) return
//
//     // Camera Roll params
//     const images = await CameraRoll.getPhotos({
//       first: limit,
//       after: cursor.current,
//       assetType: 'Photos',
//       groupTypes: 'All',
//       groupName: groupName,
//     })
//
//     const listImage = images.edges
//     const listImageFormat = []
//     listImage.forEach((item, index) => {
//       const image = {
//         urls: {
//           thumb: item.node.image.uri,
//           full: item.node.image.uri,
//           regular: item.node.image.uri,
//         },
//         id: index,
//         source: 'gallery',
//       }
//       listImageFormat.push(image)
//     })
//
//     if (isSubscribed) {
//       setLoading(false)
//       setRefreshing(false)
//       loadingMore.current = false
//
//       cursor.current = images.page_info.end_cursor
//       ended.current = !images.page_info.has_next_page
//       setData([...prevData, ...listImageFormat])
//     }
//   }
//
//   useFocusEffect(
//     React.useCallback(() => {
//       let isSubscribed = true
//       const task = InteractionManager.runAfterInteractions(() => {
//         cursor.current = undefined
//         ended.current = false
//         getPhotos(isSubscribed)
//       })
//
//       return () => {
//         isSubscribed = false
//         task.cancel()
//       }
//     }, []),
//   )
//
//   function loadMore() {
//     if (!loading && !ended.current && !loadingMore.current) {
//       loadingMore.current = true
//       getPhotos(true, data)
//     }
//   }
//
//   function refresh(pullToRefresh = true) {
//     if (pullToRefresh) setRefreshing(true)
//     cursor.current = undefined
//     ended.current = false
//     getPhotos(true)
//   }
//
//   return [
//     data,
//     loadMore,
//     refresh,
//     {ended: ended.current, refreshing, loading, loadingMore: loadingMore.current},
//   ]
// }
//
// export default useCameraRollPaging

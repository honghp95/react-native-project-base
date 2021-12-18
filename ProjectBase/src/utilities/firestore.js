// /**
//  * Created by Hong HP on 1/24/21.
//  */
//
// import firestore from '@react-native-firebase/firestore'
// import {buildEnv} from '../constants/constants'
//
// let currentUserId = ''
// let userInfo
//
// const collectionChannelPath = `${buildEnv}-channels/`
// const collectionUserPath = `${buildEnv}-users/`
//
// export function setCurrentUserId(userId, data) {
//   currentUserId = userId.toString()
//   userInfo = data
// }
//
// export const createChannel = async (
//   isPrivate = false,
//   transferId = '',
//   partnerId,
//   channelName = '',
//   channelPicture = '',
// ) => {
//   let channelData = {
//     latestMessage: '',
//     latestSenderId: currentUserId,
//     members: [partnerId],
//     countMessageUnread: 0,
//     isTyping: false,
//     channelName: channelName,
//     channelPicture: channelPicture,
//     isPrivate,
//     isComplete: false,
//     transferId: transferId ?? '',
//   }
//   let channelRef
//   if (isPrivate)
//     channelRef = await firestore()
//       .collection(`${collectionUserPath}${currentUserId}/channels`)
//       .doc(transferId)
//       .set(channelData, {merge: true})
//   else
//     channelRef = await firestore()
//       .collection(`${collectionUserPath}${currentUserId}/channels`)
//       .add(channelData)
//
//   await firestore()
//     .collection(`${collectionUserPath}${partnerId}/channels`)
//     .doc(isPrivate ? transferId : channelRef.id)
//     .set({
//       ...channelData,
//       channelName: channelName,
//       channelPicture: channelPicture || channelName,
//       members: [currentUserId],
//     })
//   return {...channelData, id: isPrivate ? transferId : channelRef.id}
// }
//
// export const getChatChannels = userId => {
//   let listChannels = []
//   let url = `${collectionUserPath}${userId}/channels`
//   return new Promise((resolve, reject) => {
//     firestore()
//       .collection(url)
//       .where('isComplete', '==', false)
//       .orderBy('latestUpdate', 'desc')
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           listChannels.push({id: doc.id, ...doc.data()})
//         })
//         resolve(listChannels)
//       })
//       .catch(e => {
//         resolve([])
//       })
//   })
// }
//
// export const updateChannel = (userId, channelId, message, createAt) => {
//   let channelData = {
//     latestMessage: message,
//     latestUpdate: createAt,
//     latestSenderId: currentUserId,
//   }
//   let url = `${collectionUserPath}${userId}/channels`
//   let channelRefs = firestore().collection(url).doc(channelId)
//   return firestore().runTransaction(function (transaction) {
//     return transaction.get(channelRefs).then(function (doc) {
//       if (!doc.exists) {
//         channelRefs.set({
//           ...channelData,
//           countMessageUnread: userId === currentUserId ? 0 : 1,
//         })
//       } else {
//         channelData.countMessageUnread = userId === currentUserId ? 0 : doc.data().countMessageUnread + 1
//         transaction.update(channelRefs, {...channelData})
//       }
//     })
//   })
// }
//
// export const sendMessage = (channelId, message, members, file) => {
//   let createAt = new Date().getTime()
//
//   let messageData = {
//     senderId: currentUserId,
//     createAt,
//     text: message,
//     name: userInfo.nickname,
//   }
//   members.forEach(item => {
//     updateChannel(item, channelId, message, createAt)
//   })
//   updateChannel(currentUserId, channelId, message, createAt)
//   firestore()
//     .collection(`${collectionChannelPath}${channelId}/messages`)
//     .add(messageData)
//     .then(function (docRef) {})
// }
//
// let messageCursor = ''
//
// export const getMessageHistory = (channelId, formatDataMessage) => {
//   let listMessage = []
//   return new Promise((resolve, reject) => {
//     firestore()
//       .collection(`${collectionChannelPath}${channelId}/messages`)
//       .orderBy('createAt', 'desc')
//       .limit(30)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           let message = formatDataMessage({id: doc.id, ...doc.data()})
//           listMessage.push(message)
//         })
//         if (listMessage.length > 0) {
//           messageCursor = querySnapshot.docs[querySnapshot.docs.length - 1]
//         }
//         resolve(listMessage)
//       })
//   })
// }
//
// export function getMoreMessage(channelId: string, formatDataMessage: (message: any) => void) {
//   if (!messageCursor) {
//     return new Promise(resolve => resolve([]))
//   }
//   let listMessage = []
//   return new Promise((resolve, reject) => {
//     firestore()
//       .collection(`${collectionChannelPath}${channelId}/messages`)
//       .orderBy('createAt', 'desc')
//       .limit(20)
//       .startAfter(messageCursor)
//       .get()
//       .then(function (querySnapshot) {
//         querySnapshot.forEach(function (doc) {
//           let message = formatDataMessage({id: doc.id, ...doc.data()})
//           listMessage.push(message)
//         })
//         if (listMessage.length > 0) {
//           messageCursor = querySnapshot.docs[querySnapshot.docs.length - 1]
//         }
//         resolve(listMessage)
//       })
//   })
// }
//
// export const makeReadMessage = channelId => {
//   let url = `${collectionUserPath}${currentUserId}/channels`
//   let channelRefs = firestore().collection(url).doc(channelId)
//   channelRefs.update({
//     countMessageUnread: 0,
//   })
// }
//
// export const listenChannels = (userId, callBack) => {
//   let url = `${collectionUserPath}${userId}/channels`
//   return firestore()
//     .collection(url)
//     .onSnapshot(function (snapshot) {
//       if (snapshot) {
//         snapshot.docChanges().forEach(function (change) {
//           callBack?.({...change.doc.data(), id: change.doc.id, type: change.type})
//         })
//       }
//     })
// }
//
// export const receiveMessageListener = (channelId, callBack) => {
//   return firestore()
//     .collection(`${collectionChannelPath}${channelId}/messages`)
//     .where('createAt', '>', new Date().getTime())
//     .onSnapshot(function (snapshot) {
//       if (snapshot) {
//         snapshot.docChanges().forEach(function (change) {
//           if (change.type === 'added') {
//             callBack({...change.doc.data(), id: change.doc.id})
//           }
//         })
//       }
//     })
// }
//
// export function readMessageListener(userId, channelId, callBack) {
//   return firestore()
//     .collection(`${collectionUserPath}${userId}/channels`)
//     .doc(channelId)
//     .onSnapshot(function (snapshot) {
//       if (snapshot) {
//         let data = snapshot.data()
//         if (!!data && !data.countMessageUnread) {
//           callBack()
//         }
//       }
//     })
// }
//
// export const updatePrivateChatToComplete = (sellerId, buyerId, channelId) => {
//   let urlSeller = `${collectionUserPath}${sellerId}/channels`
//   let urlBuyerId = `${collectionUserPath}${buyerId}/channels`
//   return new Promise((resolve, reject) => {
//     firestore()
//       .collection(urlSeller)
//       .doc(channelId)
//       .update({
//         isComplete: true,
//       })
//       .then(() => {})
//       .catch(e => {})
//     firestore()
//       .collection(urlBuyerId)
//       .doc(channelId)
//       .update({
//         isComplete: true,
//       })
//       .then(() => {})
//       .catch(e => {})
//   })
// }
//
// export const updateChannelInfo = (userId, channelId, channelName, channelPicture) => {
//   let channelData = {
//     channelName,
//     channelPicture,
//   }
//   let url = `${collectionUserPath}${userId}/channels`
//   let channelRefs = firestore().collection(url).doc(channelId)
//   return firestore().runTransaction(function (transaction) {
//     return transaction.get(channelRefs).then(function (doc) {
//       if (!doc.exists) {
//         channelRefs.set(
//           {
//             ...channelData,
//           },
//           {merge: true},
//         )
//       } else {
//         transaction.update(channelRefs, {...channelData})
//       }
//     })
//   })
// }

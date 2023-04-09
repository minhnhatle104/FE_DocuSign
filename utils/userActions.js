import { doc, getDoc } from 'firebase/firestore'
import { getFirebaseApp, fireStoreDB } from './firebase-config'

export const getUserData = async (userId) => {
  const app = getFirebaseApp
  try {
    const userRef = doc(fireStoreDB, `users/${userId}`)
    const docSnap = await getDoc(userRef)

    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      // doc.data() will be undefined in this case
      return undefined
    }
  } catch (error) {}
}

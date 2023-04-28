import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
} from 'firebase/auth'
// Add a second document with a generated ID.
import { doc, setDoc } from 'firebase/firestore'
import Swal from 'sweetalert2'
import { fireStoreDB, getFirebaseApp } from '../../utils/firebase-config'
import { getUserData } from '../../utils/userActions'
import { authenticate, logout } from '../slice/authSlice'
import { closeLoading, displayLoading } from '../slice/loadingSlice'
import SetupInterceptors from '../../src/utils/SetupInterceptors.js'
import grpcClient from '../../src/grpc/client.js'
// import axiosConfig from "../../src/utils/axiosConfig";
let timer

export const signUpApi = (formValues) => {
  return async (dispatch) => {
    const app = getFirebaseApp
    const auth = getAuth(app)

    const { email, full_name, phone_number, password } = formValues
    dispatch(displayLoading())

    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      const { uid, stsTokenManager } = result.user
      const { accessToken, expirationTime } = stsTokenManager

      const expiryDate = new Date(expirationTime)
      const timeNow = new Date()
      const millisecondsUntilExpiry = expiryDate - timeNow

      const userData = await createUser(email, full_name, phone_number, uid)

      // const newUser = {
      //   phone: phone_number,
      //   fullname: full_name,
      // }
      // const data = {
      //   newUser,
      // }
      localStorage.setItem('signaText_accessToken', accessToken)
      localStorage.setItem('uid', uid)
      localStorage.setItem('expiryDate', expiryDate)
      SetupInterceptors()
      grpcClient(email, uid, phone_number, full_name)
      // axiosConfig
      //   .post('http://localhost:80/api/authentication/addUser', data)
      //   .then((response) => {
      //     if (response.status == 200 && response.data.isSuccess == true) {
      //       console.log('Success')
      //     }
      //   })

      dispatch(authenticate({ token: accessToken, userData }))
      dispatch(closeLoading())

      timer = setTimeout(() => {
        dispatch(userLogout())
      }, millisecondsUntilExpiry)
    } catch (error) {
      dispatch(closeLoading())
      const errorCode = error.code

      let message = 'Something went wrong.'

      if (errorCode === 'auth/email-already-in-use') {
        message = 'This email is already in use'
      }
      Swal.fire({
        title: 'ERROR !',
        html: `<h3 class="text-danger">${message}</h3>`,
        icon: 'error',
        confirmButtonText: 'OK',
      })
      throw new Error(message)
    }
  }
}

const createUser = async (email, full_name, phone_number, userId) => {
  const userData = {
    email,
    full_name,
    phone_number,
    userId,
    signUpDate: new Date().toISOString(),
  }

  try {
    await setDoc(doc(fireStoreDB, 'users', `${userId}`), userData)
  } catch (err) {
    throw new Error("Can't create user")
  }
  return userData
}

export const signInApi = (formValues) => {
  return async (dispatch) => {
    const app = getFirebaseApp
    const auth = getAuth(app)

    const { email, password } = formValues
    dispatch(displayLoading())
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      const { uid, stsTokenManager } = result.user
      const { accessToken, expirationTime } = stsTokenManager

      const expiryDate = new Date(expirationTime)
      const timeNow = new Date()
      const millisecondsUntilExpiry = expiryDate - timeNow

      const userData = await getUserData(uid)
      if (!userData) {
        dispatch(closeLoading())
        throw new Error('No such user exists')
      }

      dispatch(authenticate({ token: accessToken, userData }))

      localStorage.setItem('signaText_accessToken', accessToken)
      localStorage.setItem('uid', uid)
      localStorage.setItem('expiryDate', expiryDate)

      timer = setTimeout(() => {
        dispatch(userLogout())
      }, millisecondsUntilExpiry)

      dispatch(closeLoading())
    } catch (error) {
      dispatch(closeLoading())
      const errorCode = error.code

      let message = 'Something went wrong.'

      if (
        errorCode === 'auth/wrong-password' ||
        errorCode === 'auth/user-not-found'
      ) {
        message = 'The username or password was incorrect'
      }
      Swal.fire({
        title: 'ERROR !',
        html: `<h3 class="text-danger">${message}</h3>`,
        icon: 'error',
        confirmButtonText: 'OK',
      })
      throw new Error(message)
    }
  }
}

export const userLogout = () => {
  return async (dispatch) => {
    localStorage.clear()
    clearTimeout(timer)
    dispatch(logout())
  }
}

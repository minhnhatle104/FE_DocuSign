import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from 'react-router-dom'

import ForgotPasswordEmail from './screens/common/ForgotPasswordEmail.jsx'
import ForgotPasswordOtp from './screens/common/ForgotPasswordOtp.jsx'
import ForgotPasswordMain from './screens/common/ForgotPasswordMain.jsx'
import HomePage from './screens/common/HomePage.jsx'
import RegisterForm from './screens/common/RegisterForm.jsx'
import OtpRegisterForm from './screens/common/OtpRegisterForm.jsx'
import UploadFile from './screens/document/UploadFile.jsx'
import RecipientInfo from './screens/document/RecipientInfo.jsx'
import ViewPdf_Sign from './screens/document/ViewPdf_Sign'
import ListDocs from './screens/document/ListDocs.jsx'
import ManageSignature from './screens/signature/ManageSignature/index.jsx'
import LoginForm from './screens/common/LoginForm.jsx'
import { Provider } from 'react-redux'
import store from '../redux/configStore.js'
import Loading from './components/Loading/Loading.jsx'
import SetupInterceptors from './utils/SetupInterceptors.js'
import Review from './screens/document/Review'
import ViewPDF from './screens/document/ViewPdfOnly'
import OtherSignV2 from './screens/document/OtherSignV2'

function NavigateFunctionComponent() {
  const [ran, setRan] = useState(false)

  if (!ran) {
    SetupInterceptors()
    setRan(true)
  }
  return <></>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Loading />
      <NavigateFunctionComponent />
      <Routes>
        <Route
          path="/"
          element={
            <RequiredAuth>
              <HomePage />
            </RequiredAuth>
          }
        />

        <Route path="/login" element={<LoginForm />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register/otp" element={<OtpRegisterForm />} />
        <Route path="/forgotPassword/email" element={<ForgotPasswordEmail />} />
        <Route path="/forgotPassword/otp" element={<ForgotPasswordOtp />} />
        <Route
          path="/forgotPassword/confirm"
          element={<ForgotPasswordMain />}
        />

        <Route path="document">
          <Route
            path="upload"
            element={
              <RequiredAuth>
                <UploadFile />
              </RequiredAuth>
            }
          />
          <Route
            path="recipientInfo"
            element={
              <RequiredAuth>
                <RecipientInfo />
              </RequiredAuth>
            }
          />
          <Route
            path="signPDF"
            element={
              <RequiredAuth>
                <ViewPdf_Sign />
              </RequiredAuth>
            }
          />
          <Route
            path="Review"
            element={
              <RequiredAuth>
                <Review />
              </RequiredAuth>
            }
          />
          <Route
            path="viewPDF"
            element={
              <RequiredAuth>
                <ViewPDF />
              </RequiredAuth>
            }
          />
          <Route
            path="other/signPDF"
            element={
              <RequiredAuth>
                <OtherSignV2 isShowChooseImage={true} isOtherSign={true} />
              </RequiredAuth>
            }
          />
          <Route
            path="list"
            element={
              <RequiredAuth>
                <ListDocs />
              </RequiredAuth>
            }
          />
        </Route>
        <Route
          path="/signature-management"
          element={
            <RequiredAuth>
              <ManageSignature />
            </RequiredAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  </Provider>
)

function RequiredAuth({ children }) {
  const location = useLocation()

  if (
    !localStorage.signaText_accessToken ||
    localStorage.signaText_accessToken === 'undefined' ||
    !localStorage.expiryDate ||
    localStorage.expiryDate === 'undefined'
  ) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  if (
    localStorage.expiryDate &&
    localStorage.signaText_accessToken !== 'undefined'
  ) {
    const expiryDate = new Date(localStorage.getItem('expiryDate'))
    const dateNow = new Date(Date.now())
    if (expiryDate <= dateNow) {
      return <Navigate to="/login" state={{ from: location }} />
    }
  }

  return children
}

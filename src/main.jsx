import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'

import ForgotPasswordEmail from './screens/common/ForgotPasswordEmail.jsx'
import ForgotPasswordOtp from './screens/common/ForgotPasswordOtp.jsx'
import ForgotPasswordMain from './screens/common/ForgotPasswordMain.jsx'
import HomePage from './screens/common/HomePage.jsx'
import RegisterForm from './screens/common/RegisterForm.jsx'
import OtpRegisterForm from './screens/common/OtpRegisterForm.jsx'
import UploadFile from './screens/document/UploadFile.jsx'
import RecipientInfo from './screens/document/RecipientInfo.jsx'
import ViewPdf_Sign from './screens/document/ViewPdf_Sign'
import ListDocs from "./screens/document/ListDocs.jsx"
import ManageSignature from './screens/signature/ManageSignature/index.jsx'
import LoginForm from './screens/common/LoginForm.jsx'
import { Provider } from 'react-redux'
import store from '../redux/configStore.js'
import Loading from './components/Loading/Loading.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <Loading />
      <Routes>
        <Route path="/" element={
          <RequiredAuth>
            <HomePage />
          </RequiredAuth>
        } />

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
          <Route path="upload" element={
            <RequiredAuth>
              <UploadFile />
            </RequiredAuth>} />
          <Route path="recipientInfo" element={
            <RequiredAuth>
              <RecipientInfo />
            </RequiredAuth>} />
          <Route path="signPDF" element={
            <RequiredAuth>
              <ViewPdf_Sign />
            </RequiredAuth>} />
          <Route path="list" element={
            <RequiredAuth>
              <ListDocs />
            </RequiredAuth>} />
        </Route>
        <Route path="/signature-management" element={
          <RequiredAuth>
            <ManageSignature />
          </RequiredAuth>} />
      </Routes>
    </BrowserRouter>
  </Provider>
)

function RequiredAuth({ children }) {
  const location = useLocation()

  if (!localStorage.signaText_accessToken || localStorage.signaText_accessToken === "undefined") {
    return <Navigate to='/login' state={{ from: location }} />
  }

  return children
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Auth0Provider } from '@auth0/auth0-react'

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

ReactDOM.createRoot(document.getElementById('root')).render(
  <Auth0Provider
    domain="dev-jwi0uig7pj11zil8.us.auth0.com"
    clientId="FijTfQuGIWxGOpkxhVzBgHJ8zc6vRpwf"
    authorizationParams={{
      redirect_uri: window.location.origin,
    }}
  >
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/register/otp" element={<OtpRegisterForm />} />
        <Route path="/forgotPassword/email" element={<ForgotPasswordEmail />} />
        <Route path="/forgotPassword/otp" element={<ForgotPasswordOtp />} />
        <Route
          path="/forgotPassword/confirm"
          element={<ForgotPasswordMain />}
        />
        <Route path="/home" element={<HomePage />} />

        <Route path="document">
          <Route path="upload" element={<UploadFile />} />
          <Route path="recipientInfo" element={<RecipientInfo />} />
          <Route path="signPDF" element={<ViewPdf_Sign />} />
          <Route path="list" element={<ListDocs />} />
        </Route>
        <Route path="/signature-management" element={<ManageSignature />} />
      </Routes>
    </BrowserRouter>
  </Auth0Provider>
)

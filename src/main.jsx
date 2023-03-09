import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ForgotPasswordEmail from './screens/ForgotPasswordEmail.jsx'
import ForgotPasswordOtp from './screens/ForgotPasswordOtp.jsx'
import ForgotPasswordMain from './screens/ForgotPasswordMain.jsx'
import HomePage from './screens/HomePage.jsx'
import LoginForm from './screens/LoginForm'
import RegisterForm from './screens/RegisterForm.jsx'
import OtpRegisterForm from './screens/OtpRegisterForm.jsx'
import UploadFile from './screens/document/UploadFile.jsx'
import RecipientInfo from './screens/document/RecipientInfo.jsx'
import ViewPdf_Sign from './screens/document/ViewPdf_Sign'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginForm />} />
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/register/otp" element={<OtpRegisterForm />} />
      <Route path="/forgotPassword/email" element={<ForgotPasswordEmail />} />
      <Route path="/forgotPassword/otp" element={<ForgotPasswordOtp />} />
      <Route path="/forgotPassword/confirm" element={<ForgotPasswordMain />} />
      <Route path="/home" element={<HomePage />} />

      <Route path="document">
        <Route path="upload" element={<UploadFile />} />
        <Route path="recipientInfo" element={<RecipientInfo />} />
        <Route path="signPDF" element={<ViewPdf_Sign />} />
      </Route>
    </Routes>
  </BrowserRouter>
)

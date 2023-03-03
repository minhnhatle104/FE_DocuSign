import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import ForgotPasswordEmail from "./screens/ForgotPasswordEmail.jsx";
import ForgotPasswordOtp from "./screens/ForgotPasswordOtp.jsx";
import ForgotPasswordMain from "./screens/ForgotPasswordMain.jsx";
import HomePage from "./screens/HomePage.jsx";
import LoginForm from "./screens/LoginForm";
import RegisterForm from "./screens/RegisterForm.jsx";
import OtpRegisterForm from "./screens/OtpRegisterForm.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<LoginForm/>} />
            <Route path="/register" element={<RegisterForm/>}/>
            <Route path="/register/otp" element={<OtpRegisterForm/>}/>
            <Route path="/forgotPassword/email" element={<ForgotPasswordEmail />} />
            <Route path="/forgotPassword/otp" element={<ForgotPasswordOtp />} />
            <Route path="/forgotPassword/confirm" element={<ForgotPasswordMain />} />
            <Route path="/home" element={<HomePage />} />
        </Routes>
    </BrowserRouter>
);

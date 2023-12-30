import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//user auth pages
import Register from "./User//Register";
import Login from "./User/Login";
//forgot password feature
import EmailInput from './User/ForgotPassword/EmailInput';
import EnterCodeForgotPassword from './User/ForgotPassword/EnterCode';
import ResetPassword from './User/ForgotPassword/ResetPassword';
//context for forgot password
import { EmailProvider } from './User/ForgotPassword/EmailContext';
//components
import HeaderComponent from './Components/HeaderComponent';
import Feed from './User/Feed';

import { FormProvider } from './User/context/FormContext';

function App() {
  return (
    <BrowserRouter>
{/* <HeaderComponent/> */}
<EmailProvider>


    <Routes>
    <Route path="/Register" element={<FormProvider><Register /></FormProvider>} />
    <Route path="/" element={<Feed />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/reset-password-request-email" element={<EmailInput />} />
    <Route path="/verification-code-forgotpass" element={<EnterCodeForgotPassword />} />
    <Route path="/success-reset-password" element={<ResetPassword />} />

    </Routes>
    </EmailProvider>
    </BrowserRouter>
  );
}

export default App;
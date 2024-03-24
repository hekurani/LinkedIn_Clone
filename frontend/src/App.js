import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//user auth pages
import Register from "./User//Register";
import Login from "./User/Login";
import { getToken } from './utilities/getToken';
//forgot password feature
import EmailInput from './User/ForgotPassword/EmailInput';
import EnterCodeForgotPassword from './User/ForgotPassword/EnterCode';
import ResetPassword from './User/ForgotPassword/ResetPassword';
//context for forgot password
import { EmailProvider } from './User/ForgotPassword/EmailContext';
//components
import HeaderComponent from './Components/HeaderComponent';
import Feed from './User/Feed';
import Profile from "./User/Profile";

import { FormProvider } from './User/context/FormContext';
import Job from './Jobs/Job';
import JobListing from './Components/Jobs/JobListing';


function App() {
  
  return (
    <BrowserRouter>
     {getToken()&&<HeaderComponent/>}
<EmailProvider>


    <Routes>
    <Route path="/Register" element={<FormProvider><Register /></FormProvider>} />
    <Route path="/" element={<Feed />} />
    <Route path="/profile" element={<Profile />} />
    <Route path="/Login" element={<Login />} />
    <Route path="/reset-password-request-email" element={<EmailInput />} />
    <Route path="/verification-code-forgotpass" element={<EnterCodeForgotPassword />} />
    <Route path="/success-reset-change-password" element={<ResetPassword />} />

    <Route path="/job" element={<Job />} />
    <Route path="/job-listing" element={<JobListing />} />

    </Routes>
    </EmailProvider>
    </BrowserRouter>
  );
}

export default App;
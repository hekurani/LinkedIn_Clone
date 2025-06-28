import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// user auth pages
import Register from "./User/Register";
import Login from "./User/Login";
// forgot password feature
import EmailInput from "./User/ForgotPassword/EmailInput";
import EnterCodeForgotPassword from "./User/ForgotPassword/EnterCode";
import ResetPassword from "./User/ForgotPassword/ResetPassword";
// context for forgot password
import { EmailProvider } from "./User/ForgotPassword/EmailContext";
// components
import Feed from "./User/Feed";
import Profile from "./User/Profile";
import { FormProvider } from "./User/context/FormContext";
import Job from "./Components/Jobs/Job.jsx";
import JobListing from "./Components/Jobs/components/JobListing.jsx";
import Connections from "./User/Connections";
// protected routes component
import ProtectedRoutes from "./Components/ProtectedRoutes.js";
// utilities
import AdminDashboard from "./admin/components/AdminDashboard.jsx";
import LeftCompanyMenu from "./company/components/LeftCompanyMenu.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";
import HeaderComponent from "./Components/HeaderComponent.jsx";
import { FeedProvider } from "./User/context/FeedContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <FeedProvider>
         
        <HeaderComponent />
        <EmailProvider>
          <Routes>
            <Route
              path="/Register"
              element={
                <FormProvider>
                  <Register />
                </FormProvider>
              }
            />
            <Route path="/Login" element={<Login />} />
            <Route
              path="/reset-password-request-email"
              element={<EmailInput />}
            />
            <Route
              path="/verification-code-forgotpass"
              element={<EnterCodeForgotPassword />}
            />
            <Route
              path="/success-reset-change-password"
              element={<ResetPassword />}
            />

            <Route element={<ProtectedRoutes roles={['admin']} />}>
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
            </Route>

            <Route element={<ProtectedRoutes roles={['admin', 'jobseeker']} />}>
              <Route path="/" element={<Feed />} />
              <Route path="/:userId/profile" element={<Profile />} />
              <Route path="/jobs" element={<Job />} />
              <Route path="/job-listing" element={<JobListing />} />
              <Route path="/connections" element={<Connections />} />
              <Route path="/company-dashboard" element={<LeftCompanyMenu />} />
            </Route>
          </Routes>
        </EmailProvider>
        </FeedProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;

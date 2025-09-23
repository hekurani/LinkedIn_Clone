import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// user auth pages
import Login from "./User/Login.jsx";
import Register from "./User/Register.jsx";
// forgot password feature
import EmailInput from "./User/ForgotPassword/EmailInput.jsx";
import EnterCodeForgotPassword from "./User/ForgotPassword/EnterCode.jsx";
import ResetPassword from "./User/ForgotPassword/ResetPassword.jsx";
// context for forgot password
import { EmailProvider } from "./User/ForgotPassword/EmailContext.js";
// components
import Job from "./Components/Jobs/Job.jsx";
import JobListing from "./Components/Jobs/components/JobListing.jsx";
import Connections from "./User/Connections.jsx";
import Feed from "./User/Feed.jsx";
import Profile from "./User/Profile.jsx";
import { FormProvider } from "./User/context/FormContext.jsx";
// protected routes component
import ProtectedRoutes from "./Components/ProtectedRoutes.js";
// utilities
import ErrorBoundary from "./ErrorBoundary.jsx";
import JobseekerApplications from "./User/components/JobseekerAppplications.jsx";
import { FeedProvider } from "./User/context/FeedContext.jsx";
import AdminDashboard from "./admin/components/AdminDashboard.jsx";
import CompanyDashboard from "./company/CompanyDashboard.jsx";
import CompanyLogin from "./company/components/CompanyLogin.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <FeedProvider>
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
              <Route path="/company/Login" element={<CompanyLogin />} />
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

              <Route element={<ProtectedRoutes roles={["admin"]} />}>
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
              </Route>

              <Route
                element={<ProtectedRoutes roles={["admin", "jobseeker"]} />}
              >
                <Route path="/" element={<Feed />} />
                <Route path="/:userId/profile" element={<Profile />} />
                <Route path="/jobs" element={<Job />} />
                <Route path="/job-listing" element={<JobListing />} />
                <Route path="/connections" element={<Connections />} />
                <Route
                  path="/job-applications"
                  element={<JobseekerApplications />}
                />
              </Route>

              <Route element={<ProtectedRoutes roles={["admin", "company"]} />}>
                <Route
                  path="/company-dashboard"
                  element={<CompanyDashboard />}
                />
              </Route>
            </Routes>
          </EmailProvider>
        </FeedProvider>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default App;

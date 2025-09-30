import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/LinkedIn-logo.png";
import axiosInstance from "../axios/axios.tsx";
import { useAlert } from "../utilities/alert/AlertContext.js";
import { getToken } from "../utilities/getToken.js";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const showAlert = useAlert();
  async function responseGoogle(response) {
    const token = response.credential;
    try {
      const responseGoogle = await axiosInstance.post("auth/google/logIn", {
        token,
      });
      localStorage.setItem("access_token", responseGoogle?.data?.access_token);
      localStorage.setItem(
        "refresh_token",
        responseGoogle?.data?.refresh_token
      );
      navigate("/");
    } catch (err) {
      console.log("err: ", err);
      showAlert({
        text: err?.response?.data?.message || "Something went wrong",
        variant: "danger",
      });
    }
  }
  const signIn = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    //validimet e mundshme

    if (email.trim() === "") {
      validationErrors.email = "Email is required.";
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      validationErrors.email = "Invalid email address.";
    }

    if (password.trim() === "") {
      validationErrors.password = "Password is required.";
    }
    if (password.length > 0 && password.length < 6) {
      validationErrors.password = "Password must be 6 characters or more.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const loginInfo = {
      email: email,
      password: password,
    };
    try {
      const response = await axiosInstance.post("auth/login", loginInfo);
      console.log(response);

      const token = response?.data?.access_token;
      if (token) {
        localStorage.setItem("access_token", token);
        navigate("/");
      }
    } catch (err) {
      console.log(err);
      showAlert({
        text: err?.response?.data?.message || "Something went wrong",
        variant: "danger",
      });
    }
  };

  return (
    <div className="flex justify-center">
      <div className="mr-auto m-5">
        <img
          className="logo"
          width={120}
          height={120}
          src={logo}
          alt="LinkedIn"
        />
      </div>

      {/* Header Section */}

      <div className="form mr-auto mt-32">
        {/* Form Container */}
        <div className="credentials m-5">
          {/* Credentials Section */}
          <form
            className="bg-white w-96  rounded-lg py-3 pb-4 pl-7"
            style={{ boxShadow: "0 7px 30px -12px rgb(0 0 0 / 0.25)" }}
            onSubmit={signIn}
          >
            {/* Form */}
            <span style={{ fontSize: "2.2rem" }} className="font-semibold">
              Sign in
            </span>
            <br />
            <p className="text-sm pt-2 pb-3">
              Stay updated on your professional world
            </p>
            <input
              style={{ border: "1px solid black" }}
              className="p-2 pl-3 mt-2 w-80 rounded h-12"
              placeholder="Email or Phone"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <span className="text-red-500 text-xs italic">{errors.email}</span>
            <br />
            <input
              style={{ border: "1px solid black" }}
              className="p-2 pl-3 mt-6 w-80 h-12 rounded"
              placeholder="Password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="text-red-500 text-xs italic">
              {errors.password}
            </span>
            <p style={{ color: "#0a66c2" }} className="mt-2 font-semibold">
              <Link to={"/reset-password-request-email"}>Forgot Password?</Link>
            </p>
            <button
              style={{ backgroundColor: "#0a66c2" }}
              className="w-80 h-12 font-semibold text-white rounded-full mt-3"
            >
              Sign In
            </button>
            <div className="flex justify-center mt-3 mr-5 items-center">
              <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                <GoogleLogin
                  onSuccess={responseGoogle}
                  shape="circle"
                  width={300}
                />
              </GoogleOAuthProvider>
            </div>
            <p className="text-xs mx-auto mt-5 mb-5 text-center">
              By clicking Agree & Join, you agree to the LinkedIn{" "}
              <span style={{ color: "purple" }}>User Agreement</span>,{" "}
              <span style={{ color: "#0a66c2" }}>Privacy Policy</span>, and{" "}
              <span style={{ color: "#0a66c2" }}>Cookie Policy</span>.{" "}
            </p>
          </form>
          <p className="text-center mt-5">
            New to LinkedIn?{" "}
            <span style={{ color: "#0a66c2" }} className="font-semibold">
              <Link to={"/Register"}>Join now</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

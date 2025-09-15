import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/LinkedIn-logo.png";
import { useEmail } from "./EmailContext";
const EmailInput = () => {
  const navigate = useNavigate();
  const { setEmail } = useEmail(); //pranojm emailin qe e ka shtyp dhe setOTP per mbivendosje te otp
  const [email, setEmailLocally] = useState("");
  const [errors, setErrors] = useState({});

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    //validimet e mundshme

    if (email.trim() === "") {
      validationErrors.email = "Email is required.";
    } else if (!email.includes("@") || !email.endsWith(".com")) {
      validationErrors.email = "Invalid email address.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setEmail(email);
    axios
      .post("/auth/send_recovery_email", { email: email })
      .then((response) => {
        navigate("/verification-code-forgotpass");
      })
      .catch((error) => {
        setErrors("Failed to send recovery email.");
      });
  };
  return (
    <div className="w-full mx-3">
      {" "}
      {/* div kryesor */}
      {/* Header Section */}
      <div className="image flex w-full  items-center justify-between">
        <img
          className="logo"
          width={120}
          height={120}
          src={logo}
          alt={"clone"}
        />
        <div className="mr-7">
          <button
            className="font-semibold"
            style={{ marginBottom: "15px", color: "grey" }}
          >
            <Link to={"/Login"}>Sign in</Link>{" "}
          </button>
          <button
            className="mb-7 pb-1 pl-4 pr-4 mt-3 ml-4 rounded-full  pt-1 pb-0 font-semibold"
            style={{
              color: "#0a66c2",
              border: "1px solid #0a66c2",
              borderTop: "1.8px solid #0a66c2",
              borderLeft: "1.8px solid #0a66c2",
              borderRight: "1.8px solid #0a66c2",
            }}
          >
            {" "}
            <span className="text-center">
              {" "}
              <Link to={"/Register"}>Join now</Link>
            </span>
          </button>
        </div>
      </div>
      <div className="form w-96 h-96 mt-6 mx-auto">
        {" "}
        {/* div per krejt formen */}
        <div className="credentials m-5">
          {" "}
          {/* div per email passsword div */}
          <form
            className="bg-white w-96 h-200 rounded-lg p-5 pl-7"
            style={{ boxShadow: "0 7px 30px -12px rgb(0 0 0 / 0.25)" }}
            onSubmit={handleEmailSubmit}
          >
            {" "}
            {/* forma */}
            <p style={{ fontSize: "2rem" }} className="font-semibold mb-1">
              Forgot password
            </p>{" "}
            <br></br>
            <input
              style={{ border: "1px solid black" }}
              className=" p-2  mt-2 w-80 rounded h-12"
              placeholder="Email or Phone"
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmailLocally(e.target.value)}
            />
            <span className="text-red-500 text-xs italic">{errors.email}</span>{" "}
            <br></br>
            <p className="text-left mt-6" style={{ fontSize: "14px" }}>
              We’ll send a verification code to this email or phone number if it
              matches an existing LinkedIn account.
            </p>
            <button
              style={{ backgroundColor: "#0a66c2" }}
              className="w-80 mt-8 h-12 font-semibold text-white rounded-full mt-3"
            >
              Next
            </button>
            <button
              style={{ color: "grey" }}
              className="w-80 h-12 font-semibold text-white rounded-full mt-1"
            >
              Back
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmailInput;

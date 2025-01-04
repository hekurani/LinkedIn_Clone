import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useEmail } from "./EmailContext";
import logo from "../../assets/LinkedIn-logo.png";
import axios from "axios";

const EnterCodeForgotPassword = () => {
  const navigate = useNavigate();

  const [code, setCode] = useState("");
  const { email } = useEmail();
  const [errors, setErrors] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/verify_OTP", { code: code });
      if (response.status === 201 && response.data === true) {
        navigate("/success-reset-change-password");
      } else {
        setErrors("Invalid code. Please try again.");
      }
    } catch (error) {
      setErrors("Failed to verify the code. Please try again.");
    }
  };

  const resendCode = () => {
    if (email) {
      axios
        .post("/auth/send_recovery_email", { email: email })
        .then((response) => {
          setErrors("We have resent you the code!");
          // me largu messazhin mas 2 secondave
          setTimeout(() => {
            setErrors("");
          }, 2000);
        })
        .catch((error) => {
          setErrors("Failed to resend code. Please try again.");
        });
    } else {
      setErrors("Please enter your email.");
    }
  };

  return (
    <div className="page h-96" style={{ height: "800px" }}>
      {" "}
      {/* div kryesor */}
      {/* Header Section */}
      <div className="image ml-24 flex ">
        <img
          className="logo"
          width={120}
          height={120}
          src={logo}
          alt={"clone"}
        />
        <button
          className="font-semibold"
          style={{ marginLeft: "830px", marginBottom: "15px", color: "grey" }}
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
            <Link to={"/Register"}>Join now</Link>
          </span>
        </button>
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
            onSubmit={handleSubmit}
          >
            {" "}
            {/* forma */}
            <span style={{ fontSize: "1.6rem" }} className="font-semibold mb-1">
              Enter the 6-digit code
            </span>{" "}
            <br></br>
            <p className="mt-2 text-sm">
              Check <span className="font-semibold">{email}</span> for a
              verification code.{" "}
              <span className="font-semibold" style={{ color: "#0a66c2" }}>
                {" "}
                <Link to={"/reset-password-request-email"}>Change</Link>
              </span>
            </p>
            <input
              style={{ border: "1px solid black" }}
              className=" p-2  mt-8 w-80 rounded h-12 mb-1"
              placeholder="6 digit code"
              type="text"
              name="email"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <span className="text-red-500 text-xs italic">{errors}</span>{" "}
            <br></br>
            <span
              onClick={resendCode}
              className="font-semibold text-sm"
              style={{ color: "#0a66c2", cursor: "pointer" }}
            >
              Resend Code
            </span>
            <button
              style={{ backgroundColor: "#0a66c2" }}
              className="w-80 mt-8 h-12 font-semibold text-white rounded-full mt-3"
            >
              Submit
            </button>
            <p
              className="mt-5 text-sm text-left mb-1"
              style={{ color: "grey" }}
            >
              If you don't see a code in your inbox, check your spam folder. If
              it's not there, the email address may not be confirmed, or it may
              not match an existing LinkedIn account.
            </p>
            <p
              className="font-semibold text-sm  mb-2"
              style={{ color: "#0a66c2" }}
            >
              Can’t access this email?
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EnterCodeForgotPassword;

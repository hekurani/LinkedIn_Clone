import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/LinkedIn-logo.png";
import axiosInstance from "../axios/axios.tsx";
import { useAlert } from "../utilities/alert/AlertContext.js";
import useFormContext from "./context/FormContext";
import FormInputs from "./RegistrationComponents/FormInputs";

const Register = () => {
  const navigate = useNavigate();
  const showAlert = useAlert();
  async function responseGoogle(response) {
    try {
      const token = response.credential;
      const responseGoogle = await axiosInstance.post("auth/google/signUp", {
        token,
      });
      if (responseGoogle?.data?.access_token) {
        localStorage.setItem(
          "access_token",
          responseGoogle?.data?.access_token
        );
        localStorage.setItem(
          "refresh_token",
          responseGoogle?.data?.refresh_token
        );
        navigate("/");
      }
    } catch (err) {
      console.log("err: ", err);
      showAlert({
        text: err?.response?.data?.message || "Something went wrong",
        variant: "danger",
      });
    }
  }
  const { setPage, data, canSubmit, error, setError } = useFormContext();
  const handleNext = (e) => {
    e.preventDefault();
    const validationErrors = {};
    //validimet e mundshme
    if (data.email.trim() === "") {
      validationErrors.email = "Email is required.";
    } else if (!data.email.includes("@") || !data.email.endsWith(".com")) {
      validationErrors.email = "Invalid email address.";
    }

    if (data.password.trim() === "") {
      validationErrors.password = "Password is required.";
    }
    if (data.password.length >= 0 && data.password.length < 6) {
      validationErrors.password = "Password must be 6 characters or more.";
    }
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }
    setPage((prev) => prev + 1);
  };
  const signUp = async (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (data.firstName.length < 2) {
      validationErrors.firstName = "firstName must be 2 characters or more.";
    }
    if (data.lastName.length < 3) {
      validationErrors.lastName = "lastName must be 3 characters or more..";
    }
    if (Object.keys(validationErrors).length > 0) {
      setError(validationErrors);
      return;
    }

    try {
      const response = await axiosInstance.post(
        "http://localhost:4000/auth/signUp",
        {
          name: data?.firstName,
          email: data?.email,
          lastname: data?.lastName,
          password: data?.password,
          professionId: data?.professionId || null,
        }
      );
      localStorage.setItem("access_token", response?.data?.access_token);
      localStorage.setItem("refresh_token", response?.data?.refresh_token);
      navigate("/");
    } catch (err) {
      console.error("Error signing up:", err);
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
      <div className="mr-auto mt-32 justify-center items-center flex flex-col">
        <p className="text-[2.2rem] text-center font-semibold">
          Make the most of your professional life
        </p>
        <div className="form">
          {/* div per krejt formen */}
          <div className="credentials m-5">
            {/* div per email passsword div */}
            <form
              className="bg-white w-96  h-[464px] rounded-lg p-7"
              style={{ boxShadow: "0 7px 30px -12px rgb(0 0 0 / 0.25)" }}
            >
              {/* forma */}
              <FormInputs errors={error} />
              <p className="text-xs mx-auto mt-5 mb-5 text-center">
                By clicking Agree & Join, you agree to the LinkedIn{" "}
                <span style={{ color: "purple" }}>User Agreement</span>,{" "}
                <span style={{ color: "#0a66c2" }}>Privacy Policy</span>, and{" "}
                <span style={{ color: "#0a66c2" }}>Cookie Policy</span>.{" "}
              </p>
              {canSubmit ? (
                <button
                  onClick={signUp}
                  type="submit"
                  style={{ backgroundColor: "#0a66c2" }}
                  className="w-80 h-12 font-semibold text-white rounded-full"
                >
                  Agree & Join
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  type="button"
                  style={{ backgroundColor: "#0a66c2" }}
                  className="w-80 h-12 font-semibold text-white rounded-full"
                >
                  Continue
                </button>
              )}
              <p className="mx-4 mb-0  mt-5 text-center font-semibold dark:text-white"></p>
              <div className="flex justify-center items-center">
                <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}>
                  <GoogleLogin
                    onSuccess={responseGoogle}
                    shape="circle"
                    width={300}
                  />
                </GoogleOAuthProvider>
              </div>
              <p className="mt-5 text-center">
                Already on LinkedIn?{" "}
                <span className="font-semibold" style={{ color: "#0a66c2" }}>
                  <Link to={"/Login"}>Sign in</Link>
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Register;

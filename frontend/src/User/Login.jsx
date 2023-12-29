import React, { useState } from 'react';
import {useNavigate} from "react-router-dom";
import {jwtDecode} from 'jwt-decode'
import logo from "../assets/LinkedIn-logo.png";
import { GoogleLogin,GoogleOAuthProvider } from '@react-oauth/google';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); 
  function responseGoogle(response){
    const decoded=jwtDecode(response.credential);
    console.log(decoded);
    const email = decoded.email;
    }
  const signIn = async (e) => {
    e.preventDefault();

    const validationErrors = {};
//validimet e mundshme

if (email.trim() === "") {
  validationErrors.email = "Email is required.";
}
else if (!email.includes("@") || !email.endsWith(".com")) {
  validationErrors.email = "Invalid email address.";
}


if (password.trim() === "") {
  validationErrors.password = "Password is required.";
}
if (password.length > 0 && password.length <6 ) {
  validationErrors.password = "Password must be 6 characters or more.";
}

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    navigate('/Register'); // nese gjithcka eshte ne rregull na dergon tek Register ne kete pjese vetem per testim 
    //pasi te shtojm pjesen e home dhe feed e dergojm userin aty
  
  }
  return (
    <div className='page  m-0 p-0  ' style={{height:'800px'}}> {/* div kryesor */}
      {/* Header Section */}
        <div  className="image ml-14 pt-2">
          <img className='logo' width={120} height={120} src={logo} alt={'clone'} />
        </div>


      <div className='form w-96 h-96 mt-6 mx-auto'  > {/* div per krejt formen */}

        <div className='credentials m-5'> {/* div per email passsword div */}


          <form className='bg-white w-96 h-200 rounded-lg p-5 pl-7' style={{boxShadow: '0 7px 30px -12px rgb(0 0 0 / 0.25)'}}   onSubmit={signIn}> {/* forma */}
          <span style={{fontSize:'2.2rem'}}className='font-semibold'>Sign in</span> <br></br>
          <p className='text-sm pt-2 pb-3'>Stay updated on your professional world</p>
           <input style={{ border: '1px solid black' }} className=' p-2  mt-2 w-80 rounded h-10' placeholder='Email or Phone' type="email"
            name="email"              
              value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
             <span className='text-red-500 text-xs italic'>{errors.email}</span> <br></br>
           <input style={{ border: '1px solid black' }} className=' p-2 mt-6 w-80 h-10 rounded' placeholder="Password"type="password" name="password"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
             />
             <span className='text-red-500 text-xs italic'>{errors.password}</span>
           <p style={{ color: '#0a66c2' }} className='mt-2 font-semibold'>Forgot Password?</p>
           <button style={{ backgroundColor: '#0a66c2' }} className='w-80 h-12 font-semibold text-white rounded-full mt-3'>Sign In</button> 
            <p className='text-center pt-2'>or</p>
            <p className='text-xs mx-auto mt-5 mb-5 text-center'>By clicking Agree & Join, you agree to the LinkedIn <span style={{ color: 'purple' }}>User Agreement</span>, <span style={{ color: '#0a66c2' }}>Privacy Policy</span>, and <span style={{ color: '#0a66c2' }}>Cookie Policy</span>. </p>
            <GoogleOAuthProvider clientId={process.env.REACT_APP_CLIENT_ID}> <GoogleLogin
  onSuccess={responseGoogle}
><button type="submit" style={{ backgroundColor: 'transparent',color:'black',border:'1px solid black' }} className='w-80 h-12 font-semibold text-white rounded-full mt-3 mb-3'>Sign In with Google</button></GoogleLogin></GoogleOAuthProvider>          </form>
          <p className='text-center mt-5'>
          New to LinkedIn? <span style={{color:'#0a66c2'}} className='font-semibold'>Join now</span>
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Login;

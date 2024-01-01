import React, { useState } from 'react';
import { useNavigate,Link} from "react-router-dom";
import logo from "../../assets/LinkedIn-logo.png";
import axios from 'axios';

const EnterCodeForgotPassword = () => {
  const navigate = useNavigate();

  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

   // // e gjenerojm nje otp code per verifikim (6-shifror) per siguri

   const resetPassword = async (e) => {
    e.preventDefault();



    const validationErrors = {};
 const id = 1; // duhet te ndryshohet ne fazen tjeter
 let hasErrors = false;

 if (password.length < 8) {
   validationErrors.password = 'Short Password';
   hasErrors = true;
 } else {
   validationErrors.password = '';
 }

 if (confirmPassword.length < 8) {
   validationErrors.confirmPassword = 'Short Password';
   hasErrors = true;
 } else {
   validationErrors.confirmPassword = '';
 }

 if (password !== confirmPassword) {
   validationErrors.confirmPassword = 'Passwords do not match.';
   hasErrors = true;
 } else {
   validationErrors.confirmPassword = '';
 }

 if (hasErrors) {
   setErrors(validationErrors);
   return;
 }
    const data = {
        password:password
    }
  try{
  await axios.patch(`/users/users/${id}`,data)
  navigate("/Login")
  }
  catch (error) {
    console.error(error);
    setErrors({ registrationError: "Failed to change password!" });
  }

}
 




  
  return (
    <div className='page h-96' style={{height:'800px'}}> {/* div kryesor */}
      {/* Header Section */}
     
        <div  className="image ml-24 flex " >
          <img className='logo' width={120} height={120} src={logo} alt={'clone'} />
          <button  className='font-semibold' style={{marginLeft:'830px',marginBottom:'15px',color:'grey'}}> <Link to={'/Login'}>Sign in</Link> </button>
          <button className='mb-7 pb-1 pl-4 pr-4 mt-3 ml-4 rounded-full  pt-1 pb-0 font-semibold' style={{color:'#0a66c2',border:'1px solid #0a66c2' ,borderTop:'1.8px solid #0a66c2',borderLeft:'1.8px solid #0a66c2',borderRight:'1.8px solid #0a66c2'}}> <span className='text-center'><Link to={'/Register'}>Join now</Link> </span></button>
        </div>
       


      <div className='form w-96 h-96 mt-6 mx-auto'  > {/* div per krejt formen */}

        <div className='credentials m-5'> {/* div per email passsword div */}


          <form className='bg-white w-96 h-200 rounded-lg p-5 pl-6' style={{boxShadow: '0 7px 30px -12px rgb(0 0 0 / 0.25)'}} onSubmit={resetPassword} > {/* forma */}
          <span style={{fontSize:'1.6rem'}} className='font-semibold mb-1'>Choose a new password</span> <br></br>
          <p className='mt-2  text-left' style={{fontSize:'14px'}}>To secure your account, choose a strong password you haven’t used before and is at least 8 characters long.</p>
          <p style={{fontSize:'13px',color:'#0a66c2'}}>What makes a strong passsword?</p>
          <input style={{ border: '1px solid black' }} className=' p-2 pl-3  mt-7 w-80 rounded h-12' placeholder='New Password' type="password"
            name="email"              
              value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
           <span className='text-red-500 text-xs italic'>{errors.password}</span>
              <input style={{ border: '1px solid black' }} className=' p-2 pl-3  mt-7 w-80 rounded h-12' placeholder='Retype new password' type="password"
            name="email"              
              value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <span className='text-red-500 text-xs italic'>{errors.confirmPassword}</span>
         <div class=" mt-3 flex items-center">
    <input style={{textDecoration:'none'}} id="link-checkbox" type="checkbox" value="" class=" mr-2 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label for="link-checkbox" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Require all devices to sign in with new password</label>
</div>
 {/*             <span className='text-red-500 text-xs italic'>{errors.passsword}</span> <br></br> */}
             


  <button style={{ backgroundColor: '#0a66c2' }} className='w-80 mt-8 h-12 font-semibold text-white rounded-full mt-3'>Submit</button> 
</form>
          
          
        </div>
      </div>
    </div>
  );
};

export default EnterCodeForgotPassword;

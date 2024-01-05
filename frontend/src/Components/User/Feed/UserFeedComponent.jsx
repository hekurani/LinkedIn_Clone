import React from 'react';
import profile from "../../../assets/profile.png";
import { Link } from 'react-router-dom';

const UserFeedComponent = () => {
  return (
    <div className='w-56  rounded-md ml-16 mt-6 relative' style={{height:'310px',border:'1px solid grey'}}>
        <div className=' h-36' style={{borderBottom:'1px solid grey'}}>
            <div className='Cover rounded-t-md h-14 ' style={{backgroundColor:'yellow',border:'1px solid grey'}}>
                <img className='absolute ml-20 mt-4  w-16 h-16'  src={profile} alt={'i'} />
               
            </div>
            <div>
               <Link to={'/profile'}><p className='text-center mt-7 font-semibold'>Welcome, Ferat!</p></Link> 
                <p className='text-sm text-center ' style={{color:'#0a66c2'}}>Add Photo</p>
            </div>
        </div>
        <div className='ProfileViews w-56 h-6 flex' >
<p className='ml-3 mt-3 text-xs text-gray-600 font-semibold'>Profile Viewers</p>
<p className='ml-24 mt-3 mr-5 text-end text-xs  font-semibold' style={{color:'#0a66c2'}}> 41</p>
        </div>
        <div className='Connections w-56 h-10 flex' style={{borderBottom:'0.5px solid grey'}} >
<p className='ml-3 mt-3 text-xs text-gray-600 font-semibold'>Connections</p>
<span style={{color:'transparent'}}> s </span>
<p className='ml-24 mt-3  mr-3 text-xs   font-semibold' style={{color:'#0a66c2'}}>535</p>
        </div>
        <div className='Premium w-56 h-11 mt-4' style={{borderBottom:'0.5px solid grey'}}>
<p className='text-xs text-center text-gray-600'>Accelerate your career with Premium</p>
<p className='text-xs ml-6 font-semibold'>Try for 0$</p>
        </div>
        <div>
<p className=' text-xs font-semibold ml-7 mt-3'> My Items</p>
        </div>

    </div>
  )
}

export default UserFeedComponent;

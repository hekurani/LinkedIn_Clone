import React from 'react'
import logo from "../assets/logoHeader.png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse,faUserPlus,faBriefcase,faCommentDots,faBell} from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import profile from "../assets/profile.png"
const HeaderComponent = () => {
  return (
    <div className='header h-16' style={{border:'1px solid blue'}}>
        <div className='logoAndSearch flex pt-3 pl-20'>
        <img   className='pt-1 pb-2' src={logo} width={30} height={20} alt={'nul'} />
        <input type="text"  style={{backgroundColor: '#e6f7ff'}}className=' bg-current ml-2 mt-1 border pl-2 w-52 h-8 rounded-sm' placeholder="Search"/>
        <div className='ml-28' style={{borderRight:'1px solid black'}}>
        <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
            <FontAwesomeIcon className='ml-3 block' icon={faHouse} />
            <span className='text-sm'>Home</span>
          </Link>
          <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
            <FontAwesomeIcon className='ml-9 block' icon={faUserPlus} />
            <span className='text-sm'>My Network</span>
          </Link>
          <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
            <FontAwesomeIcon className='ml-1.5 block' icon={faBriefcase} />
            <span className='text-sm'>Jobs</span>
          </Link>
          <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
            <FontAwesomeIcon className='ml-7 block' icon={faCommentDots} />
            <span className='text-sm'>Messaging</span>
          </Link>
          <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
            <FontAwesomeIcon className='ml-8 block' icon={faBell} />
            <span className='text-sm'>Notifications</span>
          </Link>
          <Link style={{ display: 'inline-block', textAlign: 'center', marginRight: '30px' }}>
      <img className='ml-3' src={profile}  width={20} height={18} alt={'profile'} />
            <span className='text-sm ml-3'>Me</span>
          </Link>

        </div>
        <div className='forBussinessAndPremium flex justify-center items-center'>
        <p className='ml-4'>For Business</p>
        <p className='ml-7 text-center'>Try Premium for free</p>
        </div>
     
        </div>

   
   
    </div>

  )
}

export default HeaderComponent
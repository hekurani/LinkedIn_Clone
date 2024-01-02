import React from 'react';
import profile from "../../assets/profile.png";
import background from "../../assets/background.jpg";
import { faCalendarDays,faNewspaper} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AddPostComponent = () => {
  return (
    <div className='main ml-16 mr-auto  mt-6 rounded-md' style={{width:'555px',height:'116px',border:'1px solid black'}}>
        <div className='Image_andImput flex'>
            <img  className='ml-3 mt-3 w-12 h-12 mb-2' src={profile} alt={'p'} />
            <button type="submit" style={{ backgroundColor: 'transparent',border:'1px solid black',width:'467px',textAlign:"left",color:'grey' }}   className=' text-sm h-12 font-semibold text-white rounded-full ml-2 mt-3  pl-4'>Start a post</button> 
        </div>
        <div className='h-10 flex justify-around'>
            <button className='w-20 flex mt-2'> <span> <img  className='mt-1' width={18} height={10}src={background} alt={'ai'} /></span> <span className='ml-2'>Media</span></button>
            <button className='w-20 ml-6'>  <FontAwesomeIcon icon={faCalendarDays} width={20} height={10} /> Event</button>
            <button className='w-20 ml-6'> <FontAwesomeIcon icon={faNewspaper} style={{color: "#000000"}} /> Article</button>
           
        </div>
    </div>
  )
}

export default AddPostComponent
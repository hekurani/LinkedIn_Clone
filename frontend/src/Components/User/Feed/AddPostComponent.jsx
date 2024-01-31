import React, { useState }from 'react';
import profile from "../../../assets/profile.png";
import background from "../../../assets/background.jpg";
import { faCalendarDays,faImage,faNewspaper} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import AddPostModal from './Modals/AddPostModal';

const AddPostComponent = ({user}) => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className='main ml-16 mr-auto  mt-6 rounded-md' style={{width:'555px',height:'116px',border:'1px solid black'}}>
        <div className='Image_andImput flex'>
            <img  className='ml-3 mt-3 w-12 h-12 mb-2' style={{borderRadius:'50%',objectFit:'cover'}}src={user.imageProfile} alt={'p'} />
            <button type="submit" style={{ backgroundColor: 'transparent',border:'1px solid black',width:'467px',textAlign:"left",color:'grey' }}  onClick={openModal} className=' text-sm h-12 font-semibold text-white rounded-full ml-2 mt-3  pl-4'>Start a post</button> 
        </div>
        <div className='h-10 flex justify-around'>
        <button className='w-20 ml-6 text-sm font-semibold text-black-50' style={{color:'grey'}}>  <FontAwesomeIcon icon={faImage}style={{color:'#0080ff'}}  height={10} /> Media</button>
            <button className='w-20 ml-6 text-sm font-semibold' style={{color:'grey'}}>  <FontAwesomeIcon icon={faCalendarDays}style={{color:'#cc7a00'}} width={20} height={10} /> Event</button>
            <button className='w-20 ml-6  text-sm font-semibold' style={{color:'grey'}}> <FontAwesomeIcon icon={faNewspaper} style={{color: "#cc3300"}} /> Article</button>
           
        </div>
        {isModalOpen && <AddPostModal user={user} closeModal={closeModal} />}
    </div>
  )
}

export default AddPostComponent
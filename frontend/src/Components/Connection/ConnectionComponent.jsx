import React from 'react'
import profile from '../../assets/profile.png'

const ConnectionComponent = () => {
  return (
    <div style={{border:'1px solid blue',width:'800px'}} className='m-12 ml-32 h-auto'>
        <div className="header nr-connections">
          <p className='text-2xl m-5'>706 Connections</p>  
        </div>
        <div className="searchAndFilter flex m-3">
        <div className="search flex">
         <p className='mr-2'>Sort by:</p> {' '} <p className='font-semibold text-stone-500'>Fist Name</p>
        </div>
        <div className="searchbar ml-auto mr-5 ">
     <input type="text" className=' p-1 pl-2 w-64 h-8' placeholder='Search by name' />
        </div>
        </div>

         <div className="connections">
        <img  className='w-20 h-20'src={profile} alt="" />
         </div>
    </div>
  )
}

export default ConnectionComponent
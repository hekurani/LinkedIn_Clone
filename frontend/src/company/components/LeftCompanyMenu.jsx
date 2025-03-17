import React from 'react'
import cover from '../../assets/cover.jpg'
import profile from '../../assets/profile.png'

const LeftCompanyMenu = () => {
  return (
    <div className="m-5 w-[224px] rounded-lg relative">
      <img 
        src={cover} 
        className="w-full h-[50px] rounded-lg object-cover" 
        alt="Cover" 
      />

      <img 
        src={profile} 
        width={50} 
        height={50} 
        className="absolute rounded-full" 
        alt="Profile"
      />
    </div>
  )
}

export default LeftCompanyMenu

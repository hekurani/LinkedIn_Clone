import React, { useState } from "react";

import LeftCompanyMenu from "./components/LeftCompanyMenu";
import CreateJobPost from "./components/CreateJobPost";

const CompanyDashboard = ({

}) => {
  const [showModal, setShowModal] = useState({data: {}, open: false});

  const handleChange = (e) => {
    console.log(e);
    const name = e.target.name;
    const value = e.target.value;
    setShowModal({...showModal, data: {...showModal.data, [name]: value}});
  }

  const handleOpenModal = () => {
    setShowModal({...showModal, open: true});
  }

  const handleCloseModal = () => {
    setShowModal({...showModal, data: {}, open: false});
  }

  return (
    <div className="flex items-start bg-[#f4f2ee] justify-start h-screen">
      <LeftCompanyMenu />
      <CreateJobPost showModal={showModal} handleChange={handleChange} handleOpenModal={handleOpenModal} handleCloseModal={handleCloseModal} />
    </div>
  )
}

export default CompanyDashboard;

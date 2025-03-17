import React, { useState } from "react";
import Modal from "react-modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import getMe from "../../../../utilities/user/getMe";
import axiosInstance from "../../../../axios/axios.tsx";

Modal.setAppElement("#root");

const PreviewPostImage = ({
  isOpen = false,
  image = null,
  closeModal = () => {}
}) => {

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Upload Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div
        className="fixed inset-0 flex items-center justify-center rounded-lg"
        style={{ zIndex: 50 }}
      >
        <div
          className="bg-white p-4 rounded shadow-2xl"
          style={{ width: "700px", height: "70vh" , backgroundColor:"black"}}
        >
          <div className="flex m-7">
            <FontAwesomeIcon
              color="white"
              className="ml-auto text-2xl"
              icon={faXmark}
              onClick={closeModal}
            />
          </div>

          <div className="text-center">

            <img
              className="mx-auto mt-5 mb-5 max-h-56"
              src={`Images/postImages/${image}`}
              alt="social"
            />
          </div>
    
        </div>
      </div>
    </Modal>
  );
};

export default PreviewPostImage;

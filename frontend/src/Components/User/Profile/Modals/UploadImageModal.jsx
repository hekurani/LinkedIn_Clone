import React, { useState } from 'react';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import CameraModal from './CameraModal';

Modal.setAppElement('#root');

const UploadImageModal = ({ isOpen, onRequestClose }) => {
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const openCameraModal = () => {
    setCameraModalOpen(true);
  };

  const closeCameraModal = () => {
    setCameraModalOpen(false);
  };

  const handleFileUpload = async (file) => {
    try {
      console.log(file)
      const formData = new FormData();
      formData.append('image', file);

      // Upload  file ne  backend
      await axios.patch('http://localhost:4000/users/users/1', formData);

      onRequestClose();
      setTimeout(()=> {
        window.location.reload();
      },1000)

      setCapturedImage(null); // fshijm  captured image
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  const handleCameraCapture = (image) => {
  
    setCapturedImage(image);
  };

  const handleClose = () => {
    closeCameraModal();
    onRequestClose();

  
    if (capturedImage) {
      handleFileUpload(capturedImage);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleClose}
      contentLabel="Upload Image Modal"
      className="modal"
      overlayClassName="overlay"
    >
      <div className="fixed inset-0 flex items-center justify-center rounded-lg" style={{ zIndex: 50 }}>
        {isCameraModalOpen && (
          <CameraModal
            isOpen={isCameraModalOpen}
            onRequestClose={closeCameraModal}
            onCapture={setCapturedImage}
            onImageCapture={handleCameraCapture}
          />
        )}

        <div className="bg-white p-4 rounded shadow-2xl" style={{ width: '700px', height: '90vh' }}>
          <div className='flex m-7'>
            <h2 className="text-xl font-semibold mb-4">Add Photo</h2>
            <FontAwesomeIcon className='ml-auto text-2xl' icon={faXmark} onClick={onRequestClose} />
          </div>

          <div className='text-center'>
            <p className='font-semibold text-2xl'>No professional headshot needed!</p>
            <p className='font-semibold text-2xl '> Just something that represents you.</p>
            <img className='mx-auto mt-5 mb-5' src="https://static.licdn.com/aero-v1/sc/h/c5ybm82ti04zuasz2a0ubx7bu" alt="social" />
            <p className='text-sm font-medium mx-auto' style={{ color: 'grey', width: '500px' }}>
              On LinkedIn, we require members to use their real identities, so take or upload a photo of yourself. Then crop, filter, and adjust it to perfection
            </p>
          </div>

          <div className='flex mt-11'>
            <p className='m-5 font-semibold' style={{ color: '#0a66c2' }}>Frames</p>

            <div className='ml-auto flex'>
              <button
                className='rounded-full pt-1 pb-1 pl-3 pr-3 h-9 m-2 font-semibold'
                onClick={openCameraModal}
              >
                Use camera
              </button>
              <label htmlFor="file-upload" className="cursor-pointer">
                <p
                  className='rounded-full pl-3 pr-3 h-9 text-white m-2 font-semibold pt-1.5'
                  style={{ backgroundColor: '#0a66c2' }}
                >
                  Upload a photo
                </p>
                <input
                  type="file"
                  id="file-upload"
                  style={{ display: 'none' }}
                  onChange={(e) => handleFileUpload(e.target.files[0])}
                />
              </label>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default UploadImageModal;

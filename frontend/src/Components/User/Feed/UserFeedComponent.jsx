import React, { useState } from "react";
import UploadImageModal from "../Profile/Modals/UploadImageModal";
import defaultProfile from "../../../assets/profile.png";
import { useNavigate } from "react-router-dom";

const UserFeedComponent = ({
  user,
  setUser = () => { },
  setAllPosts = () => { },
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  return (
    <div
      className={`w-56 rounded-md ml-16 mt-6 relative transition-all duration-500 `}
      style={{ height: "310px", border: "1px solid #D3D3D3", background: 'white' }}
    >
      <div className="h-36" style={{ borderBottom: "1px solid #D3D3D3", background: 'white' }}>
        <div
          className="Cover rounded-t-md h-14"
          style={{ backgroundColor: "yellow", border: "1px solid #D3D3D3" }}
        >
          {user && (
            <img
              className="absolute ml-20 mt-4 w-16 h-16"
              style={{
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid white",
              }}
              src={user.imageProfile ? user.imageProfile : defaultProfile}
              alt={"Profile"}
            />
          )}
        </div>
        <div className="flex flex-col items-center">
          <p className="text-center mt-7 cursor-pointer font-semibold" onClick={() => navigate(`${user.id}/profile`)}>
            Welcome,{user.name}!
          </p>
          <button
            className="text-sm mx-auto mt-2"
            style={{ color: "#0a66c2" }}
            onClick={openModal}
          >
            Add Photo
          </button>
        </div>
      </div>
      <div className="ProfileViews  h-6 flex bg-white">
        <p className="ml-3 mt-3 text-xs text-gray-600 font-semibold">
          Profile Viewers
        </p>
        <p
          className="ml-24 mt-3 mr-5 text-end text-xs font-semibold"
          style={{ color: "#0a66c2" }}
        >
          41
        </p>
      </div>
      <div
        className="Connections h-10 flex"
        style={{ borderBottom: "0.5px solid #D3D3D3", background: 'white' }}
      >
        <p className="ml-3 mt-3 text-xs text-gray-600 font-semibold">
          Connections
        </p>
        <span style={{ color: "transparent" }}> s </span>
        <p
          className="ml-24 mt-3 mr-3 text-xs font-semibold"
          style={{ color: "#0a66c2", background: 'white' }}
        >
          535
        </p>
      </div>
      <div
        className="Premium  h-16 pt-3"
        style={{ borderBottom: "0.5px solid #D3D3D3", background: 'white' }}
      >
        <p className="text-xs text-center text-gray-600">
          Accelerate your career with Premium
        </p>
        <p className="text-left ml-4 text-xs font-semibold pt-2">Try for 0$</p>
      </div>
      <div>
        <p className="text-xs font-semibold ml-4 mt-2"> My Items</p>
      </div>

      {isModalOpen && (
        <UploadImageModal
          user={user}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          setUser={setUser}
          setAllPosts={setAllPosts}
        />
      )}
    </div>
  );
};

export default UserFeedComponent;

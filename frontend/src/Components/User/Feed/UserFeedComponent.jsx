import React, { useState } from "react";
import { Link } from "react-router-dom";
import UploadImageModal from "../Profile/Modals/UploadImageModal";
import defaultProfile from "../../../assets/profile.png";
const UserFeedComponent = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div
      className="w-56 rounded-md ml-16 mt-6 relative"
      style={{ height: "310px", border: "1px solid grey" }}
    >
      <div className="h-36" style={{ borderBottom: "1px solid grey" }}>
        <div
          className="Cover rounded-t-md h-14"
          style={{ backgroundColor: "yellow", border: "1px solid grey" }}
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
          <Link to={`${user.id}/profile`}>
            <p className="text-center mt-7 font-semibold">
              Welcome,{user.name}!
            </p>
          </Link>
          <button
            className="text-sm mx-auto mt-2"
            style={{ color: "#0a66c2" }}
            onClick={openModal}
          >
            Add Photo
          </button>
        </div>
      </div>
      <div className="ProfileViews w-56 h-6 flex">
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
        className="Connections w-56 h-10 flex"
        style={{ borderBottom: "0.5px solid grey" }}
      >
        <p className="ml-3 mt-3 text-xs text-gray-600 font-semibold">
          Connections
        </p>
        <span style={{ color: "transparent" }}> s </span>
        <p
          className="ml-24 mt-3 mr-3 text-xs font-semibold"
          style={{ color: "#0a66c2" }}
        >
          535
        </p>
      </div>
      <div
        className="Premium w-56 h-11 mt-4"
        style={{ borderBottom: "0.5px solid grey" }}
      >
        <p className="text-xs text-center text-gray-600">
          Accelerate your career with Premium
        </p>
        <p className="text-xs ml-6 font-semibold">Try for 0$</p>
      </div>
      <div>
        <p className="text-xs font-semibold ml-7 mt-3"> My Items</p>
      </div>

      {isModalOpen && (
        <UploadImageModal
          user={user}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
        />
      )}
    </div>
  );
};

export default UserFeedComponent;

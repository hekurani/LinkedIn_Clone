import React, { useState } from "react";
// import UploadImageModal from "../Profile/Modals/UploadImageModal";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/default.png";

const LeftCompanyMenu = ({
  user,
  setUser = () => {},
  setAllPosts = () => {},
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const navigate = useNavigate();

  return (
    <div
      className={`w-56 rounded-md ml-16 mt-6 relative transition-all duration-500 `}
      style={{
        height: "150px",
        border: "1px solid #D3D3D3",
        background: "white",
      }}
    >
      <div
        className="h-36"
        style={{ borderBottom: "1px solid #D3D3D3", background: "white" }}
      >
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
          <p
            className="text-center mt-7 cursor-pointer font-semibold"
            onClick={() => navigate(`${user.id}/profile`)}
          >
            Welcome,{user?.name}!
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

      {/* {isModalOpen && (
        <UploadImageModal
          user={user}
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          capturedImage={capturedImage}
          setCapturedImage={setCapturedImage}
          setUser={setUser}
          setAllPosts={setAllPosts}
        />
      )} */}
    </div>
  );
};

export default LeftCompanyMenu;

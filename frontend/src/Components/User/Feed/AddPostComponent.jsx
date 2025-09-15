import {
  faCalendarDays,
  faImage,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import defaultProfile from "../../../assets/default.png";
import AddPostModal from "./Modals/AddPostModal";

const AddPostComponent = ({
  user,
  isUserFeedVisible,
  setAllPosts = () => {},
  setShowCommingSoonConfirm,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div
      className={
        isUserFeedVisible
          ? "relative !w-[650px]"
          : "relative !w-[!650px] max-w-[650px] mx-auto mt-[62px]"
      }
    >
      <div
        className="mt-6 rounded-md pr-3 pb-1 w-full  md:w-[525px] sm:w-[450px] ml-5"
        style={{ border: "1px solid #D3D3D3", background: "white" }}
      >
        <div className="Image_andImput flex">
          <img
            className="ml-3 mt-3 w-12 h-12 mb-2"
            style={{ borderRadius: "50%", objectFit: "cover" }}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultProfile;
            }}
            src={user.imageProfile ? user.imageProfile : defaultProfile}
            alt={"p"}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "transparent",
              border: "1px solid #D3D3D3",
              width: "467px",
              textAlign: "left",
              color: "grey",
            }}
            onClick={openModal}
            className=" text-sm h-12 font-semibold text-white rounded-full ml-2 mt-3  pl-4"
          >
            Start a post
          </button>
        </div>
        <div className="h-10 flex justify-around">
          <button
            className="w-20 ml-6 text-sm font-semibold text-black-50"
            onClick={() => setShowCommingSoonConfirm(true)}
            style={{ color: "grey" }}
          >
            {" "}
            <FontAwesomeIcon
              icon={faImage}
              style={{ color: "#0080ff" }}
              height={10}
            />{" "}
            Media
          </button>
          <button
            className="w-20 ml-6 text-sm font-semibold"
            style={{ color: "grey" }}
            onClick={() => setShowCommingSoonConfirm(true)}
          >
            {" "}
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "#cc7a00" }}
              width={20}
              height={10}
            />{" "}
            Event
          </button>
          <button
            className="w-20 ml-6  text-sm font-semibold"
            style={{ color: "grey" }}
            onClick={() => setShowCommingSoonConfirm(true)}
          >
            {" "}
            <FontAwesomeIcon
              icon={faNewspaper}
              style={{ color: "#cc3300" }}
            />{" "}
            Article
          </button>
        </div>
        {isModalOpen && (
          <AddPostModal
            user={user}
            closeModal={closeModal}
            setAllPosts={setAllPosts}
            setShowCommingSoonConfirm={setShowCommingSoonConfirm}
          />
        )}
      </div>
    </div>
  );
};

export default AddPostComponent;

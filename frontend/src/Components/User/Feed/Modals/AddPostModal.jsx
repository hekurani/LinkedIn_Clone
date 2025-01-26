import React, { useState } from "react";
import {
  faCalendarDays,
  faClock,
  faImage,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import axiosInstance from "../../../../axios/axios.tsx";
import defaultProfile from "../../../../assets/profile.png";

const AddPostModal = ({ user, closeModal, setAllPosts = () => {} }) => {
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);

  const getAllPosts = async () => {
    const { data } = await axiosInstance.get("/posts");
    setAllPosts(data?.posts);
  };

  const handleRemoveImage = (position) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== position)
    );
  };

  const handleImageChange = (files) => {
    setImages((prevImages) => [...prevImages, ...Array.from(files)]);
  };

  const handlePost = async () => {
    const formData = new FormData();
    formData.append("description", description);
    console.log(images);
    if (Array.isArray(images) && images.length) {
     images.forEach((image, index) => {
        formData.append("images", image);
      });
    }
    try {
      await axiosInstance.post("/posts", formData);
      closeModal();
      getAllPosts();
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ zIndex: 50 }}
    >
      <div
        className="w-96 h-96 rounded shadow-2xl"
        style={{ backgroundColor: "white", width: "700px", height: "90vh" }}
      >
        <div className="header m-7 flex">
          <img
            className="ml-1 w-14 h-14 mb-2"
            style={{ borderRadius: "50%", objectFit: "cover" }}
            src={user.imageProfile ? user.imageProfile : defaultProfile}
            alt={"p"}
          />
          <div className="ml-5">
            <p className="font-semibold text-lg">Ferat Gashi</p>
            <p className="text-sm">Post to anyone</p>
          </div>
          <button className="ml-auto text-2xl mb-5">
            <FontAwesomeIcon
              icon={faTimes}
              onClick={closeModal}
            ></FontAwesomeIcon>
          </button>
        </div>

        <div>
          {" "}
          {/* message */}
          <textarea
            className="w-full h-32 p-2 pl-3 break-all resize-none text-lg"
            value={description}
            type="text"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What do you want to talk about? "
            style={{ outline: "none" }}
          />
        </div>

        <div>
          {/* upload image /create event / occasion */}
          <label
            htmlFor="imageInput"
            className="ml-5 text-lg font-semibold text-black-50"
          >
            <FontAwesomeIcon
              icon={faImage}
              style={{ color: "grey" }}
              height={10}
            />
          </label>
          <input
            type="file"
            id="imageInput"
            accept="image/*"
            multiple
            onChange={(e) => handleImageChange(e.target.files)}
            style={{ display: "none" }}
          />
          <button className=" ml-7 text-lg font-semibold">
            {" "}
            <FontAwesomeIcon
              icon={faCalendarDays}
              style={{ color: "grey" }}
              width={20}
              height={10}
            />
          </button>
        </div>

        <div className="h-20" style={{ maxHeight: "130px" }}>
          {/*imageBeforeUpload  */}
          {images.map((val, input) => (
            <React.Fragment key={input}>
              <button
                className="rounded-full font-semibold text-white pl-4 pr-4 pb-1 mt-1  ml-3 mr-1"
                style={{ backgroundColor: "#0a66c2" }}
              >
                {val.name}

                <span
                  onClick={() => handleRemoveImage(input)}
                  style={{
                    paddingLeft: "1px",
                    color: "white",
                    fontSize: "13px",
                  }}
                >
                  {" "}
                  X
                </span>
              </button>
            </React.Fragment>
          ))}
        </div>

        <div
          className="flex justify-center items-center"
          style={{ float: "right" }}
        >
          {/* post button and schedule time */}
          <button className="text-2xl pt-1">
            <FontAwesomeIcon
              style={{ color: "grey" }}
              icon={faClock}
            ></FontAwesomeIcon>
          </button>
          <button
            className="rounded-full font-semibold text-white pl-4 pr-4 mt-1 pt-1 pb-1 ml-3 mr-3"
            onClick={handlePost}
            style={{
              backgroundColor: "#0a66c2",
              outline: "none" /* , float: 'right' */,
            }}
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddPostModal;

import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faSave } from "@fortawesome/free-solid-svg-icons"; // Import the save icon
import axios from "axios";

const CameraModal = ({ user, isOpen, onRequestClose }) => {
  const videoRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Error accessing the camera:", error);
      }
    };

    if (isOpen && !capturedImage) {
      initCamera();
    }
  }, [isOpen, capturedImage]);

  const stopCamera = () => {
    const video = videoRef.current;
    if (video && video.srcObject) {
      const tracks = video.srcObject.getTracks();
      tracks.forEach((track) => track.stop());
      video.srcObject = null;
    }
  };

  const capturePhoto = async () => {
    const video = videoRef.current;

    if (video) {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL("image/png");
      setCapturedImage(dataURL);
      stopCamera();
    }
  };

  const handleSave = async () => {
    if (capturedImage) {
      // Knvertimi the data URL to a Blob
      const blob = await fetch(capturedImage).then((res) => res.blob());

      //  FormData per me  append  image file
      const formData = new FormData();
      formData.append("image", blob, "captured-image.png");
      stopCamera();
      try {
        await axios.patch(`http://localhost:4000/users/users/${user.id}`, formData);

        onRequestClose();
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleClose = () => {
    stopCamera();
    onRequestClose();
  };

  return (
    <div>
      {isOpen && (
        <div
          className="fixed inset-0 flex items-center justify-center"
          style={{ zIndex: 50 }}
        >
          <div
            className="bg-white p-4 rounded shadow-lg"
            style={{ width: "700px", height: "100vh" }}
          >
            <div className="flex ">
              <h2 className="text-xl font-semibold mb-4">Take photo</h2>
              <FontAwesomeIcon
                className="ml-auto text-2xl"
                icon={faXmark}
                onClick={handleClose}
              />
            </div>

            {capturedImage ? (
              <div>
                <img
                  id="photo"
                  alt="Captured Photo"
                  src={capturedImage}
                  style={{ width: "100%" }}
                />
                <div className="flex">
                  <button
                    className="rounded-full pt-1 pb-1 pl-3 pr-3 h-9 m-2 font-semibold"
                    style={{ backgroundColor: "#0a66c2", color: "white" }}
                    onClick={handleSave}
                  >
                    Save
                    <FontAwesomeIcon className="ml-2" icon={faSave} />
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <video
                  id="video"
                  width="640"
                  height="480"
                  ref={videoRef}
                  autoPlay
                ></video>
                <div className="flex">
                  <p
                    className="rounded-full pt-1 pb-1 pl-3 pr-3 h-9 m-2 font-semibold"
                    style={{ cursor: "pointer" }}
                    onClick={handleClose}
                  >
                    Cancel
                  </p>
                  <button
                    className="rounded-full pt-1 pb-1 pl-3 pr-3 h-9 m-2 font-semibold ml-auto"
                    style={{ backgroundColor: "#0a66c2", color: "white" }}
                    id="captureButton"
                    onClick={capturePhoto}
                  >
                    Take photo
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CameraModal;

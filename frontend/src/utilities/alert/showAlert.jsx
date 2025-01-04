import React, { useState, useEffect } from "react";
import success from "./icons/success.png";
import danger from "./icons/danger.png";
const ShowAlert = ({ text, variant }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  const getBackgroundColor = () => {
    switch (variant) {
      case "danger":
        return "bg-red-500";
      case "success":
        return "bg-blue-500";
      default:
        return "bg-blue-500";
    }
  };

  return (
    <div
      className={`fixed top-5 right-5 p-4 rounded flex text-white text-lg w-96 shadow-lg z-50 ${getBackgroundColor()}`}
    >
      {variant === "success" && (
        <img
          style={{ borderRadius: "100%", width: "30px", height: "30px" }}
          src={success}
          alt=""
        />
      )}
      {variant === "danger" && (
        <img
          style={{ borderRadius: "100%", width: "30px", height: "30px" }}
          src={danger}
          alt=""
        />
      )}

      <p className="ml-3 font-semibold text-white">{text}</p>
    </div>
  );
};

export default ShowAlert;

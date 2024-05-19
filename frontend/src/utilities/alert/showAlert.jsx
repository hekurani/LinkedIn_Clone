import React, { useEffect } from "react";
import PropTypes from "prop-types";

const ShowAlert = ({ text, color, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const getBackgroundColor = () => {
    switch (color) {
      case "danger":
        return "bg-red-500";
      case "blue":
        return "bg-blue-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className={`fixed top-5 right-5 p-4 rounded text-white text-lg shadow-lg z-50 ${getBackgroundColor()}`}>
      {text}
    </div>
  );
};

ShowAlert.propTypes = {
  text: PropTypes.string.isRequired,
  color: PropTypes.oneOf(["danger", "blue"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ShowAlert;

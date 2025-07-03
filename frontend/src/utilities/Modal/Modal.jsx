import React from "react";

const Modal = ({ isOpen, variant, onClose, onSave, title, children, name = "Save"}) => {
  if (!isOpen) return null;
  const backgroundClass =
    variant === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
  return (
    <div className="fixed inset-0 flex items-center justify-end z-[9999]">
      <div className={`w-1/3 h-screen  flex flex-col ${backgroundClass}`}>
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">{title}</h2>
        </div>
        <div className="flex-1 p-4 overflow-auto">{children}</div>
        <div className="p-4 border-t border-gray-200 flex justify-between w-full gap-4">
          <button
            type="button"
            className="px-4 py-2 w-20 rounded"
            onClick={onClose}
            style={{ border: "1px solid gray" }}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-4 py-2 w-20 bg-blue-500 text-white rounded"
            style={{ backgroundColor: "#2196F3" }}
            onClick={onSave}
          >
            {name}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;

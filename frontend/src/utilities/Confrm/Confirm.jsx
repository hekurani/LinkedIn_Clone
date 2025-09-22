import React from "react";

const Confirm = ({ isOpen, title, variant, message, onSave, onCancel }) => {
  if (!isOpen) return null;

  const buttonVariant =
    variant === "danger"
      ? "bg-red-500 hover:bg-red-600"
      : "bg-blue-500 hover:bg-blue-600";

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative w-1/4 sm:w-2/3 md:w-1/3 lg:w-4/4 bg-white rounded-lg p-6 z-50">
        <h2 className="text-xl font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={onSave}
            className={`px-4 py-2 text-white rounded ${buttonVariant}`}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirm;

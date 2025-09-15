const CommingSoon = ({ isOpen = false, setIsOpen = () => {} }) => {
  if (!isOpen) return null;

  const handleClose = () => setIsOpen(false);

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: 9999 }}
      onClick={handleClose}
    >
      <div
        className="bg-white rounded-2xl shadow-lg p-6 max-w-sm w-full text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
        >
          X
        </button>

        <p className="text-lg font-semibold">Coming Soon 🚀</p>
        <p className="text-sm text-gray-600 mt-2">
          This feature will be available in the next update!
        </p>
      </div>
    </div>
  );
};

export default CommingSoon;

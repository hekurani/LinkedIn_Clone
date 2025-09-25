import { BiErrorCircle } from "react-icons/bi";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen px-6 text-center bg-gray-50">
      <BiErrorCircle className="text-red-500 text-7xl animate-bounce" />

      <h1 className="text-6xl font-extrabold text-gray-800 mt-4">404</h1>
      <p className="text-xl text-gray-600 mt-2">
        Oops! The page you’re looking for doesn’t exist.
      </p>

      <Link
        to="/"
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-[#0a66c2] text-white rounded-2xl shadow-md hover:bg-[#0a66c2]/80 transition duration-200"
      >
        <IoArrowBackSharp />
        Back to Feed
      </Link>
    </div>
  );
};

export default NotFound;

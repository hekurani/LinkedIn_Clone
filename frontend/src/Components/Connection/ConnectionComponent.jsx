import React from "react";
import profile from "../../assets/profile.png";

const ConnectionComponent = () => {
  return (
    <div
      style={{ border: "1px solid blue", width: "880px" }}
      className="m-12 ml-32 h-auto"
    >
      <div className="header nr-connections">
        <p className="text-2xl m-5">706 Connections</p>
      </div>
      <div className="searchAndFilter flex m-3">
        <div className="search flex">
          <p className="mr-2">Sort by:</p>{" "}
          <p className="font-semibold text-stone-500">Fist Name</p>
        </div>
        <div className="searchbar ml-auto mr-5 ">
          <input
            type="text"
            className=" p-1 pl-2 w-64 h-8"
            placeholder="Search by name"
          />
        </div>
      </div>

      <div className="connections flex mb-3">
        <div className="ml-3">
          <img className="w-20 h-20" src={profile} alt="" />
        </div>
        <div className="m-2">
          <p className=" font-semibold text-xl">Ferat Gashi</p>
          <p className="description font-lg">Student at UBT-University</p>
        </div>
        <div className="ml-auto mr-5 flex items-center ">
          <button className="text-blue-500 text-lg font-semibold">
            Message
          </button>

            <p className="w-5 ml-3 h-5 text-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" id="overflow-web-ios-medium" aria-hidden="true" role="none" data-supported-dps="24x24" fill="currentColor">
  <path d="M14 12a2 2 0 11-2-2 2 2 0 012 2zM4 10a2 2 0 102 2 2 2 0 00-2-2zm16 0a2 2 0 102 2 2 2 0 00-2-2z"></path>
</svg>
</p>
        </div>
      </div>
    </div>
  );
};

export default ConnectionComponent;

import React from "react";
import ConnectionComponent from "../Components/Connection/ConnectionComponent";
import Invitation from "../Components/Connection/Invitation";
const Connections = () => {
  return (
    <div className="w-full bg-[#f4f2ee] min-h-screen">
      <div className="pt-5">
        <Invitation />
      </div>

      <ConnectionComponent />
    </div>
  );
};

export default Connections;

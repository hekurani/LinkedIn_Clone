import React from "react";
import Modal from "../../../utilities/Modal/Modal";

const SkillsSection = () => {
  return (
    <div
      className="mx-auto mt-3 rounded-md bg-white"
      style={{ width: "804px", border: "1px solid #D3D3D3" }}
    >
      <div className="header flex justify-between m-5 ">
        <div className="sectionName ">
          <p>Skills</p>
        </div>

        <div className="options flex ml-auto">
          <p>
            <svg
              role="img"
              aria-hidden="false"
              aria-label="Add new education"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              data-test-icon="add-medium"
            >
              <use href="#add-medium" width="24" height="24"></use>
              <path d="M21 13h-8v8h-2v-8H3v-2h8V3h2v8h8z"></path>
            </svg>
          </p>
          <p className="ml-5">
            <svg
              role="img"
              aria-hidden="false"
              aria-label="View education detail screen"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              data-supported-dps="24x24"
              data-test-icon="edit-medium"
            >
              <use href="#edit-medium" width="24" height="24"></use>
              <path d="M21.13 2.86a3 3 0 00-4.17 0l-13 13L2 22l6.19-2L21.13 7a3 3 0 000-4.16zM6.77 18.57l-1.35-1.34L16.64 6 18 7.35z"></path>
            </svg>
          </p>
        </div>

        <div className="content"></div>
        <Modal></Modal>
      </div>
    </div>
  );
};

export default SkillsSection;

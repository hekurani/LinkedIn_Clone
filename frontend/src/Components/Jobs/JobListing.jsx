import React, { useState } from "react";
import "./style/JobListing.css";
import cover from "../../assets/cover.jpg";

const JobListing = () => {
  const [alert, setAlert] = useState(false);

  return (
    <div className="main">
      <div className="headerJobListing h-16 flex justify-between items-center">
        <div className="title and count ml-5">
          <p className="text-lg tittleLocation">title in Location</p>
          <p className="text-base">44 results</p>
        </div>
        <div className="alert flex mr-5">
          <div className="alerText mr-2">
            <p>{alert ? 'Alert on' : 'Set alert'}</p>
          </div>
          <div className="checkbox-wrapper-7" onClick={() => setAlert(true)}>
            <input className="tgl tgl-ios" id="cb2-7" type="checkbox" />
            <label className="tgl-btn" htmlFor="cb2-7" />
          </div>
        </div>
      </div>

      <div className="contents">
        {[...Array(10)].map((_, index) => (
          <div className="content flex" key={index}>
            <div className="img">
              <img src={cover} alt="" className="w-14 h-14 m-2" />
            </div>
            <div className="jobTitleCompany">
              <p className="tittle">Software Engineer</p>
              <p>Company</p>
              <p>Location</p>
            </div>
            <div className="close text-black ml-auto mt-2 p mr-5">X</div>
          </div>
        ))}
      </div>

    </div>
  );
};

export default JobListing;

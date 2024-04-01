import React from "react";

const JobDescription = () => {
  return (
    <div className="main">
      <div className="header m-5 h-[100px]" style={{ border: "1px solid blue" }}>
        <div className="tittle flex">
        <p className="text-2xl font-semibold">Java Software Engineer</p>
        <div className="ml-auto">
        <p className="w-[38px] h-[38px]">
<svg
            xmlns="http://www.w3.org/2000/svg"
            class="rtl-flip"
            id="share-linkedin-medium"
            aria-hidden="true"
            role="none"
            data-supported-dps="12x12"
            fill="currentColor"
          >
            <path d="M23 12l-4.61 7H16l4-6H8a3.92 3.92 0 00-4 3.84V17a4 4 0 00.19 1.24L5.12 21H3l-.73-2.22A6.4 6.4 0 012 16.94 6 6 0 018 11h12l-4-6h2.39z"></path>
          </svg>
</p>
        </div>

        </div>
    
        <div className="flex">
          <p className="companyName">Celonis </p>
          <span>&nbsp;</span>
          <p className="location"> Pristina, Kosovo</p>
          <span>&nbsp;</span>
          <p>3 weeks ago</p>
          <span>&nbsp;</span>
          <p>57 applicants</p>

         
        </div>
      </div>
    </div>
  );
};

export default JobDescription;

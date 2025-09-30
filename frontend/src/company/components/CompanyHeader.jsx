import { useEffect, useState } from "react";
import defaultImg from "../../assets/myriad.png";
import axiosInstance from "../../axios/axios.tsx";
import { getCompanyData } from "../../utilities/company/getCompanies";

const CompanyHeader = () => {
  const [company, setCompany] = useState({});

  useEffect(() => {
    const getCompany = async () => {
      const getCompanyy = await getCompanyData();
      setCompany(getCompanyy);
    };

    getCompany();
  }, []);

  const handleFileUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("logo", file);

      await axiosInstance.patch(`/company/${company?.id}`, formData);

      const updatedCompany = await getCompanyData();
      setCompany(updatedCompany);
    } catch (err) {
      console.error("Error uploading company logo:", err);
    }
  };

  return (
    <div className="h-98 w-full">
      <div className="flex items-center w-full">
        <label htmlFor="company-logo-upload" className="cursor-pointer">
          <img
            src={company?.logo || defaultImg}
            alt="logo"
            width={50}
            height={50}
            className="rounded-full mx-3 my-3"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = defaultImg;
            }}
          />
        </label>
        <input
          type="file"
          id="company-logo-upload"
          hidden
          onChange={(e) => handleFileUpload(e.target.files[0])}
        />

        <p className="font-bold">{company?.name}</p>
      </div>
    </div>
  );
};

export default CompanyHeader;

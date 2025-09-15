import React, { useEffect, useState } from "react";
import profile from "../../assets/default.png";
import axiosInstance from "../../axios/axios.tsx";
import Modal from "../../utilities/Modal/Modal";
import { getCompanies } from "../../utilities/company/getCompanies";
import updateCompany from "../../utilities/company/updateCompany";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState({ open: false, variant: "edit" });
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await getCompanies();
        setCompanies(res || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllCompanies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedCompany((prevCompany) => ({
      ...prevCompany,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e?.target?.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEditClick = (comp) => {
    console.log({ comp });
    setSelectedCompany(comp);
    setImagePreview(comp.logo || null);
    setSelectedImage(null);
    setShowModal({ open: true, variant: "edit" });
  };

  const handleSave = async () => {
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append("logo", selectedImage);

        // const imageResponse = await updatedCompany(
        //   `http://localhost:4000/company/${selectedCompany.id}`,
        //   formData
        // );
      }

      const result = await updateCompany(selectedCompany?.id, selectedCompany);

      setCompanies((prevCompanies) =>
        prevCompanies.map((comp) => (comp?.id === result?.id ? result : comp))
      );

      setShowModal({ open: false, variant: "edit" });
      setSelectedCompany(null);
      setSelectedImage(null);
      setImagePreview(null);
    } catch (error) {
      console.error("Error saving company:", error);
    }
  };

  const handleCloseModal = () => {
    setShowModal({ open: false, variant: "edit" });
    setSelectedCompany(null);
    setSelectedImage(null);
    setImagePreview(null);
  };

  return (
    <div className="bg-blue-900 flex-1 p-5">
      <div className="w-full flex items-center jsutify-end mb-5">
        <button
          className="rounded-full bg-white text-blue-900 p-1 px-3 w-32 ml-auto"
          onClick={() => setShowModal({ open: true, variant: "create" })}
        >
          New +
        </button>
      </div>

      <p className="text-white text-2xl font-bold">Companies</p>
      <div className="table w-full">
        <table className="min-w-full mt-3 leading-normal">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                #
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                First Name
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                Slug
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                Email
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                Logo
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {companies.length > 0 ? (
              companies.map((company, index) => (
                <tr
                  key={company?.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-white"
                  }
                >
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {index + 1}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company?.name}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company?.slug}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company?.email}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    <img
                      src={company?.logo || profile}
                      onError={(e) => {
                        e.currentTarget.onerror = null;
                        e.currentTarget.src = profile;
                      }}
                      width={40}
                      height={40}
                      alt=""
                      className="rounded-full"
                    />
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    <button
                      onClick={() => handleEditClick(company)}
                      className="w-12 h-8 bg-blue-600 font-semibold text-white rounded-full"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-gray-700 text-white">
                <td
                  colSpan="5"
                  className="px-3 py-2 border-b border-gray-600 text-sm"
                >
                  No companies found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {showModal?.open && (
        <Modal
          isOpen={showModal}
          onClose={handleCloseModal}
          onSave={handleSave}
          variant="dark"
          name={showModal?.variant === "edit" ? "Save" : "Add"}
          title={showModal?.variant === "edit" ? "Edit Company" : "Add Company"}
        >
          <div className="p-4">
            <div className="mb-6 text-center">
              <div className="mb-4">
                <img
                  src={imagePreview || selectedCompany?.imageProfile || profile}
                  alt="Company Logo"
                  className="w-24 h-24 rounded-full mx-auto border-2 border-gray-300"
                />
              </div>
              <label htmlFor="company-image-upload" className="cursor-pointer">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">
                  Upload Logo
                </span>
                <input
                  type="file"
                  id="company-image-upload"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleImageChange}
                />
              </label>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-white mb-1">Name:</p>
                <input
                  type="text"
                  name="name"
                  value={selectedCompany?.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 border text-black hover:border-blue-500 border-gray-300 rounded-md"
                />
              </div>
              <div>
                <p className="text-white mb-1">Slug:</p>
                <input
                  type="text"
                  name="slug"
                  value={selectedCompany?.slug || ""}
                  onChange={handleChange}
                  className="w-full p-2 text-black border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <p className="text-white mb-1">Email:</p>
                <input
                  type="email"
                  name="email"
                  value={selectedCompany?.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 border text-black border-gray-300 rounded-md"
                />
              </div>
              {showModal?.variant === "create" && (
                <div>
                  <p className="text-white mb-1">Password:</p>
                  <input
                    type="password"
                    name="password"
                    value={selectedCompany?.password || ""}
                    onChange={handleChange}
                    className="w-full p-2 text-black border border-gray-300 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Companies;

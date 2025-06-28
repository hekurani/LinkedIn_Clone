import React, { useEffect, useState } from "react";
import Modal from "../../utilities/Modal/Modal";
import updateUser from "../../utilities/user/updateUser";
import { getCompanies } from "../../utilities/company/getCompanies";

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);


  useEffect(() => {
    const fetchAllCompanies = async () => {
      try {
        const res = await getCompanies();
        console.log({res})
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

  const handleEditClick = (comp) => {
    setSelectedCompany(comp);
    setShowModal(true);
  };

  const handleSave = async () => {
    const updatedCompany = await updateUser(selectedCompany.id, selectedCompany);
    setCompanies((prevCompanies) =>
        prevCompanies.map((comp) => (comp?.id === updatedCompany?.id ? updatedCompany : comp))
    );
    setShowModal(false);
  };

  return (
    <div className=" flex-1 p-5">
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
                Last Name
              </th>
              <th className="px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold">
                Email
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
                  key={company.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-white"
                  }
                >
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company.name}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company.lastname}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {company.email}
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

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          variant="dark"
          title="Edit Company"
        >
          <div className="p-4 grid grid-cols-3">
            <div>
              <p>First Name:</p>
              <input
                type="text"
                name="name"
                value={selectedCompany?.name || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 border text-black hover:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p>Last Name:</p>
              <input
                type="text"
                name="lastname"
                value={selectedCompany?.lastname || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 text-black border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={selectedCompany?.email || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-40 h-8 border text-black border-gray-300 rounded-md"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Companies;

import React, { useEffect, useRef, useState } from "react";
import AsyncSelect from "react-select/async";
import Modal from "../../utilities/Modal/Modal";
import Pagination from "../../utilities/pagination/Pagination";
import createUser from "../../utilities/user/createUser";
import getAllUsers from "../../utilities/user/getAllUsers";
import updateUser from "../../utilities/user/updateUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalUsers, setTotalUsers] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const selectRef = useRef();

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers({ page, limit, search: searchTerm });
        setUsers(res?.users || []);
        setTotalUsers(res?.totalCount || 0);
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllUsers();
  }, [page, limit, searchTerm]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user || {});
    setShowModal(true);
  };

  const handleSave = async () => {
    if (selectedUser?.id) {
      // Update existing user
      const updatedUser = await updateUser(selectedUser.id, selectedUser);
      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === updatedUser.id ? updatedUser : user
        )
      );
    } else {
      // Add new user
      const newUser = await createUser(selectedUser);
      setUsers((prevUsers) => [...prevUsers, newUser]);
      setTotalUsers((prev) => prev + 1);
    }
    setShowModal(false);
  };

  const handleSearchChange = (e) => {
    const inputValue = e.target.value;
    setSearchTerm(inputValue);
    setPage(1); // Reset to first page when searching
  };

  return (
    <div className="bg-blue-900 flex-1 p-5">
      <div className="flex justify-between">
        <p className="text-white text-2xl font-bold">Users</p>
        <div className="search mr-5">
          <input
            ref={selectRef}
            onChange={handleSearchChange}
            placeholder="Search for users..."
            className="bg-[$f4f2ee] rounded-md h-[2rem] w-52 px-3"
          />
        </div>
        <button
          className="text-white text-xl font-bold bg-blue-700 rounded-full px-5"
          onClick={() => handleEditClick()}
        >
          Add User +
        </button>
      </div>

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
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-700 text-white"
                      : "bg-gray-600 text-white"
                  }
                >
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {index + 1 + (page - 1) * limit}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {user.name}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {user.lastname}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    {user.email}
                  </td>
                  <td className="px-3 py-2 border-b border-gray-600 text-sm">
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleEditClick(user)}
                        className="w-12 h-8 bg-blue-600 font-semibold text-white rounded-full"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleEditClick(user)}
                        className="w-16 h-8 bg-danger-600 font-semibold text-white rounded-full"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="bg-gray-700 text-white">
                <td
                  colSpan="5"
                  className="px-3 py-2 border-b border-gray-600 text-sm"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>

        <div className="flex justify-between mt-4">
          <p className="text-white">
            {totalUsers > 0 && (
              <p className="font-light text-white">
                Showing {(page - 1) * limit > 0 ? (page - 1) * limit : 1} -{" "}
                {totalUsers > page * limit ? page * limit : totalUsers} out of{" "}
                {totalUsers}
              </p>
            )}
          </p>
          <div className="flex justify-center items-center">
            <Pagination
              containerClassName="flex"
              onPageChange={({ selected }) => setPage(selected + 1)}
              perPage={limit}
              totalItems={totalUsers}
              page={page}
            />
          </div>
        </div>
      </div>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSave}
          variant="dark"
          title={selectedUser?.id ? "Edit User" : "Add User"}
        >
          <div className="p-4 grid grid-cols-3">
            <div>
              <p>First Name:</p>
              <input
                type="text"
                name="name"
                value={selectedUser?.name || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 border text-black hover:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p>Last Name:</p>
              <input
                type="text"
                name="lastname"
                value={selectedUser?.lastname || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 text-black border border-gray-300 rounded-md"
              />
            </div>
            <div>
              <p>Email:</p>
              <input
                type="email"
                name="email"
                value={selectedUser?.email || ""}
                onChange={handleChange}
                className="mt-1 p-2 w-40 h-8 border text-black border-gray-300 rounded-md"
              />
            </div>

            {!selectedUser?.id && (
              <div>
                <p>Password:</p>
                <input
                  type="password"
                  name="password"
                  value={selectedUser?.password || ""}
                  onChange={handleChange}
                  className="mt-1 p-2 w-40 h-8 border text-black border-gray-300 rounded-md"
                />
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;

import React, { useEffect, useState } from 'react';
import getAllUsers from '../../utilities/user/getAllUsers';
import Modal from '../../utilities/Modal/Modal';
import updateUser from '../../utilities/user/updateUser';
const Users = () => {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await getAllUsers();
        setUsers(res);
        console.log(res); // Updated to log the response instead of the state
      } catch (err) {
        console.error(err);
      }
    };

    fetchAllUsers();
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };
  const handleEditClick = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleSave = async () => {
   const updatedUser = await updateUser(selectedUser.id,selectedUser);
   const userIndex = users.findIndex(user => user.id === updatedUser.id);
   const newUsers = [...users];
   newUsers[userIndex] = updatedUser;
   setUsers(newUsers);
    setShowModal(false);
  };

  return (
    <div className='bg-blue-900 flex-1 p-5'>
      <p className='text-white text-2xl font-bold'>Users</p>

      <table className='min-w-full mt-3 leading-normal'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              #
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              First Name
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              Last Name
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              Email
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={user.id} className={index % 2 === 0 ? 'bg-gray-700 text-white' : 'bg-gray-600 text-white'}>
                <td className='px-3 py-2 border-b border-gray-600 text-sm'>{index + 1}</td>
                <td className='px-3 py-2 border-b border-gray-600 text-sm'>{user.name}</td>
                <td className='px-3 py-2 border-b border-gray-600 text-sm'>{user.lastname}</td>
                <td className='px-3 py-2 border-b border-gray-600 text-sm'>{user.email}</td>
                <td className='px-3 py-2 border-b border-gray-600 text-sm'>
                  <button onClick={() => handleEditClick(user)} className='w-12 h-8 bg-blue-600 font-semibold text-white rounded-full'>Edit</button>
                </td>
              </tr>
            ))
          ) : (
            <tr className='bg-gray-700 text-white'>
              <td colSpan="4" className='px-3 py-2 border-b border-gray-600 text-sm'>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModal && (
        <Modal isOpen={showModal} onClose={() => setShowModal(false)} onSave={handleSave} variant="dark" title="Edit Users">
          <div className="p-4 grid  grid-cols-3">
            <div>
            <p>First Name:</p> 
              <input
                type="text"
                name="name"
                value={selectedUser?.name}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 border text-black hover:border-blue-500 border-gray-300 rounded-md"
              />
            </div>
            <div>
            <p>Last Name:</p>
              <input
                type="text"
                name="lastname"
                value={selectedUser?.lastname}
                onChange={handleChange}
                className="mt-1 p-2 w-32 h-8 text-black border border-gray-300 rounded-md"
              />
            </div>
            <div>
            <p>Email:</p> 
              <input
                type="email"
                name="email"
                value={selectedUser?.email}
                onChange={handleChange}
                className="mt-1 p-2  w-40 h-8 border text-black border-gray-300 rounded-md"
              />
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Users;

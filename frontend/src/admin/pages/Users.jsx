import React, { useEffect, useState } from 'react';
import getAllUsers from '../../utilities/user/getAllUsers';

const Users = () => {
  const [users, setUsers] = useState([]);

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

  return (
    <div className='bg-blue-900 flex-1 p-5'>
      <p className='text-white text-2xl font-bold'>Users</p>

      <table className='min-w-full leading-normal'>
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
              </tr>
            ))
          ) : (
            <tr className='bg-gray-700 text-white'>
              <td colSpan="4" className='px-3 py-2 border-b border-gray-600 text-sm'>No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

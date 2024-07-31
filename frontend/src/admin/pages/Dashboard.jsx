import React from 'react'

const Dashboard = () => {
  return (
    <div className='bg-blue-900 flex-1 p-5'>
      <p className='text-white text-2xl font-bold'>Dashboard</p>

      <table className='min-w-full leading-normal'>
        <thead>
          <tr className='bg-gray-800 text-white'>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              #
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              First
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              Last
            </th>
            <th className='px-3 py-2 border-b-2 border-gray-700 text-left text-sm uppercase font-semibold'>
              Handle
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className='bg-gray-700 text-white'>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>1</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>Mark</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>Otto</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>@mdo</td>
          </tr>
          <tr className='bg-gray-600 text-white'>
            <td className='px-3 py-2 border-b border-gray-500 text-sm'>2</td>
            <td className='px-3 py-2 border-b border-gray-500 text-sm'>Jacob</td>
            <td className='px-3 py-2 border-b border-gray-500 text-sm'>Thornton</td>
            <td className='px-3 py-2 border-b border-gray-500 text-sm'>@fat</td>
          </tr>
          <tr className='bg-gray-700 text-white'>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>3</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>Larry</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>the Bird</td>
            <td className='px-3 py-2 border-b border-gray-600 text-sm'>@twitter</td>
          </tr>
        </tbody>
      </table>

    </div>
  )
}

export default Dashboard
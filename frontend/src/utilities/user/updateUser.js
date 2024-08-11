import axiosInstance from "../../axios/axios.tsx";
const updateUser = async (id,updatedFields) => {
  try {
    const { data } = await axiosInstance.patch(`/users/users/${id}`, updatedFields);
    return data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
  
};
export default updateUser;

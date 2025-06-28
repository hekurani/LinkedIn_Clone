import axiosInstance from "../../axios/axios.tsx";
const updateCompany = async (id,updatedFields) => {
  try {
    const { data } = await axiosInstance.patch(`company/${id}`, updatedFields);
    return data;
  } catch (error) {
    console.error('Error updating company:', error);
    throw error;
  }
  
};
export default updateCompany;

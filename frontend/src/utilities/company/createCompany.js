import axiosInstance from "../../axios/axios.tsx";

const createCompany = async (updatedFields) => {
  try {
    const { data } = await axiosInstance.post(`company`, updatedFields);
    return data;
  } catch (error) {
    console.error("Error creating company:", error);
    throw error;
  }
};
export default createCompany;

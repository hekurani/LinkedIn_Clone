import axiosInstance from "../../axios/axios.tsx";

const createUser = async (userData) => {
  try {
    const { data } = await axiosInstance.post(`/users/users`, userData);
    return data;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;

import axiosInstance from "../../axios/axios.tsx";

export const getCompanies = async () => {
    const { data } = await axiosInstance.get(`company`);
    return data;
  };
import axiosInstance from "../../axios/axios.tsx";

export const getAllProfessions = async () => {
  const { data } = await axiosInstance.get(`professions`);
  return data;
};

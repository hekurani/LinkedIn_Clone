import axiosInstance from "../../axios/axios.tsx";

export const getCitites = async () => {
  const { data } = await axiosInstance.get(`/location/city`);
  return data;
};

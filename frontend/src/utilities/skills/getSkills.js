import axiosInstance from "../../axios/axios.tsx";

export const getSkills = async () => {
  const { data } = await axiosInstance.get(`/skills`);
  return data;
};

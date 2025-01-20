import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken";

const getAllJobs = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`job-post`);
  return data;
};
export default getAllJobs;

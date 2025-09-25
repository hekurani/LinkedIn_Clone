import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken.js";

const getApplicationsJobseeker = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`job-application/user`);
  return data;
};
export default getApplicationsJobseeker;

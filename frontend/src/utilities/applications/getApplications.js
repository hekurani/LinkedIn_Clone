import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken";

const getApplications = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`job-application/user`);
  return data;
};
export default getApplications;

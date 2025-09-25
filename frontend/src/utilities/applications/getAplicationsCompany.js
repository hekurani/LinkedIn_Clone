import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken.js";

const getApplicationsCompany = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`job-application/company`);
  return data;
};
export default getApplicationsCompany;

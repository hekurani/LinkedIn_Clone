import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken.js";

export const getCompanies = async () => {
  const { data } = await axiosInstance.get(`company`);
  return data;
};

export const getCompanyData = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`company/getById`);
  return data;
};

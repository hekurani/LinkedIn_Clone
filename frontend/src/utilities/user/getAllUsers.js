import axiosInstance from "../../axios/axios.tsx";
import { buildQueryString } from "../queries/buildQueryString.js";
const getAllUsers = async (pagination = { page: 1, limit: 10 }) => {
  const queryParams = { ...pagination };
  const queryString = buildQueryString(queryParams);
  const url = `/users${queryString}`;
  try {
    const { data } = await axiosInstance.get(url);
    return data;
  } catch (err) {
    console.log(err);
  }
};
export default getAllUsers;

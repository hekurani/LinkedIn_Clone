import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken";
const token = getToken();
const getMe = async () => {
  const { data } = await axiosInstance(`users/users/${token.userId}`);
  return data;
};
export default getMe;

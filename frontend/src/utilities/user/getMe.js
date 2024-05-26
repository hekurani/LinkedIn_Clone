import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken";

const getMe = async () => {
  const token = getToken();
  const { data } = await axiosInstance(`users/users/${token.userId}`);
  return data;
};
export default getMe;

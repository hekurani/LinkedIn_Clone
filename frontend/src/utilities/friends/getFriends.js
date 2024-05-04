import axiosInstance from "../../axios/axios.tsx";
const getFriends = async () => {
  const { data } = await axiosInstance(`friends`);
  return data;
};
export default getFriends;

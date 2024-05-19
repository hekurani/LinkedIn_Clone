import axiosInstance from "../../axios/axios.tsx";
const getUser = async (id) => {
  if (id) {
    const { data } = await axiosInstance(`users/users/${id}`);
    console.log("Data:", data);
    return data;
  }
};
export default getUser;

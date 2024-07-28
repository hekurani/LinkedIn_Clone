import axiosInstance from "../../axios/axios.tsx";
const getAllUsers = async () => {
    const {data} = await axiosInstance.get(`users`);
    return data;
};
export default getAllUsers;

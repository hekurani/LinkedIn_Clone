import axiosInstance from "../../axios/axios.tsx";
const sendMessage = async (userId,chatId,message) => {
    const { data } = await axiosInstance.post('message/sendMessage', {
        userId,chatId,message
    });
    return data;
};
export default sendMessage;

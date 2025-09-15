import axiosInstance from "../../axios/axios.tsx";
const sendMessage = async (userId, user2Id, chatId, message) => {
  const { data } = await axiosInstance.post("message/sendMessage", {
    userId,
    user2Id,
    chatId,
    message,
  });
  return data;
};
export default sendMessage;

import axiosInstance from "../../axios/axios.tsx";
const createChat = async (loggedUserId, targetId) => {
  const { data } = await axiosInstance(`chatroom/createChat`, {
    userOneId: loggedUserId,
    userTwoId: targetId,
  });
  return data;
};
export { createChat };
import axiosInstance from "../../axios/axios.tsx";
const getFriends = async () => {
  const { data } = await axiosInstance(`friends`);
  return data;
};
const sentRequestsByMe = async () => {
  const { data } = await axiosInstance(`friend-request/send`);
  return data;
};
const requestAddFriend = async (id) => {
  await axiosInstance.post("friend-request", { id });
};
const getRequestSendedToMe = async () => {
  const { data } = await axiosInstance.get(`friend-request`);
  return data;
};
const cancelRequest = async (id) => {
  await axiosInstance.delete(`friend-request/${id}/cancel`);
};
const acceptRequest = async (id) => {
  await axiosInstance.post(`friend-request/${id}/accept`);
};
export {
  getFriends,
  requestAddFriend,
  getRequestSendedToMe,
  sentRequestsByMe,
  cancelRequest,
  acceptRequest,
};

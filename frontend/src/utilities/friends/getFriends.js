import axiosInstance from "../../axios/axios.tsx";
const getFriends = async (searchTerm = "") => {
  console.log({ searchTerm });
  const { data } = await axiosInstance(`friends`, {
    params: { searchTerm },
  });
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
  acceptRequest,
  cancelRequest,
  getFriends,
  getRequestSendedToMe,
  requestAddFriend,
  sentRequestsByMe,
};

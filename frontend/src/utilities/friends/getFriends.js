import axiosInstance from "../../axios/axios.tsx";
const getFriends = async () => {
  const { data } = await axiosInstance(`friends`);
  return data;
};
const sentRequestsByMe = async () => {
  const { data } = await axiosInstance(`friend-request/send`);
  return data;
}
const requestAddFriend = async (id) => {
  await axiosInstance.post('friend-request',{id});
}
const getRequestSendedToMe = async () => {
  const { data } = await axiosInstance.get(`friend-request`);
  return data;
}
export { getFriends, requestAddFriend, getRequestSendedToMe,sentRequestsByMe };

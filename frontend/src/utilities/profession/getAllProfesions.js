import axios from "axios";

const getAllProfessions = async () => {
  const { data } = await axios.get(`professions`);
  return data;
};
export default getAllProfessions;

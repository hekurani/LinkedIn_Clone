import axiosInstance from "../../axios/axios.tsx";
import { getToken } from "../getToken";

const getAllJobs = async () => {
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.get(`job-post`);
  return data;
};

const applyToJob = async (jobPostId) => {
  if (!jobPostId) return;
  const token = getToken();
  if (!token) return;
  const { data } = await axiosInstance.post("job-application", { jobPostId });
  return data;
};
export { applyToJob, getAllJobs };

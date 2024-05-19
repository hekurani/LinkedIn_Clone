import { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { getTokenForAxios } from "./getToken";

const setAxiosHeader = (
  config: InternalAxiosRequestConfig<unknown>
): InternalAxiosRequestConfig<unknown> => {
  const token = getTokenForAxios();
  if (token)
    (config.headers as AxiosHeaders).set("Authorization", `Bearer ${token}`);
  return config;
};

export default setAxiosHeader;
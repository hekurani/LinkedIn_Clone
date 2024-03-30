import Axios, { AxiosRequestConfig } from "axios";
import setAxiosHeader from "../utilities/setAxiosHeader.tsx";
import { getRefreshToken } from "../utilities/getToken";

const axiosInstance = Axios.create({
  baseURL: "http://localhost:4000/",
});

axiosInstance.interceptors.request.use(
  async (config) => setAxiosHeader(config),
  (error) => {
    Promise.reject(error);
  }
);

interface RetryQueueItem {
  resolve: (value?: any) => void;
  reject: (error?: any) => void;
  config: AxiosRequestConfig;
}

const refreshAndRetryQueue: RetryQueueItem[] = [];
let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest: AxiosRequestConfig = error.config;
    if (error.response && error.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const refreshToken = getRefreshToken();
          if (refreshToken) {
            await Axios({
              method: "POST",
              url: `auth/refreshtoken`,
              headers: {
                "Content-Type": "application/json",
              },
              data: {
                refreshToken: refreshToken,
              },
            })
              .then(async (response) => {
                localStorage.setItem("access_token", response?.data?.access_token);
                localStorage.setItem(
                  "refresh_token",
                  response?.data?.refresh_token
                );
                return axiosInstance(originalRequest);
              })
              .catch((errorRefresh) => {
                console.log(errorRefresh);
                localStorage.clear();
              });
            // Repeat all miss request by 401
            refreshAndRetryQueue.forEach(({ config, resolve, reject }) => {
              axiosInstance(config)
                .then((response) => resolve(response))
                .catch((err) => reject(err));
            });
            refreshAndRetryQueue.length = 0;
          } else {
            localStorage.clear();
            window.location.href = "/logIn";
            return Promise.reject(error);
          }
        } catch (refreshError) {
          refreshAndRetryQueue.length = 0;
          localStorage.clear();
        } finally {
          isRefreshing = false;
        }
      }
      return new Promise<void>((resolve, reject) => {
        refreshAndRetryQueue.push({ config: originalRequest, resolve, reject });
      });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
import { jwtDecode } from "jwt-decode";
const getToken = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  const decoded = jwtDecode(token);
  if (decoded) return decoded;
  return null;
};
const getTokenForAxios = () => {
  const token = localStorage.getItem("access_token");
  if (!token) return null;
  return token;
};
const getRefreshToken = () => {
  const refreshToken = localStorage.getItem("refresh_token");
  if (!refreshToken) return null;
  const decoded = jwtDecode(refreshToken);
  if (decoded) return decoded;
  return null;
};

export { getToken, getRefreshToken, getTokenForAxios };

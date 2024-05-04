import { jwtDecode } from "jwt-decode";
const getToken = () => {
    const token = localStorage.getItem("access_token");
    const decoded = jwtDecode(token);
    if (decoded) return decoded;
    return null;
  };
  
  const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) return refreshToken;
    return null;
  };
  
  export { getToken, getRefreshToken };
const getToken = () => {
    const token = localStorage.getItem("access_token");
    if (token) return token;
    return null;
  };
  
  const getRefreshToken = () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (refreshToken) return refreshToken;
    return null;
  };
  
  export { getToken, getRefreshToken };
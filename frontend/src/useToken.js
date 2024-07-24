import React, { useState, useContext, createContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

const useToken = () => {
  const getToken = () => {
    const tokenString = window.sessionStorage.getItem('userInfo');
    const userToken = JSON.parse(tokenString);
    return userToken?.token;
  };

  const getUserInfo = () => {
    const tokenString = window.sessionStorage.getItem('userInfo');
    const userToken = JSON.parse(tokenString);
    return userToken?.user;
  };

  const [token, setToken] = useState(getToken());
  const [userInfo, setUserInfo] = useState(getUserInfo());

  const saveToken = (userToken) => {
    window.sessionStorage.setItem('userInfo', JSON.stringify(userToken));
    setToken(userToken.token);
    setUserInfo(userToken.user);
  };

  const removeToken = () => {
    window.sessionStorage.removeItem('userInfo');
    setToken(null);
    setUserInfo(null);
  };

  return {
    token,
    userInfo,
    setToken: saveToken,
    removeToken,
  };
};

export const AuthProvider = ({ children }) => {
  const auth = useToken();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default useToken;

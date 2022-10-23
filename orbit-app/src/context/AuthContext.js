import React, { createContext, useState } from "react";
import { useHistory } from "react-router";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const [authState, setAuthState] = useState(() => {
    return {
      token: localStorage.getItem("token") ?? null,
      expiresAt: +localStorage.getItem("expiresAt") ?? null,
      userInfo: JSON.parse(localStorage.getItem("userInfo")) ?? {},
    };
  });

  function setAuthInfo({ token, expiresAt, userInfo }) {
    localStorage.setItem("token", token);
    localStorage.setItem("userInfo", JSON.stringify(userInfo));
    localStorage.setItem("expiresAt", expiresAt);
    setAuthState({
      token,
      expiresAt,
      userInfo,
    });
  }

  function isAuthenticated() {
    if (!authState.token || !authState.expiresAt) return false;
    return authState.expiresAt * 1000 > Date.now();
  }

  function isAdmin() {
    if (!authState.token || !authState.expiresAt) return false;
    return authState.userInfo.role === "admin";
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiresAt");
    localStorage.removeItem("userInfo");

    setAuthState({
      token: null,
      expiresAt: null,
      userInfo: {},
    });

    history.push("/login");
  }

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        isAuthenticated,
        logout,
        isAdmin,
      }}>
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };

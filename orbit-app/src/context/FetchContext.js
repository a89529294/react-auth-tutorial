import React, { createContext, useContext } from "react";
import axios from "axios";
import { AuthContext } from "./AuthContext";

const FetchContext = createContext();
const { Provider } = FetchContext;

const authAxios = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

const FetchProvider = ({ children }) => {
  const {
    authState: { token },
  } = useContext(AuthContext);

  authAxios.interceptors.request.use((config) => ({
    ...config,
    headers: { Authorization: `Bearer ${token}` },
  }));

  return (
    <Provider
      value={{
        authAxios,
      }}>
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };

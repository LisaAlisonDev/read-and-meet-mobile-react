import React, {createContext, useContext} from 'react';
import axios from 'axios';
import {AuthContext} from './AuthContext';

const AxiosContext = React.createContext(null);
const {Provider} = AxiosContext;

const AxiosProvider = ({children}) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'http://localhost:8000/api',
  });

  const publicAxios = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
  });

  authAxios.interceptors.request.use(
    config => {
    //  let token = await authContext.getAccessToken()

      if (!config.headers.Authorization) {
        config.headers.Authorization = `Bearer ${authContext.getAuthToken()}`;
      }

      return config;
    },
    error => {
      return Promise.reject(error);
    },
  );

  return (
    <Provider
      value={{
        authAxios,
        publicAxios,
      }}>
      {children}
    </Provider>
  );
};

export {AxiosContext, AxiosProvider};
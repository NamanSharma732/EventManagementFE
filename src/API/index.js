import axios from "axios";
import { handleLogout } from "../Redux/auth/authApi";
import { store } from "../Redux";
import { setSessionExpired } from '../Redux/auth/authSlice'; 

const API = axios.create({
  baseURL:'https://eventmangementbe.onrender.com/api/v1',
  timeout: 1000 * 20, 
});

const getToken = () => {
  return sessionStorage.getItem("jwt_token");
};

API.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    if (response?.data) {
      return response;
    }
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.log("***********Unauthorized Error**********");
      handleLogout();
      sessionStorage.clear();
      store.dispatch(setSessionExpired(true));
    }
    
    return Promise.reject(
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'An unexpected error occurred'
    );
  }
);

export default API;
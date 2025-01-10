import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  loginSuccess,
  loginFailure,
  passwordChangeSuccess,
  logout,
} from "./authSlice";
import API from "../../API";
import { LoginPayload } from "../../model/auth"; 
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload: LoginPayload, { dispatch }) => {
    try {
      const response = await API.post<any>("/auth/login", payload);
      if (response) {
        console.log(response?.data);
        dispatch(loginSuccess(response?.data));
      }
    } catch (error) {
      toast.error(error);
      dispatch(loginFailure(error));
    }
  }
);

export const changeUserPassword = createAsyncThunk(
  "auth/changePassword",
  async (
    { userId, oldPassword, newPassword, confirmPassword }: any,
    { dispatch }
  ) => {
    try {
      const response = await changePassword(userId, {
        oldPassword,
        newPassword,
        confirmPassword,
      });
      if (response) {
        dispatch(passwordChangeSuccess(response?.data));
      }
    } catch (error) {
      toast.error(error);
      throw error; 
    }
  }
);

export const changePassword = async (userId: string, payload: any) => {
  try {
    const response = await API.put(`changePassword/${userId}`, payload);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const handleLogout = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch }) => {
    try {
      dispatch(logout());
      window.location.href = "/";
    } catch (error) {}
  }
);
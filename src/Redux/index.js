import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./setting/reducers";
import authReducer from "../Redux/auth/authSlice"
export const store = configureStore({
  reducer: {
    setting: settingReducer,
    auth:authReducer
  },
});

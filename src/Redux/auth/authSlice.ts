import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData } from "../../model/auth";

interface RootState {
  auth: AuthData;
}

const initialState: AuthData = {
  userData: JSON.parse(sessionStorage?.getItem("user") || null),
  token: sessionStorage.getItem("jwt_token") || null,
  isLoggedIn: !!sessionStorage.getItem("user"),
  error: null,
  sessionExpired: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<any>) => {
      console.log("yeh hai payload",action.payload);
      sessionStorage.setItem("user", JSON.stringify(action.payload));
      sessionStorage.setItem("jwt_token", action.payload.token);
      state.userData = action.payload;
      state.token = action.payload.token;
      state.isLoggedIn = true;
      state.error = null;
      state.sessionExpired = false;
    },
    loginFailure: (state, action: PayloadAction<string>) => {
      console.log(action.payload, "action.payload");
      state.userData = null;
      state.isLoggedIn = false;
      state.error = action.payload;
    },
    logout: (state) => {
      sessionStorage.clear();
      state.userData = null;
      state.isLoggedIn = false;
      state.token = null;
      state.error = null;
      state.sessionExpired = false;
    },
    passwordChangeSuccess: (state) => {
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('jwt_token');
      state.userData = null;
      state.token = null;
      state.isLoggedIn = false;
      state.error = null;
    },
    setSessionExpired: (state, action: PayloadAction<boolean>) => {
      state.sessionExpired = action.payload;
      if (action.payload) {
        state.isLoggedIn = false;
        state.userData = null;
        state.token = null;
        sessionStorage.clear();
      }
    },
  },
});

export const { 
  loginSuccess, 
  loginFailure, 
  logout, 
  passwordChangeSuccess, 
  setSessionExpired 
} = authSlice.actions;

export const userData = (state: RootState) => state.auth.userData;
export const isLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectSessionExpired = (state: RootState) => state.auth.sessionExpired;

export default authSlice.reducer;
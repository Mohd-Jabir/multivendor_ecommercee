import { createSlice } from "@reduxjs/toolkit";

import {
  saveAuth,
  getToken,
  getUser,
  clearAuth,
} from "../../services/authService";
const initialState = {
  user: getUser(),
  token: getToken(),
  isAuthenticated: Boolean(getToken()),
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const user = saveAuth(action.payload);
      state.token = action.payload.token;
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      clearAuth();
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
    },
  },
});
export const {
  setCredentials,
  logout,
} = authSlice.actions;

export default authSlice.reducer;

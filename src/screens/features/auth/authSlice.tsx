import { createSlice } from '@reduxjs/toolkit';
import { login } from './authAction';

interface Profile {
  name: string;
  email: string;
}

export interface AuthState {
  token: string;
  expiredAt: string;
  profile: Profile;
  loginLoading: boolean;
  loginError: string | null;
}

const initialState: AuthState = {
  token: '',
  expiredAt: '',
  profile: {
    name: '',
    email: '',
  },
  loginLoading: false,
  loginError: null,
};

export const AUTH = "auth";

export const authSlice = createSlice({
  name: AUTH,
  initialState,
  reducers: {
    setAuthenticationInfo: (state, action) => {
      const { token, profile, expiredAt } = action.payload;
      state.token = token;
      state.expiredAt = expiredAt;
      state.profile = profile;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loginLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        const { token, profile, expiredAt } = action.payload;
        state.token = token;
        state.expiredAt = expiredAt;
        state.loginLoading = false;
      })
      .addCase(login.rejected, (state, action) => {
        const { message } = action.payload as { message: string };
        state.loginLoading = false;
        state.loginError = message; // Save error if the request fails
      });
  },

});

export const { setAuthenticationInfo } = authSlice.actions;
export default authSlice.reducer;

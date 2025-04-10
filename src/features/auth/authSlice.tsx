import { createSlice } from '@reduxjs/toolkit';
import { AUTH, login } from './authAction';
import { AuthState } from '~/types';

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
        const { token, expiredAt, user } = action.payload;
        state.token = token;
        state.expiredAt = expiredAt;
        state.loginLoading = false;
        state.profile = {
          name: user?.name,
          email: user?.email
        }
      })
      .addCase(login.rejected, (state, action) => {
        const { message } = action.payload as { message: string };
        state.loginLoading = false;
        state.loginError = message;
      });
  },

});

export const { setAuthenticationInfo } = authSlice.actions;
export default authSlice.reducer;

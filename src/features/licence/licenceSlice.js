import { createSlice } from '@reduxjs/toolkit';
import { loginUser } from './licenceAPI';
import { STORAGE } from '../../config/storage/storageKeys';

const initialState = {
  user: STORAGE.getUser() || null,
  token: STORAGE.getToken() || null,
  isAuthenticated: !!STORAGE.getToken(),
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      STORAGE.clearToken();
    },
    resetAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      //===================================
      // ✅ LOGIN CASE
      //===================================
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    //===================================
    // REGISTER CASE
    //===================================
  },
});

export const { logout, resetAuthError } = authSlice.actions;
export default authSlice.reducer;

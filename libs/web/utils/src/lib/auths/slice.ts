import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AppState } from '../store';

export const loginWithGoogle = createAsyncThunk('auth/loginWithGoogle', async (credentials: any) => {
  // Here you would typically make an API call to your backend
  // to verify the Google token and get user data
  return credentials;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
  },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = true;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export const { logout } = authSlice.actions;

export const stateIsAuthenticated = (state: AppState) => state.auth.isAuthenticated;

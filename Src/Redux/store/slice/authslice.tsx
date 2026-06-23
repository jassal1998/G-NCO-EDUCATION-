// src/redux/slices/authSlice.ts

import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../baseUrl/api';


interface LoginPayload {
  username: string;
  password: string;
}

interface AuthState {
  user: any;
  token: string | null;
  isLoggedIn: boolean;
  loading: boolean;
  error: string | null;
}

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ username, password }: LoginPayload, { rejectWithValue }) => {
    try {
      console.log('THUNK START');
      console.log('USERNAME =>', username);

      const response = await api.post('/users/login', {
        username,
        password,
      });

      console.log('API RESPONSE =>', response.data);

      return {
        token: response.data?.token,
        user: response.data,
      };
    } catch (error: any) {
      console.log('THUNK ERROR =>', error);
      console.log('THUNK ERROR RESPONSE =>', error?.response?.data);

      return rejectWithValue(
        error?.response?.data?.message || error.message,
      );
    }
  },
);

const initialState: AuthState = {
  user: null,
  token: null,
  isLoggedIn: false,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,

  reducers: {
    logout: state => {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;

      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('userData');
    },
  },

  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.loading = true;
        state.error = null;
      })

      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })

      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;
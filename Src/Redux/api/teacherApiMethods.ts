import {createAsyncThunk} from '@reduxjs/toolkit';
import { getToken } from '../utils/authStorage';
import { refreshAccessToken } from '../utils/refreshToken';
import api from '../baseUrl/api';


export const fetchStudentsAttendance =
  createAsyncThunk(
    'teacher/fetchStudentsAttendance',
    async (_, {rejectWithValue}) => {
      try {
        let token = await getToken();

        console.log('🔑 TOKEN =>', token);

        if (token) {
          const newToken =
            await refreshAccessToken();

          if (newToken) {
            token = newToken;
          }
        }

        const response = await api.get(
          '/class-teachers/students/attendance',
          {
            headers: {
              'Content-Type':
                'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(
          '📚 ATTENDANCE RESPONSE =>',
          JSON.stringify(
            response.data,
            null,
            2,
          ),
        );

        return response.data;
      } catch (error: any) {
        console.log(
          '❌ ATTENDANCE ERROR =>',
          error?.response?.data,
        );

        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message ||
            'Failed to fetch attendance',
        );
      }
    },
  );


export const submitAttendance =
  createAsyncThunk(
    'teacher/submitAttendance',
    async (
      data: any[],
      {rejectWithValue},
    ) => {
      try {
        let token = await getToken();

        if (token) {
          const newToken =
            await refreshAccessToken();

          if (newToken) {
            token = newToken;
          }
        }

        console.log(
          '📤 REQUEST BODY =>',
          JSON.stringify(data, null, 2),
        );

        const response = await api.post(
          '/attendance',
          data,
          {
            headers: {
              'Content-Type':
                'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(
          '✅ ATTENDANCE SUBMIT =>',
          response.data,
        );

        return response.data;
      } catch (error: any) {
        console.log(
          '❌ ATTENDANCE SUBMIT ERROR =>',
          error?.response?.data,
        );

        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message,
        );
      }
    },
  );


  export const fetchAttendanceList =
  createAsyncThunk(
    'teacher/fetchAttendanceList',
    async (_, {rejectWithValue}) => {
      try {
        let token = await getToken();

        if (token) {
          const newToken =
            await refreshAccessToken();

          if (newToken) {
            token = newToken;
          }
        }

        const response = await api.get(
          '/attendance',
          {
            headers: {
              'Content-Type':
                'application/json',
              Authorization: `Bearer ${token}`,
            },
          },
        );

        console.log(
          '📚 ATTENDANCE LIST RESPONSE =>',
          JSON.stringify(
            response.data,
            null,
            2,
          ),
        );

        return response.data;
      } catch (error: any) {
        console.log(
          '❌ ATTENDANCE LIST ERROR =>',
          error?.response?.data,
        );

        return rejectWithValue(
          error?.response?.data?.message ||
            error?.message,
        );
      }
    },
  );
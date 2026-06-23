import {createAsyncThunk} from '@reduxjs/toolkit';
import {jwtDecode} from 'jwt-decode';
import {getToken, getRefreshToken} from '../utils/authStorage';
import api from '../baseUrl/api';
import { refreshAccessToken } from '../utils/refreshToken';






export const fetchMySchool = createAsyncThunk(
  'school/fetchMySchool',
  async (_, {rejectWithValue}) => {
    try {
      let token = await getToken();

      console.log('🔑 ACCESS TOKEN =>', token);
      if (token) {
        console.log(
          '🧪 FORCE REFRESH TOKEN TEST',
        );

        const newToken =
          await refreshAccessToken();

        console.log(
          '🔄 NEW TOKEN FROM REFRESH =>',
          newToken,
        );

        if (newToken) {
          token = newToken;
        } else {
          return rejectWithValue(
            'Refresh Token Failed',
          );
        }
      }

      const response = await api.get(
        '/users/profile',
        {
          headers: {
            'Content-Type':
              'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        '✅ PROFILE RESPONSE =>',
        JSON.stringify(
          response.data,
          null,
          2,
        ),
      );

      return response.data;
    } catch (error: any) {
      console.log(
        '❌ ERROR STATUS =>',
        error?.response?.status,
      );

      console.log(
        '❌ ERROR DATA =>',
        JSON.stringify(
          error?.response?.data,
          null,
          2,
        ),
      );

      console.log(
        '❌ ERROR MESSAGE =>',
        error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch profile',
      );
    }
  },
);

export const fetchMonthlyAttendance = createAsyncThunk(
  'attendance/fetchMonthlyAttendance',
  async (
    {
      month,
      year,
    }: {month: number; year: number},
    {rejectWithValue},
  ) => {
    try {
      let token = await getToken();

      console.log('🔑 ACCESS TOKEN =>', token);

      if (token) {
        console.log('🧪 FORCE REFRESH TOKEN TEST');

        const newToken = await refreshAccessToken();

        console.log(
          '🔄 NEW TOKEN FROM REFRESH =>',
          newToken,
        );

        if (newToken) {
          token = newToken;
        } else {
          return rejectWithValue(
            'Refresh Token Failed',
          );
        }
      }

      const response = await api.get(
        `/attendance/monthly?month=${month}&year=${year}`,
        {
          headers: {
            'Content-Type':
              'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        '✅ MONTHLY ATTENDANCE RESPONSE =>',
        JSON.stringify(
          response.data,
          null,
          2,
        ),
      );

      return response.data;
    } catch (error: any) {
      console.log(
        '❌ ERROR STATUS =>',
        error?.response?.status,
      );

      console.log(
        '❌ ERROR DATA =>',
        JSON.stringify(
          error?.response?.data,
          null,
          2,
        ),
      );

      console.log(
        '❌ ERROR MESSAGE =>',
        error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch attendance',
      );
    }
  },
);

export const fetchStudentHomework = createAsyncThunk(
  'school/fetchStudentHomework',
  async (_, {rejectWithValue}) => {
    try {
      let token = await getToken();

      console.log('🔑 TOKEN =>', token);

      if (token) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          token = newToken;
        }
      }

      const response = await api.get(
        '/homeworks/student',
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      console.log(
        '📚 HOMEWORK RESPONSE =>',
        JSON.stringify(response.data, null, 2),
      );

      return response.data;
    } catch (error: any) {
      console.log(
        '❌ HOMEWORK ERROR =>',
        error?.response?.data,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to fetch homework',
      );
    }
  },
);


export const submitHomework = createAsyncThunk(
  'school/submitHomework',
  async (
    {
      homeworkId,
      description,
      file,
    }: {
      homeworkId: string;
      description: string;
      file: any;
    },
    {rejectWithValue},
  ) => {
    try {
      let token = await getToken();

      console.log('🔑 TOKEN =>', token);

      if (token) {
        const newToken = await refreshAccessToken();

        if (newToken) {
          token = newToken;
        }
      }

      const formData = new FormData();

      formData.append(
        'homeworkId',
        homeworkId.toString(),
      );

      formData.append(
        'description',
        description,
      );

      if (file) {
        formData.append('file', {
          uri: file.uri,
          name:
            file.fileName ||
            file.name ||
            'homework.jpg',
          type:
            file.type ||
            'image/jpeg',
        } as any);
      }

      console.log(
        '📤 HOMEWORK PAYLOAD =>',
        {
          homeworkId,
          description,
          file,
        },
      );

      const response = await api.post(
        '/homeworks/submission',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':
              'multipart/form-data',
          },
        },
      );

      console.log(
        '✅ HOMEWORK SUBMIT RESPONSE =>',
        JSON.stringify(
          response.data,
          null,
          2,
        ),
      );

      return response.data;
    } catch (error: any) {
      console.log(
        '❌ STATUS =>',
        error?.response?.status,
      );

      console.log(
        '❌ RESPONSE =>',
        JSON.stringify(
          error?.response?.data,
          null,
          2,
        ),
      );

      console.log(
        '❌ MESSAGE =>',
        error?.message,
      );

      return rejectWithValue(
        error?.response?.data?.message ||
          error?.message ||
          'Failed to submit homework',
      );
    }
  },
);
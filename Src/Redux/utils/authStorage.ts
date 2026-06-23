// src/utils/authStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

export const getUserData = async () => {
  try {
    const data = await AsyncStorage.getItem('userData');
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const getToken = async () => {
  return await AsyncStorage.getItem('token');
};

export const getRefreshToken = async () => {
  return await AsyncStorage.getItem('refreshToken');
};
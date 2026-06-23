import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../baseUrl/api';

export const refreshAccessToken = async () => {
  try {
    const refreshToken =
      await AsyncStorage.getItem('refreshToken');

    console.log(
      '🔄 REFRESH TOKEN =>',
      refreshToken,
    );

    const response = await api.post(
      '/users/refresh-token',
      {},
      {
        headers: {
          'Refresh-Token': refreshToken,
        },
      },
    );

    console.log(
      '✅ REFRESH RESPONSE =>',
      JSON.stringify(response.data, null, 2),
    );

    // Backend response de hisaab naal adjust karna
    const newToken =
      response.data?.accessToken ||
      response.data?.token ||
      response.data?.data?.accessToken;

    if (newToken) {
      await AsyncStorage.setItem(
        'token',
        newToken,
      );

      console.log(
        '✅ NEW ACCESS TOKEN SAVED =>',
        newToken,
      );
    }

    return newToken;
  } catch (error: any) {
    console.log(
      '❌ REFRESH STATUS =>',
      error?.response?.status,
    );

    console.log(
      '❌ REFRESH DATA =>',
      JSON.stringify(
        error?.response?.data,
        null,
        2,
      ),
    );

    console.log(
      '❌ REFRESH ERROR =>',
      error?.message,
    );

    return null;
  }
};
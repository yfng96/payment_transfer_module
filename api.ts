import axios from 'axios';
import Toast from 'react-native-toast-message';
import { navigateAndSimpleReset } from '~/navigation/NavigationService';
import NetInfo from '@react-native-community/netinfo';

const api = axios.create({
  baseURL: '/',
  timeout: 10000,
});

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { status, data, headers, config } = error.response;

    // Check if there's no server response (likely network issue)
    if (!error.response) {
      const netState = await NetInfo.fetch();

      if (!netState.isConnected) {
        Toast.show({
          type: 'error',
          text1: 'No Internet Connection',
          text2: 'Please check your internet and try again.',
          position: 'bottom',
        });
      } else {
        Toast.show({
          type: 'error',
          text1: 'Server Unreachable',
          text2: 'Could not reach server. Try again later.',
          position: 'bottom',
        });
      }

      return Promise.reject({
        code: 'NETWORK_ERROR',
        message: error.message,
        status,
        data,
      });
    }

    // Handle 401 Unauthorized
    if (status === 401) {
      Toast.show({
        type: 'error',
        text1: 'Session expired',
        text2: 'Please log in again to continue.',
        position: 'bottom',
      });

      // optional: clear auth token / logout
      navigateAndSimpleReset('Welcome');
      return Promise.reject({
        code: 'UNAUTHORIZED',
        message: error.message,
        status,
        data,
      });
    }

    return Promise.reject({
      code: 'FAILED',
      message: error.message,
      status,
      data,
    });
  }
);

export default api;

import axios from 'axios';
import { toast } from 'react-toastify';

import { userStoreInstance } from '../features/Auth/store';

export const baseURL = import.meta.env.VITE_EVENTS_URL || 'http://10.0.41.92:7011/api/v2/portal'; //'http://dev.skdf:8083/api/v2';

const client = axios.create({ baseURL });

// Request interceptor for API calls
client.interceptors.request.use(
  async (config) => {
    const { user } = userStoreInstance;
    if (user && user !== 'anonymous') {
      // config.headers = {
      //   Authorization: `Bearer ${user.access_token}`,
      // };
      config.baseURL = baseURL;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

// Response interceptor for API calls
client.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    const originalRequest = error.config;
    if ([403, 401].includes(error.response.status)) {
      if (originalRequest._retry) {
        await userStoreInstance.removeUser();
        window.location.reload();
      } else {
        originalRequest._retry = true;
        await userStoreInstance.renewToken().catch(async () => {
          await userStoreInstance.removeUser();
          window.location.reload();
        });
        const { user } = userStoreInstance;
        if (user && user !== 'anonymous') {
          axios.defaults.headers.common['Authorization'] = `Bearer ${user.access_token}`;
          return client(originalRequest);
        }
      }
    }
    return Promise.reject(error);
  }
);

if (import.meta.env.DEV) {
  client.interceptors.response.use(
    (response) => {
      const { method, url } = response.config;
      console.log(`[Axios ${method?.toUpperCase()} ${url}]`, response);
      return response;
    },
    (error) => {
      let message = String(error);
      console.log(error);
      if (axios.isAxiosError(error)) message = error.message;
      toast.error(message, { autoClose: false });
    }
  );
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  window['httpClient'] = client;
} else if (import.meta.env.PROD) {
  client.interceptors.response.use(undefined, () => {
    toast.error('Произошла ошибка при загрузке данных', { autoClose: false });
  });
}

export default client;

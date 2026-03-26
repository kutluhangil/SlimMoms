import axios from 'axios';
import { clearUser } from '../redux/slices/authSlice';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

// store döngüsel bağımlılığı kırmak için dışarıdan enjekte edilir
let store;
export const injectStore = (_store) => {
  store = _store;
};

// Request interceptor — her isteğe token ekle
axiosInstance.interceptors.request.use((config) => {
  const token = store?.getState()?.auth?.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor — 401 gelirse oturumu kapat ve login'e yönlendir
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store?.dispatch(clearUser());
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

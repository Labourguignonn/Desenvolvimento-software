import axios from 'axios';

   const API_URL = process.env.REACT_APP_API_URL || "https://desenvolvimento-software-ayeh.vercel.app";

   const api = axios.create({
     baseURL: API_URL,
     timeout: 5000,
   });

   api.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('auth_token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

   export default api;
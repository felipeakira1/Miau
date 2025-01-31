import axios from "axios"

export const api = axios.create({
    baseURL: 'http://localhost:3333',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    }
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('jwt');

        if(!config.url?.includes('/login') && token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
let isRefreshing = false;
let refreshPromise: Promise<string> | null = null;

api.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status !== 401) {
        return Promise.reject(error);
      }
  
      const originalRequest = error.config;
      
      if (!isRefreshing) {
        isRefreshing = true;
        refreshPromise = api
          .patch("/token/refresh")
          .then((res) => {
            const newToken = res.data.token;
            localStorage.setItem("jwt", newToken);
            return newToken;
          })
          .finally(() => {
            isRefreshing = false;
            refreshPromise = null;
          });
      }
  
      try {
        const newToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem("jwt");
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }
  );
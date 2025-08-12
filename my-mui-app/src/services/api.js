import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Your Django API base URL
});

// Request Interceptor: Add Authorization Header
api.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access");
    if (accessToken) {
      config.headers["Authorization"] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor: Auto Refresh Token if 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If Unauthorized and not already retrying
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem("refresh");

        if (!refreshToken) {
          console.warn("No refresh token, logging out...");
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
          window.location.href = "/login";
          return Promise.reject(error);
        }

        // Request new access token
        const { data } = await axios.post(
          "http://127.0.0.1:8000/api/token/refresh/",
          { refresh: refreshToken }
        );

        // Save new access token
        localStorage.setItem("access", data.access);

        // Retry original request with new token
        originalRequest.headers["Authorization"] = `Bearer ${data.access}`;
        return api(originalRequest);

      } catch (err) {
        console.error("Refresh token expired or invalid, logging out...");
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        window.location.href = "/login";
        return Promise.reject(err);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

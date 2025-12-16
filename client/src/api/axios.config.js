import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {"Content-Type": "application/json"},
});

// Request interceptor - Add token to requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor - Handle errors globally
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle specific error cases
    if (error.response) {
      // Server responded with error status
      const {status, data} = error.response;

      if (status === 401) {
        // Unauthorized - clear token and redirect to login
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        window.location.href = "/login";
      }

      // Return error message from server
      return Promise.reject({
        message: data.error || "Error del servidor",
        details: data.details,
        status,
      });
    } else if (error.request) {
      // Request made but no response
      return Promise.reject({
        message: "No se pudo conectar con el servidor",
        status: 0,
      });
    } else {
      // Something else happened
      return Promise.reject({
        message: error.message || "Error desconocido",
        status: 0,
      });
    }
  }
);

export default axiosInstance;

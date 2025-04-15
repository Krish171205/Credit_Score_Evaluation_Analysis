import axios from "axios";

// Create an Axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:8000",
});

// Attach token for authenticated requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = Bearer ${token};
  }
  return config;
});

export default api;
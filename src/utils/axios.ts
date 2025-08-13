import axios from "axios";
import env from "../config/env";

// Create axios instance
const api = axios.create({
  baseURL: env.VITE_SERVER_ORIGIN, // Your API base URL
  timeout: 10000,
  headers: {
    'ngrok-skip-browser-warning': 'true',
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

export default api;

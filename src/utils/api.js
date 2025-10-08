import axios from 'axios';
import { BASE_URL } from './constants';

// Create a new Axios instance
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ THIS IS THE MISSING PIECE ✅
// This interceptor will run for every request you make using "api"
api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem('token'); 
    
    if (token) {
      // If the token exists, add it to the Authorization header
      // The format must be "Bearer <token>"
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    return config; // Continue with the request
  },
  (error) => {
    // Handle any request errors
    return Promise.reject(error);
  }
);

export default api;
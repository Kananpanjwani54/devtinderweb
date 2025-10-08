import axios from "axios";
import { BASE_URL } from "./constants";

// Axios instance configured for backend on Render
const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // required to send cookies
});

export default api;

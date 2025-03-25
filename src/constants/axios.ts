import axios from "axios";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;
if (!BASE_URL) {
  throw new Error("BASE_URL is not defined");
}

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
});



import axios from "axios";

export const API_BASE_URL = (
  process.env.REACT_APP_API_URL || "http://localhost:8080"
).replace(/\/$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export function getApiErrorMessage(error, fallbackMessage) {
  const data = error?.response?.data;

  if (data?.fields) {
    return Object.values(data.fields).join(" ");
  }

  return data?.message || fallbackMessage;
}

export default api;

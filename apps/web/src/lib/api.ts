import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:4000/api",
  withCredentials: true,
});

export const registerUser = (data: {
  name: string;
  email: string;
  password: string;
}) => api.post("/auth/register", data);

export const loginUser = (data: {
  email: string;
  password: string;
}) => api.post("/auth/login", data);

export const getAccounts = () => api.get("/accounts");

export const disconnectAccount = (id: string) =>
  api.delete(`/accounts/${id}`);

export default api;
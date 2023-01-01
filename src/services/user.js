import axiosInstance from "../apiConfig/axiosInstance";

export const signUp = (data) => axiosInstance.post("/users", data);

export const login = (data) => axiosInstance.post("/users/login", data);

export const getProfile = () => axiosInstance.get("/users/me");

export const editProfile = (id, data) =>
  axiosInstance.put(`/users/${id}`, data, {
    headers: { "content-type": "multipart/form-data" },
  });

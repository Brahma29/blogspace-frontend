import axiosInstance from "../apiConfig/axiosInstance";

export const addPost = (data) =>
  axiosInstance.post("/posts", data, {
    headers: { "content-type": "multipart/form-data" },
  });

export const editPost = (id, data) =>
  axiosInstance.put(`/posts/${id}`, data, {
    headers: { "content-type": "multipart/form-data" },
  });

export const getPosts = (keyword, page, limit) =>
  axiosInstance.get("/posts", { params: { keyword, page, limit } });

export const getPostById = (id) => axiosInstance.get(`/posts/${id}`);

export const removePost = (id) => axiosInstance.delete(`/posts/${id}`);

export const likePost = (id) => axiosInstance.post(`/posts/like/${id}`);

export const commentPost = (id, data) =>
  axiosInstance.post(`/posts/comment/${id}`, data);

export const getUserPosts = () => axiosInstance.get("/posts/user/articles");

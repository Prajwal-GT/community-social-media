import axios from "axios";

const API = import.meta.env.VITE_API_URL || "http://localhost:5000";

export const getPosts = async () => {
  const res = await axios.get(`${API}/posts`);
  return res.data;
};

export const createPost = async (postData) => {
  const res = await axios.post(`${API}/posts`, postData);
  return res.data;
};

export const likePost = async (id) => {
  const res = await axios.put(`${API}/posts/${id}/like`);
  return res.data;
};

export const dislikePost = async (id) => {
  const res = await axios.put(`${API}/posts/${id}/dislike`);
  return res.data;
};

export const addComment = async (id, username, text, parentId = null) => {
  const res = await axios.post(`${API}/posts/${id}/comment`, {
    username,
    text,
    parentId,
  });
  return res.data;
};

export const deletePost = async (id) => {
  const res = await axios.delete(`${API}/posts/${id}`);
  return res.data;
};
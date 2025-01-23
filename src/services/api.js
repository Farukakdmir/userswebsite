// src/services/api.js
import axios from "axios";

// JSONPlaceholder API için instance
const jsonPlaceholderApi = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  timeout: 10000,
});

// DiceBear API için instance
const diceBearApi = axios.create({
  baseURL: "https://api.dicebear.com/7.x",
  timeout: 10000,
});

// Picsum API için instance
const picsumApi = axios.create({
  baseURL: "https://picsum.photos",
  timeout: 10000,
});

export const userService = {
  getUsers: () => jsonPlaceholderApi.get("/users"),
  getUser: (id) => jsonPlaceholderApi.get(`/users/${id}`),
};

export const todoService = {
  getUserTodos: (userId) => jsonPlaceholderApi.get(`/todos?userId=${userId}`),
  updateTodo: (todoId, data) =>
    jsonPlaceholderApi.patch(`/todos/${todoId}`, data),
};

export const postService = {
  getPosts: () => jsonPlaceholderApi.get("/posts"),
  getPost: (id) => jsonPlaceholderApi.get(`/posts/${id}`),
  getPostComments: (postId) =>
    jsonPlaceholderApi.get(`/posts/${postId}/comments`),
  getAvatar: (email) => diceBearApi.get(`/avataaars/svg?seed=${email}`),
};

export const albumService = {
  getUserAlbums: (userId) => jsonPlaceholderApi.get(`/albums?userId=${userId}`),
  getAlbum: (id) => jsonPlaceholderApi.get(`/albums/${id}`),
  getPhoto: (seed, width, height) =>
    picsumApi.get(`/seed/${seed}/${width}/${height}`),
};

// router/index.js
import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/home.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    props: true,
  },
  {
    path: "/todos/:userId",
    name: "todos",
    component: () => import("../views/TodoPage.vue"),
    props: true,
  },
  {
    path: "/posts/:userId",
    name: "posts",
    component: () => import("../views/PostPage.vue"),
    props: true,
  },
  {
    path: "/albums/:userId",
    name: "albums",
    component: () => import("../views/AlbumPage.vue"),
    props: true,
  },
  {
    path: "/albums/:userId/:albumId",
    name: "album-detail",
    component: () => import("../views/AlbumDetailView.vue"),
    props: true,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

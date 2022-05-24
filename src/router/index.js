import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import(/* webpackChunkName: "login" */ "../views/LoginView.vue"),
  },
  {
    path: "/signup",
    name: "signup",
    alias: "/editProfile",
    component: () =>
      import(/* webpackChunkName: "signup" */ "../views/SignupView.vue"),
  },
  {
    path: "/profile",
    name: "profile",
    component: () =>
      import(/* webpackChunkName: "profile" */ "../views/user/ProfileView.vue"),
  },
  {
    path: "/shop",
    name: "shop",
    component: () =>
      import(/* webpackChunkName: "shop" */ "../views/user/ShopView.vue"),
  },
  {
    path: "/bag",
    name: "bag",
    component: () =>
      import(/* webpackChunkName: "shop" */ "../views/user/BagView.vue"),
  },
  // admin
  {
    path: "/admin/user",
    name: "userList",
    component: () =>
      import(/* webpackChunkName: "userList" */ "../views/admin/UserView.vue"),
  },
  {
    path: "/admin/equipment",
    name: "equipmentList",
    component: () =>
      import(
        /* webpackChunkName: "equipmentList" */ "../views/admin/EquipmentView.vue"
      ),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

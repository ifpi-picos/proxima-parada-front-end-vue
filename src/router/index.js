import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "authMain",
    component: () => import("../layouts/AuthLayout.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../layouts/HomeLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "feed" },
      },
      {
        path: "feed",
        name: "feed",
        component: () => import("../pages/home/HomePage.vue"),
      },
      {
        path: "profile",
        name: "profile",
        component: () => import("../pages/home/ProfilePage.vue"),
      },
      {
        path: "ride",
        name: "ride",
        component: () => import("../pages/home/Cadastrar-Carona.vue"),
      },
    ],
  },
  {
    path: "/admin",
    name: "admin",
    component: () => import("../layouts/AdminLayout.vue"),
    children: [
      {
        path: "",
        redirect: { name: "dashboard" },
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: () => import("../pages/admin/DashboadPage.vue"),
      },
      {
        path: "users",
        name: "users",
        component: () => import("../pages/admin/UsersPage.vue"),
      },
      {
        path: "requisitions",
        name: "requisitions",
        component: () => import("../pages/admin/RequisitionsPage.vue"),
      },
      {
        path: "profile-admin",
        name: "profile-admin",
        component: () => import("../pages/admin/ProfileAdminPage.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;

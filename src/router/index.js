import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthView from "../views/AuthView.vue"
import HomePage from "../pages/HomePage"
import ProfilePage from "../pages/ProfilePage"

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "AuthMain",
    component: AuthView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomePage,
  },
  {
    path: '/profile',
    name: 'profile',
    component: ProfilePage,
  },
  {
    path: '*',
    redirect: {
      name: 'home',
    },
  },
];

const router = new VueRouter({
  mode: "history",
  routes
})

export default router

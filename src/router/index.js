import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthMain from "../views/AuthView.vue"
import HomeView from "../views/HomeView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'AuthMain',
    component: AuthMain
  },
  {
    path: '/home',
    name: 'HomeView',
    component: HomeView
  }
]

const router = new VueRouter({
  routes
})

export default router

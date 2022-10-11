import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthMain from "../views/AuthView.vue"

Vue.use(VueRouter)

const routes = [
  {
    path: '/auth',
    name: 'AuthMain',
    component: AuthMain
  }
]

const router = new VueRouter({
  routes
})

export default router

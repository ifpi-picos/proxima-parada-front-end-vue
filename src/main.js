import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.css'

createApp(App).use(router).mount('#app')

import 'bootstrap/dist/css/bootstrap.min.css'
Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

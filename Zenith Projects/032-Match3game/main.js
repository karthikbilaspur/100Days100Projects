import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

Vue.config.productionTip = false

Vue.use(VueAxios, axios)

axios.defaults.baseURL = 'http://localhost:4000/graphql'

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
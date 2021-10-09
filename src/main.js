import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./assets/css/tailwind.css"
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'
import Dropdown from 'vue-simple-search-dropdown';

Vue.config.productionTip = false
Vue.use(VueTimepicker)
Vue.use(Dropdown)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import jsonp from "jsonp";

// 生产环境关掉提示
Vue.config.productionTip = false
// 全局注册axios的api请求
Vue.prototype.axios = axios
// 全局注册jsonp跨域请求
Vue.prototype.jsonp = jsonp

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
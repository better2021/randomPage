import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import jsonp from 'jsonp';
import ElementUI from 'element-ui';
import NProgress from 'nprogress';
import VueLazyload from 'vue-lazyload';

import 'element-ui/lib/theme-chalk/index.css';
import 'nprogress/nprogress.css';

// 生产环境关掉提示
Vue.config.productionTip = false;
// 全局注册axios的api请求
Vue.prototype.axios = axios;
// 全局注册jsonp跨域请求
Vue.prototype.jsonp = jsonp;

Vue.use(ElementUI);
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://bpic.588ku.com/element_pic/00/16/09/0957d2353800e6e.jpg',
  loading: 'https://loading.io/spinners/comets/lg.comet-spinner.gif',
  attempt: 1
});

router.beforeEach((to, from, next) => {
  NProgress.start(to, from, next);
  setTimeout(() => next(), 300);
});

router.afterEach(transition => {
  NProgress.done();
  NProgress.remove();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

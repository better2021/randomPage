import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import jsonp from 'jsonp'
import ElementUI from 'element-ui'
import NProgress from 'nprogress'
import VueLazyload from 'vue-lazyload'

import 'element-ui/lib/theme-chalk/index.css'
import 'nprogress/nprogress.css'

// import './libs/effectClick'; // 鼠标点击背景变色效果

// 生产环境关掉提示
Vue.config.productionTip = false
// 全局注册axios的api请求
Vue.prototype.axios = axios
// 全局注册jsonp跨域请求
Vue.prototype.jsonp = jsonp

Vue.use(ElementUI)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: 'http://bpic.588ku.com/element_pic/00/16/09/0957d2353800e6e.jpg',
  loading: 'https://loading.io/spinners/comets/lg.comet-spinner.gif',
  attempt: 1
})

router.beforeEach((to, from, next) => {
  NProgress.start(to, from, next)
  setTimeout(() => next(), 300)
})

router.afterEach(transition => {
  NProgress.done()
  NProgress.remove()
})

// 创建自定义指令
Vue.directive('drag', {
  // bind 当指令绑定到元素上时触发
  bind(el, binding) {
    // el 当前绑定元素，binding 当前绑定对象
    // console.log(el, binding);
    el.onmousedown = function(e) {
      // 鼠标按下
      const disX = e.clientX - el.offsetLeft
      const disY = e.clientY - el.offsetTop

      document.onmousemove = function(e) {
        let L = e.clientX - disX
        let T = e.clientY - disY

        if (binding.modifiers.limit) {
          if (L < 0) L = 0
          if (T < 0) T = 0
        }

        el.style.left = L + 'px'
        el.style.top = T + 'px'
      }

      // 鼠标键弹起
      document.onmouseup = function(e) {
        document.onmousemove = null
      }

      return false
    }
  }
})

/**
 * 正式环境不出现console打印,警告等
 */

const isDev = /^(192\.168|localhost)/.test(window.location.host)
if (!isDev) {
  console.log = () => {}
  console.info = () => {}
  console.warn = () => {}
}

// $eventBus 和 内置的$root 是一样的
Vue.use({
  install(Vue) {
    Vue.prototype.$eventBus = new Vue()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

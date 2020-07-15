import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: resolve => require(['@/views/home'], resolve) // 路由懒加载
    },
    {
      path: '/about',
      name: 'about',
      component: resolve => require(['@/views/about'], resolve)
    },
    {
      path: '/film',
      name: 'film',
      component: resolve => require(['@/views/film'], resolve)
    },
    {
      path: '/joke',
      name: 'joke',
      component: resolve => require(['@/views/joke'], resolve)
    },
    {
      path: '/moive',
      name: 'moive',
      component: resolve => require(['@/views/moive'], resolve)
    },
    {
      path: '/music',
      name: 'music',
      component: resolve => require(['@/views/music'], resolve)
    },
    {
      path: '/video',
      name: 'video',
      component: resolve => require(['@/views/video'], resolve)
    },
    {
      path: '/viewImg',
      name: 'viewImg',
      component: resolve => require(['@/views/viewImg'], resolve)
    },
    {
      path: '/testRender',
      name: 'testRender',
      component: resolve => require(['@/views/testRender'], resolve)
    },
    {
      path: '/ball',
      name: 'ball',
      component: resolve => require(['@/views/ball'], resolve)
    },
    {
      path: '/product',
      name: 'product',
      component: resolve => require(['@/views/product'], resolve)
    },
    {
      path: '/movieTable',
      name: 'movieTable',
      component: resolve => require(['@/views/movieTable'], resolve)
    },
    {
      path: '/tanmu',
      name: 'tanmu',
      component: resolve => require(['@/views/tanmu'], resolve)
    },
    {
      path: '/editor',
      name: 'editor',
      component: resolve => require(['@/views/editor'], resolve)
    }
  ]
})

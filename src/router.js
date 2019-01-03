import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  base: process.env.BASE_URL,
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
    }
  ]
});

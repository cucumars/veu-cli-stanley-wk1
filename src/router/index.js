import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting(路由層級程式碼拆分)
    // this generates a separate chunk (about.[hash].js) for this route(這會為此路由生成一個單獨的塊 (about.[hash].js))
    // which is lazy-loaded when the route is visited.(訪問路由時延遲加載。)
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/comp-btn-a',
    name: 'compBtnA',
    component: () => import(/* webpackChunkName: "compBtnA" */ '@/views/CompBtnAView.vue')
  },
  {
    path: '/comp-btn-b',
    name: 'compBtnB',
    component: () => import(/* webpackChunkName: "compBtnB" */ '@/views/CompBtnBView.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import(/* webpackChunkName: "main" */ '@/views/MainView.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

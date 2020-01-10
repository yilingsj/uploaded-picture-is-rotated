/*
 * @Description:
 * @Author: yilingsj（315800015@qq.com）
 * @Date: 2020-01-04 14:36:09
 * @LastEditors  : yilingsj（315800015@qq.com）
 * @LastEditTime : 2020-01-10 17:02:09
 */
import Vue from 'vue'
import VueRouter, { RouterOptions } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
} as RouterOptions)

export default router

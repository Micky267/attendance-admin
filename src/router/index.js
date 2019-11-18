import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import TableAttend from '../views/TableAttend.vue'
/**
 * 重写路由的push方法
 */
const routerPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}
Vue.use(VueRouter)

const routes = [
  {
    path: '/', redirect: '/table-attend'
  },
  {
    path: '/table-attend',
    name: 'tableAttend',
    component: TableAttend
  },
  {
    path: '/echat-attend',
    name: 'echatAttend',
    component:  () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/EchatAttend.vue')
  },
  {
    path: '/apply-disposed',
    name: 'ApplyDisposed',
    component:  () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/ApplyDisposed.vue')
    // component: () => import('../views/ApplyDisposed.vue')
  },
  {
    path: '/apply-undispose',
    name: 'ApplyUndispose',
    component:  () => import(/* webpackChunkName: 'ImportFuncDemo' */ '../views/ApplyUndispose.vue')
    // component: () => import('../views/ApplyUndispose.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router

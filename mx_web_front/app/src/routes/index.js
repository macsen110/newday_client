import Vue from 'vue'
import Router from 'vue-router'

const index = resolve => require(['../pages/index.vue'], resolve)
const list = resolve => require(['../pages/list.vue'], resolve)
const pay = resolve => require(['../pages/pay.vue'], resolve)
/**
 * @path: /search 订单搜索
 * @review /review 商品评价
 */
const routes = [
  {
    path: '/',
    name: 'index',
    component: index
  },
  {
    path: '/list',
    name: 'list',
    component: list
  },
  {
    path: '/pay',
    name: 'pay',
    component: pay
  },
];
Vue.use(Router)
const router = new Router({
  routes
})

export default router;
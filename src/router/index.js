import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/views/layout'
import Search from '@/views/search'
import SearchList from '@/views/search/list'
import ProDetail from '@/views/prodetail'
import Login from '@/views/login'
import Pay from '@/views/pay'
import MyOrder from '@/views/myorder'
import Home from '@/views/layout/home.vue'
import Cart from '@/views/layout/cart.vue'
import Category from '@/views/layout/category.vue'
import User from '@/views/layout/user.vue'
import store from '@/store'
import comment from '@/views/prodetail/comment.vue'
import page from '@/views/pages/index.vue'
import AddPage from '@/views/pages/addPage.vue'
Vue.use(VueRouter)

const routes = [
  { path: '/login', component: Login },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: '/home', component: Home },
      { path: '/cart', component: Cart },
      { path: '/category', component: Category },
      { path: '/user', component: User }
    ]
  },
  {
    path: '/search',
    component: Search
  },
  {
    path: '/searchlist',
    component: SearchList
  },
  {
    path: '/prodetail/:id',
    component: ProDetail
  },
  {
    path: '/pay',
    component: Pay
  },
  {
    path: '/myorder',
    component: MyOrder
  },
  {
    path: '/comment:id',
    component: comment
  },
  {
    path: '/page',
    component: page
  },
  {
    path: '/addPage',
    component: AddPage
  }
]

const router = new VueRouter({
  routes
})
const url = ['/pay', 'myorder']
const token = store.getters.token
router.beforeEach((to, from, next) => {
  if (!url.includes(to.path)) {
    next()
    return
  }
  if (token) next()
  else next('/login')
})
export default router

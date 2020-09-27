import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MainPage from '../views/Main.vue'
import JobDetail from '../views/Detail.vue'

Vue.use(VueRouter)


const routes = [{
    path: '/',
    name: 'StartPage',
    component: Home
  },
  {
    path: '/mainpage',
    name: 'MainPage',
    component: MainPage
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
      path: '/jobdetail',
      name: 'JobDetail',
      component:JobDetail
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

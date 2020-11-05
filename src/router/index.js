import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/HomePage.vue'
import MainPage from '../views/MainPage.vue'
import JobDetail from '../views/DetailPage.vue'

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

import Vue from 'vue'
import VueRouter from '@/utils/vue-router'
const Home = () => import('@/pages/home')
const About = () => import('@/pages/about')

Vue.use(VueRouter)

const routes = [{
    path: '/home',
    component: Home,
    name: 'home'
  },
  {
    path: '/about',
    component: About,
    name: 'about'
  }
]

let router = new VueRouter({
  mode: 'history',
  routes
})

export default router
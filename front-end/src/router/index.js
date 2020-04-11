import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import PondAdmin from '../views/PondAdmin.vue'
import Chat from '../views/Chat.vue'
import ChatAdmin from '../views/ChatAdmin.vue'

Vue.use(VueRouter)

const routes = [{
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/pond-admin',
    name: 'pond-admin',
    component: PondAdmin
  },
  {
    path: '/chat',
    name: 'chat',
    component: Chat,
  },
  {
    path: '/chat-admin',
    name: 'chat-admin',
    component: ChatAdmin,
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
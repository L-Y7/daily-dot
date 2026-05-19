import { createRouter, createWebHashHistory } from 'vue-router'

import Daka from '../views/daka/index.vue'
import TodoList from '../views/todolist/index.vue'

const routes = [
  {
    path: '/',
    redirect: '/daka',
    children: [
      { path: '/todolist', component: TodoList },
    ],
  },
  { path: '/daka', component: Daka },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

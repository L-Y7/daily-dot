import { createRouter, createWebHashHistory } from 'vue-router'

import Login from '../views/login/index.vue'
import TodoList from '../views/todolist/index.vue'

const routes = [
  { path: '/', component: TodoList },
  { path: '/login', component: Login },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

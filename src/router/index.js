import { createRouter, createWebHashHistory } from 'vue-router'

import Layout from '../layout/index.vue'

import Daka from '../views/daka/index.vue'
import Tongji from '../views/shuju/index.vue'
import TodoList from '../views/todolist/index.vue'
import Xiguan from '../views/xiguan/index.vue'

const routes = [
  {
    path: '/login',
    component: () => import('../views/login/index.vue'),
  },

  {
    path: '/',
    component: Layout,

    redirect: '/daka',

    children: [
      {
        path: 'daka',
        component: Daka,
      },

      {
        path: 'todolist',
        component: TodoList,
      },
      {
        path: 'xiguan',
        component: Xiguan,
      },
      {
        path: 'shuju',
        component: Tongji,
      },
    ],
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

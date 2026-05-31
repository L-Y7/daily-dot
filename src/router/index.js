import { createRouter, createWebHashHistory } from 'vue-router'
import { UserNameKey } from '../utils/const'

import Layout from '../layout/index.vue'

import Daka from '../views/daka/index.vue'
import Tongji from '../views/shuju/index.vue'
import TodoList from '../views/todolist/index.vue'
import Xiguan from '../views/xiguan/index.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue'),
  },

  {
    path: '/',
    component: Layout,

    redirect: '/daka',

    children: [
      {
        path: 'daka',
        name: 'daka',
        component: Xiguan,
      },

      {
        path: 'todolist',
        name: 'todolist',
        component: TodoList,
      },
      {
        path: 'xiguan',
        name: 'xiguan',
        component: Daka,
      },
      {
        path: 'shuju',
        name: 'shuju',
        component: Tongji,
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/login',
  },
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  const isLogin = Boolean(localStorage.getItem(UserNameKey))

  if (to.path !== '/login' && !isLogin)
    return '/login'

  if (to.path === '/login' && isLogin)
    return '/daka'
})

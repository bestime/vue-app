
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';

const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL

const routes: Array<RouteRecordRaw> = [  
  {
    path: '/',
    name: 'ROUTE_HOME_ROOT',
    component: () => import('@/views/HomeView/index.vue'),
    redirect: {
      name: 'ROUTE_HOME_SUB'
    },
    children: [
      {
        path: '/subpage',
        name: 'ROUTE_HOME_SUB',
        component: () => import("@/views/HomeView/views/Child01/index.vue")
      }
    ]
  }
]

const router = createRouter({
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes
});
export default router

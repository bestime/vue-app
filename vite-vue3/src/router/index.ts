import { createRouter, createWebHashHistory, RouteRecordRaw, createWebHistory } from 'vue-router';

export const routes: Array<RouteRecordRaw> = [  
  {
    path: '/home',
    name: 'HOME',
    component: () => import('@/views/Home/index.vue'),    
    children: [
      {
        path: 'children',
        name: 'LiSi',
        component: () => import('@/views/LiSi/index.vue'),
      }
    ]
  },
  
]

const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL

const iRouter = createRouter({
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes
});


export default iRouter;
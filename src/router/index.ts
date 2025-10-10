
import { PERMISSIONID_SHARE } from '@/utils/constant'
import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL


export const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ROUTE_APP_ROOT',
    redirect: {
      name: 'ROUTE_APP_MANAGE'
    }
  },
  {
    path: '/manage',
    name: 'ROUTE_APP_MANAGE',
    component: () => import("@/pages/Manage/index.vue"),
    redirect: {
      name: 'ROUTE_HOME'
    },
    children: [
      {
        path: 'home',
        name: 'ROUTE_HOME',
        component: () => import("@/pages/Home/index.vue"),
        meta: {
          cache: true,
          permissionId: PERMISSIONID_SHARE
        }
      },
      {
        path: 'about',
        name: 'ROUTE_ABOUT',
        component: () => import("@/pages/About/index.vue"),
        meta: {
          cache: true,
          permissionId: '模拟权限001'
        }
      },
      {
        path: 'test',
        name: 'ROUTE_TEST',
        component: () => import("@/pages/About/pages/Test/index.vue"),
        meta: {
          cache: true,
          permissionId: '模拟权限002'
        }
      },
      {
        path: ':pathMatch(.*)*',
        name: 'ROUTE_NORMALSCREEN_PAGE404',
        component: () => import("@/pages/Page404/index.vue"),
        meta: {
          permissionId: PERMISSIONID_SHARE
        },
      },
      
    ]
  },
  {
    path: '/login',
    name: 'ROUTE_LOGIN_ROOT',
    component: () => import("@/pages/Login/index.vue"),
    meta: {
      cache: false,
      deprecated: false,
      permissionId: PERMISSIONID_SHARE
    }

  },
]

const router = createRouter({
  strict: true,
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes: routeList,
})

export default router

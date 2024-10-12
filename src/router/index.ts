
import { requestLocalFile } from '@/request';
import { createRouter, createWebHashHistory, createWebHistory } from 'vue-router';
import type { Router, RouteRecordRaw } from 'vue-router';
import { filterPermissionRoutes, updatePermissionRoutes } from '@bestime/nine-ui-vue3'


const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL
const defaultRouteNames = ['ROUTE_MANAGE_NOTEFOUND','ROUTE_APP_ROOT', 'ROUTE_LOGIN_ROOT']

export const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ROUTE_APP_ROOT',
    redirect: {
      name: 'ROUTE_MANAGE_ROOT'
    }
  },
  {
    path: '/login',
    name: 'ROUTE_LOGIN_ROOT',
    component: () => import("@/views/Login/index.vue")
  },
  {
    path: '/manage',
    name: 'ROUTE_MANAGE_ROOT',
    component: () => import('@/views/Manage/index.vue'),
    children: [
      {
        path: 'DataTable01',
        name: 'ROUTE_MANAGE_DATATABLE01',
        component: () => import('@/views/Manage/views/DataTable01/index.vue'),
      },
      {
        path: 'DataTable02',
        name: 'ROUTE_MANAGE_DATATABLE02',
        component: () => import('@/views/Manage/views/DataTable02/index.vue'),
      },
      {
        path: 'DataTable03',
        name: 'ROUTE_MANAGE_DATATABLE03',
        component: () => import('@/views/Manage/views/DataTable03/index.vue'),
      },
      {
        path: 'DataTable04',
        name: 'ROUTE_MANAGE_DATATABLE04',
        component: () => import('@/views/Manage/views/DataTable04/index.vue'),
      },
      {
        path: 'DataTable05',
        name: 'ROUTE_MANAGE_DATATABLE05',
        component: () => import('@/views/Manage/views/DataTable05/index.vue'),
      },
      {
        path: 'DataTable06',
        name: 'ROUTE_MANAGE_DATATABLE06',
        component: () => import('@/views/Manage/views/DataTable06/index.vue'),
      },
      {
        path: 'DataTable07',
        name: 'ROUTE_MANAGE_DATATABLE07',
        component: () => import('@/views/Manage/views/DataTable07/index.vue'),
      },
      {
        path: 'DataTable08',
        name: 'ROUTE_MANAGE_DATATABLE08',
        component: () => import('@/views/Manage/views/DataTable08/index.vue'),
      },
      {
        path: 'BB01',
        name: 'ROUTE_MANAGE_DATATABLEBB01',
        component: () => import('@/views/Manage/views/BB01/index.vue'),
      },
      {
        path: 'BB02',
        name: 'ROUTE_MANAGE_DATATABLEBB02',
        component: () => import('@/views/Manage/views/BB02/index.vue'),
      },
      {
        path: 'BB03',
        name: 'ROUTE_MANAGE_DATATABLEBB03',
        component: () => import('@/views/Manage/views/BB03/index.vue'),
      },
      {
        path: 'BB09',
        name: 'ROUTE_MANAGE_DATATABLEBB09',
        component: () => import('@/views/Manage/views/BB09/index.vue'),
      },
      {
        path: 'BB29',
        name: 'ROUTE_MANAGE_DATATABLEBB29',
        component: () => import('@/views/Manage/views/BB29/index.vue'),
      },
      {
        path: 'BB16',
        name: 'ROUTE_MANAGE_DATATABLEBB16',
        component: () => import('@/views/Manage/views/BB16/index.vue'),
      },
      {
        path: 'BB44',
        name: 'ROUTE_MANAGE_DATATABLEBB44',
        component: () => import('@/views/Manage/views/BB44/index.vue'),
      },
      {
        path: 'BB45',
        name: 'ROUTE_MANAGE_DATATABLEBB45',
        component: () => import('@/views/Manage/views/BB45/index.vue'),
      },
      {
        path: 'BB46',
        name: 'ROUTE_MANAGE_DATATABLEBB46',
        component: () => import('@/views/Manage/views/BB46/index.vue'),
      },
      {
        path: 'BB47',
        name: 'ROUTE_MANAGE_DATATABLEBB47',
        component: () => import('@/views/Manage/views/BB47/index.vue'),
      },
      {
        path: 'BB63',
        name: 'ROUTE_MANAGE_DATATABLEBB63',
        component: () => import('@/views/Manage/views/BB63/index.vue'),
      },
      {
        path: 'BY16',
        name: 'ROUTE_MANAGE_DATATABLEBY16',
        component: () => import('@/views/Manage/views/BY16/index.vue')
      },
      {
        path: ':pathMatch(.*)*',
        name: 'ROUTE_MANAGE_NOTEFOUND',
        component: () => import("@/views/Page404/index.vue")
      },
    ]
  }
]

const router = createRouter({
  strict: true,
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes: filterPermissionRoutes(routeList, defaultRouteNames)
});


/**
 * 刷新权限路由
 */
export async function refreshPermissionRoutes () {
  const { data } = await requestLocalFile<string[]>('/static/json/permission-routes.json')
  updatePermissionRoutes(router, routeList, data.concat(defaultRouteNames))
}
refreshPermissionRoutes()
export default router
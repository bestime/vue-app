
import { PERMISSIONID_SHARE } from '@/utils/constant'
import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router'

const routerMode = import.meta.env.VITE_ROUTER_MODE
const baseUrl = import.meta.env.BASE_URL


export const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ROUTE_APP_ROOT',
    meta: {
      permissionId: PERMISSIONID_SHARE
    },
    component: () => import('@/pages/Ready/index.vue'),
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
  {
    path: '/FuncBooth',
    name: 'ROUTE_FUNBOOTH',
    component: () => import('@/pages/FuncBooth/index.vue'),
    meta: {
      permissionId: PERMISSIONID_SHARE,
    },
  },
  {
    path: '/System',
    name: 'ROUTE_SYSTEM',
    component: () => import('@/pages/System/index.vue'),
    meta: {
      permissionId: '模拟权限001',
    },
    children: [
      {
        path: 'home',
        name: 'ROUTE_SYSTEM_HOME',
        component: () => import("@/pages/System/pages/Home/index.vue"),
        meta: {
          permissionId: '模拟权限002'
        }
      },
      {
        path: 'WholesaleBusiness',
        name: 'ROUTE_SYSTEM_WHOLESALEBUSINESS',
        component: () => import("@/pages/System/pages/WholesaleBusiness/index.vue"),
        meta: {
          permissionId: '模拟权限003'
        }
      },
    ]
  },  
]

function checkRepeatRoutes () {
  const registerNames: string[] = []
  jUtilsBase.forEachTree(routeList, function (item) {
    const name = item.name as string
    if(registerNames.includes(name)) {
      throw `路由名 "${name}" 重复，请更改`;
    } else {
      registerNames.push(name)
    }
  }) 
  const inited = jUtilsBase.treeFilter(routeList, function (item) {
    return item.meta?.permissionId === PERMISSIONID_SHARE
  })
  return inited
}

const router = createRouter({
  strict: true,
  history: routerMode === 'history' ? createWebHistory(baseUrl) : createWebHashHistory(),
  routes: checkRepeatRoutes(),
})

export default router


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
    path: '/permission-preview',
    name: 'ROUTE_PERMISSIONPERVIEW',
    component: () => import('@/pages/PermissonsPerview/index.vue'),
    meta: {
      cache: false,
      permissionId: PERMISSIONID_SHARE
    }
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
    path: '/manage',
    name: 'ROUTE_APP_MANAGE',
    component: () => import("@/pages/Manage/index.vue"),
    meta: {
      permissionId: PERMISSIONID_SHARE
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
        path: 'test-detail',
        name: 'ROUTE_TEST_DETAIL',
        component: () => import("@/pages/About/pages/Test/Detail.vue"),
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


import { PERMISSIONID_SHARE } from '@/utils/constant'
import { createRouter, createWebHashHistory, createWebHistory, type RouteLocationNormalizedLoadedGeneric, type RouteRecordRaw } from 'vue-router'

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
      cacheName: 'ROUTE_PERMISSIONPERVIEW',
      permissionId: PERMISSIONID_SHARE
    }
  },
  {
    path: '/login',
    name: 'ROUTE_LOGIN_ROOT',
    component: () => import("@/pages/Login/index.vue"),
    meta: {
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
          cacheName: 'ROUTE_HOME',
          cacheCannotRemove: true,
          permissionId: PERMISSIONID_SHARE,
          cacheTitle: function () {
            return '首页'
          }
        }
      },
      {
        path: 'about',
        name: 'ROUTE_ABOUT',
        component: () => import("@/pages/About/index.vue"),
        meta: {
          cacheName: 'ROUTE_ABOUT',
          permissionId: '模拟权限001',
          cacheTitle: function () {
            return '关于我们'
          }
        }
      },
      {
        path: 'about-other',
        name: 'ROUTE_ABOUT_OTHER',
        component: () => import("@/pages/About/index.vue"),
        meta: {
          cacheName: 'ROUTE_ABOUT',
          permissionId: '模拟权限001',
          cacheTitle: function () {
            return '关于其他'
          }
        }
      },
      {
        path: 'test',
        name: 'ROUTE_TEST',
        component: () => import("@/pages/About/pages/Test/index.vue"),
        meta: {
          cacheName: 'ROUTE_TEST',
          permissionId: '模拟权限002',
          cacheTitle: function () {
            return '测试列表'
          }
        }
      },
      {
        path: 'test-detail',
        name: 'ROUTE_TEST_DETAIL',
        component: () => import("@/pages/About/pages/Test/Detail.vue"),
        meta: {
          cacheName: 'ROUTE_TEST_DETAIL',
          permissionId: '模拟权限002',
          cacheTitle: function (route: RouteLocationNormalizedLoadedGeneric) {
            return `详情-${route.query.id}`
          }
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

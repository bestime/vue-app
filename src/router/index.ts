import { envConfig } from '@/utils/common';
import { createRouter, createWebHashHistory, createWebHistory, type RouteRecordRaw } from 'vue-router';
import checkRepeatRouteNames from './utils/checkRepeatRouteNames';

const routeList: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'ROUTE_HOME',
    redirect: {
      name: 'ROUTE_LEVEL_ONE_TWO',
    },
    children: [
      {
        path: 'level01',
        name: 'ROUTE_LEVEL_ONE',
        component: () => import('@/views/LevelOne/index.vue'),
        children: [
          {
            path: 'level02',
            name: 'ROUTE_LEVEL_ONE_TWO',
            component: () => import('@/views/LevelOne/views/LevelTwo/index.vue'),
          },
        ],
      },
    ],
  },
];

const iRouter = createRouter({
  history: envConfig.routeMode === 'history' ? createWebHistory(envConfig.baseURL) : createWebHashHistory(),
  routes: checkRepeatRouteNames(routeList),
});

export default iRouter;

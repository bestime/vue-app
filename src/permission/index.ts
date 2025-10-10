import { apiLoginLoginResultData } from "@/services";
import type { Router, RouteRecordRaw } from 'vue-router';
import { IS_DEV, PERMISSIONID_SHARE } from "@/utils/constant";
import { PERMISSID_DEV } from "@/utils/constant";
import { last } from "lodash-es";
import router, { routeList } from "@/router";

function getMetaPpermissionId (item: RouteRecordRaw) {
  // 正式版暂时屏蔽废弃的页面
  if(item.meta?.deprecated === true && import.meta.env.VITE_APP_RUNMODE === '正式版') {
    return;
  }
  return item.meta?.permissionId as string | undefined
}

function filterPermissionRoutes (data: Array<RouteRecordRaw>, routeNames: string[]) {
  const newList = jUtilsBase.treeFilter(data, function (item) {
    let isSafeIn = routeNames.includes(item.name as string)
    if(!isSafeIn && jUtilsBase.isArray(item.children)) {
      const it = jUtilsBase.deepFindItem(item.children, function (cd) {
        return routeNames.includes(cd.name as string)
      })
      return !!it
    }
    return isSafeIn
  })
  return newList
}

/**
 * 通过浏览器地址栏获取当前vue路由fullPath
 * @param router 路由实例
 * @returns 重定向 fromPath（当前浏览器地址栏的地址与vue路由不匹配时，可用此地址重定向）
 */
function getCurrentRouteFullPath (router: Router) {
  const base = router.options.history.base
  const isHash = /#$/.test(base)
  let fullPath = ''
  const cPath = router.currentRoute.value.path
  if(isHash) {
    fullPath = window.location.hash.replace(/.*#(.*?)(\?.*)?$/, '$1')
  } else {
    fullPath = window.location.pathname.replace(new RegExp(base), '')
  }
  return cPath === fullPath && fullPath !== '' ? void 0 : fullPath
}

async function updatePermissionRoutes (router: Router, allRoutes: Array<RouteRecordRaw>, routeNames: string[], redirect?: boolean) {
  redirect = jUtilsBase.isNull(redirect) ? true : redirect
  const newRoutes = filterPermissionRoutes(allRoutes, routeNames)
  const oldRoutes = router.getRoutes()
  
  for(let a =0;a<oldRoutes.length;a++) {
    const na = oldRoutes[a]!.name
    if(jUtilsBase.isString(na) && !routeNames.includes(na)) {
      router.removeRoute(na)
    }
  }
  
  jUtilsBase.forEachTree(newRoutes, function (item, parent) {
    if(item.name && !router.hasRoute(item.name)) {
      const lastParent = last(parent)?.name
      if(lastParent) {
        router.addRoute(lastParent, item)
      } else {
        router.addRoute(item)
      }      
    }
  })


  if(redirect) {
    const fromPath = getCurrentRouteFullPath(router)
    if(fromPath) {
      const toRoute = router.getRoutes().find(function (c) {
        return c.path === fromPath
      })
      if(toRoute) {
        await router.replace(toRoute)
      }
    }
  }
}

let permissionIds: string[] = []

export async function reloadRoutes () {
  const res = await apiLoginLoginResultData().then(function (_) {
    return _.data.data
  }).catch(function () {
    return;
  })
  permissionIds = jUtilsBase._Array(res?.permissions).map(function (c: any) {
    return c.key
  })
  if(IS_DEV) {
    permissionIds = [
      '模拟权限002',
      '模拟权限001',
    ]
  }

  if(import.meta.env.VITE_APP_RUNMODE === '测试版') {
    permissionIds.push(PERMISSID_DEV)
  } 
  const pNames = getRouteNames()
  // console.log("当前用户的权限", permissionIds)
  await updatePermissionRoutes(router, routeList, pNames, false)    
  return {
    permissionIds
  }
}

export function getRouteNames () {
  return parseJavaPermissionToRouteName(permissionIds, routeList)
}

function parseJavaPermissionToRouteName (data: string[], routeList:RouteRecordRaw[]) {
  const ids = [PERMISSIONID_SHARE].concat(data)
  const result: Array<string> = []
  jUtilsBase.forEachTree(routeList, function (item) {
    const psid = getMetaPpermissionId(item)
    let hasShow = jUtilsBase.isNull(psid) ? false : ids.includes(psid)
    if(!hasShow && item.children) {
      const paths = jUtilsBase.deepFindItem(item.children, function (dp) {
        const psid = getMetaPpermissionId(dp)
        return jUtilsBase.isNull(psid) ? false : ids.includes(psid)
      })
      hasShow = !!paths
    }

    if(hasShow && jUtilsBase.isString(item.name)) {
      result.push(item.name)
    }
  })
  return result
}
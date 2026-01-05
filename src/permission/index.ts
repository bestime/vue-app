import { apiLoginLoginResultData } from "@/services";
import type { Router, RouteRecordRaw } from 'vue-router';
import { IS_DEV, PERMISSIONID_SHARE } from "@/utils/constant";
import { PERMISSID_DEV } from "@/utils/constant";
import router, { routeList } from "@/router";
import { ElMessage } from "element-plus";

import { updatePermissionRoutes } from '@bestime/nine-ui-vue3'


/**
 * 缓存当前权限ID集
 */
let permissionIds: string[] = []


/**
 * 获取路由表单项配置的权限ID
 * @param item 
 * @returns 
 */
function getMetaPpermissionId (item: RouteRecordRaw) {
  // 正式版暂时屏蔽废弃的页面
  if(item.meta?.deprecated === true && import.meta.env.VITE_APP_RUNMODE === '正式版') {
    return;
  }
  return item.meta?.permissionId as string | undefined
}


/**
 * 获取当前有权限的路由（请等待权限刷新后再使用）
 * @returns 
 */
export function getRouteNames () {
  return parseJavaPermissionToRouteName(permissionIds, routeList)
}

/**
 * 将权限ID解析为对应的路由名
 * @param data 权限ID集合
 * @param routeList 路由表
 * @returns 
 */
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

/**
 * 刷新路由
 * @returns 
 */
export async function reloadRoutes (disabled?: boolean) {
  if(disabled === true) return;
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
      '模拟权限003'
    ]
  }

  if(import.meta.env.VITE_APP_RUNMODE === '测试版') {
    permissionIds.push(PERMISSID_DEV)
  } 
  const pNames = getRouteNames()
  // console.log("当前用户的权限", permissionIds)
  await updatePermissionRoutes(router, routeList, pNames)    
  return {
    permissionIds
  }
}


const excludeNames = ['ROUTE_APP_ROOT', 'ROUTE_LOGIN_ROOT', 'ROUTE_APP_MANAGE', 'ROUTE_PERMISSIONPERVIEW']
export function getFirstRouteName () {
  const names = getRouteNames()  
  const res = names.find(c=>!excludeNames.includes(c))
  if(!res) {
    ElMessage.error('请确认该账号权限是否配置正确！')
  }
  console.log("第一个", res)
  return res
}
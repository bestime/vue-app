import type { TLocals } from "@/i18n";
import { LANGUAGE_KEY, TOKEN_KEY } from "./constant";
import type { IMenuItem} from '@/pages/System/components/TopHeader/lib'



/**
 * 移除当前账户token 
 * @returns 
 */
export function removeToken () {
  jUtilsBrowser.removeCookie(TOKEN_KEY)
}

/**
 * 等待函数
 * @param millisecond 
 * @returns 
 */
export async function sleep (millisecond: number) {
  return new Promise(function (resolve) {
    setTimeout(resolve, millisecond)
  })
}

/**
 * 缓存当前使用的语言
 * @returns 
 */
export function setLanguage (name: string) {
  jUtilsBrowser.setStorage(LANGUAGE_KEY, name)
}

/**
 * 获取上次使用的语言
 * @returns 
 */
export function getLanguage() {
  const locale = (jUtilsBrowser.getStorage(LANGUAGE_KEY) || 'zh') as TLocals
  document.querySelector('html')?.setAttribute('lang', locale);  
  return locale
}

export function getActiveMenuPath (menuList: IMenuItem[], currentRouteName: string) {
  return jUtilsBase.deepFindTreePath(menuList, function (item) {
    return currentRouteName === item.routeName
  }, {
    id: 'routeName',
    children: 'children'
  })
}

export function isActiveMenu (menuList: IMenuItem[], currentRouteName: string, muenId: string) {
  const path: IMenuItem[] = getActiveMenuPath(menuList, currentRouteName) ?? []
  if(jUtilsBase.isArray(path) && path.length) {
    return path.some(function (item) {
      return item.routeName === muenId
    })
  }
  return false
}
import type { TLocals } from "@/i18n";
import { LANGUAGE_KEY, TOKEN_KEY } from "./constant";



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


const rsa = new JSEncrypt();
rsa.setPublicKey(window.__APP_PUBLICKKEY);
rsa.setPrivateKey(window.__APP_PRIVATEKEY);

/**
 * 数据加密
 * @param data 
 * @returns 
 */
export function encodeMessage(data: string) {
  const res = rsa.encrypt(data)
  return res === false ? '加密失败' : res
}


/**
 * 数据解密
 * @param data 
 * @returns 
 */
export function decodeMessage(data: string) {
  const res = rsa.decrypt(data);
  return res === false ? "解密失败" : res;
}

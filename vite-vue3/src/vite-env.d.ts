/// <reference types="vite/client" />



declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  /** vue-rotuer 的 baseUrl */
  readonly VITE_ROUTER_BASE: string
  
  /** vue-rotuer 路由模式 */
  readonly VITE_ROUTER_MODE: 'hash' | 'history'
}


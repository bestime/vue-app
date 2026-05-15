declare global {
  /** 项目打包时间戳 */
  var viteBuildTime: string

  /** 非对称加密插件，采用标签引入，不需要构建和TS提示，使用时封装为统一入口 */
  var JSEncrypt: any

  interface Window {
    __APP_PUBLICKKEY: string
    __APP_PRIVATEKEY: string
    
  }  
}






// 为了保证可以声明 declare global
export default undefined;


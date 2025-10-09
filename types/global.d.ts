declare global {
  /** 项目打包时间戳 */
  var viteBuildTime: string
  const WxLogin: any

  interface Window {
    /** 导出前端日志 */
    exportRuntimeLogToJson: ()=> void
    setTimeout: any
    
  }  
}






// 为了保证可以声明 declare global
export default undefined;


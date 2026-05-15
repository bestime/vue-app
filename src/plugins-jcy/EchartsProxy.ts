
import * as echarts from 'echarts';
import type { ECharts, EChartsOption } from 'echarts'

export interface IConfig {
  resize: boolean
}

/**
 * TS版echarts代理封装，方便其他地方使用
 */
export default class EchartsProxy {
  _el: HTMLDivElement | undefined
  _instence: ECharts | undefined
  _oldOptions:EChartsOption | undefined  
  _config: IConfig
  _obvRsize: ReturnType<typeof jUtilsBrowser.observeDomResize> | undefined
  constructor(config?: IConfig){
    this._config = Object.assign({
      resize: false
    }, config)
    this.resize = this.resize.bind(this)
  }


  resize () {
    if(this._instence) {
      this._instence.resize({
        animation: {
          easing: 'cubicInOut',
          duration: 500
        }
      })
    }    
  }

  setOption (data: EChartsOption) {
    if(this._instence) {
      this._instence.setOption(data, true)
    }
    if(data!== this._oldOptions) {
      this._oldOptions = data
    }
  }

  setDom (data: HTMLDivElement) {    
    this.removeDom()
    console.log("图表-显示")
    this._el = data
    this._instence = echarts.init(data);
    if(this._oldOptions) {
      this.setOption(this._oldOptions)
    }
    
    if(this._config?.resize) {
      this._obvRsize = jUtilsBrowser.observeDomResize(data, this.resize, ['width', 'height'], 500)
    }
  }

  removeDom () {
    this._obvRsize?.()
    if(this._instence) {
      this._instence?.dispose()
      this._instence = undefined
    }
    this._el = undefined    
  }
  

  dispose () {
    console.log("图表-销毁")
    this.removeDom()
    this._oldOptions = undefined
    // @ts-ignore
    this._config = undefined
  }
}
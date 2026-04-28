import { Animate } from "@bestime/utils_base";
import { Marker } from "maptalks";
import type { MarkerOptionsType } from "maptalks/dist/geometry/Marker";

interface IAnimateConfig {
  duration?: number
}


export default class AnimateMarker extends Marker {
  
  _amCfg = {
    duration: 0,
    controller: undefined as Animate<any> | undefined,
    doing: false, // 正在执行
    active:false, // 活动状态
  }
  constructor(center: number[], options:MarkerOptionsType, animateConfig?: IAnimateConfig) {    
    super(center, options)
    this._amCfg.duration = animateConfig?.duration ?? 2000
  }
  remove () {
    this._amCfg.controller?.dispose()
    this.stop()
    super.remove()
    return this;
  }
  _getSymbols () {
    const sb = this.getSymbol()
    let res: any[] = []
    if(jUtilsBase.isArray(sb)) {
      res = sb
    } else if(!jUtilsBase.isNull(sb)) {
      res.push(sb)
    }
    return res
  }

  
  
  _loopScale (reverse?: boolean) {
    this._amCfg.doing = true    
    const symbols = this._getSymbols()
    this._amCfg.controller?.dispose()

    let fromRatio = 1
    let toRatio = 2
    if(reverse) {
      fromRatio = 2
      toRatio = 1
    }

    this._amCfg.controller = new Animate({
      from: {
        ratio: fromRatio
      },
      to: {
        ratio: toRatio
      },
      easing: function(t, b, c, d) {
        if ((t /= d / 2) < 1) return c / 2 * t * t * t * t * t + b;
        return c / 2*((t -= 2) * t * t * t * t + 2) + b;
      },
      duration: this._amCfg.duration,
      onChange: (response, process) =>{
        symbols.forEach(item => {
          if(item.markerFile) {
            if(!item._ready) {
              item._ready = true
              item._width = item.markerWidth
              item._height = item.markerHeight
              item._direction = 1
            } else {
              item._direction = -1*item._direction
            }
            if(item._direction === 1) {
              item.markerWidth = item._width * response.ratio
              item.markerHeight = item._height * response.ratio
            }
          }
        }) 
        this.updateSymbol(symbols)
        if(process === 1) {
          if(reverse && !this._amCfg.active) {
            this._amCfg.doing = false
            this.stop()
          } else {
            this._loopScale(!reverse)  
          }          
        }
      }
    })
    
    this._amCfg.controller.start()
  }

  isAnimating () {
    return this._amCfg.active
  }

  start () {
    if(this._amCfg.doing) {
      this._amCfg.active = true
    } else {
      this._amCfg.active = true
      this._loopScale()
    }
  }

  /**
   * 不会立即停止，只有在回到初始状态时停止
   */
  stop () {
    this._amCfg.active = false
  }

  
}

AnimateMarker.registerJSONType("AnimateMarker");
import { Animate, isNull } from "@bestime/utils_base";
import { Marker, MultiLineString } from "maptalks";
import type { MarkerOptionsType } from "maptalks/dist/geometry/Marker";
import { along, bearing, lineDistance, point } from 'turf'


interface IAnimateConfig {
  
  /** 一步跑多远，单位（米） */
  step: number

  /** 是否循环运动 */
  loop: boolean

  /** 是否来回运动 */
  back: boolean
}

type TMoveCb = (ratio: number) => void


export default class MoveMarker extends Marker {
  _uCfg: IAnimateConfig
  
  _amCfg = {
    playCh: {
      idx: 0,
      data: [] as Array<Array<number>>,
      dis: 0
    },
    timer: undefined as any,
    line: [] as Array<number>,

  }
  constructor(center: number[], options:MarkerOptionsType, animateConfig?: Partial<IAnimateConfig>) {
    super(center, options)
    this._uCfg = Object.assign({
      back: true,
      step: 300,
      loop: true
    }, animateConfig)
  }
  
  remove () {    
    clearInterval(this._amCfg.timer)
    // @ts-ignore
    this._amCfg = undefined, this._uCfg=undefined;
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

  pause () {
    clearInterval(this._amCfg.timer)
  }

  play () {
    const from = this._amCfg.playCh.data[this._amCfg.playCh.idx]!
    const to = this._amCfg.playCh.data[this._amCfg.playCh.idx+1]!

    this._drawPointToPoint(from, to, this._amCfg.playCh.dis)
  }


  _setRotate (rotation: number) {
    const symbols = this._getSymbols()
    symbols.forEach(item => {
      if(item.markerFile) {
        item.markerRotation = rotation
      }
    })
    this.updateSymbol(symbols) 
  }



  _drawPointToPoint (from: Array<number>, to: Array<number>, distance: number) {
    const rotate = 360 - bearing(point(from), point(to))
    this._setRotate(rotate)
    const feature = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [
          from,
          to
        ],
      },
    } as any
    
    const totalDistance = lineDistance(feature, 'meters')

    const moveOnce  = () => {
      const coordinates = along(feature, distance, 'meters').geometry.coordinates
      
      
      this.setCoordinates(coordinates)
      let ratio = distance === totalDistance ? 1 : distance/totalDistance
      
      
      if(distance>=totalDistance) {
        clearInterval(this._amCfg.timer)
      }
      this._amCfg.playCh.dis = distance
      this._drawCallback(ratio)
      distance+=this._uCfg.step
    }

    clearInterval(this._amCfg.timer)
    
    
    this._amCfg.timer = setInterval(moveOnce, 20);
    moveOnce()    
  }

  _drawCallback (ratio: number) {
    const index = this._amCfg.playCh.idx
    const data = this._amCfg.playCh.data
    if(ratio >= 1) {
      if(index<data.length-2) {
        // 跳步
        this._drawLine(data, index+1)
      } else {
        // 一条线跑完了
        console.log("跑完一条线")
        if(this._uCfg.loop) {
          if(this._uCfg.back) {
            data.reverse()
          }
          this._drawLine(data, 0)
        }
        // this._drawLine(data, 0)
      }
    }
  }

  async _drawLine (data: Array<Array<number>>, index=0) {
    const from = data[index]!
    const to = data[index+1]!
    this._amCfg.playCh.idx = index
    this._amCfg.playCh.data = data
    console.log("跳步", index, from, to)
    this._drawPointToPoint(from, to, 0)
  }

  setSingleLine (data: Array<Array<number>>) {    
    this._drawLine(data)
  }

}

MoveMarker.registerJSONType("MoveMarker");
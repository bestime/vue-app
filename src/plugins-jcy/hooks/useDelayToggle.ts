import { debounce, throttle } from "lodash-es";
import { reactive } from "vue";

/**
 * 这个主要用于鼠标移入移出，显示/隐藏信息框此类场景，避免频繁触发
 */
export default function useDelayToggle () {
  let count=0
  
  const state = reactive({
    id: '',
    visible: false
  })

  function delayClose (id: string, countId: number) {
    if(countId === count) {        
      state.id = ''
      state.visible = false
      console.log("======移出", id, countId)          
    }  
  }

  /**
   * 不采用requestAnimationFrame的原因是，它可能执行在 “显示之前”
   * 延迟设置大的原因是为了此种场景：鼠标频繁移入移出，再次移入应当视为“未移出”，不然如果有loading等详情框，会看起来很闪
   */
  const closeDebounce = debounce(function (id: string, countId: number) {
    delayClose(id, countId)
  }, 200)

  return {
    state,
    /**
     * 
     * @param id 需要一个ID区分移入移出的对象
     * @param data 
     */
    show (id: string, data?: any) {
      count++
      if(state.id !== id) {
        state.id = id      
        state.visible = true
        console.log("=====移入", id, count)
      }
    },
    close (id: string) {
      closeDebounce(id, count)
    }
  }
}
import { computed, reactive, ref } from "vue";

/**
 * 使用累计值，坚持loading配对使用，防止被其他行为误关闭
 * @param data 初始状态
 * @returns 
 */
export default function useLoading (data=false) {
  const state = reactive({
    visible: data,
    count: data ? 1 : 0
  })

  function show () {
    state.visible = true
    state.count++
  }

  function close () {    
    if(state.count <= 1) {
      state.count = 0
      state.visible = false
    } else {
      state.count--
    }
  }

  function reset () {
    state.count = 0
    state.visible = false
  }

  return {
    state,
    show,
    close,
    reset
  }
}
import { _Number } from "@bestime/utils_base"
import { reactive } from "vue"

export default function usePager (sizes: number[]) {
  const state = reactive({
    current: 1,
    size: _Number(sizes[0]),
    total: 0,
    /** 这个参数在antdv中用字符串才能显示正常 */
    sizes
  })
  return {
    state,
    set (current: number, total: number) {
      state.current = current
      state.total = total
    }
  }
}
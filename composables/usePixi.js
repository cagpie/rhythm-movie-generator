import { ref } from 'vue'

const app = ref(null)
const background = ref(null)
const isInited = ref(false)

export function usePixi() {
  return {
    app,
    background,
    isInited,
  }
}

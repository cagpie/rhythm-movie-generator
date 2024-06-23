import { ref } from 'vue'

const app = ref(null)
const background = ref(null)

export function usePixi() {
  return {
    app,
    background,
  }
}

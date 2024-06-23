import { ref } from 'vue'

const app = ref(null)

export function usePixi() {
  return {
    app,
  }
}

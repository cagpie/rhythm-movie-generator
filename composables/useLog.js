import { ref } from 'vue'

const log = ref([])

export function useLog() {
  return {
    log,
  }
}

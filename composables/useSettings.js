import { ref } from 'vue'

const settings = ref({
  bpm: 150,
  fps: 30,
  length: 8,
})

export function useSettings() {
  return {
    settings,
  }
}

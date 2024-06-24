import { ref } from 'vue'

const settings = ref({
  width: 1280,
  height: 720,
  fps: 30,
  bpm: 150,
  duration: 8,
  backgroundColor: '0x003388',
})

export function useSettings() {
  return {
    settings,
  }
}

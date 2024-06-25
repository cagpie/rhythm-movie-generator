import { ref } from 'vue'

const settings = ref({
  width: 1920,
  height: 1080,
  fps: 30,
  bpm: 150,
  duration: 8,
  backgroundColor: '0x003388',
  memo: 'メモを書くことができるよ',
})

export function useSettings() {
  return {
    settings,
  }
}

import { ref } from 'vue'

const parts = ref([])

export function useParts() {
  return {
    parts,
  }
}

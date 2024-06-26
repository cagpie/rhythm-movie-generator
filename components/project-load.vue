<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
      type="button"
      @click="open"
    >
      読込
    </button>
    <div v-if="isLoading">loading</div>
  </div>
</template>

<script setup lang="js">
import { useFileDialog } from '@vueuse/core'

const { loadProject } = useProjectLoader()

const { open, onChange } = useFileDialog({
  accept: 'application/json',
  directory: false,
})

const isLoading = ref(false)

onChange((files) => {
  isLoading.value = true

  const fileData = files[0]

  if (!fileData.type.match('application/json')) {
    alert('画像を選択してください')
    isLoading.value = false
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    const json = JSON.parse(reader.result)

    loadProject(json)

    isLoading.value = false
  }
  reader.readAsText(fileData)
})
</script>

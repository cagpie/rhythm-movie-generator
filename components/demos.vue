<template>
  <div class="grid grid-cols-2 gap-2">
    <button
      type="button"
      @click="load('demo1.json')"
    >
      デモ1
    </button>
    <button
      type="button"
      @click="load('demo2.json')"
    >
      デモ2
    </button>
    <div v-if="isLoading">loading</div>
  </div>
</template>

<script setup lang="js">

const { loadProject } = useProjectLoader()

const isLoading = ref(false)

const load = (fileName) => {
  isLoading.value = true

  fetch(fileName)
    .then((response) => {
      return response.json()
    })
    .then((json) => {
      loadProject(json)
      isLoading.value = false
    })
}
</script>

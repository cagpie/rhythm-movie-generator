<template>
  <div class="grid grid-cols-3 gap-2">
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
    <button
      type="button"
      @click="load('demo3.json')"
    >
      デモ3
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

onMounted(() => {
  setTimeout(() => {
    if (!window.sprites || window.sprites.length) {
      return
    }
    load('demo1.json')
  }, 100)
})
</script>

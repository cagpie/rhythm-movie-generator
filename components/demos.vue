<template>
  <div class="flex items-center">
    <a
      class="text-blue-700 border border-blue-700 hover:border-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2"
      href="https://rhythm-movie-forum.vercel.app"
      target="_blank"
    >
      みんなの投稿作品から読み込む / 投稿する
    </a>
    <div v-if="isLoading">(loading)</div>
  </div>
</template>

<script setup lang="js">
const route = useRoute()

const { isInited } = usePixi()
const { loadProject } = useProjectLoader()

const isLoading = ref(false)

const load = (fileName) => {
  isLoading.value = true

  fetch(fileName)
    .then((response) => {
      return response.json()
    })
    .then(async (json) => {
      await loadProject(json)
      isLoading.value = false
    })
}

watch(() => isInited.value, (isInited) => {
  if (!isInited) {
    return
  }

  const forum = route.query.forum

  if (forum) {
    load(`https://firebasestorage.googleapis.com/v0/b/rhythm-movie-generator.appspot.com/o/${encodeURIComponent('projects/' + forum.replace('_', '/'))}?alt=media`)
  }
  else {
    load('demo1.json')
  }
})
</script>

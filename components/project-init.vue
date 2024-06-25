<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="init"
    >
      リセット
    </button>
  </div>
</template>

<script setup lang="js">
const { app } = usePixi()
const { parts } = useParts()

const init = () => {
  if (parts.value.length) {
    if (!confirm('現在の内容を破棄しますがよろしいですか？')) {
      return false
    }

    parts.value.forEach((part) => {
      const sprite = window.sprites.find(s => s.appUniqueKey === part.key)
      app.value.stage.removeChild(sprite)
    })

    window.sprites = []
    parts.value = []
  }
}
</script>

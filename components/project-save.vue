<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="save"
    >
      保存
    </button>
  </div>
</template>

<script setup lang="js">
const { parts } = useParts()
const { settings } = useSettings()
const { log } = useLog()

const save = async () => {
  log.value.push('sys: save start')

  const data = {
    version: 'rythm-movie-generator-v1',
    settings: settings.value,
    parts: parts.value,
  }

  const blob = new Blob([JSON.stringify(data)], { type: 'application/json' })
  const link = window.document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `rhythm-movie-generator-${Date.now()}.json`
  link.click()

  log.value.push('sys: save done')
  log.value.push('sys: プロジェクトを再読み込みする際はjsonファイルを選択してロードしてください')
}
</script>

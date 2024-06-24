<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="open"
    >
      Load
    </button>
    <div v-if="isLoading">loading</div>
  </div>
</template>

<script setup lang="js">
import * as PIXI from 'pixi.js'
import { useFileDialog } from '@vueuse/core'

const { app } = usePixi()
const { parts } = useParts()
const { settings } = useSettings()

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
    console.log(json)

    if (json.version !== 'rythm-movie-generator-v1') {
      alert('対応していないバージョンのファイルです')
      isLoading.value = false
      return
    }

    Object.keys(json.settings).forEach((key) => {
      settings.value[key] = json.settings[key]
    })

    json.parts.forEach((part) => {
      const image = new Image()
      image.src = part.base64

      image.onload = async () => {
        const key = part.key
        const sprite = new PIXI.Sprite(PIXI.Texture.from(image))
        sprite.appUniqueKey = key

        parts.value.push(part)

        // Nuxtのreactiveの中に入れると壊れるのでグローバルに入れて扱う
        window.sprites.push(sprite)

        app.value.stage.addChild(sprite)

        isLoading.value = false
      }
    })
  }
  reader.readAsText(fileData)
})
</script>

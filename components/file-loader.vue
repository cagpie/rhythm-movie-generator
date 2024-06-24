<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="open"
    >
      Add Image File
    </button>
    <div v-if="isLoading">loading</div>
  </div>
</template>

<script setup lang="js">
import * as PIXI from 'pixi.js'
import { useFileDialog } from '@vueuse/core'

const { app } = usePixi()
const { parts } = useParts()

const { open, onChange } = useFileDialog({
  accept: 'image.*',
  directory: false,
})

const isLoading = ref(false)

onChange((files) => {
  isLoading.value = true

  const fileData = files[0]

  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください')
    isLoading.value = false
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.src = reader.result

    image.onload = async () => {
      const key = Math.random().toString()
      const sprite = new PIXI.Sprite(PIXI.Texture.from(image))
      sprite.appUniqueKey = key

      parts.value.push({
        key: key,
        // sprite: sprite, // なんか循環参照になってここに追加できん😇
        name: fileData.name,
        base64: reader.result,
        position: {
          x: 300,
          y: 300,
        },
        scale: {
          x: 1,
          y: 1,
        },
        anchor: {
          x: 0.5,
          y: 0.5,
        },
        rotation: 0,
        zIndex: 1000 + parts.value.duration * 100,
        expressions: [{ type: '', options: '{}', enabled: true }],
      })

      // Nuxtのreactiveの中に入れると壊れるのでグローバルに入れて扱う
      window.sprites.push(sprite)

      app.value.stage.addChild(sprite)

      isLoading.value = false
    }
  }
  reader.readAsDataURL(fileData)
})
</script>

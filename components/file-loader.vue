<template>
  <div>
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 w-full"
      type="button"
      @click="open"
    >
      画像追加
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

      const container = new PIXI.Container()
      const spr = new PIXI.Sprite(PIXI.Texture.from(image))
      container.addChild(spr)
      container.appUniqueKey = key

      parts.value.push({
        key: key,
        name: fileData.name,
        base64: reader.result,
        listing: true,
        visible: true,
        parentKey: null,
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
        alpha: 1,
        expressions: [{ type: '', options: '{}', enabled: true }],
      })

      // Nuxtのreactiveの中に入れると壊れるのでグローバルに入れて扱う
      window.containers.push(container)

      app.value.stage.addChild(container)

      isLoading.value = false
    }
  }
  reader.readAsDataURL(fileData)
})
</script>

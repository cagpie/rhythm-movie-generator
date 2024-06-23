<template>
  <div>
    <div ref="canvasWrapper"/>
  </div>
</template>

<script setup lang="js">
import { Application } from 'pixi.js'

const canvasWrapper = ref(null)

const { app } = usePixi()
const { settings } = useSettings()
const { isFfmpegExecuting, renderFrame } = useRender()

onMounted(async () => {
  app.value = new Application()
  await app.value.init({ preserveDrawingBuffer: true })
  canvasWrapper.value.appendChild(app.value.canvas)

  window.sprites = []
  step()
})

const step = () => {
  if (isFfmpegExecuting.value) {
    // レンダリング中はループを減らす
    setTimeout(() => {
      step()
    }, 1000)
    return
  }

  // previewの再生時点はDate.now()を基点に計算する
  const timing = (Date.now() % (((60 / settings.value.bpm) * 1000) * settings.value.length)) / ((60 / settings.value.bpm) * 1000)

  renderFrame(timing)
  app.value.render()

  setTimeout(() => {
    step()
  }, 1000 / settings.value.fps)
}
</script>

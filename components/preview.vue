<template>
  <div
    ref="canvasWrapper"
    class="[&>canvas]:w-[100%]"
  />
</template>

<script setup lang="js">
import { Application, Graphics } from 'pixi.js'

const canvasWrapper = ref(null)

const { app, background } = usePixi()
const { settings } = useSettings()
const { isFfmpegExecuting, renderFrame } = useRender()

onMounted(async () => {
  app.value = new Application()
  await app.value.init({ width: settings.value.width, height: settings.value.height, preserveDrawingBuffer: true })
  canvasWrapper.value.appendChild(app.value.canvas)

  const graphics = new Graphics()
  app.value.stage.addChild(graphics)
  background.value = graphics
  graphics.zIndex = -1
  graphics.rect(0, 0, settings.value.width, settings.value.height)
  graphics.fill(settings.value.backgroundColor)

  window.containers = []
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
  const timing = (Date.now() % (((60 / settings.value.bpm) * 1000) * settings.value.duration)) / ((60 / settings.value.bpm) * 1000)

  renderFrame(timing)
  app.value.render()

  setTimeout(() => {
    step()
  }, 1000 / settings.value.fps)
}
</script>

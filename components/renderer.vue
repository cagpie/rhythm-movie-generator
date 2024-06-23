<template>
  <div v-show="isFfmpegLoaded">
    <button
      class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      type="button"
      @click="render"
    >Render</button>
    <video controls  :src="videoSrc" />
  </div>
</template>

<script setup lang="js">
import { FFmpeg } from '@ffmpeg/ffmpeg'
import { toBlobURL } from '@ffmpeg/util'

const videoSrc = ref(null)

const ffmpeg = new FFmpeg()
const isFfmpegLoaded = ref(false)

const { app } = usePixi()
const { settings } = useSettings()
const { isFfmpegExecuting, renderFrame } = useRender()
const { log } = useLog()

onMounted(async () => {
  log.value.push('sys: ffmpeg init')

  ffmpeg.on('log', ({ message: msg }) => {
    log.value.push(`ffmpeg: ${msg}`)
  })

  const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/esm'
  // mt(マルチスレッド版)は不具合が多いので一旦使わない
  // const baseURL = 'https://unpkg.com/@ffmpeg/core-mt@0.12.6/dist/esm'
  await ffmpeg.load({
    coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
    wasmURL: await toBlobURL(`${baseURL}/ffmpeg-core.wasm`, 'application/wasm'),
    workerURL: await toBlobURL(`${baseURL}/ffmpeg-core.worker.js`, 'text/javascript'),
  })

  log.value.push('sys: ffmpeg loaded')
  isFfmpegLoaded.value = true
})

const render = async () => {
  isFfmpegExecuting.value = true

  const images = []

  const totalFrames = (60 / settings.value.bpm) * settings.value.fps * settings.value.length
  log.value.push(`sys: total frames: ${totalFrames}`)
  log.value.push('sys: render images')

  for (let i = 0; i < totalFrames; i++) {
    renderFrame(((settings.value.bpm / 60) / settings.value.fps) * i)
    app.value.render()

    const dataUrl = app.value.canvas.toDataURL()
    const byteString = atob(dataUrl.split(',')[1])
    const buffer = new Uint8Array(byteString.length)
    for (let i = 0; i < byteString.length; i++) {
      buffer[i] = byteString.charCodeAt(i)
    }
    images.push(buffer)
  }

  log.value.push('sys: render images done')

  const video = await generateVideo(ffmpeg, settings.value.fps, images)

  const blob = new Blob([video], { type: 'video/mp4' })
  videoSrc.value = URL.createObjectURL(blob)

  isFfmpegExecuting.value = false
}

const generateVideo = async (ffmpeg, fps, images, ffmpegRunningOptions = []) => {
  log.value.push('sys: mv images')
  images.forEach(async (image, i) => {
    await ffmpeg.writeFile(`image${i}.png`, image)
  })

  log.value.push('sys: mv images done')
  log.value.push('sys: exec ffmpeg')

  await ffmpeg.exec([
    '-r', `${fps}`,
    '-i', 'image%d.png',
    '-pix_fmt', 'yuv420p',
    ...ffmpegRunningOptions,
    'output.mp4',
  ])

  log.value.push('sys: exec ffmpeg done')

  const data = await ffmpeg.readFile('output.mp4')
  return data
}
</script>

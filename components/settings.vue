<template>
  <div class="border p-2">
    <p class="text-xl">設定</p>
    <div>
      <dl
      class="mt-2 [&>div]:grid [&>div]:grid-cols-4 [&>div]:mt-1 [&>div>dt]:text-gray-500 [&>div>dd]:col-span-3"
      >
        <div>
          <dt>BPM</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="settings.bpm" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>FPS</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="settings.fps" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>長さ</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="settings.duration" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>背景色</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="settings.backgroundColor" type="text">
            </div>
          </dd>
        </div>
        <div>
          <dt>メモ</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <textarea
                v-model="settings.memo"
                class="mt-1 w-full border-b"
                style="field-sizing: content"
              />
            </div>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="js">
const { settings } = useSettings()
const { background } = usePixi()

watch(() => settings.value.backgroundColor, (value) => {
  const backgroundColor = Number(value)
  if (!isNaN(backgroundColor)) {
    background.value?.rect(0, 0, settings.value.width, settings.value.height)
    background.value?.fill(backgroundColor)
  }
})
</script>

<style>
/* part-propertiesのCSSが貫通しているので設定してない */
</style>

<template>
  <div>
    <div class="border">
      <dl
        class="[&>dt]:font-bold [&dd>]:col-span-2 [&>div]:grid [&>div]:grid-cols-3"
      >
        <div>
          <dt>bpm</dt>
          <dd>
            <input v-model="settings.bpm" type="number">
          </dd>
        </div>
        <div>
          <dt>fps</dt>
          <dd>
            <input v-model="settings.fps" type="number">
          </dd>
        </div>
        <div>
          <dt>length</dt>
          <dd>
            <input v-model="settings.length" type="number">
          </dd>
        </div>
        <div>
          <dt>bgcolor</dt>
          <dd>
            <input v-model="settings.backgroundColor" type="text">
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

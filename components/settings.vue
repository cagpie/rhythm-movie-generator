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
      </dl>
    </div>
  </div>
</template>

<script setup lang="js">
const { settings } = useSettings()
</script>

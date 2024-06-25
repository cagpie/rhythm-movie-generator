<template>
  <div class="border p-2">
    <p class="text-xl">システムログ</p>
    <div class="mt-2 h-[200px] overflow-scroll">
      <div class="flex flex-col-reverse">
        <div v-for="message in log" :key="message">
          {{ message }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="js">
const { log } = useLog()
</script>

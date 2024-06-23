<template>
  <div>
    Log:
    <div class="h-[200px] overflow-scroll">
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

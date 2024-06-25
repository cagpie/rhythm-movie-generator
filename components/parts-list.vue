<template>
  <div class="grid gap-2">
    <part-properties
      v-for="part in parts"
      v-show="part.listing"
      :key="part.key"
      :part="part"
    />
  </div>
</template>

<script setup lang="js">
const { parts } = useParts()
</script>

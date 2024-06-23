<template>
  <div>
    <template v-for="part in parts" :key="part.key">
      <part-properties :part="part" />
    </template>
  </div>
</template>

<script setup lang="js">
const { parts } = useParts()
</script>

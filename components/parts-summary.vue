<template>
  <div class="border p-2 grid ">
    <template v-for="part in parts" :key="part.key">
      <div class="flex items-center gap-1">

        <button
          title="リストの表示･非表示を切り替え"
          class="text-white"
          @click="switchListing(part)"
        >
          <svgo-list :style="`opacity: ${part.listing ? '1' : '0.3' }`"/>
        </button>
        <button
          title="表示･非表示を切り替え"
          class="text-white"
          @click="switchVisible(part)"
        >
          <svgo-show-eye :style="`opacity: ${part.visible ? '1' : '0.3' }`"/>
        </button>
        <div class="shring grow truncate overflow-hidden w-[100px]">
          {{ part.name }}
        </div>
      </div>
    </template>
    <p v-if="!parts.length" class="text-gray-500">
      画像を追加してください
    </p>
    <file-loader class="mt-2" />
  </div>
</template>

<script setup lang="js">
const { parts } = useParts()

const switchListing = (part) => {
  part.listing = !part.listing
}

const switchVisible = (part) => {
  part.visible = !part.visible
}

</script>

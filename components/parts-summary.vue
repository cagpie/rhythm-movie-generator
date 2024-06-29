<template>
  <div class="border p-2">
    <p class="text-xl">レイヤー</p>
    <div ref="list" class="mt-2 grid gap-1">
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
          <button
            title="掴んで移動のオンオフを切り替え"
            @click="switchDraggable(part)"
          >
            <svgo-drag :style="`opacity: ${part.draggable ? '1' : '0.3' }`"/>
          </button>
          <div class="shring grow truncate overflow-hidden w-[100px] cursor-move">
            {{ part.name }}
          </div>
          <div class="cursor-move">
            <svgo-sort class="opacity-50"/>
          </div>
        </div>
      </template>
    </div>
    <p v-if="!parts.length" class="text-gray-500">
      画像を追加してください
    </p>
    <file-loader class="mt-2" />
  </div>
</template>

<script setup lang="js">
import { useSortable } from '@vueuse/integrations/useSortable'

const { parts } = useParts()

const list = ref(null)

useSortable(list, parts)

const switchListing = (part) => {
  part.listing = !part.listing
}

const switchVisible = (part) => {
  part.visible = !part.visible
}

const switchDraggable = (part) => {
  part.draggable = !part.draggable
}
</script>

<template>
  <div>
    <div class="border p-2">
      <div class="text-xl flex items-center gap-2">
        <svgo-shapes />
        <input v-model="part.name" type="text" class="border-b pl-2 shrink grow w-full">
        <div class="flex gap-2 text-white">
          <button
            title="表示･非表示を切り替え"
            @click="switchVisible"
          >
            <svgo-show-eye :style="`opacity: ${part.visible ? '1' : '0.3' }`"/>
          </button>
          <button
            title="画像を選択"
            @click="open"
          >
            <svgo-image-square />
          </button>
          <button
            title="画像を保存"
            @click="downloadImage"
          >
            <svgo-download />
          </button>
          <button
            title="パーツを削除"
            @click="removePart"
          >
            <svgo-remove-circle />
          </button>
          <div v-if="isLoading">loading</div>
        </div>
      </div>
      <dl
        class="mt-2 [&>div]:grid [&>div]:grid-cols-4 [&>div]:mt-1 [&>div>dt]:text-gray-500 [&>div>dd]:col-span-3"
      >
        <div>
          <dt>位置</dt>
          <dd class="grid grid-cols-2 gap-2">
            <div class="input-with-title">
              <div>X</div>
              <input v-model="part.position.x" type="number">
            </div>
            <div class="input-with-title">
              <div>Y</div>
              <input v-model="part.position.y" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>原点</dt>
          <dd class="grid grid-cols-2 gap-2">
            <div class="input-with-title">
              <div>X</div>
              <input v-model="part.anchor.x" type="number">
            </div>
            <div class="input-with-title">
              <div>Y</div>
              <input v-model="part.anchor.y" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>拡大</dt>
          <dd class="grid grid-cols-2 gap-2">
            <div class="input-with-title">
              <div>X</div>
              <input v-model="part.scale.x" type="number">
            </div>
            <div class="input-with-title">
              <div>Y</div>
              <input v-model="part.scale.y" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>回転</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="part.rotation" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>透明度</dt>
          <dd>
            <div class="input-with-title">
              <div/>
              <input v-model="part.alpha" type="number">
            </div>
          </dd>
        </div>
        <div>
          <dt>
            動き
            <button
              title="動きを追加"
              class="text-white"
              style="vertical-align: -4px;"
              @click="addExpression"
            >
              <svgo-add-circle />
            </button>
          </dt>
          <dd>
            <template v-for="i in expressionsCount" :key="i" >
              <div class="flex">
                <input v-model="part.expressions[i - 1].enabled" type="checkbox" >
                <select
                  v-model="part.expressions[i - 1].type"
                  class="ml-2 w-full shrink grow bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-1"
                  @change="initExpressionOptions(part.expressions[i - 1])"
                >
                  <option value="">-</option>
                  <option v-for="expression in expressions" :key="expression.type" :value="expression.type">
                    {{ expression.name }}
                  </option>
                </select>
              </div>
              <textarea
                v-model="part.expressions[i - 1].options"
                class="mt-1 w-full border-b"
                style="field-sizing: content"
              />
            </template>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="js">
import * as PIXI from 'pixi.js'
import { useFileDialog } from '@vueuse/core'

const { part } = defineProps({
  part: {
    type: Object,
    required: true,
  },
})

const expressionsCount = ref(part.expressions.length)
const { expressions } = useExpressions()
const { parts } = useParts()

const isLoading = ref(false)
const { open, onChange } = useFileDialog({
  accept: 'image.*',
  directory: false,
})

const addExpression = () => {
  expressionsCount.value++
  part.expressions.push({ type: '', options: '{}', enabled: true })
}

const initExpressionOptions = (expression) => {
  expression.options = expressions.find(e => e.type === expression.type).defaultOptions
}

onChange((files) => {
  isLoading.value = true

  const fileData = files[0]

  if (!fileData.type.match('image.*')) {
    alert('画像を選択してください')
    isLoading.value = false
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    const image = new Image()
    image.src = reader.result

    image.onload = async () => {
      const texture = PIXI.Texture.from(image)

      part.name = fileData.name
      part.base64 = reader.result

      window.sprites.find(s => s.appUniqueKey === part.key).texture = texture

      isLoading.value = false
    }
  }
  reader.readAsDataURL(fileData)
})

const downloadImage = () => {
  const [, type, extention] = part.base64.match(/^data:([^/]+)\/([^;]+)/)

  const byteString = atob(part.base64.split(',')[1])
  const buffer = new Uint8Array(byteString.length)
  for (let i = 0; i < byteString.length; i++) {
    buffer[i] = byteString.charCodeAt(i)
  }
  const blob = new Blob([buffer.buffer], { type: `${type}/${extention}` })

  const link = window.document.createElement('a')
  link.href = URL.createObjectURL(blob)
  link.download = `${part.name}.${extention}`
  link.click()
}

const removePart = () => {
  if (!window.confirm(`パーツ ${part.name} を削除します`)) {
    return
  }

  const partSprite = window.sprites.find(s => s.appUniqueKey === part.key)
  partSprite.parent.removeChild(partSprite)

  parts.value = parts.value.filter(p => p.key !== part.key)
}

const switchVisible = () => {
  part.visible = !part.visible
}
</script>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer components {
  .input-with-title {
    @apply relative;

    & > div {
      @apply absolute left-[-0.5em] top-[-0.5em] text-gray-500 scale-50
    }
    & > input {
      @apply border-b w-full pl-2
    }
  }
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance:textfield;
}
</style>

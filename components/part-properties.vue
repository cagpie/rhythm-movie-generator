<template>
  <div>
    <div class="border">
      <dl
        class="[&>dt]:font-bold [&dd>]:col-span-2 [&>div]:grid [&>div]:grid-cols-3"
      >
        <div>
          <dt>名前</dt>
          <dd>
            <input v-model="part.name" type="text">
          </dd>
        </div>
        <div>
          <dt>X</dt>
          <dd>
            <input v-model="part.position.x" type="number">
          </dd>
        </div>
        <div>
          <dt>Y</dt>
          <dd>
            <input v-model="part.position.y" type="number">
          </dd>
        </div>
        <div>
          <dt>Z</dt>
          <dd>
            <input v-model="part.zIndex" type="number">
          </dd>
        </div>
        <div>
          <dt>回転</dt>
          <dd>
            <input v-model="part.rotation" type="number">
          </dd>
        </div>
        <div>
          <dt>拡大X</dt>
          <dd>
            <input v-model="part.scale.x" type="number">
          </dd>
        </div>
        <div>
          <dt>拡大Y</dt>
          <dd>
            <input v-model="part.scale.y" type="number">
          </dd>
        </div>
        <div>
          <dt>原点X</dt>
          <dd>
            <input v-model="part.anchor.x" type="number">
          </dd>
        </div>
        <div>
          <dt>原点Y</dt>
          <dd>
            <input v-model="part.anchor.y" type="number">
          </dd>
        </div>
        <div>
          <dt>動き</dt>
          <dd>
            <template v-for="i in expressionsCount" :key="i" >
              <select v-model="part.expressions[i - 1].type" @change="initExpressionOptions(part.expressions[i - 1])">
                <option value="">-</option>
                <option v-for="expression in expressions" :key="expression.type" :value="expression.type">
                  {{ expression.name }}
                </option>
              </select>
              <input v-model="part.expressions[i - 1].enabled" type="checkbox" >
              <input v-model="part.expressions[i - 1].options" type="text">
            </template>
            <button @click="addExpression">[追加]</button>
          </dd>
        </div>
      </dl>
    </div>
  </div>
</template>

<script setup lang="js">
const { expressions } = useExpressions()

const { part } = defineProps({
  part: {
    type: Object,
    required: true,
  },
})

const expressionsCount = ref(part.expressions.length)

const addExpression = () => {
  expressionsCount.value++
  part.expressions.push({ type: '', options: '{}', enabled: true })
}

const initExpressionOptions = (expression) => {
  expression.options = expressions.find(e => e.type === expression.type).defaultOptions
}

</script>

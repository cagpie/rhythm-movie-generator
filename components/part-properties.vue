<template>
  <div>
    <div class="border">
      <dl
        class="[&>dt]:font-bold [&dd>]:col-span-2 [&>div]:grid [&>div]:grid-cols-3"
      >
        <div>
          <dt>name</dt>
          <dd>
            <input v-model="part.name" type="text">
          </dd>
        </div>
        <div>
          <dt>x</dt>
          <dd>
            <input v-model="part.position.x" type="number">
          </dd>
        </div>
        <div>
          <dt>y</dt>
          <dd>
            <input v-model="part.position.y" type="number">
          </dd>
        </div>
        <div>
          <dt>zIndex</dt>
          <dd>
            <input v-model="part.zIndex" type="number">
          </dd>
        </div>
        <div>
          <dt>scale x</dt>
          <dd>
            <input v-model="part.scale.x" type="number">
          </dd>
        </div>
        <div>
          <dt>scale y</dt>
          <dd>
            <input v-model="part.scale.y" type="number">
          </dd>
        </div>
        <div>
          <dt>anchor x</dt>
          <dd>
            <input v-model="part.anchor.x" type="number">
          </dd>
        </div>
        <div>
          <dt>anchor y</dt>
          <dd>
            <input v-model="part.anchor.y" type="number">
          </dd>
        </div>
        <div>
          <dt>expressions</dt>
          <dd>
            <template v-for="i in expressionsCount" :key="i" >
              <select v-model="part.expressions[i - 1].name" @change="initExpressionOptions(part.expressions[i - 1])">
                <option value="">-</option>
                <option v-for="expression in expressions" :key="expression.name" :value="expression.name">
                  {{ expression.name }}
                </option>
              </select>
              <input v-model="part.expressions[i - 1].enabled" type="checkbox" >
              <input v-model="part.expressions[i - 1].options" type="text">
            </template>
            <button @click="addExpression">+</button>
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

const expressionsCount = ref(1)

const addExpression = () => {
  expressionsCount.value++
  part.expressions.push({ name: '', options: '{}', enabled: true })
}

const initExpressionOptions = (expression) => {
  expression.options = expressions.find(e => e.name === expression.name).defaultOptions
}

</script>

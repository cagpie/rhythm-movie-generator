import { ref } from 'vue'

const { expressions } = useExpressions()
const { parts } = useParts()

const isFfmpegExecuting = ref(false)

const renderFrame = (timing) => {
  parts.value.forEach((part, idx) => {
    // nuxtに入れるとreactiveでぶっ壊れるのでglobal経由で取得
    const container = window.containers.find(s => s.appUniqueKey === part.key)
    const sprite = container.children[0]

    // applyExpressionsの対象でないものはここで都度更新する必要ないのでパフォーマンス改善するときは改修すると良い
    container.x = applyExpression(['position', 'x'], part, timing)
    container.y = applyExpression(['position', 'y'], part, timing)
    container.rotation = applyExpression(['rotation'], part, timing)
    container.scale.x = applyExpression(['scale', 'x'], part, timing)
    container.scale.y = applyExpression(['scale', 'y'], part, timing)
    container.alpha = applyExpression(['alpha'], part, timing)
    container.visible = part.visible
    container.zIndex = 1000 - idx
    sprite.anchor.x = part.anchor.x
    sprite.anchor.y = part.anchor.y
    sprite.interactive = part.draggable
  })
}

const applyExpression = (path, part, timing) => {
  let value = path.reduce((obj, current) => obj[current], part)

  part.expressions.forEach((partExp) => {
    if (!partExp.enabled) {
      return
    }

    const exp = expressions.find(exp => exp.type === partExp.type)

    if (!exp) {
      return
    }

    const func = path.reduce((obj, current) => obj[current], exp.effects)

    if (!func) {
      return
    }

    // ここでいちいちJSON.parseするせいで多分結構遅くなる
    const options = (() => {
      try {
        return JSON.parse(partExp.options)
      }
      catch {}
      return {}
    })()
    value = func(value, timing, options)
  })

  return value
}

export function useRender() {
  return {
    isFfmpegExecuting,
    renderFrame,
  }
}

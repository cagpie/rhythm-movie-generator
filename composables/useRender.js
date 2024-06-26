import { ref } from 'vue'

const { expressions } = useExpressions()
const { parts } = useParts()

const isFfmpegExecuting = ref(false)

const renderFrame = (timing) => {
  parts.value.forEach((part, idx) => {
    // nuxtに入れるとreactiveでぶっ壊れるのでglobal経由で取得
    const sprite = window.sprites.find(s => s.appUniqueKey === part.key)

    sprite.x = applyExpression(['position', 'x'], part, timing)
    sprite.y = applyExpression(['position', 'y'], part, timing)
    sprite.rotation = applyExpression(['rotation'], part, timing)
    sprite.scale.x = applyExpression(['scale', 'x'], part, timing)
    sprite.scale.y = applyExpression(['scale', 'y'], part, timing)
    sprite.anchor.x = part.anchor.x
    sprite.anchor.y = part.anchor.y
    sprite.zIndex = 1000 - idx
    sprite.alpha = part.alpha
    sprite.visible = part.visible
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

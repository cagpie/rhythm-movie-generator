import { ref } from 'vue'

const isFfmpegExecuting = ref(false)

export function useRender() {
  const { expressions } = useExpressions()
  const { parts } = useParts()

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

      sprite.interactive = part.draggable

      // [謎バグ-親子Container-zIndex-anchor] pixi.jsの謎バグ回避用
      // 親子設定しているとanchorを更新をできなくしている。するとエラーを吐くため
      // 親子関係を設定し、親のcontainerのzIndexよりも小さい値を子のcontainerのzIndexに設定すると、なぜかcontainer全体のanchorが設定不能になる。
      // 設定値は引き継がれるので、anchorを設定したい場合は親子関係を解除すると操作は可能
      if (
        !parts.value.find(p => p.parentKey === part.key)
        && !part.parentKey) {
        sprite.anchor.x = part.anchor.x
        sprite.anchor.y = part.anchor.y
      }

      if (part.parentKey) {
        const parentPartIdx = parts.value.findIndex(p => p.key === part.parentKey)
        container.zIndex = (parentPartIdx - idx)
      }
      else {
        container.zIndex = 1000 - idx
      }
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

  return {
    isFfmpegExecuting,
    renderFrame,
  }
}

import * as PIXI from 'pixi.js'

export function useProjectLoader() {
  const { app } = usePixi()
  const { parts } = useParts()
  const { settings } = useSettings()
  const { attachDraggable } = useDraggable()

  const loadProject = async (json) => {
    if (json.version !== 'rythm-movie-generator-v1') {
      alert('対応していないバージョンのファイルです')
      return false
    }

    if (parts.value.length) {
      if (!confirm('現在の内容を破棄しますがよろしいですか？')) {
        return false
      }

      parts.value.forEach((part) => {
        const container = window.containers.find(s => s.appUniqueKey === part.key)
        app.value.stage.removeChild(container)
      })

      window.containers = []
      parts.value = []
    }

    Object.keys(json.settings).forEach((key) => {
      settings.value[key] = json.settings[key]
    })

    await Promise.all(json.parts.map((part) => {
      return new Promise((resolve) => {
        const image = new Image()
        image.src = part.base64

        image.onload = () => {
          const key = part.key

          const container = new PIXI.Container()
          const spr = new PIXI.Sprite(PIXI.Texture.from(image))
          container.addChild(spr)

          container.appUniqueKey = key

          // [謎バグ-親子Container-zIndex-anchor] pixi.jsの謎バグ回避用
          // 親子関係をセットしてからだとanchorの設定反映を無効にしているので、ここでanchorのみセットする
          spr.anchor.x = part.anchor.x
          spr.anchor.y = part.anchor.y

          parts.value.push(part)

          // reactiveになったpartを渡す
          attachDraggable(parts.value.find(p => p.key === key), spr)

          // Nuxtのreactiveの中に入れると壊れるのでグローバルに入れて扱う
          window.containers.push(container)

          app.value.stage.addChild(container)

          resolve()
        }
      })
    }))

    // 親子関係を再構築
    parts.value.forEach((part) => {
      if (!part.parentKey) {
        return
      }

      const partSprite = window.containers.find(s => s.appUniqueKey === part.key)
      const oldParentSprite = partSprite.parent
      oldParentSprite.removeChild(partSprite)

      const newParentSprite = (() => {
        if (!part.parentKey) {
          return app.value.stage
        }
        return window.containers.find(s => s.appUniqueKey === part.parentKey)
      })()

      newParentSprite.addChild(partSprite)
    })

    return true
  }

  return {
    loadProject,
  }
}

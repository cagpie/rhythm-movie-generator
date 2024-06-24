import * as PIXI from 'pixi.js'

const { app } = usePixi()
const { parts } = useParts()
const { settings } = useSettings()

const loadProject = (json) => {
  if (json.version !== 'rythm-movie-generator-v1') {
    alert('対応していないバージョンのファイルです')
    return false
  }

  Object.keys(json.settings).forEach((key) => {
    settings.value[key] = json.settings[key]
  })

  json.parts.forEach((part) => {
    const image = new Image()
    image.src = part.base64

    image.onload = async () => {
      const key = part.key
      const sprite = new PIXI.Sprite(PIXI.Texture.from(image))
      sprite.appUniqueKey = key

      parts.value.push(part)

      // Nuxtのreactiveの中に入れると壊れるのでグローバルに入れて扱う
      window.sprites.push(sprite)

      app.value.stage.addChild(sprite)
    }
  })

  return true
}

export function useProjectLoader() {
  return {
    loadProject,
  }
}

const attachDraggable = (part, sprite) => {
  let isDragging = false
  let dragShiftX = 0
  let dragShiftY = 0

  const onDragStart = (event) => {
    isDragging = true
    dragShiftX = part.position.x - event.data.global.x
    dragShiftY = part.position.y - event.data.global.y
  }
  const onDragEnd = (event) => {
    isDragging = false
  }
  const onDragMove = (event) => {
    if (isDragging === false) {
      return
    }

    part.position.x = event.data.global.x + dragShiftX
    part.position.y = event.data.global.y + dragShiftY
  }

  sprite
    .on('pointerdown', onDragStart)
    .on('pointerup', onDragEnd)
    .on('pointerupoutside', onDragEnd)
    .on('pointermove', onDragMove)
}

export function useDraggable() {
  return {
    attachDraggable,
  }
}

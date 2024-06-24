const processValue = (value, def) => {
  if (value === null) {
    return def
  }
  return value
}

const expressions = [
  {
    name: '位置(sin)',
    type: 'position-plus-sin',
    defaultOptions: JSON.stringify({ speed: 1, position: { x: 5, y: 20 } }),
    effects: {
      rotation: null,
      position: {
        x: (value, timing, options) => {
          return value + processValue(options?.position?.x, 20) * Math.sin(processValue(options?.speed, 1) * timing * Math.PI * 2)
        },
        y: (value, timing, options) => {
          return value + processValue(options?.position?.y, 20) * Math.sin(processValue(options?.speed, 1) * timing * Math.PI * 2)
        },
      },
      scale: {
        x: null,
        y: null,
      },
    },
  },
  {
    name: '位置-スイッチ',
    type: 'position-plus-switch',
    defaultOptions: JSON.stringify({ speed: 1, position: { x: 5, y: 20 } }),
    effects: {
      rotation: null,
      position: {
        x: (value, timing, options) => {
          return value + (((timing * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.position?.x, 20) : 0)
        },
        y: (value, timing, options) => {
          return value + (((timing * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.position?.y, 20) : 0)
        },
      },
      scale: {
        x: null,
        y: null,
      },
    },
  },
  {
    name: '拡大(sin)',
    type: 'scale-plus-sin',
    defaultOptions: JSON.stringify({ speed: 1, scale: { x: 0.1, y: 0.1 } }),
    effects: {
      rotation: null,
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: (value, timing, options) => {
          return value + (processValue(options?.scale?.x, 1) * Math.sin((timing * processValue(options?.speed, 1)) * Math.PI))
        },
        y: (value, timing, options) => {
          return value + (processValue(options?.scale?.y, 1) * Math.sin((timing * processValue(options?.speed, 1)) * Math.PI))
        },
      },
    },
  },
  {
    name: '拡大-スイッチ',
    type: 'scale-plus-switch',
    defaultOptions: JSON.stringify({ speed: 1, scale: { x: -2, y: 0.1 } }),
    effects: {
      rotation: null,
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: (value, timing, options) => {
          return value + (((timing * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.scale?.x, 1) : 0)
        },
        y: (value, timing, options) => {
          return value + (((timing * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.scale?.y, 1) : 0)
        },
      },
    },
  },
  {
    name: '回転',
    type: 'rotation',
    defaultOptions: JSON.stringify({ speed: 0.25, rotation: { direction: 1 } }),
    effects: {
      rotation: (value, timing, options) => {
        return value + (processValue(options?.speed, 0.25) * timing * Math.PI * 2) * processValue(options?.rotation?.direction, 1)
      },
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: null,
        y: null,
      },
    },
  },
  {
    name: '回転-反復(sin)',
    type: 'rotation-repetitive-sin',
    defaultOptions: JSON.stringify({ speed: 1, rotation: { angle: 0.1, direction: 1 } }),
    effects: {
      rotation: (value, timing, options) => {
        return value + Math.sin(processValue(options?.speed, 1) * timing * Math.PI * 2) * processValue(options?.rotation?.angle, 1) * processValue(options?.rotation?.direction, 1)
      },
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: null,
        y: null,
      },
    },
  },
]

export function useExpressions() {
  return {
    expressions,
  }
}

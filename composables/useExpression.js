const processValue = (value, def) => {
  if (value === null) {
    return def
  }
  return value
}

const expressions = [
  {
    name: 'scale-sin',
    defaultOptions: JSON.stringify({ speed: 1, scale: { x: 0.1, y: 0.2 } }),
    effects: {
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
    name: 'position-sin',
    defaultOptions: JSON.stringify({ speed: 1, position: { x: 5, y: 20 } }),
    effects: {
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
]

export function useExpressions() {
  return {
    expressions,
  }
}

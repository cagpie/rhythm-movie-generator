const processValue = (value, def) => {
  if (value == null) {
    return def
  }
  return value
}

const expressions = [
  {
    name: '位置(sin)',
    type: 'position-plus-sin',
    defaultOptions: JSON.stringify({ speed: 1, delay: 0, position: { x: 5, y: 20 } }),
    effects: {
      alpha: null,
      rotation: null,
      position: {
        x: (value, timing, options) => {
          return value + processValue(options?.position?.x, 20) * Math.sin(processValue(options?.speed, 1) * (timing + processValue(options?.delay, 0)) * Math.PI * 2)
        },
        y: (value, timing, options) => {
          return value + processValue(options?.position?.y, 20) * Math.sin(processValue(options?.speed, 1) * (timing + processValue(options?.delay, 0)) * Math.PI * 2)
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
    defaultOptions: JSON.stringify({ speed: 1, delay: 0, position: { x: 5, y: 20 } }),
    effects: {
      alpha: null,
      rotation: null,
      position: {
        x: (value, timing, options) => {
          return value + ((((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.position?.x, 20) : 0)
        },
        y: (value, timing, options) => {
          return value + ((((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.position?.y, 20) : 0)
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
    defaultOptions: JSON.stringify({ speed: 1, delay: 0, scale: { x: 0.1, y: 0.1 } }),
    effects: {
      alpha: null,
      rotation: null,
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: (value, timing, options) => {
          return value + (processValue(options?.scale?.x, 1) * Math.sin(((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) * Math.PI))
        },
        y: (value, timing, options) => {
          return value + (processValue(options?.scale?.y, 1) * Math.sin(((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) * Math.PI))
        },
      },
    },
  },
  {
    name: '拡大-スイッチ',
    type: 'scale-plus-switch',
    defaultOptions: JSON.stringify({ speed: 1, delay: 0, scale: { x: -2, y: 0.1 } }),
    effects: {
      alpha: null,
      rotation: null,
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: (value, timing, options) => {
          return value + ((((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.scale?.x, 1) : 0)
        },
        y: (value, timing, options) => {
          return value + ((((timing + processValue(options?.delay, 0)) * processValue(options?.speed, 1)) % 2) < 1 ? processValue(options?.scale?.y, 1) : 0)
        },
      },
    },
  },
  {
    name: '回転',
    type: 'rotation',
    defaultOptions: JSON.stringify({ speed: 0.25, delay: 0, rotation: { direction: 1 } }),
    effects: {
      alpha: null,
      rotation: (value, timing, options) => {
        return value + (processValue(options?.speed, 0.25) * (timing + processValue(options?.delay, 0)) * Math.PI * 2) * processValue(options?.rotation?.direction, 1)
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
    defaultOptions: JSON.stringify({ speed: 1, delay: 0, rotation: { angle: 0.1, direction: 1 } }),
    effects: {
      alpha: null,
      rotation: (value, timing, options) => {
        return value + Math.sin(processValue(options?.speed, 1) * (timing + processValue(options?.delay, 0)) * Math.PI * 2) * processValue(options?.rotation?.angle, 1) * processValue(options?.rotation?.direction, 1)
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
    name: '非表示-スイッチ',
    type: 'alpha-switch',
    defaultOptions: JSON.stringify({ speed: 1, duration: 1, start: 0, end: 0.5 }),
    effects: {
      alpha: (value, timing, options) => {
        return processValue(options?.start, 0) <= ((processValue(options?.speed, 1) * timing) % processValue(options?.duration, 1)) && ((processValue(options?.speed, 1) * timing) % processValue(options?.duration, 1)) < processValue(options?.end, 0.5) ? 0 : value
      },
      rotation: null,
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

const expressions = [
  {
    name: 'haneru(scale)',
    effects: {
      position: {
        x: null,
        y: null,
      },
      scale: {
        x: (value, timing) => {
          return value * (Math.sin(timing * Math.PI) * 0.2 + 0.8)
        },
        y: (value, timing) => {
          return value * (Math.sin(timing * Math.PI) * 0.2 + 0.8)
        },
      },
    },
  },
  {
    name: 'haneru(position)',
    effects: {
      position: {
        x: null,
        y: (value, timing) => {
          return value + Math.sin(timing * Math.PI * 2) * 100
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

import { defineEventHandler } from 'h3'

export default defineEventHandler((event) => {
  const res = event.node.res

  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp')
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin')
})

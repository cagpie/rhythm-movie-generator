export default defineNuxtConfig({
  devtools: { enabled: false },
  plugins: [
    'plugins/firebase.client.js',
  ],
  ssr: false,
  runtimeConfig: {
    public: {
      apiKey: process.env.apiKey,
      authDomain: process.env.authDomain,
      projectId: process.env.projectId,
      storageBucket: process.env.storageBucket,
      messagingSenderId: process.env.messagingSenderId,
      appId: process.env.appId,
      measurementId: process.env.measurementId,
    },
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@nuxt/eslint',
    'nuxt-svgo',
  ],
  svgo: {
    autoImportPath: './assets/other-icons/',
  },
  vite: {
    optimizeDeps: {
      exclude: ['@ffmpeg/ffmpeg'],
    },
    server: {
      headers: {
        'Cross-Origin-Embedder-Policy': 'require-corp',
        'Cross-Origin-Opener-Policy': 'same-origin',
      },
    },
  },
})

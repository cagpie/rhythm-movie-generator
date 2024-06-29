import { initializeApp } from 'firebase/app'
import { defineNuxtPlugin } from '#app'
import { getAnalytics } from 'firebase/analytics'

export default defineNuxtPlugin(async () => {
  const runtimeConfig = useRuntimeConfig()

  const firebaseConfig = {
    apiKey: runtimeConfig.public.apiKey,
    authDomain: runtimeConfig.public.authDomain,
    projectId: runtimeConfig.public.projectId,
    storageBucket: runtimeConfig.public.storageBucket,
    messagingSenderId: runtimeConfig.public.messagingSenderId,
    appId: runtimeConfig.public.appId,
  }

  const app = initializeApp(firebaseConfig)

  getAnalytics(app)
})

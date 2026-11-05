// Initialisation Firebase (Firestore + Authentication). Les clés viennent du fichier .env.
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const e = import.meta.env

// Vrai si le fichier .env est rempli : sinon le site fonctionne avec les données locales
export const firebaseConfigured = Boolean(e.VITE_FIREBASE_API_KEY && e.VITE_FIREBASE_PROJECT_ID)

const app = firebaseConfigured
  ? initializeApp({
      apiKey: e.VITE_FIREBASE_API_KEY,
      authDomain: e.VITE_FIREBASE_AUTH_DOMAIN,
      projectId: e.VITE_FIREBASE_PROJECT_ID,
      storageBucket: e.VITE_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: e.VITE_FIREBASE_MESSAGING_SENDER_ID,
      appId: e.VITE_FIREBASE_APP_ID,
    })
  : null

export const auth = app ? getAuth(app) : null
export const db = app ? getFirestore(app) : null

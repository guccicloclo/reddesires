// Script de seed : charge les produits d'exemple dans Firestore.
// Usage : npm run seed
// Il se connecte avec le compte admin (les règles Firestore interdisent l'écriture publique).
import { readFileSync, existsSync } from 'node:fs'
import { initializeApp } from 'firebase/app'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { getFirestore, doc, setDoc, serverTimestamp } from 'firebase/firestore'
import { SEED_PRODUCTS } from '../src/data/seedProducts.js'

// Lecture minimale du fichier .env (évite une dépendance supplémentaire)
if (existsSync('.env')) {
  for (const line of readFileSync('.env', 'utf8').split(/\r?\n/)) {
    const m = line.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*)\s*$/)
    if (m && !(m[1] in process.env)) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}

const env = process.env
const required = ['VITE_FIREBASE_API_KEY', 'VITE_FIREBASE_PROJECT_ID', 'VITE_ADMIN_EMAIL', 'ADMIN_PASSWORD']
const missing = required.filter((k) => !env[k])
if (missing.length) {
  console.error('Variables manquantes dans .env :', missing.join(', '))
  process.exit(1)
}

const app = initializeApp({
  apiKey: env.VITE_FIREBASE_API_KEY,
  authDomain: env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: env.VITE_FIREBASE_PROJECT_ID,
  appId: env.VITE_FIREBASE_APP_ID,
})

await signInWithEmailAndPassword(getAuth(app), env.VITE_ADMIN_EMAIL, env.ADMIN_PASSWORD)
const db = getFirestore(app)

for (const { id, ...data } of SEED_PRODUCTS) {
  await setDoc(doc(db, 'products', id), { ...data, createdAt: serverTimestamp() })
  console.log('✓', data.name)
}
console.log(`\n${SEED_PRODUCTS.length} produits chargés.`)
process.exit(0)

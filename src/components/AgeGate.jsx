// Vérification d'âge 18+ : mémorisée dans le navigateur (localStorage)
import { useState } from 'react'
import { SHOP_NAME } from '../config'

const KEY = 'boutique_age_ok'

export default function AgeGate({ children }) {
  const [ok, setOk] = useState(() => localStorage.getItem(KEY) === '1')

  if (ok) return children

  const accept = () => {
    localStorage.setItem(KEY, '1')
    setOk(true)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink px-6"
      style={{ background: 'radial-gradient(circle at 50% 30%, #3a0d16 0%, #0e0c0d 65%)' }}>
      <div className="max-w-md animate-fade-up text-center">
        <p className="text-xs uppercase tracking-[0.35em] text-gold">Accès réservé aux adultes</p>
        <h1 className="mt-6 font-serif text-5xl">{SHOP_NAME}</h1>
        <p className="mt-6 text-cream-dim">
          Ce site propose des produits de bien-être et d'intimité destinés aux personnes majeures.
          Confirmez votre âge pour continuer.
        </p>
        <div className="mt-10 flex flex-col gap-3">
          <button onClick={accept} className="bg-wine px-8 py-4 text-sm uppercase tracking-widest transition hover:bg-wine-light">
            J'ai 18 ans ou plus
          </button>
          <a href="https://www.google.com" className="py-3 text-sm uppercase tracking-widest text-cream-dim transition hover:text-gold">
            Quitter
          </a>
        </div>
      </div>
    </div>
  )
}

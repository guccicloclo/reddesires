// Confirmation : affiche le récapitulatif de démo et vide le panier
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { PENDING_KEY } from './Cart'
import { formatPrice } from '../config'

export default function Confirmation() {
  const { clear } = useCart()
  const [order, setOrder] = useState(null)
  const done = useRef(false)

  useEffect(() => {
    if (done.current) return // évite le double appel du mode strict de React
    done.current = true
    let pending = null
    try {
      pending = JSON.parse(localStorage.getItem(PENDING_KEY))
    } catch {
      /* ignoré */
    }
    if (!pending) return
    setOrder(pending)
    clear()
    localStorage.removeItem(PENDING_KEY)
  }, [])

  return (
    <section className="mx-auto max-w-xl animate-fade-up px-6 pt-24 text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-gold text-3xl text-gold">✓</div>
      <h1 className="mt-8 font-serif text-5xl">Merci pour votre commande</h1>
      <p className="mt-4 text-cream-dim">
        {order
          ? `Votre commande de ${formatPrice(order.total)} est enregistrée. Le statut du paiement doit être vérifié séparément.`
          : 'Votre commande est bien enregistrée. Elle sera expédiée dans un emballage discret.'}
      </p>
      {order && !order.id.startsWith('demo-') && (
        <p className="mt-2 text-xs text-cream-dim">Référence : {order.id}</p>
      )}
      <p className="mt-2 text-xs text-gold">Démonstration — aucun paiement réel ni vérification automatique du paiement.</p>
      <Link to="/catalogue" className="mt-10 inline-block bg-wine px-8 py-4 text-sm uppercase tracking-widest hover:bg-wine-light">
        Continuer mes achats
      </Link>
    </section>
  )
}

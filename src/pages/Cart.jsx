// Panier : quantités, sous-total, enregistrement de la commande puis redirection vers Stripe (mode test)
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import CartItem from '../components/CartItem'
import { useCart } from '../context/CartContext'
import { db, firebaseConfigured } from '../firebase'
import { computeTotals, formatPrice, FREE_SHIPPING_FROM, STRIPE_PAYMENT_LINK } from '../config'

export const PENDING_KEY = 'boutique_pending_order'

export default function Cart() {
  const { items, subtotal } = useCart()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const t = computeTotals(subtotal)

  if (items.length === 0)
    return (
      <section className="mx-auto max-w-3xl px-6 pt-20 text-center">
        <h1 className="font-serif text-5xl">Votre panier est vide</h1>
        <Link to="/catalogue" className="mt-8 inline-block bg-wine px-8 py-4 text-sm uppercase tracking-widest hover:bg-wine-light">
          Parcourir le catalogue
        </Link>
      </section>
    )

  const checkout = async (e) => {
    e.preventDefault()
    setBusy(true)
    setError('')
    try {
      const order = {
        customerName: name.trim(),
        items: items.map(({ id, name, price, qty }) => ({ id, name, price, qty })),
        total: t.total,
        status: 'en attente',
      }
      let orderId = `demo-${Date.now()}`
      if (firebaseConfigured) {
        const ref = await addDoc(collection(db, 'orders'), { ...order, createdAt: serverTimestamp() })
        orderId = ref.id
      }
      // Mémorisé pour la page de confirmation (Stripe nous renvoie sans paramètre)
      localStorage.setItem(PENDING_KEY, JSON.stringify({ id: orderId, ...order }))

      if (STRIPE_PAYMENT_LINK) {
        const url = new URL(STRIPE_PAYMENT_LINK)
        url.searchParams.set('client_reference_id', orderId)
        window.location.href = url.toString()
      } else {
        // Sans lien Stripe configuré : on simule le retour de paiement pour la démo
        navigate('/confirmation')
      }
    } catch {
      setError("Impossible d'enregistrer la commande. Réessayez.")
      setBusy(false)
    }
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-16 lg:grid-cols-[1fr_360px]">
      <div>
        <h1 className="font-serif text-5xl">Panier</h1>
        <div className="mt-6 border-t border-ink-line">
          {items.map((i) => <CartItem key={i.id} item={i} />)}
        </div>
      </div>

      <form onSubmit={checkout} className="h-fit self-start border border-ink-line bg-ink-soft p-6">
        <h2 className="font-serif text-2xl">Récapitulatif</h2>
        <dl className="mt-6 space-y-2 text-sm">
          <div className="flex justify-between"><dt className="text-cream-dim">Sous-total</dt><dd>{formatPrice(t.subtotal)}</dd></div>
          <div className="flex justify-between"><dt className="text-cream-dim">Livraison discrète</dt><dd>{t.shipping ? formatPrice(t.shipping) : 'Offerte'}</dd></div>
          <div className="flex justify-between"><dt className="text-cream-dim">TPS (5 %)</dt><dd>{formatPrice(t.tps)}</dd></div>
          <div className="flex justify-between"><dt className="text-cream-dim">TVQ (9,975 %)</dt><dd>{formatPrice(t.tvq)}</dd></div>
          <div className="flex justify-between border-t border-ink-line pt-3 text-lg"><dt>Total</dt><dd className="text-gold-light">{formatPrice(t.total)}</dd></div>
        </dl>
        {t.shipping > 0 && (
          <p className="mt-2 text-xs text-gold">
            Plus que {formatPrice(FREE_SHIPPING_FROM - subtotal)} pour la livraison offerte.
          </p>
        )}

        <label className="mt-6 block text-xs uppercase tracking-widest text-cream-dim" htmlFor="nom">Votre nom</label>
        <input
          id="nom" required value={name} onChange={(e) => setName(e.target.value)}
          className="mt-2 w-full border border-ink-line bg-ink px-4 py-3 outline-none focus:border-gold"
          placeholder="Prénom Nom"
        />

        <button disabled={busy} className="mt-6 w-full bg-wine px-6 py-4 text-sm uppercase tracking-widest transition hover:bg-wine-light disabled:opacity-50">
          {busy ? 'Redirection…' : 'Passer au paiement'}
        </button>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <p className="mt-4 text-xs text-cream-dim">
          Paiement sécurisé par Stripe — mode test : carte 4242 4242 4242 4242, date future, CVC au choix.
        </p>
      </form>
    </section>
  )
}

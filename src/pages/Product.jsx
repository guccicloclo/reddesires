// Fiche produit : visuel, description, prix, quantité, ajout au panier
import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ProductVisual from '../components/ProductVisual'
import { useProducts } from '../hooks/useProducts'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../config'
import { CATEGORIES } from '../data/seedProducts'

export default function Product() {
  const { id } = useParams()
  const { products, loading } = useProducts()
  const { addItem } = useCart()
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)

  if (loading) return <p className="mx-auto max-w-6xl px-6 pt-16 text-cream-dim">Chargement…</p>
  const product = products.find((p) => p.id === id)
  if (!product)
    return (
      <div className="mx-auto max-w-6xl px-6 pt-16">
        <p>Produit introuvable.</p>
        <Link to="/catalogue" className="text-gold">← Retour au catalogue</Link>
      </div>
    )

  const outOfStock = product.stock <= 0
  const cat = CATEGORIES.find((c) => c.id === product.category)

  const add = () => {
    addItem(product, qty)
    setAdded(true)
    setTimeout(() => setAdded(false), 2500)
  }

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-6 pt-12 md:grid-cols-2">
      <ProductVisual image={product.image} className="aspect-[4/5] animate-fade-in rounded-sm" />
      <div className="animate-fade-up self-center">
        <Link to="/catalogue" className="text-xs uppercase tracking-widest text-cream-dim hover:text-gold">← Catalogue</Link>
        <p className="mt-6 text-xs uppercase tracking-[0.25em] text-gold">{cat?.label}</p>
        <h1 className="mt-2 font-serif text-5xl leading-tight">{product.name}</h1>
        <p className="mt-4 text-2xl text-gold-light">{formatPrice(product.price)}</p>
        <p className="mt-6 leading-relaxed text-cream-dim">{product.description}</p>
        <p className="mt-4 text-xs uppercase tracking-widest text-cream-dim">
          {outOfStock ? 'Rupture de stock' : product.stock <= 3 ? `Plus que ${product.stock} en stock` : 'En stock'}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <div className="flex items-center border border-ink-line">
            <button className="h-12 w-12 hover:text-gold" aria-label="Diminuer" onClick={() => setQty(Math.max(1, qty - 1))}>−</button>
            <span className="w-10 text-center">{qty}</span>
            <button className="h-12 w-12 hover:text-gold" aria-label="Augmenter" onClick={() => setQty(qty + 1)}>+</button>
          </div>
          <button
            onClick={add}
            disabled={outOfStock}
            className="flex-1 bg-wine px-6 py-4 text-sm uppercase tracking-widest transition hover:bg-wine-light disabled:opacity-40"
          >
            Ajouter au panier
          </button>
        </div>
        {added && (
          <p className="mt-4 animate-fade-in text-sm text-gold">
            Ajouté au panier. <Link to="/panier" className="underline">Voir le panier</Link>
          </p>
        )}
      </div>
    </section>
  )
}

// Catalogue : grille de produits avec filtre par catégorie (?cat=...)
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/seedProducts'

export default function Catalog() {
  const { products, loading } = useProducts()
  const [params, setParams] = useSearchParams()
  const cat = params.get('cat') || ''
  const q = params.get('q') || ''
  const sort = params.get('tri') || ''
  const norm = (s) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  let shown = products.filter(
    (p) => (!cat || p.category === cat) && (!q || norm(`${p.name} ${p.description}`).includes(norm(q)))
  )
  if (sort === 'prix-asc') shown = [...shown].sort((a, b) => a.price - b.price)
  if (sort === 'prix-desc') shown = [...shown].sort((a, b) => b.price - a.price)

  // Met à jour un paramètre d'URL en gardant les autres
  const setParam = (key, value) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const pill = (active) =>
    `border px-4 py-2 text-xs uppercase tracking-widest transition ${
      active ? 'border-gold bg-gold text-ink' : 'border-ink-line text-cream-dim hover:border-gold hover:text-gold'
    }`

  return (
    <section className="mx-auto max-w-6xl px-6 pt-16">
      <h1 className="font-serif text-5xl">Catalogue</h1>
      <div className="mt-8 flex flex-wrap gap-3">
        <button className={pill(!cat)} onClick={() => setParam('cat', '')}>Tout</button>
        {CATEGORIES.map((c) => (
          <button key={c.id} className={pill(cat === c.id)} onClick={() => setParam('cat', c.id)}>
            {c.label}
          </button>
        ))}
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <input
          type="search" value={q} onChange={(e) => setParam('q', e.target.value)}
          placeholder="Rechercher un produit…" aria-label="Rechercher un produit"
          className="flex-1 border border-ink-line bg-ink px-4 py-3 outline-none focus:border-gold"
        />
        <select
          value={sort} onChange={(e) => setParam('tri', e.target.value)} aria-label="Trier"
          className="border border-ink-line bg-ink px-4 py-3 outline-none focus:border-gold"
        >
          <option value="">Trier : pertinence</option>
          <option value="prix-asc">Prix croissant</option>
          <option value="prix-desc">Prix décroissant</option>
        </select>
      </div>

      {loading ? (
        <p className="mt-12 text-cream-dim">Chargement…</p>
      ) : shown.length === 0 ? (
        <p className="mt-12 text-cream-dim">Aucun produit ne correspond.</p>
      ) : (
        <div className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
          {shown.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      )}
    </section>
  )
}

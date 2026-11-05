// Page d'accueil : hero, catégories, produits en vedette, bandeau livraison discrète
import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/seedProducts'
import { getImage } from '../data/images'
import { SHOP_NAME } from '../config'

export default function Home() {
  const { products, loading } = useProducts()
  const featured = products.filter((p) => p.featured).slice(0, 4)
  const hero = getImage('hero')

  return (
    <>
      <section className="relative flex min-h-[78vh] items-center overflow-hidden" style={{ background: hero.gradient }}>
        <div className="mx-auto w-full max-w-6xl px-6">
          <div className="max-w-xl animate-fade-up">
            <p className="text-xs uppercase tracking-[0.35em] text-gold">Bien-être &amp; intimité</p>
            <h1 className="mt-6 font-serif text-5xl leading-[1.05] md:text-7xl">
              L'art de prendre <em className="text-gold-light">son temps</em>
            </h1>
            <p className="mt-6 max-w-md text-cream-dim">
              Une sélection élégante et discrète de produits pensés pour la détente et le plaisir, chez {SHOP_NAME}.
            </p>
            <Link to="/catalogue" className="mt-10 inline-block bg-wine px-8 py-4 text-sm uppercase tracking-widest transition hover:bg-wine-light">
              Découvrir la collection
            </Link>
          </div>
        </div>
      </section>

      <div className="border-y border-gold/30 bg-ink-soft py-4 text-center text-xs uppercase tracking-[0.25em] text-gold">
        Livraison discrète · Emballage neutre · Sans mention sur le colis
      </div>

      <section className="mx-auto max-w-6xl px-6 pt-28">
        <h2 className="font-serif text-4xl">Nos univers</h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c, i) => (
            <Link
              key={c.id}
              to={`/catalogue?cat=${c.id}`}
              className="group relative flex h-64 flex-col justify-end overflow-hidden rounded-sm p-6"
              style={{ background: getImage(`produit-${i * 2 + 1}`).gradient }}
            >
              <div className="absolute inset-0 bg-ink/40 transition group-hover:bg-ink/20" />
              <div className="relative">
                <h3 className="font-serif text-3xl">{c.label}</h3>
                <p className="mt-1 text-sm text-cream-dim">{c.text}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 pt-28">
        <div className="flex items-end justify-between">
          <h2 className="font-serif text-4xl">En vedette</h2>
          <Link to="/catalogue" className="text-sm uppercase tracking-widest text-gold hover:text-gold-light">Tout voir →</Link>
        </div>
        {loading ? (
          <p className="mt-10 text-cream-dim">Chargement…</p>
        ) : (
          <div className="mt-10 grid grid-cols-2 gap-x-5 gap-y-10 lg:grid-cols-4">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </section>
    </>
  )
}

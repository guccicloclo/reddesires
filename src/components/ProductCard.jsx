// Carte produit utilisée dans l'accueil et le catalogue
import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'
import { formatPrice } from '../config'
import { CATEGORIES } from '../data/seedProducts'

export default function ProductCard({ product }) {
  const cat = CATEGORIES.find((c) => c.id === product.category)
  return (
    <Link to={`/produit/${product.id}`} className="group block animate-fade-up">
      <ProductVisual
        image={product.image}
        className="aspect-[4/5] rounded-sm transition duration-700 group-hover:scale-[1.02]"
      />
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] uppercase tracking-[0.15em] text-gold">{cat?.label}</p>
          <h3 className="mt-1 font-serif text-xl leading-tight group-hover:text-gold-light transition">
            {product.name}
          </h3>
        </div>
        <p className="whitespace-nowrap pt-1 text-sm text-cream-dim">{formatPrice(product.price)}</p>
      </div>
    </Link>
  )
}

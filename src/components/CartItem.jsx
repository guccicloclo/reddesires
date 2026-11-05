// Ligne du panier avec quantité modifiable
import { Link } from 'react-router-dom'
import ProductVisual from './ProductVisual'
import { useCart } from '../context/CartContext'
import { formatPrice } from '../config'

export default function CartItem({ item }) {
  const { setQty, removeItem } = useCart()
  return (
    <div className="flex gap-4 border-b border-ink-line py-6">
      <Link to={`/produit/${item.id}`}>
        <ProductVisual image={item.image} className="h-24 w-20 rounded-sm" />
      </Link>
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex justify-between gap-3">
          <Link to={`/produit/${item.id}`} className="font-serif text-lg leading-tight">
            {item.name}
          </Link>
          <p className="whitespace-nowrap text-sm">{formatPrice(item.price * item.qty)}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center border border-ink-line">
            <button className="h-9 w-9 hover:text-gold" aria-label="Diminuer" onClick={() => setQty(item.id, item.qty - 1)}>
              −
            </button>
            <span className="w-8 text-center text-sm">{item.qty}</span>
            <button className="h-9 w-9 hover:text-gold" aria-label="Augmenter" onClick={() => setQty(item.id, item.qty + 1)}>
              +
            </button>
          </div>
          <button onClick={() => removeItem(item.id)} className="text-xs uppercase tracking-widest text-cream-dim hover:text-gold">
            Retirer
          </button>
        </div>
      </div>
    </div>
  )
}

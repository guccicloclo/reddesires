// Pied de page
import { Link } from 'react-router-dom'
import { SHOP_NAME } from '../config'

export default function Footer() {
  return (
    <footer className="mt-32 border-t border-ink-line">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 py-12 text-sm text-cream-dim md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-serif text-xl text-cream">{SHOP_NAME}</p>
          <p className="mt-1">Réservé aux adultes · Livraison discrète · Paiement sécurisé</p>
        </div>
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <Link to="/catalogue" className="hover:text-gold">Catalogue</Link>
          <Link to="/livraison" className="hover:text-gold">Livraison</Link>
          <Link to="/faq" className="hover:text-gold">FAQ</Link>
          <Link to="/a-propos" className="hover:text-gold">À propos</Link>
          <Link to="/contact" className="hover:text-gold">Contact</Link>
          <Link to="/confidentialite" className="hover:text-gold">Confidentialité</Link>
          <Link to="/admin" className="hover:text-gold">Admin</Link>
        </div>
      </div>
      <p className="pb-8 text-center text-xs text-cream-dim/60">
        Démonstration — aucun achat réel. © {new Date().getFullYear()} {SHOP_NAME}
      </p>
    </footer>
  )
}

// Barre de navigation (menu repliable sur mobile)
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { SHOP_NAME } from '../config'

const links = [
  { to: '/', label: 'Accueil', end: true },
  { to: '/catalogue', label: 'Catalogue' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { count } = useCart()
  const cls = ({ isActive }) =>
    `text-sm uppercase tracking-widest transition hover:text-gold ${isActive ? 'text-gold' : 'text-cream'}`

  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="font-serif text-2xl tracking-wide" onClick={() => setOpen(false)}>
          <span className="mr-3 inline-flex h-8 w-8 items-center justify-center border border-gold align-middle text-sm text-gold">{SHOP_NAME.split(' ').map((w) => w[0]).join('').slice(0, 2).toUpperCase()}</span>
          {SHOP_NAME}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} {...l} className={cls}>{l.label}</NavLink>
          ))}
          <NavLink to="/panier" className={cls}>Panier ({count})</NavLink>
        </nav>

        <div className="flex items-center gap-5 md:hidden">
          <Link to="/panier" className="text-sm uppercase tracking-widest">Panier ({count})</Link>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="text-2xl leading-none">
            {open ? '×' : '≡'}
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex animate-fade-in flex-col gap-5 border-t border-ink-line px-6 py-6 md:hidden">
          {links.map((l) => (
            <NavLink key={l.to} {...l} className={cls} onClick={() => setOpen(false)}>{l.label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}

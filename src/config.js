// Configuration générale de la boutique
export const SHOP_NAME = import.meta.env.VITE_SHOP_NAME || 'Maison Velours'
export const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || ''
export const STRIPE_PAYMENT_LINK = import.meta.env.VITE_STRIPE_PAYMENT_LINK || ''

// Format d'un prix en dollars canadiens, à la québécoise (ex. 24,90 $)
export const formatPrice = (n) =>
  new Intl.NumberFormat('fr-CA', { style: 'currency', currency: 'CAD' }).format(n || 0)

// Taxes du Québec et livraison (valeurs de démonstration)
export const TPS = 0.05
export const TVQ = 0.09975
export const FREE_SHIPPING_FROM = 75
export const SHIPPING_FEE = 9.95

// Calcule sous-total, taxes, livraison et total (arrondis au cent)
export const computeTotals = (subtotal) => {
  const round = (n) => Math.round(n * 100) / 100
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIPPING_FEE
  const tps = round(subtotal * TPS)
  const tvq = round(subtotal * TVQ)
  return { subtotal, shipping, tps, tvq, total: round(subtotal + shipping + tps + tvq) }
}

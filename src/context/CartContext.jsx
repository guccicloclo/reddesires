// Panier global, sauvegardé dans le navigateur (localStorage)
import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const KEY = 'boutique_cart'

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(KEY)) || []
  } catch {
    return []
  }
}

export function CartProvider({ children }) {
  const [items, setItems] = useState(load)

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items))
  }, [items])

  const addItem = (product, qty = 1) =>
    setItems((prev) => {
      const found = prev.find((i) => i.id === product.id)
      if (found) return prev.map((i) => (i.id === product.id ? { ...i, qty: i.qty + qty } : i))
      // On ne garde que le strict nécessaire du produit
      const { id, name, price, image } = product
      return [...prev, { id, name, price, image, qty }]
    })

  const setQty = (id, qty) =>
    setItems((prev) =>
      qty <= 0 ? prev.filter((i) => i.id !== id) : prev.map((i) => (i.id === id ? { ...i, qty } : i)),
    )

  const removeItem = (id) => setItems((prev) => prev.filter((i) => i.id !== id))
  const clear = () => setItems([])

  const value = useMemo(
    () => ({
      items,
      addItem,
      setQty,
      removeItem,
      clear,
      count: items.reduce((n, i) => n + i.qty, 0),
      subtotal: items.reduce((n, i) => n + i.qty * i.price, 0),
    }),
    [items],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export const useCart = () => useContext(CartContext)

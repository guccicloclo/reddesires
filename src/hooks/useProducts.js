// Lecture des produits dans Firestore.
// Si Firebase n'est pas configuré (ou la collection est vide), on affiche les produits d'exemple locaux.
import { useCallback, useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import { SEED_PRODUCTS } from '../data/seedProducts'

export function useProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const reload = useCallback(async () => {
    setLoading(true)
    try {
      if (!firebaseConfigured) throw new Error('hors-ligne')
      const snap = await getDocs(collection(db, 'products'))
      const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }))
      setProducts(list.length ? list : SEED_PRODUCTS)
    } catch {
      setProducts(SEED_PRODUCTS)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    reload()
  }, [reload])

  return { products, loading, reload }
}

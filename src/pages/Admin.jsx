// Espace admin : connexion, produits (ajout / modification) et commandes
import { useEffect, useState } from 'react'
import { addDoc, collection, doc, getDocs, orderBy, query, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore'
import { db, firebaseConfigured } from '../firebase'
import { useAuth } from '../context/AuthContext'
import { useProducts } from '../hooks/useProducts'
import { CATEGORIES } from '../data/seedProducts'
import { formatPrice } from '../config'

const STATUTS = ['en attente', 'payée (test)', 'expédiée']
const EMPTY = { name: '', price: '', description: '', category: 'jouets', stock: 0 }
const input = 'w-full border border-ink-line bg-ink px-4 py-3 outline-none focus:border-gold'

function Login() {
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
    } catch {
      setError('Identifiants incorrects.')
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-20 max-w-sm space-y-4 px-6">
      <h1 className="font-serif text-4xl">Espace admin</h1>
      <input className={input} type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input className={input} type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button className="w-full bg-wine px-6 py-4 text-sm uppercase tracking-widest hover:bg-wine-light">Connexion</button>
      {error && <p className="text-sm text-red-400">{error}</p>}
    </form>
  )
}

function ProductForm({ initial, onSaved, onCancel }) {
  const [form, setForm] = useState(initial)
  const [busy, setBusy] = useState(false)
  const set = (k) => (e) => setForm({ ...form, [k]: e.target.value })

  const save = async (e) => {
    e.preventDefault()
    setBusy(true)
    const data = {
      name: form.name.trim(),
      price: Number(form.price),
      description: form.description.trim(),
      category: form.category,
      stock: Number(form.stock),
    }
    if (form.id) await updateDoc(doc(db, 'products', form.id), data)
    else await addDoc(collection(db, 'products'), { ...data, image: 'produit-1', featured: false, createdAt: serverTimestamp() })
    setBusy(false)
    onSaved()
  }

  return (
    <form onSubmit={save} className="space-y-4 border border-ink-line bg-ink-soft p-6">
      <h3 className="font-serif text-2xl">{form.id ? 'Modifier le produit' : 'Nouveau produit'}</h3>
      <input className={input} placeholder="Nom" value={form.name} onChange={set('name')} required />
      <div className="grid grid-cols-3 gap-4">
        <input className={input} type="number" step="0.01" min="0" placeholder="Prix ($ CAD)" value={form.price} onChange={set('price')} required />
        <input className={input} type="number" min="0" placeholder="Stock" value={form.stock} onChange={set('stock')} required />
        <select className={input} value={form.category} onChange={set('category')}>
          {CATEGORIES.map((c) => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>
      <textarea className={input} rows="3" placeholder="Description" value={form.description} onChange={set('description')} />
      <div className="flex gap-3">
        <button disabled={busy} className="bg-wine px-6 py-3 text-sm uppercase tracking-widest hover:bg-wine-light disabled:opacity-50">Enregistrer</button>
        <button type="button" onClick={onCancel} className="px-6 py-3 text-sm uppercase tracking-widest text-cream-dim hover:text-gold">Annuler</button>
      </div>
    </form>
  )
}

function Orders() {
  const [orders, setOrders] = useState([])

  const load = async () => {
    const snap = await getDocs(query(collection(db, 'orders'), orderBy('createdAt', 'desc')))
    setOrders(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
  }
  useEffect(() => { load() }, [])

  const changeStatus = async (id, status) => {
    await updateDoc(doc(db, 'orders', id), { status })
    load()
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-left text-sm">
        <thead className="text-xs uppercase tracking-widest text-cream-dim">
          <tr><th className="py-3">Client</th><th>Produits</th><th>Total</th><th>Statut</th></tr>
        </thead>
        <tbody>
          {orders.map((o) => (
            <tr key={o.id} className="border-t border-ink-line align-top">
              <td className="py-3 pr-4">{o.customerName}</td>
              <td className="pr-4 text-cream-dim">{o.items?.map((i) => `${i.qty} × ${i.name}`).join(', ')}</td>
              <td className="pr-4">{formatPrice(o.total)}</td>
              <td>
                <select value={o.status} onChange={(e) => changeStatus(o.id, e.target.value)} className="border border-ink-line bg-ink px-2 py-1">
                  {STATUTS.map((s) => <option key={s}>{s}</option>)}
                </select>
              </td>
            </tr>
          ))}
          {orders.length === 0 && <tr><td colSpan="4" className="py-6 text-cream-dim">Aucune commande.</td></tr>}
        </tbody>
      </table>
    </div>
  )
}

function Dashboard({ products }) {
  const [orders, setOrders] = useState([])
  useEffect(() => {
    getDocs(collection(db, 'orders')).then((s) => setOrders(s.docs.map((d) => d.data())))
  }, [])
  const sales = orders.reduce((sum, o) => sum + (o.total || 0), 0)
  const low = products.filter((p) => p.stock <= 3)
  const card = (label, value) => (
    <div className="border border-ink-line bg-ink-soft p-6">
      <p className="text-xs uppercase tracking-widest text-cream-dim">{label}</p>
      <p className="mt-3 font-serif text-4xl text-gold-light">{value}</p>
    </div>
  )
  return (
    <div>
      <div className="grid gap-4 sm:grid-cols-3">
        {card('Ventes totales', formatPrice(sales))}
        {card('Commandes', orders.length)}
        {card('Produits', products.length)}
      </div>
      <h3 className="mt-10 font-serif text-2xl">Stock bas (3 ou moins)</h3>
      <ul className="mt-4 text-sm text-cream-dim">
        {low.length === 0 && <li>Aucun produit en stock bas.</li>}
        {low.map((p) => <li key={p.id} className="border-t border-ink-line py-2">{p.name} — {p.stock} en stock</li>)}
      </ul>
    </div>
  )
}

export default function Admin() {
  const { user, isAdmin, loading, logout } = useAuth()
  const { products, reload } = useProducts()
  const [tab, setTab] = useState('dashboard')
  const [editing, setEditing] = useState(null)

  if (!firebaseConfigured)
    return <p className="mx-auto max-w-xl px-6 pt-20 text-cream-dim">Configurez Firebase dans le fichier .env pour utiliser l'espace admin.</p>
  if (loading) return <p className="px-6 pt-20 text-center text-cream-dim">Chargement…</p>
  if (!user) return <Login />
  if (!isAdmin)
    return (
      <div className="mx-auto max-w-sm px-6 pt-20">
        <p>Ce compte n'a pas accès à l'administration.</p>
        <button onClick={logout} className="mt-4 text-gold">Se déconnecter</button>
      </div>
    )

  const tabCls = (t) => `pb-2 text-sm uppercase tracking-widest ${tab === t ? 'border-b border-gold text-gold' : 'text-cream-dim'}`

  return (
    <section className="mx-auto max-w-6xl px-6 pt-12">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-4xl">Administration</h1>
        <button onClick={logout} className="text-sm uppercase tracking-widest text-cream-dim hover:text-gold">Déconnexion</button>
      </div>
      <div className="mt-8 flex gap-8 border-b border-ink-line">
        <button className={tabCls('dashboard')} onClick={() => setTab('dashboard')}>Tableau de bord</button>
        <button className={tabCls('products')} onClick={() => setTab('products')}>Produits</button>
        <button className={tabCls('orders')} onClick={() => setTab('orders')}>Commandes</button>
      </div>

      <div className="mt-8">
        {tab === 'dashboard' ? <Dashboard products={products} /> : tab === 'orders' ? <Orders /> : editing ? (
          <ProductForm initial={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); reload() }} />
        ) : (
          <>
            <button onClick={() => setEditing(EMPTY)} className="mb-6 bg-wine px-6 py-3 text-sm uppercase tracking-widest hover:bg-wine-light">+ Ajouter un produit</button>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead className="text-xs uppercase tracking-widest text-cream-dim">
                  <tr><th className="py-3">Nom</th><th>Catégorie</th><th>Prix</th><th>Stock</th><th /></tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id} className="border-t border-ink-line">
                      <td className="py-3">{p.name}</td>
                      <td className="text-cream-dim">{CATEGORIES.find((c) => c.id === p.category)?.label}</td>
                      <td>{formatPrice(p.price)}</td>
                      <td>{p.stock}</td>
                      <td className="text-right"><button onClick={() => setEditing(p)} className="text-gold hover:text-gold-light">Modifier</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

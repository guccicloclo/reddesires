// Routes de l'application
import { Route, Routes, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import AgeGate from './components/AgeGate'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Catalog from './pages/Catalog'
import Product from './pages/Product'
import Cart from './pages/Cart'
import Confirmation from './pages/Confirmation'
import Admin from './pages/Admin'
import Info from './pages/Info'

// Remonte en haut de page à chaque changement de route
function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

export default function App() {
  return (
    <AgeGate>
      <ScrollToTop />
      <Navbar />
      <main className="min-h-[70vh] pb-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogue" element={<Catalog />} />
          <Route path="/produit/:id" element={<Product />} />
          <Route path="/panier" element={<Cart />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/admin" element={<Admin />} />
          {['livraison', 'a-propos', 'contact', 'faq', 'confidentialite'].map((p) => (
            <Route key={p} path={`/${p}`} element={<Info page={p} />} />
          ))}
          <Route path="*" element={<p className="px-6 pt-20 text-center">Page introuvable.</p>} />
        </Routes>
      </main>
      <Footer />
    </AgeGate>
  )
}

// Catégories et produits d'exemple, partagés par le script de seed et par le mode "hors ligne" du site.
// Prix en dollars canadiens (CAD). "image" correspond à une clé de src/data/images.js.

export const CATEGORIES = [
  { id: 'jouets', label: 'Vibrateurs & jouets', text: 'Des formes douces, des matières soignées.' },
  { id: 'lingerie', label: 'Lingerie & nuisettes', text: 'Satin, dentelle et élégance au quotidien.' },
  { id: 'accessoires', label: 'Accessoires', text: 'Ceintures, bandeaux et détails raffinés.' },
  { id: 'soins', label: 'Soins & accessoires de soin', text: 'Crèmes, lubrifiants et entretien.' },
]

export const SEED_PRODUCTS = [
  {
    id: 'vibrateur-velours',
    name: 'Vibrateur Velours',
    price: 79.0,
    category: 'jouets',
    stock: 20,
    image: 'produit-1',
    featured: true,
    description:
      'Un design épuré en silicone doux au toucher, discret et silencieux. Rechargeable, étanche, plusieurs rythmes.',
  },
  {
    id: 'ensemble-duo-satin',
    name: 'Ensemble Duo Satin',
    price: 109.0,
    category: 'jouets',
    stock: 12,
    image: 'produit-2',
    featured: false,
    description:
      'Un coffret de deux pièces en silicone de qualité médicale, présenté dans une pochette de rangement en satin.',
  },
  {
    id: 'nuisette-satin-noir',
    name: 'Nuisette Satin Noir',
    price: 64.0,
    category: 'lingerie',
    stock: 18,
    image: 'produit-3',
    featured: true,
    description:
      'Une nuisette fluide en satin noir, bordée de dentelle fine. Coupe flatteuse, tombé soyeux.',
  },
  {
    id: 'ensemble-dentelle-bordeaux',
    name: 'Ensemble Dentelle Bordeaux',
    price: 88.0,
    category: 'lingerie',
    stock: 15,
    image: 'produit-4',
    featured: true,
    description:
      'Soutien-gorge et culotte en dentelle bordeaux, finitions délicates et confort durable.',
  },
  {
    id: 'ceinture-porte-jarretelles',
    name: 'Ceinture Porte-jarretelles Ébène',
    price: 49.0,
    category: 'accessoires',
    stock: 25,
    image: 'produit-5',
    featured: false,
    description:
      'Une ceinture ajustable aux attaches dorées, à associer à vos bas préférés pour une silhouette soignée.',
  },
  {
    id: 'bandeau-soie-nuit',
    name: 'Bandeau de Soie Nuit',
    price: 28.0,
    category: 'accessoires',
    stock: 30,
    image: 'produit-6',
    featured: false,
    description:
      'Un bandeau en soie légère et réglable, pour les soirées où l’on prend son temps.',
  },
  {
    id: 'coffret-soin-intime',
    name: 'Coffret Soin Intime',
    price: 54.0,
    category: 'soins',
    stock: 22,
    image: 'produit-7',
    featured: true,
    description:
      'Crème apaisante, lubrifiant à base d’eau et nettoyant doux, réunis dans un coffret cadeau sobre.',
  },
  {
    id: 'nettoyant-doux-jouets',
    name: 'Nettoyant Doux pour Accessoires',
    price: 16.0,
    category: 'soins',
    stock: 40,
    image: 'produit-8',
    featured: false,
    description:
      'Un nettoyant sans parfum, délicat pour les matières sensibles, pour entretenir vos accessoires en toute simplicité.',
  },
]

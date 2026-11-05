// Images placeholders : illustrations provisoires (produit-N.svg) dans public/images/.
// Pour de vraies photos : déposez-les dans public/images/ et changez l'extension ici
// (ex. 'produit-1.jpg'). Les alt restent volontairement neutres.
export const IMAGES = {
  'produit-1': { file: 'produit-1.svg', alt: 'Illustration d’un objet de bien-être élégant', gradient: 'linear-gradient(135deg,#6e1423,#1a1617)' },
  'produit-2': { file: 'produit-2.svg', alt: 'Illustration d’un coffret duo et sa pochette', gradient: 'linear-gradient(135deg,#b8975a,#2b2526)' },
  'produit-3': { file: 'produit-3.svg', alt: 'Illustration d’une nuisette sur cintre', gradient: 'linear-gradient(135deg,#3a0d16,#b8975a)' },
  'produit-4': { file: 'produit-4.svg', alt: 'Illustration d’un ensemble de dentelle', gradient: 'linear-gradient(135deg,#d9cfbf,#6e1423)' },
  'produit-5': { file: 'produit-5.svg', alt: 'Illustration d’une ceinture', gradient: 'linear-gradient(135deg,#1a1617,#8c1d31)' },
  'produit-6': { file: 'produit-6.svg', alt: 'Illustration d’un bandeau de soie', gradient: 'linear-gradient(135deg,#f5eee2,#b8975a)' },
  'produit-7': { file: 'produit-7.svg', alt: 'Illustration d’un coffret de soin fermé', gradient: 'linear-gradient(135deg,#2b2526,#b8975a)' },
  'produit-8': { file: 'produit-8.svg', alt: 'Illustration d’un flacon pompe', gradient: 'linear-gradient(135deg,#8c1d31,#d2b27a)' },
  hero: { file: 'hero.jpg', alt: 'Ambiance feutrée et chaleureuse', gradient: 'linear-gradient(120deg,#0e0c0d 30%,#3a0d16 70%,#6e1423)' },
}

export const getImage = (key) =>
  IMAGES[key] || { file: '', alt: 'Produit', gradient: 'linear-gradient(135deg,#2b2526,#0e0c0d)' }

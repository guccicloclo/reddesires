// Pages d'information : livraison, à propos, contact, FAQ, confidentialité
import { Link } from 'react-router-dom'
import { SHOP_NAME, FREE_SHIPPING_FROM, formatPrice, SHIPPING_FEE } from '../config'

const PAGES = {
  livraison: {
    title: 'Livraison & retours',
    blocks: [
      ['Livraison discrète', "Chaque commande est expédiée dans un colis neutre, sans logo ni mention du contenu. Le nom de l'expéditeur reste générique."],
      ['Délais et tarifs', `Expédition en 2 à 5 jours ouvrables partout au Canada. Livraison offerte dès ${formatPrice(FREE_SHIPPING_FROM)} d'achat, sinon ${formatPrice(SHIPPING_FEE)}.`],
      ['Retours', "Pour des raisons d'hygiène, les articles intimes ouverts ne sont pas repris. Les articles non ouverts peuvent être retournés sous 30 jours."],
    ],
  },
  'a-propos': {
    title: 'À propos',
    blocks: [
      ['Notre vision', `${SHOP_NAME} propose une sélection raffinée de produits de bien-être et d'intimité, pensée avec soin et discrétion.`],
      ['Nos engagements', 'Des produits choisis pour leur qualité, un service respectueux et un parcours d’achat confidentiel du début à la fin.'],
    ],
  },
  contact: {
    title: 'Contact',
    blocks: [
      ['Nous joindre', 'Une question sur une commande ou un produit ? Écrivez-nous, nous répondons en 24 à 48 heures ouvrables.'],
      ['Coordonnées (exemple)', 'service@exemple.ca · 1 800 555-0123 · Du lundi au vendredi, de 9 h à 17 h (HE)'],
    ],
  },
  faq: {
    title: 'Questions fréquentes',
    blocks: [
      ["Mon achat est-il discret ?", "Oui. Le colis est neutre et le libellé sur le relevé de carte ne mentionne pas la nature des produits."],
      ['Quels modes de paiement acceptez-vous ?', 'Les principales cartes de crédit, par paiement sécurisé Stripe. Nous ne conservons aucune donnée de carte.'],
      ['Les prix incluent-ils les taxes ?', "Non, la TPS et la TVQ sont ajoutées au panier avant le paiement."],
      ['Puis-je suivre ma commande ?', 'Un numéro de référence vous est remis à la confirmation.'],
    ],
  },
  confidentialite: {
    title: 'Confidentialité',
    blocks: [
      ['Vos données', "Nous recueillons uniquement les renseignements nécessaires au traitement de votre commande, et ne les partageons pas."],
      ['Paiement', 'Les paiements sont traités par Stripe. Aucune donnée de carte ne transite par ce site.'],
      ['Âge', 'Ce site est réservé aux personnes de 18 ans et plus.'],
    ],
  },
}

export default function Info({ page }) {
  const { title, blocks } = PAGES[page]
  return (
    <section className="mx-auto max-w-3xl animate-fade-up px-6 pt-16">
      <h1 className="font-serif text-5xl">{title}</h1>
      <div className="mt-10 space-y-8">
        {blocks.map(([h, text]) => (
          <div key={h} className="border-t border-ink-line pt-6">
            <h2 className="font-serif text-2xl text-gold-light">{h}</h2>
            <p className="mt-3 leading-relaxed text-cream-dim">{text}</p>
          </div>
        ))}
      </div>
      <p className="mt-12 text-xs text-cream-dim">Contenu d’exemple pour la démonstration. <Link to="/catalogue" className="text-gold">Retour au catalogue</Link></p>
    </section>
  )
}

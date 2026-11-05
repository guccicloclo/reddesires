# Boutique en ligne — démo

Démo d'une boutique de bien-être et d'intimité (produits d'exemple, aucune image explicite).
React + Vite + React Router + Tailwind, Firebase (Firestore, Auth, Hosting), Stripe en mode test.

## Installation

```bash
npm install
cp .env.example .env   # puis remplir les valeurs
npm run dev
```

Sans `.env`, le site fonctionne quand même avec les produits d'exemple locaux (l'admin est alors désactivé,
et le paiement est simulé).

## Configuration

1. **Firebase** : projet `maison-velours-demo-20261009` et app Web déjà créés, et projet lié au dossier.
   La configuration de l'app Web est dans `.env`. Activez l'API Cloud Firestore dans Google Cloud si demandé,
   créez la base à Montréal (`northamerica-northeast1`), puis activez *Authentication > E-mail/Mot de passe*
   dans Firebase et créez **un** utilisateur admin.
2. **Règles** : dans `firestore.rules`, remplacez `admin@example.com` par l'e-mail exact de l'admin,
   puis `firebase deploy --only firestore:rules`. Mettez le même e-mail dans `VITE_ADMIN_EMAIL`.
3. **Produits** : renseignez `ADMIN_PASSWORD` dans `.env` puis `npm run seed`.
4. **Stripe (test)** : dans le tableau de bord Stripe en mode test, créez un *Payment Link* en **CAD** (montant de démo), réglez la page de retour sur `https://VOTRE-SITE/confirmation` et collez le lien `https://buy.stripe.com/test_...`
   dans `VITE_STRIPE_PAYMENT_LINK`. Carte de test : `4242 4242 4242 4242`.
5. **Images** : des illustrations provisoires (`produit-1.svg`…) sont dans `public/images/`. Déposez de vraies photos
   `produit-1.jpg`… au même endroit, puis changez l'extension dans `src/data/images.js`.
6. **Nom** : `VITE_SHOP_NAME` dans `.env`.

## Déploiement

```bash
npm run build
firebase deploy --only hosting
```

## Limites de la démo

Un Payment Link a un montant fixe : il ne reflète pas le total du panier (en production, utiliser des
Checkout Sessions créées côté serveur). Le total réel est enregistré dans la commande Firestore.
Sans webhook ou vérification serveur, la page de retour ne marque pas la commande comme payée;
vérifiez le paiement Stripe manuellement avant de changer son statut dans l'admin.
Pas de taxes, de frais de livraison, de comptes clients, de webhooks ni d'e-mails.

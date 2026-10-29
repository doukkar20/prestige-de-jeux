# Prestige de Jeux — publication et préparation AdSense

Les modifications ciblent le dépôt `doukkar20/prestige-de-jeux` et son déploiement existant sur `https://prestigedejeux.com`. Elles ne créent pas un autre site.

## Livré

- Dix articles originaux en français, entre 689 et 713 mots chacun, avec exercices, exemples et sources pour les règles sportives.
- `/blog`, `/blog/:slug`, `/about`, `/contact`, `/privacy-policy`, `/terms` et redirection de l’ancien `/privacy`.
- Navigation desktop/mobile, liens de pied de page, sommaires et articles associés.
- HTML complet généré à la compilation pour les articles, le blog, les pages d’information et Contact. Les liens directs disposent d’un `index.html` sur GitHub Pages ; ils ne dépendent plus du fallback 404 pour ces contenus.
- Titres, descriptions, URL canoniques, données structurées BlogPosting, sitemap et page introuvable non indexable.
- Coordonnées confirmées par le propriétaire : +212 663 650333, contact@prestigedejeux.ma, Angle Avenue FAR et Rue de la Liberté à Meknès.
- Formulaire Contact avec validation : prépare un message WhatsApp ; le visiteur choisit ensuite de l’envoyer. Aucun message de test n’a été envoyé. Aucun service d’envoi d’e-mail n’est simulé.
- Carte Google Maps chargée sur demande et widget externe d’avis remplacé par un lien.
- Réservation également préparée via WhatsApp, car le déploiement statique n’a pas d’API `/api/reservations`. Les dates de tournois expirées ne sont plus présentées comme ouvertes ; les numéros des participants ne sont plus affichés.

## Activation des annonces et examen Google

Aucune quantité de mots ou d’articles ne garantit une approbation ni une conformité à 100 %. Google examine notamment l’utilité, l’originalité, l’expérience, les pratiques publicitaires et le trafic. Les articles doivent continuer à être relus et actualisés par l’établissement.

L’identifiant existant `ca-pub-1522917281481065` est conservé via la balise `google-adsense-account`. Le chargement automatique du script de diffusion a été retiré : le site n’affiche pas d’annonces dans cette version. La balise de compte peut être utilisée pour la vérification du site dans AdSense.

Avant de réactiver la diffusion :

1. Dans le compte AdSense du propriétaire, vérifier le domaine et créer/configurer le message de confidentialité avec la CMP Google ou une autre CMP certifiée. Une simple bannière maison n’est pas une CMP certifiée. Les exigences régionales dépendent des visiteurs, même pour un établissement au Maroc.
2. Présenter les fournisseurs et finalités réellement retenus, les possibilités de refus et de modification du consentement ; adapter la politique au dispositif effectivement activé. Ne pas traiter la consultation d’une page ou le choix de langue comme un accord publicitaire.
3. Installer l’intégration CMP/AdSense conformément aux instructions du fournisseur et contrôler les requêtes et retraits de consentement avant la diffusion. Aucune intégration fictive n’est incluse ici.
4. Récupérer les lignes `ads.txt` exactes depuis le compte AdSense et les ajouter à `public/ads.txt` si Google les demande. Ne pas inventer de vendeurs autorisés.
5. Vérifier les informations de l’exploitant et les formalités de protection des données applicables avec le responsable de l’établissement. Les textes publiés décrivent les fonctions du site ; ils ne constituent pas une certification juridique.
6. Déployer, vérifier le domaine dans Google Search Console et soumettre `https://prestigedejeux.com/sitemap.xml`, puis demander l’examen AdSense depuis le compte propriétaire.

Références officielles :

- [Règles pour les éditeurs Google](https://support.google.com/adsense/answer/10502938?hl=fr)
- [Informations requises dans la confidentialité](https://support.google.com/adsense/answer/1348695?hl=fr)
- [Exigences de CMP certifiée](https://support.google.com/adsense/answer/13554116?hl=fr)

## Vérification et déploiement

```sh
npm ci
npx tsc --noEmit
npm run build
npm run check:content
```

Le workflow GitHub Actions existant construit `dist/` puis publie sur GitHub Pages à chaque push sur `main`. La valeur de production `VITE_BASE_PATH=/` est nécessaire pour le domaine personnalisé et les liens directs. `VITE_SITE_URL=https://prestigedejeux.com/` est définie dans le workflow et utilisée par défaut localement.

Ne pas publier seulement les anciens fichiers versionnés de `dist/` : laisser le workflow générer l’artefact complet, y compris les nouvelles pages et les bundles.

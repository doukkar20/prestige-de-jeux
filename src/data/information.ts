export const business = {
  name: 'Prestige de Jeux',
  phone: '+212 663 650333',
  telephone: '+212663650333',
  whatsapp: '212663650333',
  email: 'contact@prestigedejeux.ma',
  address: 'Angle Avenue FAR et Rue de la Liberté, Meknès, Maroc',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=Prestige+de+jeux+Meknes',
};

export type InformationPage = {
  title: string;
  description: string;
  eyebrow: string;
  sections: { title: string; paragraphs: string[] }[];
};

export const informationPages: Record<string, InformationPage> = {
  '/about': {
    title: 'À propos de Prestige de Jeux à Meknès',
    description: 'Découvrez Prestige de Jeux : billard professionnel, snooker, lounge et café à Meknès, pour vos parties et vos rencontres entre amis.',
    eyebrow: 'Le lieu & notre approche',
    sections: [
      { title: 'Un lieu de rencontre autour du billard', paragraphs: [
        'Prestige de Jeux est un espace de billard, de snooker et de détente situé à Meknès, au Maroc. Notre projet réunit le plaisir du jeu et celui de se retrouver dans un cadre lounge soigné. On peut venir pour découvrir une discipline, partager une partie avec des amis ou prolonger la conversation autour d’un café. Notre approche repose sur une idée simple : la qualité du moment dépend autant du cadre que de l’attention portée à ceux qui le partagent.',
        'Nous accueillons les amateurs de précision comme les visiteurs qui prennent une queue pour la première fois. Vous n’avez pas besoin de connaître tout le vocabulaire pour préparer votre visite. Précisez votre niveau et vos envies lors de la prise de contact : une découverte du snooker, une partie de billard américain ou une rencontre en groupe ne demandent pas la même organisation.'
      ] },
      { title: 'Des tables de jeu et un espace pour prendre son temps', paragraphs: [
        'Le billard professionnel et le snooker occupent une place centrale dans notre univers. Ces deux pratiques invitent à observer, choisir une trajectoire et maîtriser son geste. Le billard américain permet de construire des enchaînements autour de billes numérotées ; le snooker propose une autre lecture du jeu, avec ses rouges, ses couleurs et son score progressif. Demandez la disponibilité des tables correspondant à votre discipline avant votre déplacement.',
        'L’espace lounge accompagne ces temps de jeu. Il permet de faire une pause entre les manches et de réunir ceux qui préfèrent discuter. Pour préserver le confort de tous, nous invitons chaque visiteur à respecter les lignes de tir, le matériel et le rythme des autres tables. L’ambiance premium se traduit aussi par ces attentions simples qui rendent le lieu agréable à partager.'
      ] },
      { title: 'Le café et les plaisirs de la table', paragraphs: [
        'Notre café et notre offre de restauration donnent une place à la gourmandise dans la sortie. Consultez la carte du site pour découvrir les boissons et les propositions culinaires, puis confirmez leur disponibilité auprès de l’équipe. Pour toute allergie ou restriction alimentaire, demandez les informations nécessaires avant de commander. Une description sur le site ne remplace pas cet échange avec les personnes qui préparent et servent les produits.',
        'Vous pouvez organiser une visite qui associe jeu et pause au café, selon les disponibilités. Si vous venez en groupe, indiquez le nombre de personnes et le déroulement souhaité. Cela permet de discuter d’une proposition adaptée plutôt que de supposer qu’une formule comprend automatiquement toutes les prestations.'
      ] },
      { title: 'Préparer une réservation ou une demande VIP', paragraphs: [
        'Pour une table, un espace VIP ou un projet de rencontre, contactez-nous avec la date, l’heure et le nombre de participants. L’équipe vous confirme la disponibilité, le tarif et les conditions applicables. Une demande ne constitue une réservation qu’après confirmation. Les coordonnées et l’accès sont regroupés sur notre page Contact.',
        'Notre blog prolonge la découverte avec des guides en français sur les règles, le matériel, la progression et la culture du billard. Les conseils pédagogiques accompagnent vos premières questions ; pour une situation de compétition, référez-vous toujours au règlement annoncé par l’organisateur. Vous pouvez également nous signaler une erreur éditoriale par e-mail afin que nous puissions la vérifier.'
      ] }
    ]
  },
  '/privacy-policy': {
    title: 'Politique de confidentialité',
    description: 'Données de contact, cookies, Google AdSense et choix publicitaires : les informations de confidentialité de Prestige de Jeux.',
    eyebrow: 'Vos données & vos choix',
    sections: [
      { title: 'Qui contacter et quelles données sont concernées ?', paragraphs: [
        `Cette politique décrit les traitements associés au site prestigedejeux.com, présenté par Prestige de Jeux, ${business.address}. Pour une question concernant vos données, contactez ${business.email} ou ${business.phone}. Elle concerne la visite du site et les demandes que vous nous adressez ; les services externes disposent de leurs propres politiques.`,
        'Le formulaire Contact prépare une conversation WhatsApp avec le nom, l’adresse e-mail, le sujet et le message que vous saisissez. Le texte n’est pas envoyé automatiquement : vous devez le transmettre dans WhatsApp. Vous pouvez aussi nous contacter directement par téléphone ou e-mail. Ne communiquez pas de mot de passe, de données bancaires ou de document sensible dans un message de contact.'
      ] },
      { title: 'Finalités, destinataires et conservation', paragraphs: [
        'Les informations que vous transmettez servent à répondre à votre demande, à préparer une réservation et à assurer le suivi de nos échanges. L’équipe chargée de votre demande y a accès. L’hébergeur du site peut traiter des données techniques de connexion, notamment l’adresse IP, la date et les informations du navigateur, pour fournir et sécuriser le service. Le site statique est hébergé via GitHub Pages, un service de GitHub.',
        'La durée de conservation dépend de la nature de votre demande et des éventuelles obligations applicables. Les échanges utiles au suivi sont conservés pendant ce suivi ; les éléments qui doivent être conservés pour une obligation ou un litige le sont pour la durée correspondante. Vous pouvez demander des précisions et la suppression des échanges devenus inutiles. Nous ne vendons pas les coordonnées communiquées dans les demandes de contact et ne les utilisons pas pour vous inscrire automatiquement à une newsletter.'
      ] },
      { title: 'Cookies, stockage local et services externes', paragraphs: [
        'Un cookie est un petit fichier enregistré par le navigateur. Une balise web, aussi appelée pixel ou web beacon, peut signaler le chargement d’une ressource à son fournisseur. Le site mémorise votre choix de langue dans le stockage local du navigateur sous la clé prestige_lang. Vous pouvez effacer ce choix dans les paramètres de votre navigateur. Aucune acceptation publicitaire ne résulte du simple choix d’une langue.',
        'Les polices sont fournies par Google Fonts. Un lien vers Google Maps permet de consulter l’itinéraire ; la carte intégrée ne se charge que si vous choisissez de l’afficher. WhatsApp est un service de Meta : son ouverture et l’envoi du message sont soumis aux conditions de ce service. Ces fournisseurs peuvent recevoir des données techniques, telles que l’adresse IP, et traiter des données hors du Maroc selon leurs propres dispositions. Consultez leurs politiques avant d’utiliser ces services si vous souhaitez connaître leurs modalités.'
      ] },
      { title: 'Google AdSense et les partenaires publicitaires', paragraphs: [
        'Le site est préparé pour Google AdSense. Dans cette version, aucun script de diffusion d’annonces AdSense n’est chargé automatiquement. Si la diffusion publicitaire est activée, des fournisseurs tiers, dont Google, pourront utiliser des cookies pour diffuser des annonces en fonction de vos visites antérieures sur ce site ou sur d’autres sites. Les cookies publicitaires de Google permettent à Google et à ses partenaires de personnaliser les annonces à partir de ces visites.',
        'Lorsque des annonces sont diffusées, des tiers peuvent déposer ou lire des cookies dans votre navigateur, utiliser des balises web et traiter votre adresse IP ou d’autres identifiants pour fournir, mesurer et sécuriser la publicité. Les partenaires et finalités effectivement utilisés doivent être présentés dans le dispositif de consentement au moment de l’activation. Les choix nécessaires doivent être recueillis avant les traitements concernés, notamment via une plateforme de gestion du consentement certifiée par Google lorsque celle-ci est requise. Refuser la personnalisation ne signifie pas nécessairement supprimer toute publicité.'
      ] },
      { title: 'Comment exercer vos choix et vos droits', paragraphs: [
        'Vous pouvez gérer la personnalisation dans le Centre de préférences publicitaires de Google et consulter les choix proposés par les réseaux partenaires via YourAdChoices. Votre navigateur permet également de supprimer ou de bloquer les cookies. Le blocage peut affecter certaines fonctions des services externes. Les liens utiles figurent ci-dessous ; les paramètres de ces services sont indépendants du stockage de langue de notre site.',
        `Pour demander l’accès, la rectification ou la suppression de vos informations, ou discuter d’une opposition à leur utilisation selon les droits applicables, écrivez à ${business.email} avec un objet « Données personnelles ». Décrivez votre demande sans joindre spontanément de document sensible. Nous pourrons demander les précisions nécessaires pour traiter la demande et vérifier son origine. Vous pouvez également contacter la CNDP au Maroc pour vous informer sur les recours disponibles. Cette politique sera adaptée si les services ou les traitements du site évoluent.`
      ] }
    ]
  },
  '/terms': {
    title: 'Conditions d’utilisation',
    description: 'Conditions de visite du site, demandes de réservation VIP et règles de respect des installations de Prestige de Jeux à Meknès.',
    eyebrow: 'Visite & réservations',
    sections: [
      { title: 'Objet et informations du site', paragraphs: [
        `Le site prestigedejeux.com présente les activités de Prestige de Jeux, ${business.address}. Vous pouvez joindre l’équipe à ${business.email} ou au ${business.phone}. Les présentes conditions encadrent la consultation du site et précisent comment préparer une demande de réservation. Les conditions particulières communiquées pour une prestation doivent être examinées avant sa confirmation.`,
        'Les descriptions, photographies, guides et informations pratiques servent à vous renseigner. Les disponibilités, produits de la carte, horaires et tarifs peuvent évoluer ; confirmez les informations utiles auprès de l’équipe pour la date de votre visite. Nous pouvons corriger une erreur signalée sur le site. Les articles sont des contenus pédagogiques et ne remplacent pas le règlement sportif annoncé pour une compétition.'
      ] },
      { title: 'Demandes de réservation et espaces VIP', paragraphs: [
        'Une demande effectuée depuis le site, par WhatsApp, par téléphone ou par e-mail n’emporte pas automatiquement confirmation d’une table ou d’un espace VIP. Indiquez une date, une heure, un nombre de personnes et un moyen de réponse exacts. La réservation devient effective après confirmation de l’équipe et accord sur les conditions particulières applicables.',
        'Avant de confirmer, vérifiez la durée, les prestations incluses, le prix, les modalités de règlement et, le cas échéant, les conditions d’acompte, de modification, d’annulation ou de retard. Aucun acompte ni frais d’annulation ne peut être déduit du seul envoi d’un formulaire. Si votre projet change, contactez l’équipe rapidement pour connaître les possibilités. Les demandes de groupe et de privatisation sont examinées selon les disponibilités.'
      ] },
      { title: 'Utilisation des installations et respect des personnes', paragraphs: [
        'Sur place, respectez les consignes du personnel, les autres visiteurs et le matériel. Préservez l’espace autour des tables, évitez de traverser une ligne de tir et utilisez les supports prévus pour les boissons et les affaires personnelles. N’effectuez pas de coup technique susceptible d’abîmer le tapis sans vous être assuré qu’il est autorisé et que vous savez l’exécuter correctement.',
        'Signalez sans attendre un défaut du matériel ou un incident. Les comportements agressifs, le harcèlement et les dégradations sont incompatibles avec l’accueil du public. Les jeux présentés sur le site sont des activités de loisir et de précision ; le site ne propose pas de service de paris. Pour les photographies, respectez le choix des personnes reconnaissables et les éventuelles consignes de la salle. Toute information utile concernant l’accès doit être demandée avant la visite.'
      ] },
      { title: 'Contenus, services externes et disponibilité', paragraphs: [
        'Les textes et éléments du site sont protégés par les droits applicables à leurs auteurs et titulaires. Leur présence en ligne n’autorise pas une réutilisation commerciale sans accord. Vous pouvez partager un lien vers un article. Pour une autre utilisation, contactez-nous en précisant le contenu et le projet envisagés.',
        'Le site peut renvoyer vers des services externes, notamment WhatsApp et Google Maps. Leur utilisation relève de leurs propres conditions. Nous cherchons à maintenir un accès fonctionnel au site, mais des interruptions techniques peuvent survenir. Si un formulaire ou un lien ne fonctionne pas, utilisez le téléphone ou l’e-mail de la page Contact. Les présentes conditions n’écartent aucun droit ni responsabilité qui ne pourrait légalement être exclu.'
      ] },
      { title: 'Données, réclamations et mises à jour', paragraphs: [
        'La politique de confidentialité explique les données liées aux échanges et les technologies utilisées sur le site. La consultation du site ne constitue pas un consentement à la publicité personnalisée. Pour toute réclamation sur une demande ou une prestation, contactez d’abord l’équipe avec les informations nécessaires pour identifier la situation. Nous privilégions un échange permettant de comprendre les faits et de rechercher une solution.',
        'L’activité étant située à Meknès, les dispositions marocaines applicables sont prises en compte, sans priver les visiteurs des protections impératives dont ils bénéficient. La date de la présente version est indiquée sur la page. Les changements ultérieurs s’appliquent pour l’avenir et ne modifient pas automatiquement les conditions particulières d’une réservation déjà confirmée.'
      ] }
    ]
  }
};

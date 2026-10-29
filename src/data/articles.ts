export type Article = {
  slug: string;
  title: string;
  description: string;
  category: string;
  sections: { title: string; paragraphs: string[] }[];
  sources?: { label: string; url: string }[];
};

// Original French editorial content. Dates reflect this edition, not an invented publication history.
export const editorialDate = '2026-10-29';
export const articles: Article[] = [
  {
    slug: 'regles-snooker-debutants',
    title: 'Les règles essentielles du snooker pour débutants',
    description: 'Points, alternance rouge-couleur, fautes et coups de défense : comprendre une première partie de snooker avec un exemple concret.',
    category: 'Snooker',
    sections: [
      { title: 'Comprendre le but avant de viser', paragraphs: [
        'Le snooker se découvre plus facilement lorsque l’on sépare trois questions : quelle bille dois-je toucher, combien rapporte-t-elle et où laisser la blanche ? Le but est de terminer la manche, appelée frame, avec davantage de points que son adversaire. Empocher beaucoup de billes ne suffit donc pas : leur valeur et les fautes comptent aussi. Pour une première rencontre entre amis, désignez une personne qui tient le score et annonce la bille à jouer. Cette petite organisation évite de transformer chaque coup en discussion et permet de se concentrer sur la table.',
        'Une partie complète commence avec quinze rouges, six couleurs et une blanche. La blanche est la seule bille frappée par la queue. Les rouges valent un point chacune ; la jaune en vaut deux, la verte trois, la marron quatre, la bleue cinq, la rose six et la noire sept. Ne cherchez pas immédiatement les longues séries vues à la télévision. Apprenez d’abord à reconnaître ces valeurs et à repérer une rouge accessible sans placer votre corps dans une position inconfortable.'
      ] },
      { title: 'Alterner une rouge et une couleur', paragraphs: [
        'Tant qu’il reste des rouges, une visite à la table commence normalement par une rouge. Si elle entre légalement, vous choisissez une couleur. Cette couleur est ensuite replacée sur son emplacement, selon les règles de replacement, puis vous revenez à une rouge. Une rouge empochée reste hors de la table. Par exemple, rouge puis noire puis rouge puis bleue rapportent quatorze points : un plus sept plus un plus cinq. Lorsque vous manquez une bille sans commettre de faute, votre visite se termine et votre adversaire prend la main.',
        'Après la dernière rouge, la couleur suivante peut encore être choisie puis replacée. Vient ensuite la phase finale : jaune, verte, marron, bleue, rose et noire, dans cet ordre. Ces couleurs ne sont alors plus remises après un empochage légal. Cette transition surprend souvent les débutants. Une méthode simple consiste à annoncer à voix haute « dernière rouge », puis « couleurs dans l’ordre ». Vous évitez ainsi de viser machinalement la noire alors que la jaune est devenue la bille obligatoire.'
      ] },
      { title: 'Reconnaître une faute et une défense', paragraphs: [
        'Toucher d’abord une bille non autorisée, empocher la blanche ou ne toucher aucune bille constitue notamment une faute. Les points de pénalité vont à l’adversaire : le minimum est quatre, et certaines fautes coûtent davantage. Le règlement officiel détaille les cas particuliers, notamment le miss et la bille libre. Ne les improvisez pas en leur donnant le sens des règles du billard américain. Pour une initiation, faites préciser les situations litigieuses avant la manche et consultez le règlement lorsqu’une décision change réellement le score.',
        'Un coup défensif peut être préférable à une tentative spectaculaire. Imaginez une rouge éloignée de la poche avec plusieurs billes autour de la noire. Une attaque manquée peut offrir une ouverture facile. Vous pouvez plutôt chercher un contact légal et replacer la blanche à distance. L’objectif est de compliquer le prochain coup adverse sans enfreindre les règles. Cette alternance entre attaque et prudence fait tout l’intérêt du snooker : un joueur peut bien réfléchir même lorsqu’il ne réalise pas encore de grands empochages.'
      ] },
      { title: 'Une première séance qui donne envie de revenir', paragraphs: [
        'Commencez par quelques rouges disposées librement et une couleur facile, uniquement comme exercice. Enchaînez une rouge et une couleur, notez les points, puis recommencez. Passez ensuite à une frame complète lorsque l’alternance devient naturelle. Prenez le temps de stabiliser votre chevalet, de regarder la ligne de visée debout et de jouer doucement. Si la distance rend le coup inconfortable, demandez un reposoir plutôt que de vous étirer au-dessus du tapis. Un mouvement stable vaut mieux qu’une frappe puissante.',
        'Dans une salle partagée à Meknès, respectez aussi le rythme des voisins : attendez qu’ils aient joué avant de passer derrière leur ligne de tir et gardez boissons et téléphones loin du bord. Avant de réserver chez Prestige de Jeux, demandez la disponibilité de l’espace snooker et prévoyez assez de temps pour apprendre sans pression. À la fin, retenez une seule amélioration, par exemple annoncer correctement les couleurs. Une première séance réussie se mesure autant à votre compréhension du jeu qu’au résultat affiché.'
      ] }
    ],
    sources: [{ label: 'WPBSA — règlement officiel du snooker et du billard anglais', url: 'https://www.wpbsa.com/rules/' }]
  },
  {
    slug: 'histoire-evolution-billard',
    title: 'L’histoire du billard : du jeu d’élite au sport populaire',
    description: 'Comment la table, le matériel et les lieux de rencontre ont façonné les différentes cultures du billard.',
    category: 'Culture du jeu',
    sections: [
      { title: 'Une histoire qui se lit sur la table', paragraphs: [
        'Lorsque l’on entre dans une salle de billard, on remarque d’abord les lumières, le tapis et le bruit des billes. Pourtant, chaque élément répond à une longue recherche : créer une surface régulière, rendre le mouvement prévisible et permettre à deux joueurs de se mesurer avec le même matériel. L’histoire du billard n’est donc pas seulement une succession de champions. Elle raconte aussi la transformation d’un objet de loisir en espace commun où l’adresse peut être observée, comparée et transmise.',
        'La Fédération française de billard évoque notamment une table commandée pour Louis XI au quinzième siècle. Ce repère illustre la présence ancienne du jeu dans les milieux privilégiés, sans permettre de résumer toutes ses origines à une invention unique. Un meuble de jeu exigeait alors de l’espace, du travail artisanal et des ressources. Aujourd’hui encore, la qualité d’une table compte, mais son accès peut être partagé : on réserve un créneau plutôt que de posséder chez soi une salle entière.'
      ] },
      { title: 'Du meuble prestigieux au lieu de rencontre', paragraphs: [
        'Le passage vers des salles ouvertes à des publics plus variés change la façon de jouer. Une table privée accompagne les habitudes d’un cercle restreint ; une salle accueille des partenaires inconnus, des niveaux différents et des règles qu’il faut expliquer. On apprend en regardant une partie, en demandant pourquoi un coup a été défensif ou en rejouant une position après la fin d’une manche. La sociabilité devient une composante du jeu : la table donne un sujet commun à des personnes qui ne se connaissent pas encore.',
        'Cette ouverture ne signifie pas que tous les lieux proposent la même expérience. Certains privilégient l’entraînement silencieux, d’autres les rencontres amicales ou la restauration. Pour comprendre une salle actuelle, observez son organisation : circulation autour des tables, éclairage, espace pour poser les affaires et manière d’accueillir les nouveaux joueurs. Ces détails expliquent mieux la culture du lieu qu’un décor seul. Une belle table devient réellement accueillante lorsque chacun comprend comment l’utiliser et se sent libre de poser des questions.'
      ] },
      { title: 'Pourquoi plusieurs billards ont coexisté', paragraphs: [
        'Le mot billard désigne aujourd’hui plusieurs disciplines. Le carambole, souvent appelé billard français, se pratique sur une table sans poches : il faut réaliser des contacts selon le mode de jeu choisi. Le billard américain organise ses parties autour de billes numérotées et de poches. Le snooker associe rouges, couleurs et comptage de points. Ces différences ne sont pas de simples variantes décoratives. Elles modifient la lecture des trajectoires, le choix du matériel et le type de patience demandé au joueur.',
        'Essayez de comparer une même intention dans deux disciplines : préparer le prochain coup. Au jeu de la huit, vous cherchez une position favorable pour une autre bille de votre groupe. Au snooker, vous devez anticiper l’alternance entre rouge et couleur. Au carambole, vous réfléchissez aux contacts et au regroupement des billes. Ce principe commun explique pourquoi découvrir une autre discipline peut enrichir son regard. Il faut néanmoins accepter de réapprendre ses repères plutôt que de transporter automatiquement les habitudes d’une table à l’autre.'
      ] },
      { title: 'Une culture vivante à transmettre', paragraphs: [
        'La pratique populaire et la compétition se nourrissent mutuellement. Une rencontre entre amis peut donner envie de travailler une technique ; regarder une compétition peut révéler l’intérêt d’un coup prudent. Pour autant, le débutant n’a pas besoin de reproduire immédiatement le rythme d’un joueur expérimenté. Une salle gagne à rendre visibles les règles, à préserver le matériel et à encourager les échanges respectueux. Transmettre le billard, c’est aussi expliquer comment attendre son tour et reconnaître honnêtement une faute que personne n’a remarquée.',
        'À Meknès, une sortie au billard peut ainsi associer découverte sportive et moment au café. Chez Prestige de Jeux, vous pouvez aborder la visite comme une occasion de comparer billard et snooker, puis prolonger la discussion dans l’espace lounge. Demandez auparavant quels espaces sont disponibles pour votre groupe. La prochaine fois que vous regarderez une table, intéressez-vous autant aux décisions des joueurs qu’aux billes empochées : c’est dans ces choix, transmis de partenaire en partenaire, que l’histoire du jeu continue de s’écrire.'
      ] }
    ],
    sources: [{ label: 'Fédération française de billard — histoire du billard', url: 'https://www.ffbillard.com/pages/histoire-du-billard-55.html' }]
  },
  {
    slug: 'choisir-queue-billard',
    title: 'Comment choisir une queue de billard français ou américain',
    description: 'Un guide pratique pour comparer confort, rectitude, procédé et équilibre avant de choisir sa queue de billard.',
    category: 'Matériel',
    sections: [
      { title: 'Partir de sa discipline et de ses besoins', paragraphs: [
        'Une queue de billard se choisit avec la main, les yeux et un peu de patience. Le modèle qui plaît à un ami ne donnera pas forcément la même sensation dans votre geste. Avant de comparer les finitions, définissez votre usage : parties occasionnelles dans une salle, entraînement régulier ou découverte d’une nouvelle discipline. Un joueur de carambole et un amateur de billard américain n’ont pas exactement les mêmes besoins. Pour commencer, une queue de salle en bon état permet déjà de construire des bases solides.',
        'Évitez de chercher un objet capable de corriger automatiquement une mauvaise visée. Une queue plus coûteuse ne remplace ni un chevalet stable ni une frappe dans l’axe. Votre premier critère devrait être la possibilité de répéter un mouvement confortable. Si vous devez serrer fortement le fût ou modifier votre posture pour retenir l’instrument, la comparaison est mal engagée. Demandez à essayer plusieurs queues sur la même table, avec les mêmes billes et des coups simples : les différences deviennent plus faciles à interpréter.'
      ] },
      { title: 'Comprendre les éléments à examiner', paragraphs: [
        'Le procédé est la petite pièce située à l’extrémité de la queue ; son état influence le contact avec la blanche. La flèche guide le mouvement dans le chevalet, tandis que le fût se tient dans la main arrière. Examinez la propreté, les éventuelles aspérités et la solidité de l’assemblage si la queue est démontable. Une fissure, un jeu dans la jonction ou un procédé manifestement abîmé justifie de demander un autre modèle. Ne poncez et ne réparez jamais une queue appartenant à la salle sans autorisation.',
        'Les matériels diffèrent selon les disciplines et les préférences. Il est plus utile de vérifier leur adéquation à votre pratique que de retenir un diamètre présenté comme universel. En américain, la casse et certains coups spécialisés peuvent nécessiter un matériel distinct ; ils ne doivent pas servir de test brutal à une queue de jeu ordinaire. En carambole, le contrôle des contacts et des rotations demande aussi de la régularité. Si vous achetez, demandez clairement la discipline prévue et les conditions d’entretien au vendeur.'
      ] },
      { title: 'Faire un essai qui permet de comparer', paragraphs: [
        'Commencez par cinq coups droits, sans effet latéral, avec une distance modérée entre la blanche et la bille visée. Observez votre confort plutôt que le seul nombre de réussites : la flèche coulisse-t-elle sans accroc, votre main arrière reste-t-elle détendue et le poids vous semble-t-il maîtrisable ? Recommencez avec un autre modèle sans modifier la position des billes. Si vous changez simultanément la distance, la vitesse et la queue, vous ne saurez plus quelle variable explique la différence.',
        'Ajoutez ensuite quelques coups de dosage vers une zone repère imaginaire. Le bon équilibre n’est pas nécessairement celui qui paraît le plus léger dès la première prise en main. Cherchez une sensation stable pendant plusieurs répétitions. Prenez également en compte votre taille et les positions éloignées : une extension ou un reposoir peut répondre à un problème de distance sans imposer une queue inconfortable pour tous les autres coups. En cas de doute, demandez une démonstration avant de conclure que le matériel vous limite.'
      ] },
      { title: 'Acheter raisonnablement et entretenir simplement', paragraphs: [
        'Pour un premier achat, fixez un budget qui comprend la protection et l’entretien, puis comparez des modèles réellement disponibles à l’essai. Demandez si le procédé peut être remplacé, comment la jonction doit être nettoyée et quelles garanties s’appliquent. Une finition spectaculaire ne dit rien, à elle seule, sur la stabilité de votre geste. Si vous jouez rarement, il peut être plus judicieux de conserver le matériel de salle et de consacrer vos prochaines séances à la posture, à la visée et au contrôle de vitesse.',
        'Après le jeu, rangez la queue dans un endroit adapté et protégez-la des chocs ainsi que des variations importantes de température. Évitez de l’appuyer durablement dans une position qui la contraint ou de la laisser dans un véhicule chauffé au soleil. Chez Prestige de Jeux à Meknès, demandez quel matériel est mis à disposition pour votre séance et signalez immédiatement un défaut. Le meilleur choix reste une queue saine dont vous comprenez le comportement : elle vous permettra de reconnaître vos progrès au lieu de changer constamment de repères.'
      ] }
    ],
    sources: [{ label: 'Fédération française de billard — présentation du matériel', url: 'https://www.m.ffbillard.com/pages/le-materiel-25.html' }]
  },
  {
    slug: 'concentration-precision-strategie-billard',
    title: 'Concentration, précision et stratégie : ce que l’on travaille au billard',
    description: 'Des exercices concrets pour organiser son attention, répéter un geste précis et choisir une stratégie autour de la table.',
    category: 'Progression',
    sections: [
      { title: 'Donner une tâche précise à son attention', paragraphs: [
        'Une partie de billard offre une situation très concrète : avant de jouer, il faut décider ce que l’on veut faire, puis exécuter un geste mesuré. Cette alternance invite à ralentir et à s’occuper d’une seule action à la fois. Il ne s’agit pas de promettre une amélioration médicale de la mémoire ou une disparition du stress. On peut simplement constater ce que la pratique demande à la table : observer, choisir, se placer et accepter le résultat pour préparer la décision suivante.',
        'Pour rendre cette attention utile, formulez un objectif observable. « Je dois mieux jouer » est trop vague. « Je veux terminer mon geste sans relever la tête » donne un repère précis. Pendant dix coups simples, vérifiez uniquement ce point. Vous réussirez peut-être moins d’empochages au début parce que vous changez une habitude, mais vous saurez ce que vous entraînez. Cette manière de travailler évite de passer d’un conseil à l’autre sans laisser au geste le temps de devenir familier.'
      ] },
      { title: 'La précision commence avant la frappe', paragraphs: [
        'La visée se prépare debout. Regardez la bille à atteindre, la direction souhaitée et le trajet possible de la blanche. Placez ensuite vos appuis et votre chevalet sans vous précipiter. Si la position vous semble étrange une fois penché, relevez-vous et recommencez. Corriger tout le corps au dernier moment risque de déplacer la ligne de frappe. Cette routine n’a pas besoin d’être longue : elle doit surtout être assez simple pour être répétée, même lorsque vous êtes distrait par le score.',
        'Un exercice accessible consiste à rejouer une position facile avec trois vitesses différentes. Le but n’est pas seulement d’empocher, mais de voir où termine la blanche. Observez si une frappe plus forte vous fait serrer la main ou bouger l’épaule. Revenez alors à une vitesse modérée et retrouvez un mouvement régulier. En isolant une difficulté, vous obtenez une information exploitable. En revanche, tenter immédiatement une longue série de coups difficiles ne vous permet pas toujours d’identifier pourquoi la blanche a dévié.'
      ] },
      { title: 'Penser une position plutôt qu’une bille seule', paragraphs: [
        'La stratégie apparaît lorsque deux coups possibles ne donnent pas la même suite. Une bille proche d’une poche semble attirante, mais elle peut laisser la blanche contre une bande et rendre le prochain tir compliqué. Une autre, légèrement plus difficile, peut ouvrir une trajectoire confortable. Avant de choisir, demandez-vous quelle zone de la table vous souhaitez rejoindre. Visez une zone assez large pour votre niveau, plutôt qu’un point minuscule qui transforme chaque écart en impression d’échec.',
        'Le même raisonnement concerne la défense. Lorsque l’attaque offre une faible marge de réussite, un coup légal qui laisse de la distance peut être plus cohérent. Prenez l’habitude d’expliquer votre choix après la manche, jamais pendant la préparation d’un adversaire. Vous découvrirez que deux joueurs peuvent lire la même position différemment. Cette discussion est particulièrement instructive lorsque chacun décrit son intention et le risque accepté, au lieu de juger uniquement le résultat obtenu après un rebond favorable ou défavorable.'
      ] },
      { title: 'Garder le plaisir au centre de la progression', paragraphs: [
        'La maîtrise émotionnelle se travaille aussi par des habitudes ordinaires : reconnaître une faute, laisser l’autre terminer sa série et faire une pause lorsque l’agacement brouille les décisions. Un coup raté n’exige pas nécessairement une nouvelle technique. Il peut venir d’une vitesse mal choisie, d’une posture inconfortable ou simplement d’une variation normale. Notez une observation utile, puis passez au coup suivant. Si vous jouez avec un débutant, proposez un conseil seulement après lui avoir demandé s’il souhaite le recevoir.',
        'Pour une séance entre amis à Meknès, alternez un petit exercice et des manches libres. Vous pouvez consacrer dix minutes au dosage, puis jouer sans interrompre constamment la partie pour analyser les gestes. Chez Prestige de Jeux, choisissez une durée de séance qui vous laisse profiter également de l’espace lounge. À la fin, chacun peut partager une décision dont il est satisfait et une situation à retravailler. Cette méthode donne une direction à la prochaine visite tout en préservant ce qui motive à revenir : le plaisir du jeu partagé.'
      ] }
    ]
  },
  {
    slug: 'billard-americain-vs-snooker',
    title: 'Billard américain ou snooker : quelles différences pour commencer ?',
    description: 'Comparer objectifs, rythme, lecture des positions et apprentissage pour choisir sa première expérience du billard.',
    category: 'Guides pratiques',
    sections: [
      { title: 'Deux jeux qui racontent des parties différentes', paragraphs: [
        'Le billard américain et le snooker utilisent une queue, une blanche et des poches, mais cette ressemblance cache des logiques différentes. Au billard américain, le jeu de la huit est une porte d’entrée fréquente : chaque joueur cherche à terminer son groupe avant de conclure avec la huit selon les règles adoptées. Au snooker, une frame se gagne aux points grâce aux rouges, aux couleurs et aux pénalités adverses. Il faut donc demander quelle discipline et quel règlement seront utilisés avant de commencer.',
        'Pour choisir, pensez au type de soirée que vous préparez. Vous souhaitez découvrir rapidement des situations de jeu avec plusieurs amis ? L’américain peut se prêter à des rotations conviviales. Vous aimez suivre un score progressif, réfléchir aux défenses et prendre le temps d’une manche ? Le snooker mérite un essai. Ce sont des orientations pratiques, pas une hiérarchie entre les disciplines. Un joueur débutant peut apprécier le snooker immédiatement, tandis qu’un joueur expérimenté trouve encore beaucoup de profondeur au jeu de la huit.'
      ] },
      { title: 'Lire la table et comprendre son objectif', paragraphs: [
        'En américain, les numéros et les groupes permettent d’identifier les billes concernées par votre stratégie. Dans une partie de huit, il ne suffit pas de faire entrer une bille quelconque : il faut respecter les obligations de contact et la manière de conclure. Les règles de salle parfois apprises entre amis peuvent différer du règlement sportif. Mettez notamment au clair la casse, l’annonce des coups et les conséquences d’une faute. Un accord préalable est plus agréable qu’une discussion au moment de jouer la dernière bille.',
        'Au snooker, le regard passe constamment de la rouge disponible à la couleur qui pourrait suivre. Les points donnent un autre poids aux décisions : vous pouvez encore être dans la manche malgré plusieurs occasions manquées. L’ordre final des couleurs apporte une phase particulière où les options diminuent. Pour une première séance, gardez un tableau de score visible et annoncez vos intentions lorsque c’est nécessaire. Vous apprendrez progressivement à évaluer la position sans devoir recompter toutes les valeurs à chaque visite à la table.'
      ] },
      { title: 'Adapter le geste et le rythme', paragraphs: [
        'Les tables et le matériel ne procurent pas les mêmes sensations. Au snooker, les distances et les exigences des empochages rendent vite utile un geste stable et un recours correct au reposoir. En américain, le contrôle de la blanche et l’anticipation des angles restent tout aussi essentiels, même si certaines positions semblent plus accessibles au début. Ne traduisez pas une première difficulté par « ce jeu n’est pas pour moi ». Réduisez la distance de l’exercice et cherchez d’abord un mouvement confortable.',
        'Une bonne comparaison consiste à consacrer quelques minutes aux mêmes intentions : empocher une bille facile, arrêter la blanche dans une zone et réaliser un coup prudent. Regardez ce qui change dans votre préparation. Êtes-vous tenté de forcer lorsque la poche paraît loin ? Oubliez-vous la position suivante après une réussite ? Ces observations valent davantage qu’un verdict fondé sur une seule manche gagnée. Faites aussi des pauses : la fatigue de la posture peut masquer les sensations que vous vouliez comparer.'
      ] },
      { title: 'Choisir une première sortie sans se compliquer', paragraphs: [
        'Pour un groupe de niveaux mélangés, convenez d’un format court et laissez à chacun un temps d’essai. Évitez d’inventer des pénalités qui changent à chaque désaccord. Si vous simplifiez une règle pour un exercice, dites clairement qu’il s’agit d’un aménagement pédagogique et revenez au règlement choisi pour la partie. Un joueur plus à l’aise peut expliquer une seule idée, comme prévoir une zone d’arrivée de la blanche, puis laisser les autres expérimenter sans commenter chaque coup.',
        'Avant une visite chez Prestige de Jeux à Meknès, demandez quelles tables sont disponibles et précisez si votre groupe découvre la discipline. Vous pouvez commencer par l’américain puis réserver une prochaine séance au snooker, ou faire l’inverse selon vos envies. Consultez également les informations de réservation pour organiser votre temps sur place. La meilleure discipline pour débuter est celle qui vous donne envie de comprendre le prochain coup. Rien ne vous oblige à choisir définitivement : les deux pratiques peuvent enrichir la même passion pour le billard.'
      ] }
    ],
    sources: [
      { label: 'World Pool-Billiard Association — règles de jeu', url: 'https://www.wpapool.com/wp-content/uploads/2026/01/2026.01.02-WPA-Rules.pdf' },
      { label: 'WPBSA — règles du snooker', url: 'https://www.wpbsa.com/rules/' }
    ]
  },
  {
    slug: 'billard-detente-meknes',
    title: 'Pourquoi choisir le billard pour une pause détente à Meknès ?',
    description: 'Organiser une sortie au billard à Meknès : rythme, initiation, convivialité et conseils pour profiter de sa séance.',
    category: 'Meknès & lounge',
    sections: [
      { title: 'Une sortie avec une activité à partager', paragraphs: [
        'Retrouver des amis autour d’un café est agréable ; ajouter une activité commune peut donner une autre dynamique à la rencontre. Le billard propose un cadre simple : chacun joue à son tour, observe les autres et participe à une partie dont les étapes restent visibles. À Meknès, cette formule peut convenir à une sortie après une journée chargée ou à un rendez-vous de fin de semaine. L’intérêt ne repose pas sur une obligation de performance, mais sur le plaisir de faire quelque chose ensemble.',
        'La détente reste personnelle. Certains apprécient une manche silencieuse, d’autres préfèrent discuter entre les coups. Avant de commencer, accordez-vous sur l’ambiance souhaitée et sur une règle facile à suivre. Vous éviterez qu’une personne attende un entraînement sérieux pendant que les autres improvisent une rencontre amicale. Ce bref échange aide aussi les débutants : ils savent qu’ils peuvent demander une explication sans ralentir une compétition imaginaire. Une sortie réussie commence souvent par des attentes compatibles, bien avant le premier empochage.'
      ] },
      { title: 'Trouver un rythme qui convient au groupe', paragraphs: [
        'Le tour de jeu crée naturellement des moments d’observation. Profitez-en pour regarder une trajectoire ou préparer votre choix, sans rester collé à votre téléphone. Si vous êtes nombreux pour une seule table, alternez les joueurs selon un format annoncé. Deux équipes peuvent par exemple jouer des manches courtes avec un ordre stable. Prévoyez aussi un endroit pour ceux qui souhaitent se reposer. Personne ne devrait avoir l’impression de passer toute la soirée debout à attendre une unique occasion de jouer.',
        'Choisissez une durée réaliste plutôt que d’accumuler les activités. Une séance limitée peut être très satisfaisante si chacun dispose de quelques coups d’essai et de vraies manches. Réservez une marge pour l’arrivée, les explications et une pause au café. Si une partie dépasse le temps prévu, terminez dans de bonnes conditions avec l’accord de la salle, au lieu de presser les derniers joueurs. Le billard devient plus relaxant lorsque le groupe maîtrise son organisation et n’a pas à surveiller constamment son départ.'
      ] },
      { title: 'Accueillir les débutants sans les mettre à l’écart', paragraphs: [
        'Une différence de niveau ne doit pas transformer la rencontre en démonstration permanente. Commencez par montrer comment tenir la queue, former un chevalet et viser une bille proche. Laissez ensuite la personne essayer sans corriger chaque mouvement. Lorsqu’elle demande un conseil, proposez une seule modification et expliquez son utilité. Pour garder des échanges équilibrés, vous pouvez consacrer une manche à l’apprentissage, puis revenir au jeu libre. Annoncez toujours les adaptations avant la partie pour éviter les malentendus sur le résultat.',
        'Évitez également les commentaires qui associent une maladresse au manque de talent. Un premier coup raté peut venir d’une position inconfortable ou d’une règle mal comprise. Préférez une observation précise : « la blanche est partie plus vite que prévu » ouvre une piste d’essai ; « tu es mauvais » n’apprend rien. Le respect des autres tables participe à la même qualité de détente. Parlez à un volume adapté, attendez avant de traverser une ligne de tir et félicitez une bonne décision autant qu’un empochage.'
      ] },
      { title: 'Préparer sa visite chez Prestige de Jeux', paragraphs: [
        'Pour organiser votre venue à Meknès, vérifiez la disponibilité des tables auprès de Prestige de Jeux et indiquez le nombre de participants. Si vous souhaitez également profiter du lounge ou du café, demandez comment articuler ces moments avec votre réservation. Les besoins d’un duo qui découvre le snooker diffèrent de ceux d’un groupe qui veut alterner billard et discussion. Préciser votre projet permet d’obtenir une réponse adaptée sans supposer que toutes les installations sont libres à toute heure.',
        'Sur place, gardez les boissons sur les supports prévus et prenez soin des queues comme du tapis. Une pause peut être l’occasion de comparer les coups qui vous ont surpris, sans refaire le classement de chacun. Avant de repartir, choisissez éventuellement un petit objectif pour une prochaine visite : mieux doser une bande, comprendre une défense ou découvrir le snooker. Cette continuité donne un intérêt supplémentaire aux retrouvailles. Le billard reste alors une activité à votre rythme, intégrée à la vie du groupe et au plaisir de sortir à Meknès.'
      ] }
    ]
  },
  {
    slug: 'ameliorer-tirs-positionnement',
    title: 'Améliorer ses tirs et le positionnement de la blanche : une méthode progressive',
    description: 'Routine de visée, dosage, zones de placement et carnet de séance pour progresser au billard sans brûler les étapes.',
    category: 'Progression',
    sections: [
      { title: 'Observer le défaut avant de changer le geste', paragraphs: [
        'Lorsque plusieurs tirs échouent, la tentation est de modifier immédiatement la prise, l’effet ou la force. On accumule alors les corrections sans savoir laquelle était nécessaire. Commencez plutôt par reproduire une position simple et notez le type d’erreur : la bille manque-t-elle toujours du même côté, la blanche va-t-elle trop loin ou votre tête se relève-t-elle avant le contact ? Cette observation transforme un sentiment vague de difficulté en problème précis. Vous pourrez ensuite travailler une seule variable et comparer les résultats.',
        'Une routine courte aide à stabiliser les conditions. Debout, choisissez la trajectoire et la zone d’arrivée souhaitée. Placez vos appuis, formez le chevalet et effectuez quelques mouvements de préparation sans accélération brusque. Si la visée paraît incorrecte, relevez-vous plutôt que de tordre le bras pour sauver la position. Après la frappe, restez un instant stable pour observer le mouvement réel. Ce temps d’observation vous renseigne davantage qu’une réaction immédiate de frustration ou une explication fondée uniquement sur la chance.'
      ] },
      { title: 'Travailler le dosage avec une cible large', paragraphs: [
        'Le placement de la blanche commence par la vitesse. Choisissez une bande comme repère et essayez d’amener la blanche dans une zone large sans utiliser d’effet latéral. Jouez plusieurs fois depuis le même endroit. Cherchez une progression régulière, pas un coup parfait isolé. Lorsque vous pouvez répéter l’exercice, changez légèrement la distance et observez le réglage nécessaire. N’utilisez pas de pièces, de verres ou de ruban adhésif sur le tapis pour matérialiser la zone : les repères doivent respecter le matériel de la salle.',
        'Passez ensuite à un empochage facile avec une intention de placement. Définissez la zone avant de vous pencher et vérifiez séparément deux résultats : la bille est-elle entrée, et la blanche est-elle arrivée dans la zone ? Un empochage réussi accompagné d’un mauvais placement indique une difficulté de contrôle, pas nécessairement de visée. Cette distinction évite de modifier inutilement votre alignement. Elle permet aussi de célébrer un bon dosage même lorsqu’une petite erreur d’angle a fait manquer la poche.'
      ] },
      { title: 'Prévoir le coup suivant avec une marge de sécurité', paragraphs: [
        'Avant de jouer, identifiez une prochaine bille possible et regardez de quel côté il serait confortable de l’aborder. Vous n’avez pas besoin de prévoir toute la table. Deux coups bien pensés suffisent pour commencer à construire une série. Préférez une zone d’arrivée qui laisse plusieurs options à une position très fine qui n’en laisse qu’une. Lorsque la blanche doit traverser une zone encombrée, envisagez une autre bille ou une défense. La meilleure trajectoire n’est pas toujours la plus courte ni la plus spectaculaire.',
        'Les effets deviennent utiles lorsqu’ils répondent à une intention que vous comprenez. Ajouter systématiquement de l’effet latéral rend la comparaison plus difficile, car les rebonds et la visée peuvent changer. Travaillez d’abord des positions simples au centre, puis explorez progressivement les rotations avec une vitesse maîtrisée. Faites-vous expliquer les coups plus techniques avant de les tenter. Les sauts, massés et frappes très appuyées peuvent endommager le tapis s’ils sont mal exécutés ; respectez les consignes de la salle et le matériel autorisé.'
      ] },
      { title: 'Construire une séance courte et utile', paragraphs: [
        'Vous pouvez organiser trente minutes de travail en trois étapes : quelques coups droits pour retrouver vos repères, un exercice de dosage répété, puis une petite séquence de deux billes. Gardez la même disposition assez longtemps pour comprendre les écarts. Dans un carnet ou sur votre téléphone entre les séries, notez la distance approximative, l’intention et une observation. Évitez de compter seulement les réussites : « je serre la main quand j’accélère » donne une consigne plus utile pour la prochaine séance qu’un total sans contexte.',
        'Terminez par du jeu libre afin de retrouver le plaisir de choisir des positions variées. Lors d’une visite chez Prestige de Jeux à Meknès, demandez un créneau adapté si vous souhaitez alterner entraînement et partie entre amis. Respectez l’espace des autres tables lorsque vous replacez les billes. Au fil des séances, comparez votre capacité à prévoir la blanche plutôt que votre seul pourcentage d’empochage. La progression devient visible quand les coups faciles restent confortables et que vos erreurs laissent enfin des explications que vous pouvez tester.'
      ] }
    ]
  },
  {
    slug: 'cafe-lounge-salle-jeux-premium',
    title: 'Café lounge et salle de jeux premium : à quoi s’attendre ?',
    description: 'Éclairage, espace de jeu, accueil et pause au café : les critères concrets d’une expérience lounge autour du billard.',
    category: 'Meknès & lounge',
    sections: [
      { title: 'Regarder au-delà du décor', paragraphs: [
        'Le mot premium évoque souvent un éclairage chaleureux, des matières soignées et une ambiance calme. Pour une salle de billard, la qualité se mesure aussi à des détails beaucoup plus pratiques. Peut-on circuler sans gêner un joueur ? La table est-elle suffisamment éclairée pour voir les angles ? Existe-t-il un espace pour déposer ses affaires et boire un café loin du tapis ? Ces questions permettent de choisir un lieu qui correspond à votre visite, plutôt que de se fier uniquement aux photographies.',
        'Une expérience lounge réussie doit laisser de la place à plusieurs rythmes. Une personne veut terminer sa manche, une autre discuter et une troisième découvrir les règles. L’organisation des espaces aide ces envies à coexister. Avant de venir en groupe, précisez votre priorité : pratiquer le billard, découvrir le snooker ou passer surtout un moment au café. L’équipe peut alors vous renseigner sur les disponibilités et sur le format le plus adapté. Le confort naît souvent de cette préparation très simple.'
      ] },
      { title: 'Ce qui compte autour de la table', paragraphs: [
        'L’éclairage devrait rendre les billes lisibles sans obliger à chercher constamment une position pour éviter une ombre. La circulation doit permettre les gestes ordinaires avec une queue, y compris lorsque la blanche longe une bande. Un matériel sain et rangé donne également confiance : procédez à une inspection rapide de la queue et demandez un remplacement si quelque chose paraît abîmé. Il n’est pas nécessaire de devenir expert en fabrication pour reconnaître une prise en main inconfortable ou un accessoire qui mérite d’être vérifié.',
        'La qualité de l’accueil compte autant que l’équipement. Un visiteur qui découvre le snooker devrait pouvoir demander comment compter les points ; un groupe devrait comprendre à quel moment commence son créneau. N’hésitez pas à demander les conditions de réservation et la durée facturée avant la partie. Ces informations évitent les hésitations au moment de payer et permettent de profiter du jeu. Un lieu agréable n’exige pas que chaque client connaisse déjà les habitudes de la salle avant de franchir la porte.'
      ] },
      { title: 'Associer jeu, café et conversation', paragraphs: [
        'Le café lounge offre une pause entre deux manches et un point de rencontre pour ceux qui ne jouent pas. Consultez la carte disponible et demandez les informations nécessaires si vous avez une allergie ou une contrainte alimentaire. Les photographies et les descriptions donnent une idée de l’offre, mais la disponibilité d’un produit doit être confirmée sur place. Pour une soirée organisée, il est utile de préciser si vous souhaitez manger avant ou après le créneau de jeu afin de ne pas presser tout le monde.',
        'Gardez les consommations à distance des tables. Un verre posé sur une bande peut se renverser, abîmer le drap ou gêner un mouvement. Le même principe vaut pour les sacs et téléphones : utilisez les emplacements prévus et laissez les passages libres. Si vous souhaitez photographier la soirée, demandez l’accord des personnes reconnaissables et attendez la fin d’un coup. Une ambiance soignée ne dépend pas seulement du personnel ; elle se construit aussi grâce aux petites attentions que les visiteurs ont les uns pour les autres.'
      ] },
      { title: 'Préparer une visite à Meknès', paragraphs: [
        'Chez Prestige de Jeux, à Meknès, l’expérience associe billard, snooker et espaces de détente autour du café. Pour organiser votre visite, utilisez les coordonnées de la page Contact et expliquez votre projet : duo, groupe d’amis ou demande d’espace VIP. Demandez quelles prestations sont disponibles pour la date choisie, leur tarif et leurs conditions. Le terme VIP ne suffit pas à décrire une réservation : faites préciser la durée, le nombre de personnes et ce qui est réellement inclus dans la proposition.',
        'Sur place, accordez-vous quelques minutes pour découvrir les espaces avant de lancer une partie. Choisissez un format de jeu qui laisse participer chacun, puis prévoyez une pause si le groupe souhaite échanger. Vous pourrez évaluer la soirée avec des critères concrets : avez-vous joué confortablement, compris les conditions et trouvé un moment pour discuter ? Cette approche aide à repérer ce qui vous convient. Une salle premium prend tout son sens lorsque le cadre facilite votre activité et que vous avez envie de revenir pour une nouvelle expérience.'
      ] }
    ]
  },
  {
    slug: 'tournois-billard-maroc',
    title: 'Tournois de billard au Maroc : comprendre et préparer une compétition locale',
    description: 'Lire une annonce de tournoi, vérifier le règlement et préparer sa première compétition de billard au Maroc.',
    category: 'Compétition',
    sections: [
      { title: 'Passer de la partie amicale au cadre organisé', paragraphs: [
        'Une rencontre locale donne une autre dimension au billard : on joue avec des personnes nouvelles, selon un horaire et un règlement communs. Au Maroc comme ailleurs, il faut distinguer un tournoi amical organisé par une salle d’une compétition relevant d’un calendrier fédéral. Le nom de l’événement ne suffit pas à connaître son statut. Ce guide explique comment lire une annonce et préparer sa participation ; il ne constitue pas un calendrier et ne confirme aucun événement sans annonce de son organisateur.',
        'La différence avec une soirée entre amis tient surtout au cadre. Le nombre de manches, l’ordre des rencontres et le traitement des fautes doivent être fixés pour tout le monde. Même un format modeste gagne à avoir une personne responsable des décisions. Si vous débutez, recherchez un événement qui explique clairement son niveau et ses conditions d’accès. Une compétition doit être une occasion d’apprendre, pas une surprise où vous découvrez au dernier moment que le matériel, les horaires ou les règles vous sont inconnus.'
      ] },
      { title: 'Les informations à vérifier avant l’inscription', paragraphs: [
        'Commencez par la discipline : jeu de la huit, autre format américain ou snooker. Vérifiez ensuite le règlement de référence, le nombre de manches nécessaires pour gagner et le système retenu : poules, élimination directe ou autre organisation annoncée. Demandez comment sont gérés les retards et qui arbitre les désaccords. Les règles de casse, d’annonce et de faute ne doivent pas être supposées identiques à celles de vos parties habituelles. Conserver une copie de l’annonce permet de préparer son déplacement avec des informations précises.',
        'Lisez également le montant éventuel de l’inscription, ce qu’il couvre et les conditions d’annulation. Une récompense doit être décrite par l’organisateur ; ne vous fiez pas à une rumeur ou à une affiche ancienne. Demandez si du matériel personnel est autorisé et si une tenue particulière est attendue. Pour les déplacements entre villes, attendez la confirmation de votre place avant d’engager des frais. Une communication claire en amont aide autant le participant que l’équipe qui doit constituer le tableau des rencontres.'
      ] },
      { title: 'Préparer son jeu et son comportement', paragraphs: [
        'Quelques séances ciblées valent mieux qu’un changement complet de technique la veille. Travaillez les coups simples, la casse dans le cadre autorisé et la routine que vous utilisez déjà. Entraînez-vous aussi à reprendre la main après plusieurs minutes d’attente : en compétition, le rythme dépend de l’adversaire. Une courte préparation physique ordinaire, une tenue confortable et un matériel vérifié peuvent aider à se sentir prêt. N’essayez pas une queue inconnue ou un effet risqué simplement parce que l’événement vous paraît plus important qu’une partie habituelle.',
        'Sur place, arrivez avec une marge pour confirmer votre présence et comprendre l’appel des matchs. Pendant une rencontre, évitez de discuter une décision à voix haute avec les spectateurs. Adressez-vous calmement à la personne chargée de l’arbitrage et exposez les faits. Reconnaître une faute et respecter le temps de préparation adverse font partie du jeu. Lorsque vous regardez une autre table, ne donnez pas de conseils aux participants sans y être autorisé : une intention amicale peut devenir une intervention gênante pour le match.'
      ] },
      { title: 'Faire grandir une pratique locale de qualité', paragraphs: [
        'Les salles et les joueurs peuvent contribuer à une culture de compétition plus lisible en publiant des informations vérifiables : date, discipline, format et contact de l’organisation. Après l’événement, un compte rendu clair présente le résultat sans exposer inutilement les coordonnées personnelles des participants. Les photographies doivent également respecter les personnes présentes. Cette attention donne confiance aux prochains inscrits et permet de suivre la vie locale sans confondre une véritable annonce, une archive et une simple idée de tournoi encore en préparation.',
        'À Meknès, consultez la rubrique Tournois de Prestige de Jeux et contactez directement la salle pour confirmer qu’une rencontre est annoncée et que les inscriptions sont ouvertes. Demandez toujours la date, les conditions et le règlement actualisés avant de vous déplacer. Après votre première participation, retenez deux observations utiles : une décision tactique à améliorer et une habitude qui vous a aidé à rester à l’aise. Le classement raconte une journée ; ces apprentissages donnent une direction aux séances suivantes et rendent la compétition enrichissante quel que soit le résultat.'
      ] }
    ]
  },
  {
    slug: 'organiser-soiree-billard-amis',
    title: 'Comment organiser une soirée entre amis autour du billard',
    description: 'Réservation, budget, équipes et initiation : une méthode simple pour préparer une soirée billard conviviale à Meknès.',
    category: 'Guides pratiques',
    sections: [
      { title: 'Définir une soirée qui convient vraiment au groupe', paragraphs: [
        'Une bonne soirée billard ne commence pas par un tableau de compétition compliqué. Elle commence par quelques questions pratiques : combien de personnes viennent, qui souhaite jouer et combien de temps chacun peut rester ? Un groupe de quatre joueurs réguliers ne s’organise pas comme huit amis dont la moitié découvre la queue de billard. Recueillez ces informations avant de réserver. Vous pourrez choisir un nombre de tables et un rythme cohérents, sans laisser plusieurs personnes attendre pendant que les plus expérimentées occupent toute la séance.',
        'Fixez aussi une enveloppe commune pour le jeu et laissez chacun gérer ses consommations selon l’organisation convenue. Demandez à la salle le tarif applicable, la durée du créneau et ce qui est inclus. Si vous souhaitez un espace VIP ou une formule particulière, faites préciser les conditions avant de vous engager. Un montant vu sur une ancienne publication ne remplace pas une confirmation. Ce petit travail évite de parler de budget au milieu de la soirée et permet à chacun de venir avec des attentes claires.'
      ] },
      { title: 'Réserver et préparer l’arrivée', paragraphs: [
        'Contactez la salle avec une demande complète : date souhaitée, heure, nombre de personnes, discipline et durée approximative. Indiquez si vous voulez également profiter du café ou manger sur place. Une demande envoyée n’est pas encore une réservation confirmée ; attendez le retour de l’équipe et vérifiez les éventuelles conditions particulières. Si le groupe change de taille, prévenez assez tôt. L’organisation est plus simple lorsque la salle peut anticiper la circulation, les tables nécessaires et les demandes qui accompagnent votre visite.',
        'Partagez ensuite un message bref avec les participants : lieu de rendez-vous, heure d’arrivée et principe de répartition des frais. Prévoyez quelques minutes pour retrouver tout le monde avant de commencer le créneau. Choisissez une personne de contact afin d’éviter plusieurs demandes contradictoires à la salle. Pour une sortie à Meknès, envoyez le lien de la page Contact plutôt qu’une adresse recopiée de mémoire. Ceux qui arrivent plus tard sauront ainsi où vous rejoindre et comment prévenir sans interrompre chaque partie.'
      ] },
      { title: 'Choisir un format où chacun participe', paragraphs: [
        'Avec des niveaux variés, commencez par des coups d’essai et une explication courte du règlement. Montrez la bille à toucher en premier et la conséquence principale d’une faute. Pour les équipes, annoncez un ordre de passage qui reste le même pendant la manche. Vous pouvez alterner les binômes entre les parties pour que personne ne soit cantonné au rôle d’observateur. Si vous simplifiez un exercice, dites-le clairement : une adaptation conviviale ne doit pas devenir une règle prétendument officielle au moment d’un désaccord.',
        'Un format à rotation fonctionne bien lorsque le groupe dépasse le nombre de places autour de la table. Prévoyez une limite raisonnable de manches ou un passage régulier des participants, puis ajustez avec l’accord de tous. Évitez le système où seuls les gagnants jouent toute la soirée. Le but d’une sortie amicale est que chacun touche les billes, pose des questions et puisse réussir quelques coups. Les joueurs expérimentés peuvent proposer une aide ponctuelle, mais les commentaires permanents finissent souvent par gêner ceux qu’ils veulent encourager.'
      ] },
      { title: 'Préserver l’ambiance jusqu’au départ', paragraphs: [
        'Gardez boissons, plats et sacs sur les emplacements prévus. Respectez les autres tables et attendez qu’un joueur ait terminé son geste avant de passer près de lui. Pour les photos, choisissez une pause et demandez l’accord du groupe. Une soirée réussie laisse de la place aux conversations sans couvrir les annonces ou distraire systématiquement celui qui joue. Si un différend apparaît, revenez au règlement convenu ou demandez une explication au personnel, puis reprenez le jeu sans transformer un loisir partagé en arbitrage interminable.',
        'Chez Prestige de Jeux à Meknès, vous pouvez préparer cette sortie en précisant vos envies de billard, de snooker et de pause lounge lors de votre prise de contact. Confirmez les disponibilités plutôt que de supposer qu’une table attendra le groupe. Avant la fin du créneau, décidez si vous terminez la manche ou si vous demandez une prolongation disponible. Prenez enfin le temps de régler selon l’accord prévu et de rendre le matériel. La meilleure conclusion est souvent très simple : chacun a participé et sait déjà ce qu’il aimerait essayer lors de la prochaine rencontre.'
      ] }
    ]
  }
];

export const wordCount = (article: Article) => [article.title, ...article.sections.flatMap(section => [section.title, ...section.paragraphs])].join(' ').trim().split(/\s+/u).length;
export const readingMinutes = (article: Article) => Math.ceil(wordCount(article) / 200);

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { publicAsset } from '../utils/assets';

type SeoConfig = {
  title: string;
  description: string;
};

const siteName = 'Prestige de Jeux';
const defaultImage = 'og-prestige.jpg';

const routeSeo: Record<string, SeoConfig> = {
  '/': {
    title: 'Prestige de Jeux | Billard, Snooker & Lounge Premium à Meknès',
    description:
      'Prestige de Jeux à Meknès réunit billard professionnel, snooker, café lounge, gastronomie et réservation VIP dans un cadre luxueux.',
  },
  '/about': {
    title: 'Notre Histoire | Prestige de Jeux Meknès',
    description:
      'Découvrez l’histoire de Prestige de Jeux, lounge premium dédié au billard, au snooker et à l’art de vivre à Meknès.',
  },
  '/services': {
    title: 'Billard, Snooker, Lounge & Évènements | Prestige de Jeux',
    description:
      'Tables de billard, espace snooker, café raffiné, restaurant et privatisation pour événements à Meknès.',
  },
  '/menu': {
    title: 'Menu Café & Gastronomie | Prestige de Jeux Meknès',
    description:
      'Explorez la carte de Prestige de Jeux: cafés, boissons signature, pâtisseries et cuisine raffinée à Meknès.',
  },
  '/gallery': {
    title: 'Galerie Photos | Prestige de Jeux Meknès',
    description:
      'Photos des tables de billard, espaces snooker, lounge, restaurant et ambiance premium de Prestige de Jeux à Meknès.',
  },
  '/tournaments': {
    title: 'Tournois de Billard & Snooker à Meknès | Prestige de Jeux',
    description:
      'Découvrez les tournois Prestige de Jeux à Meknès: inscriptions, participants, règles, récompenses et compétitions de billard et snooker.',
  },
  '/reservation': {
    title: 'Réserver une Table de Billard à Meknès | Prestige de Jeux',
    description:
      'Réservez votre table de billard ou snooker, un salon VIP ou une expérience lounge chez Prestige de Jeux à Meknès.',
  },
  '/contact': {
    title: 'Contact & Accès | Prestige de Jeux Meknès',
    description:
      'Contactez Prestige de Jeux à Meknès pour une réservation, une privatisation, un événement ou une demande VIP.',
  },
  '/faq': {
    title: 'Questions Fréquentes | Prestige de Jeux Meknès',
    description:
      'Réponses aux questions fréquentes sur les réservations, horaires, espaces VIP, restaurant et billard à Prestige de Jeux.',
  },
  '/pricing': {
    title: 'Tarifs Billard & Snooker | Prestige de Jeux Meknès',
    description:
      'Consultez les tarifs et formules premium pour jouer au billard et au snooker chez Prestige de Jeux à Meknès.',
  },
};

const arabicHome: SeoConfig = {
  title: 'بريستيج دو جو | بلياردو وسنوكر ولاونج فاخر في مكناس',
  description:
    'بريستيج دو جو في مكناس يقدم تجربة فاخرة لعشاق البلياردو والسنوكر مع مقهى راقٍ، مطعم، حجز VIP وأجواء مميزة.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Faut-il réserver à l'avance ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'La réservation est recommandée le soir et le week-end pour garantir la disponibilité des tables de billard et snooker.',
      },
    },
    {
      '@type': 'Question',
      name: "Quels sont les horaires d'ouverture ?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Prestige de Jeux ouvre tous les jours, avec des horaires prolongés les vendredis et samedis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Proposez-vous des espaces privés ?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Oui, des espaces VIP et zones privatisables sont disponibles pour événements, anniversaires et rendez-vous professionnels.',
      },
    },
  ],
};

function setMeta(selector: string, attr: 'content' | 'href', value: string) {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attr, value);
  }
}

function setJsonLd(id: string, data: unknown) {
  let script = document.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = document.createElement('script');
    script.id = id;
    script.type = 'application/ld+json';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

function sitePath(path: string) {
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
  return `${base}${path === '/' ? '/' : path}`;
}

export default function SEO() {
  const location = useLocation();
  const { lang } = useLanguage();

  useEffect(() => {
    const path = location.pathname;
    const origin = window.location.origin;
    const rootUrl = new URL(sitePath('/'), origin).toString().replace(/\/$/, '');
    const canonical = new URL(sitePath(path), origin).toString();
    const seo = lang === 'ar' && path === '/' ? arabicHome : routeSeo[path] || routeSeo['/'];
    const image = new URL(publicAsset(defaultImage), origin).toString();

    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonical);
    setMeta('meta[property="og:image"]', 'content', image);
    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]', 'content', image);
    setMeta('link[rel="canonical"]', 'href', canonical);

    setJsonLd('prestige-local-business-schema', {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `${rootUrl}/#localbusiness`,
      name: siteName,
      alternateName: 'بريستيج دو جو',
      url: rootUrl,
      image,
      logo: new URL(publicAsset('logo-prestige.jpg'), origin).toString(),
      description:
        'Lounge premium de billard et snooker à Meknès avec café, restaurant, galerie et réservation VIP.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'Angle Avenue FAR et Rue de la Liberté',
        addressLocality: 'Meknès',
        addressCountry: 'MA',
      },
      areaServed: ['Meknès', 'Fès-Meknès', 'Maroc'],
      priceRange: '$$',
      servesCuisine: ['Marocaine', 'Café', 'Gastronomie'],
      sameAs: [],
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Sunday'],
          opens: '10:00',
          closes: '02:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Friday', 'Saturday'],
          opens: '10:00',
          closes: '04:00',
        },
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Prestige de Jeux services',
        itemListElement: [
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Billard professionnel' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Snooker premium' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Réservation VIP' } },
          { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Restaurant et café lounge' } },
        ],
      },
    });

    setJsonLd('prestige-website-schema', {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: siteName,
      url: rootUrl,
      inLanguage: lang === 'ar' ? 'ar-MA' : 'fr-MA',
      potentialAction: {
        '@type': 'ReserveAction',
        target: new URL(sitePath('/reservation'), origin).toString(),
        name: 'Réserver une table',
      },
    });

    const existingFaq = document.getElementById('prestige-faq-schema');
    if (path === '/faq') {
      setJsonLd('prestige-faq-schema', faqSchema);
    } else {
      existingFaq?.remove();
    }
  }, [lang, location.pathname]);

  return null;
}

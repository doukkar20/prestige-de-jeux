import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  Coffee,
  CupSoda,
  EggFried,
  GlassWater,
  Martini,
  Search,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import snookerTable from '../assets/images/snooker-table.jpg';
import './Menu.css';

type Category =
  | 'Petits Déjeuners'
  | 'Crêpes Sucrées'
  | 'Crêpes Salées'
  | 'Jus Frais'
  | 'Eaux & Boissons Gazeuses'
  | 'Boissons Froides'
  | 'Cocktails Signature'
  | 'Boissons Chaudes';

type MenuItem = {
  id: string;
  name: string;
  category: Category;
  price: string;
  description: string;
  image: string;
  cardImage?: string;
  modalImage?: string;
};

type MenuSection = {
  category: Category;
  eyebrow: string;
  description: string;
  items: MenuItem[];
};

const menuOrder: Category[] = [
  'Petits Déjeuners',
  'Crêpes Sucrées',
  'Crêpes Salées',
  'Jus Frais',
  'Eaux & Boissons Gazeuses',
  'Boissons Chaudes',
  'Boissons Froides',
  'Cocktails Signature',
];

const filterOptions = ['Tout', ...menuOrder] as const;
type FilterOption = (typeof filterOptions)[number];

const categoryIcons: Record<Category, typeof Coffee> = {
  'Petits Déjeuners': EggFried,
  'Crêpes Sucrées': Sparkles,
  'Crêpes Salées': Utensils,
  'Jus Frais': GlassWater,
  'Eaux & Boissons Gazeuses': CupSoda,
  'Boissons Froides': CupSoda,
  'Cocktails Signature': Martini,
  'Boissons Chaudes': Coffee,
};

const optimizedMenuAssets = import.meta.glob('../assets/images/pic food/optimized/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const generatedMenuAssets = import.meta.glob('../assets/images/pic food/generated/*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

function foodImage(slug: string, source: 'optimized' | 'generated' = 'optimized'): Pick<MenuItem, 'image' | 'cardImage' | 'modalImage'> {
  const assets = source === 'generated' ? generatedMenuAssets : optimizedMenuAssets;
  const assetPath = `../assets/images/pic food/${source}`;
  const modalImage = assets[`${assetPath}/${slug}.webp`];
  const cardImage = assets[`${assetPath}/${slug}-thumb.webp`];

  if (!modalImage || !cardImage) {
    console.error(`[Menu] ${source} image missing for "${slug}".`);
  }

  return {
    image: modalImage || cardImage || snookerTable,
    cardImage: cardImage || modalImage || snookerTable,
    modalImage: modalImage || cardImage || snookerTable,
  };
}

const rawMenuSections: MenuSection[] = [
  {
    category: 'Petits Déjeuners',
    eyebrow: 'Breakfast Prestige',
    description: 'Classiques matinaux, croques gourmands et assiettes premium pour commencer la journée avec élégance.',
    items: [
      {
        id: 'chamalli',
        name: 'Chamalli',
        category: 'Petits Déjeuners',
        price: '33 DH',
        description: "Oeufs au choix, charcuterie, fromage rouge, jben, huile d'olive, olives noires et pain.",
        ...foodImage('chamalli'),
      },
      {
        id: 'fassi-premium',
        name: 'Fassi Premium',
        category: 'Petits Déjeuners',
        price: '30 DH',
        description: "Tagine de khlii, oeufs, jben, huile d'olive, olives noires et pain.",
        ...foodImage('fassi'),
      },
      {
        id: 'fassi-khlii-dejeuner',
        name: 'Fassi Khlii Dejeuner',
        category: 'Petits Déjeuners',
        price: '30 DH',
        description: "Petit dejeuner fassi au khlii, genereux et traditionnel.",
        ...foodImage('fassi1'),
      },
      {
        id: 'french-breakfast',
        name: 'French Breakfast',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: 'Corbeille de viennoiseries, toast grillé, beurre et confiture.',
        ...foodImage('francais'),
      },
      {
        id: 'croque-monsieur',
        name: 'Croque Monsieur',
        category: 'Petits Déjeuners',
        price: '42 DH',
        description: 'Toast grillé, cheddar, charcuterie et salade fraîche.',
        ...foodImage('croque-monsieur'),
      },
      {
        id: 'croque-madame',
        name: 'Croque Madame',
        category: 'Petits Déjeuners',
        price: '42 DH',
        description: 'Toast grillé, oeuf, cheddar, charcuterie et salade fraîche.',
        ...foodImage('croque-madame'),
      },
      {
        id: 'oeufs-au-choix',
        name: 'Oeufs au Choix',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: 'Oeufs préparés selon votre envie, dont omelette fromage.',
        ...foodImage('omelette-fromage'),
      },
      {
        id: 'hollandaise',
        name: 'Hollandaise',
        category: 'Petits Déjeuners',
        price: '45 DH',
        description: 'Petit déjeuner hollandaise gourmand et raffiné.',
        ...foodImage('hollandaise'),
      },
      {
        id: 'prestige-breakfast',
        name: 'Prestige Breakfast',
        category: 'Petits Déjeuners',
        price: '72 DH',
        description: "Formule premium généreuse dans l'esprit lounge Prestige de Jeux.",
        ...foodImage('prestige-breakfast'),
      },
    ],
  },
  {
    category: 'Crêpes Sucrées',
    eyebrow: 'Sweet Corner',
    description: 'Crêpes fondantes et généreuses, pensées pour une pause sucrée raffinée.',
    items: [
      {
        id: 'crepe-nutella-classique',
        name: 'Crêpe Nutella Classique',
        category: 'Crêpes Sucrées',
        price: '30 DH',
        description: 'Crêpe moelleuse garnie de Nutella.',
        ...foodImage('crepe-nutella-classique'),
      },
      {
        id: 'crepe-banane-chocolat',
        name: 'Crêpe Banane Chocolat',
        category: 'Crêpes Sucrées',
        price: '35 DH',
        description: 'Crêpe gourmande à la banane et au chocolat fondant.',
        ...foodImage('crepe-banane-chocolat'),
      },
    ],
  },
  {
    category: 'Crêpes Salées',
    eyebrow: 'Savory Crêpes',
    description: 'Recettes salées chaudes et généreuses pour les pauses gourmandes.',
    items: [
      {
        id: 'crepe-salee-poulet-champignon',
        name: 'Crêpe Salée Poulet Champignon',
        category: 'Crêpes Salées',
        price: '37 DH',
        description: 'Poulet, sauce champignons, charcuterie et fromage.',
        ...foodImage('crepe-salee-poulet-champignons'),
      },
    ],
  },
  {
    category: 'Jus Frais',
    eyebrow: 'Fresh Juice',
    description: 'Jus frais et limonade servis bien frais avec une finition visuelle premium.',
    items: [
      { id: 'jus-orange', name: "Jus d'Orange", category: 'Jus Frais', price: '20 DH', description: 'Orange fraîche pressée.', ...foodImage('luxury-jus-orange') },
      { id: 'jus-banane', name: 'Jus de Banane', category: 'Jus Frais', price: '20 DH', description: 'Banane onctueuse et fraîche.', ...foodImage('luxury-jus-banane') },
      { id: 'jus-pomme', name: 'Jus de Pomme', category: 'Jus Frais', price: '20 DH', description: 'Pomme fraîche et légère.', ...foodImage('luxury-jus-pomme-big-cup') },
      { id: 'jus-fraise', name: 'Jus de Fraise', category: 'Jus Frais', price: '30 DH', description: 'Fraise fraîche, douce et fruitée.', ...foodImage('luxury-jus-fraise') },
      { id: 'jus-framboise', name: 'Jus Framboise', category: 'Jus Frais', price: '30 DH', description: 'Framboise fraîche, douce et rafraîchissante.', ...foodImage('luxury-jus-framboise') },
      { id: 'jus-mangue', name: 'Jus de Mangue', category: 'Jus Frais', price: '30 DH', description: 'Mangue fraîche, dense et tropicale.', ...foodImage('luxury-jus-mangue') },
      { id: 'jus-ananas', name: 'Jus Ananas', category: 'Jus Frais', price: '30 DH', description: "Jus d'ananas frais aux notes tropicales.", ...foodImage('luxury-jus-ananas') },
      { id: 'jus-avocat', name: "Jus d'Avocat", category: 'Jus Frais', price: '25 DH', description: 'Avocat crémeux et équilibré.', ...foodImage('luxury-jus-avocat') },
      { id: 'limonade', name: 'Limonade', category: 'Jus Frais', price: '25 DH', description: 'Limonade fraîche et acidulée.', ...foodImage('luxury-limonade') },
      { id: 'jus-citron', name: 'Jus de Citron', category: 'Jus Frais', price: '25 DH', description: 'Citron frais, vif et acidulé.', ...foodImage('luxury-jus-citron-big-cup') },
      { id: 'jus-extra-vitamine', name: 'Jus Extra Vitamine', category: 'Jus Frais', price: '35 DH', description: 'Boisson vitaminée aux fruits, fraîche et lumineuse.', ...foodImage('jus-extra-vitamine') },
    ],
  },
  {
    category: 'Eaux & Boissons Gazeuses',
    eyebrow: 'Soda Premium',
    description: 'Eaux minerales, sodas iconiques et energy drinks servis bien frais dans une signature lounge noire et doree.',
    items: [
      { id: 'coca-cola', name: 'COCA-COLA', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Coca-Cola glace, condensation intense et service premium.', ...foodImage('coca-cola', 'generated') },
      { id: 'coca-zero', name: 'COCA ZERO', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Coca-Cola Zero bien frais, elegant et sans sucres.', ...foodImage('coca-zero', 'generated') },
      { id: 'sprite', name: 'SPRITE', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Sprite citron-lime, bulles vives et glacons cristallins.', ...foodImage('sprite', 'generated') },
      { id: 'fanta-orange', name: 'FANTA ORANGE', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Fanta orange glace, notes citrus et finition lumineuse.', ...foodImage('fanta-orange', 'generated') },
      { id: 'hawai', name: 'HAWAÏ', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Soda tropical Hawai, fraicheur fruitee et service lounge.', ...foodImage('hawai', 'generated') },
      { id: 'schweppes-citron', name: 'SCHWEPPES CITRON', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Schweppes citron petillant, citron frais et bulles fines.', ...foodImage('schweppes-citron', 'generated') },
      { id: 'schweppes-tonic', name: 'SCHWEPPES TONIC', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Tonic Schweppes raffine, bulles nettes et agrumes elegants.', ...foodImage('schweppes-tonic', 'generated') },
      { id: 'poms', name: 'POMS', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Poms glace aux notes de pomme, dore et rafraichissant.', ...foodImage('poms', 'generated') },
      { id: 'mirinda', name: 'MIRINDA', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Mirinda orange servi tres frais avec glacons premium.', ...foodImage('mirinda', 'generated') },
      { id: 'seven-up', name: 'SEVEN UP', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Seven Up citron-lime, frais, petillant et cristallin.', ...foodImage('seven-up', 'generated') },
      { id: 'red-bull', name: 'RED BULL', category: 'Eaux & Boissons Gazeuses', price: '25 DH', description: 'Red Bull glace, energie premium et reflets metalliques.', ...foodImage('red-bull', 'generated') },
      { id: 'red-bull-sugar-free', name: 'RED BULL SUGAR FREE', category: 'Eaux & Boissons Gazeuses', price: '25 DH', description: 'Red Bull Sugar Free, frais, leger et elegant.', ...foodImage('red-bull-sugar-free', 'generated') },
      { id: 'monster-energy', name: 'MONSTER ENERGY', category: 'Eaux & Boissons Gazeuses', price: '30 DH', description: 'Monster Energy glace, intensite nocturne et service premium.', ...foodImage('monster-energy', 'generated') },
      { id: 'oulmes', name: 'OULMÈS', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Oulmes gazeuse, bulles fines et verre cristallin.', ...foodImage('oulmes', 'generated') },
      { id: 'sidi-ali', name: 'SIDI ALI', category: 'Eaux & Boissons Gazeuses', price: '10 DH', description: 'Sidi Ali plate, pure, fraiche et servie avec elegance.', ...foodImage('sidi-ali', 'generated') },
      { id: 'sidi-ali-gazeuse', name: 'SIDI ALI GAZEUSE', category: 'Eaux & Boissons Gazeuses', price: '15 DH', description: 'Sidi Ali gazeuse, bulles fines et fraicheur minerale.', ...foodImage('sidi-ali-gazeuse', 'generated') },
    ],
  },
  {
    category: 'Boissons Chaudes',
    eyebrow: 'Hot Lounge',
    description: 'Cafés, thés, chocolat chaud et spécialités gourmandes pour une pause élégante.',
    items: [
      { id: 'espresso', name: 'Espresso', category: 'Boissons Chaudes', price: '13 DH', description: 'Espresso court et intense.', ...foodImage('espresso') },
      { id: 'double-espresso', name: 'Double Espresso', category: 'Boissons Chaudes', price: '18 DH', description: 'Double espresso riche et aromatique.', ...foodImage('double-espresso-single-ai') },
      { id: 'cappuccino-italien', name: 'Cappuccino Italien', category: 'Boissons Chaudes', price: '20 DH', description: 'Cappuccino italien crémeux et raffiné.', ...foodImage('cappuccino-italien-ai') },
      { id: 'spanish-latte', name: 'Spanish Latte', category: 'Boissons Chaudes', price: '25 DH', description: 'Café latte espagnol gourmand et crémeux.', ...foodImage('spanish-latte-ai') },
      { id: 'cafe-americain', name: 'Café Américain', category: 'Boissons Chaudes', price: '15 DH', description: 'Café américain riche et équilibré.', ...foodImage('cafe-americain-ai') },
      { id: 'cafe-allonge', name: 'Café Allongé', category: 'Boissons Chaudes', price: '15 DH', description: 'Café allongé intense et aromatique.', ...foodImage('cafe-allonge-ai') },
      { id: 'cafe-aromatise', name: 'Café Aromatisé', category: 'Boissons Chaudes', price: '18 DH', description: 'Café parfumé aux saveurs gourmandes.', ...foodImage('cafe-aromatise-ai') },
      { id: 'the-anglais', name: 'Thé Anglais', category: 'Boissons Chaudes', price: '15 DH', description: 'Thé noir chaud raffiné et élégant.', ...foodImage('the-anglais-ai') },
      { id: 'chocolat-fondu', name: 'Chocolat Fondu', category: 'Boissons Chaudes', price: '25 DH', description: 'Chocolat chaud gourmand noir ou blanc.', ...foodImage('chocolat-fondu-ai') },
      { id: 'cafe-creme', name: 'Café Crème', category: 'Boissons Chaudes', price: '15 DH', description: 'Café crème doux et équilibré.', ...foodImage('cafe-creme') },
      { id: 'chocolat-chaud', name: 'Chocolat Chaud', category: 'Boissons Chaudes', price: '20 DH', description: 'Chocolat chaud dense et réconfortant.', ...foodImage('chocolat-chaud') },
      { id: 'the-marocain', name: 'Thé Marocain', category: 'Boissons Chaudes', price: '13 DH', description: 'Thé marocain parfumé.', ...foodImage('the-marocain') },
      { id: 'moka', name: 'Moka', category: 'Boissons Chaudes', price: '20 DH', description: 'Moka doux aux notes chocolatées.', ...foodImage('moka') },
      { id: 'cafe-latte', name: 'Café Latte', category: 'Boissons Chaudes', price: '20 DH', description: 'Café latte onctueux et équilibré.', ...foodImage('caffe-lathe') },
    ],
  },
  {
    category: 'Boissons Froides',
    eyebrow: 'Iced Lounge',
    description: 'Boissons froides gourmandes et rafraîchissantes servies dans un esprit café premium.',
    items: [
      { id: 'spanish-ice-latte', name: 'Spanish Ice Latte', category: 'Boissons Froides', price: '30 DH', description: 'Spanish latte glacé riche et crémeux.', ...foodImage('spanish-ice-latte-ai') },
      { id: 'ice-latte', name: 'Ice Latte', category: 'Boissons Froides', price: '20 DH', description: 'Ice latte frais et léger.', ...foodImage('ice-latte-ai') },
      { id: 'ice-latte-aromatise', name: 'Ice Latte Aromatisé', category: 'Boissons Froides', price: '25 DH', description: 'Ice latte aromatisé gourmand aux saveurs au choix.', ...foodImage('ice-latte-aromatise-ai') },
      { id: 'ice-mokka', name: 'Ice Mokka', category: 'Boissons Froides', price: '25 DH', description: 'Boisson glacée moka riche et chocolatée.', ...foodImage('ice-mokka-ai') },
      { id: 'milk-shake', name: 'Milk Shake', category: 'Boissons Froides', price: '30 DH', description: 'Milk shake gourmand et crémeux au choix.', ...foodImage('milkshake-ai') },
      { id: 'frappuccino', name: 'Frappuccino', category: 'Boissons Froides', price: '35 DH', description: 'Frappuccino glacé onctueux et rafraîchissant.', ...foodImage('frappuccino-ai') },
      { id: 'ice-tea', name: 'Ice Tea', category: 'Boissons Froides', price: '30 DH', description: 'Ice tea frais aux saveurs fruitées et rafraîchissantes.', ...foodImage('ice-tea-ai') },
      { id: 'smoothy', name: 'Smoothy', category: 'Boissons Froides', price: '30 DH', description: 'Smoothy naturel vitaminé aux fruits frais.', ...foodImage('smoothy-ai') },
    ],
  },
  {
    category: 'Cocktails Signature',
    eyebrow: 'Signature Drinks',
    description: 'Cocktails sans alcool et créations fruitées servies dans une ambiance premium.',
    items: [
      { id: 'red-paradise', name: 'Red Paradise', category: 'Cocktails Signature', price: '35 DH', description: 'Cocktail rouge fruité, élégant et rafraîchissant.', ...foodImage('paradise') },
      { id: 'bora-bora', name: 'Bora Bora', category: 'Cocktails Signature', price: '35 DH', description: 'Cocktail tropical généreux et premium.', ...foodImage('borabora') },
      { id: 'pina-colada', name: 'Pina Colada', category: 'Cocktails Signature', price: '40 DH', description: "Cocktail tropical crémeux à base d'ananas et noix de coco.", ...foodImage('pina-colada-ai') },
      { id: 'coco-dream', name: 'Coco Dream', category: 'Cocktails Signature', price: '40 DH', description: 'Cocktail exotique crémeux à la noix de coco.', ...foodImage('coco-dream-ai') },
      { id: 'mojito-virgin', name: 'Mojito Virgin', category: 'Cocktails Signature', price: '35 DH', description: 'Mocktail frais et tropical aux saveurs au choix.', ...foodImage('mojito-vergine') },
      { id: 'prestige-cocktail', name: 'Prestige Cocktail', category: 'Cocktails Signature', price: '45 DH', description: 'Création maison Prestige de Jeux, raffinée et fruitée.', ...foodImage('prestige-cocktail') },
    ],
  },
];

const requiredItemKeys = ['id', 'name', 'category', 'price', 'description', 'image'] as const;

function isRenderableMenuItem(item: MenuItem | null | undefined, section: Category): item is MenuItem {
  if (!item) {
    console.error(`[Menu] Produit vide ignoré dans ${section}.`);
    return false;
  }

  const missingKey = requiredItemKeys.find((key) => !item[key]);
  if (missingKey) {
    console.error(`[Menu] Produit ignoré: champ "${missingKey}" manquant.`, item);
    return false;
  }

  if (item.category !== section) {
    console.error(`[Menu] Produit ignoré: catégorie incohérente pour "${item.name}".`, item);
    return false;
  }

  return true;
}

function normalizeMenuSections(sections: MenuSection[]) {
  const usedIds = new Set<string>();
  const usedNames = new Set<string>();

  return sections.map((section) => ({
    ...section,
    items: section.items.filter((item) => {
      if (!isRenderableMenuItem(item, section.category)) {
        return false;
      }

      const identity = `${item.category}:${item.name.toLowerCase()}`;
      if (usedIds.has(item.id) || usedNames.has(identity)) {
        console.error(`[Menu] Produit dupliqué ignoré: ${item.name}.`, item);
        return false;
      }

      usedIds.add(item.id);
      usedNames.add(identity);
      return true;
    }),
  }));
}

const menuSections = normalizeMenuSections(rawMenuSections);
const allItems = menuSections.flatMap((section) => section.items);

function MenuImage({
  image,
  fallbackImage,
  title,
  category,
  isPriority = false,
  isModal = false,
}: {
  image?: string;
  fallbackImage?: string;
  title: string;
  category: Category;
  isPriority?: boolean;
  isModal?: boolean;
}) {
  const Icon = categoryIcons[category] ?? Coffee;
  const [src, setSrc] = useState(image || snookerTable);
  const isFallback = src === snookerTable;

  useEffect(() => {
    setSrc(image || snookerTable);
  }, [image]);

  return (
    <div className="menu-carousel">
      <img
        key={`${title}-${src}`}
        src={src}
        srcSet={fallbackImage && fallbackImage !== src ? `${src} 600w, ${fallbackImage} 1200w` : undefined}
        sizes={isModal ? '(max-width: 767px) 94vw, 820px' : '(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 600px'}
        alt={title}
        width={isModal ? 1200 : 600}
        height={isModal ? 800 : 400}
        loading={isPriority ? 'eager' : 'lazy'}
        fetchPriority={isPriority ? 'high' : 'auto'}
        decoding="async"
        className="menu-carousel__image is-active"
        onError={() => {
          console.error(`[Menu] Image introuvable pour "${title}". Fallback appliqué.`, image);
          setSrc(snookerTable);
        }}
      />
      {isFallback ? (
        <div className="menu-carousel__fallback" aria-hidden="true">
          <Icon />
          <span>Photo bientôt disponible</span>
        </div>
      ) : null}
      <div className="menu-carousel__shade" />
    </div>
  );
}

const MenuCard: FC<{ item: MenuItem; index: number; isPriority: boolean; onOpen: () => void }> = ({
  item,
  index,
  isPriority,
  onOpen,
}) => {
  const Icon = categoryIcons[item.category] ?? Coffee;
  const cardClassName = [
    'menu-card',
    item.category === 'Jus Frais' ? 'menu-card--jus-frais' : '',
    item.category === 'Eaux & Boissons Gazeuses' ? 'menu-card--sodas' : '',
    item.id === 'cafe-latte' ? 'menu-card--cafe-latte' : '',
    item.id === 'mojito-virgin' ? 'menu-card--mojito-virgin' : '',
    item.id === 'red-paradise' ? 'menu-card--red-paradise' : '',
    item.id === 'bora-bora' ? 'menu-card--bora-bora' : '',
  ].filter(Boolean).join(' ');

  return (
    <motion.article
      className={cardClassName}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.44, delay: Math.min(index * 0.035, 0.24), ease: 'easeOut' }}
    >
      <MenuImage
        image={item.cardImage || item.image}
        fallbackImage={item.modalImage || item.image}
        title={item.name}
        category={item.category}
        isPriority={isPriority}
      />
      <div className="menu-card__body">
        <div className="menu-card__meta">
          <span>
            <Icon aria-hidden="true" />
            {item.category}
          </span>
          <strong>{item.price}</strong>
        </div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <button type="button" onClick={onOpen}>
          Voir les détails
        </button>
      </div>
    </motion.article>
  );
};

function MenuModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const Icon = categoryIcons[item.category] ?? Coffee;

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  return (
    <motion.div
      className="menu-modal"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.dialog
        open
        aria-modal="true"
        aria-labelledby="menu-modal-title"
        className="menu-modal__panel"
        initial={{ opacity: 0, y: 28, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 18, scale: 0.97 }}
        transition={{ duration: 0.24, ease: 'easeOut' }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button type="button" className="menu-modal__close" onClick={onClose} aria-label="Fermer les détails">
          <X aria-hidden="true" />
        </button>
        <MenuImage
          image={item.modalImage || item.image}
          title={item.name}
          category={item.category}
          isPriority
          isModal
        />
        <div className="menu-modal__content">
          <span className="menu-modal__category">
            <Icon aria-hidden="true" />
            {item.category}
          </span>
          <h2 id="menu-modal-title">{item.name}</h2>
          <strong>{item.price}</strong>
          <p>{item.description}</p>
        </div>
      </motion.dialog>
    </motion.div>
  );
}

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Tout');
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);

  const visibleSections = useMemo(() => {
    if (activeFilter === 'Tout') {
      return menuSections;
    }

    return menuSections.filter((section) => section.category === activeFilter);
  }, [activeFilter]);

  const priorityImageIds = useMemo(
    () => new Set(visibleSections.flatMap((section) => section.items).slice(0, 4).map((item) => item.id)),
    [visibleSections],
  );

  return (
    <main className="prestige-menu-page">
      <section className="prestige-menu" aria-labelledby="menu-title">
        <div className="prestige-menu__background" aria-hidden="true">
          <img src={snookerTable} alt="" loading="eager" />
        </div>
        <div className="prestige-menu__overlay" />

        <div className="prestige-menu__inner">
          <motion.header
            className="prestige-menu__header"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
          >
            <span className="prestige-menu__eyebrow">
              <span />
              Prestige de Jeux
              <span />
            </span>
            <h1 id="menu-title">Notre Menu</h1>
            <p>Petits déjeuners, crêpes, jus frais, eaux & boissons gazeuses, boissons chaudes, boissons froides et cocktails signature</p>
          </motion.header>

          <nav className="menu-filters" aria-label="Filtrer le menu">
            {filterOptions.map((filter) => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'is-active' : ''}
                onClick={() => setActiveFilter(filter)}
                aria-pressed={activeFilter === filter}
              >
                {filter === 'Tout' ? <Search aria-hidden="true" /> : null}
                {filter}
              </button>
            ))}
          </nav>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeFilter}
              className="menu-sections"
              aria-live="polite"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.24, ease: 'easeOut' }}
            >
              {visibleSections.map((section) => {
                const Icon = categoryIcons[section.category] ?? Coffee;
                const items = section.items.filter(Boolean);

                return (
                  <section key={section.category} className="menu-section" aria-labelledby={`section-${section.category}`}>
                    <motion.div
                      className="menu-section__header"
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5 }}
                    >
                      <span>
                        <Icon aria-hidden="true" />
                        {section.eyebrow}
                      </span>
                      <h2 id={`section-${section.category}`}>{section.category}</h2>
                      <p>{section.description}</p>
                    </motion.div>

                    <div className="menu-grid">
                      {items.map((item, index) => (
                        <MenuCard
                          key={item.id}
                          item={item}
                          index={index}
                          isPriority={priorityImageIds.has(item.id)}
                          onOpen={() => setSelectedItem(item)}
                        />
                      ))}
                    </div>
                  </section>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <AnimatePresence>
        {selectedItem ? (
          <MenuModal item={selectedItem} onClose={() => setSelectedItem(null)} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

export { allItems, menuSections };

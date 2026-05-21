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
import chamalli from '../assets/images/pic food/chamalli.jpg';
import fassi from '../assets/images/pic food/fassi.jpg';
import francais from '../assets/images/pic food/francais.jpg';
import croqueMonsieur from '../assets/images/pic food/croque-monsieur.jpg';
import croqueMadame from '../assets/images/pic food/optimized/croque-madame.optimized.jpg';
import omeletteFromage from '../assets/images/pic food/optimized/omelette-fromage.optimized.jpg';
import crepeNutellaClassique from '../assets/images/pic food/optimized/crepe-nutella-classique.optimized.jpg';
import crepeBananeChocolat from '../assets/images/pic food/optimized/crepe-banane-chocolat.optimized.jpg';
import crepeSaleePouletChampignons from '../assets/images/pic food/optimized/crepe-salee-poulet-champignons.optimized.jpg';
import redParadise from '../assets/images/pic food/optimized/paradise.optimized.jpg';
import boraBora from '../assets/images/pic food/optimized/borabora.optimized.jpg';
import cafeLatte from '../assets/images/pic food/optimized/caffe-lathe.optimized.jpg';
import generatedPrestigeBreakfast from '../assets/images/pic food/generated/prestige-breakfast.png';
import luxuryJusOrange from '../assets/images/pic food/generated/luxury-jus-orange.png';
import luxuryJusBanane from '../assets/images/pic food/generated/luxury-jus-banane.png';
import luxuryJusPommeBigCup from '../assets/images/pic food/generated/luxury-jus-pomme-big-cup.png';
import luxuryJusFraise from '../assets/images/pic food/generated/luxury-jus-fraise.png';
import luxuryJusFramboise from '../assets/images/pic food/generated/luxury-jus-framboise.png';
import luxuryJusMangue from '../assets/images/pic food/generated/luxury-jus-mangue.png';
import luxuryJusAnanas from '../assets/images/pic food/generated/luxury-jus-ananas.png';
import luxuryJusAvocat from '../assets/images/pic food/generated/luxury-jus-avocat.png';
import luxuryLimonade from '../assets/images/pic food/generated/luxury-limonade.png';
import luxuryJusCitronBigCup from '../assets/images/pic food/generated/luxury-jus-citron-big-cup.png';
import jusExtraVitamine from '../assets/images/pic food/jus-extra-vitamine.jpeg';
import generatedPrestigeCocktail from '../assets/images/pic food/generated/prestige-cocktail.png';
import generatedEspresso from '../assets/images/pic food/generated/espresso.png';
import generatedDoubleEspressoSingleAi from '../assets/images/pic food/generated/double-espresso-single-ai.jpg';
import generatedCafeCreme from '../assets/images/pic food/generated/cafe-creme.png';
import generatedChocolatChaud from '../assets/images/pic food/generated/chocolat-chaud.png';
import generatedTheMarocain from '../assets/images/pic food/generated/the-marocain.png';
import generatedTheAmericain from '../assets/images/pic food/generated/the-americain.png';
import generatedMoka from '../assets/images/pic food/generated/moka.png';
import generatedMilkshakeAi from '../assets/images/pic food/generated/milkshake-ai.jpg';
import generatedFrappuccinoAi from '../assets/images/pic food/generated/frappuccino-ai.jpg';
import generatedIceTeaAi from '../assets/images/pic food/generated/ice-tea-ai.jpg';
import generatedSmoothyAi from '../assets/images/pic food/generated/smoothy-ai.jpg';
import mojitoVergine from '../assets/images/pic food/mojito-vergine.jpeg';
import generatedPinaColadaAi from '../assets/images/pic food/generated/pina-colada-ai.jpg';
import generatedCocoDreamAi from '../assets/images/pic food/generated/coco-dream-ai.jpg';
import generatedSpanishLatteAi from '../assets/images/pic food/generated/spanish-latte-ai.jpg';
import generatedCafeAmericainAi from '../assets/images/pic food/generated/cafe-americain-ai.jpg';
import generatedCafeAllongeAi from '../assets/images/pic food/generated/cafe-allonge-ai.jpg';
import generatedCafeAromatiseAi from '../assets/images/pic food/generated/cafe-aromatise-ai.jpg';
import generatedTheAnglaisAi from '../assets/images/pic food/generated/the-anglais-ai.jpg';
import generatedChocolatFonduAi from '../assets/images/pic food/generated/chocolat-fondu-ai.jpg';
import generatedCappuccinoItalianAi from '../assets/images/pic food/generated/cappuccino-italien-ai.jpg';
import generatedSpanishIceLatteAi from '../assets/images/pic food/generated/spanish-ice-latte-ai.jpg';
import generatedIceLatteAi from '../assets/images/pic food/generated/ice-latte-ai.jpg';
import generatedIceLatteAromatiseAi from '../assets/images/pic food/generated/ice-latte-aromatise-ai.jpg';
import generatedIceMokkaAi from '../assets/images/pic food/generated/ice-mokka-ai.jpg';
import './Menu.css';

type Category =
  | 'Petits Déjeuners'
  | 'Crêpes Sucrées'
  | 'Crêpes Salées'
  | 'Jus Frais'
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
  'Boissons Froides': CupSoda,
  'Cocktails Signature': Martini,
  'Boissons Chaudes': Coffee,
};

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
        image: chamalli,
      },
      {
        id: 'fassi-premium',
        name: 'Fassi Premium',
        category: 'Petits Déjeuners',
        price: '30 DH',
        description: "Tagine de khlii, oeufs, jben, huile d'olive, olives noires et pain.",
        image: fassi,
      },
      {
        id: 'french-breakfast',
        name: 'French Breakfast',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: 'Corbeille de viennoiseries, toast grillé, beurre et confiture.',
        image: francais,
      },
      {
        id: 'croque-monsieur',
        name: 'Croque Monsieur',
        category: 'Petits Déjeuners',
        price: '42 DH',
        description: 'Toast grillé, cheddar, charcuterie et salade fraîche.',
        image: croqueMonsieur,
      },
      {
        id: 'croque-madame',
        name: 'Croque Madame',
        category: 'Petits Déjeuners',
        price: '42 DH',
        description: 'Toast grillé, oeuf, cheddar, charcuterie et salade fraîche.',
        image: croqueMadame,
      },
      {
        id: 'oeufs-au-choix',
        name: 'Oeufs au Choix',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: 'Oeufs préparés selon votre envie, dont omelette fromage.',
        image: omeletteFromage,
      },
      {
        id: 'prestige-breakfast',
        name: 'Prestige Breakfast',
        category: 'Petits Déjeuners',
        price: '72 DH',
        description: "Formule premium généreuse dans l'esprit lounge Prestige de Jeux.",
        image: generatedPrestigeBreakfast,
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
        image: crepeNutellaClassique,
      },
      {
        id: 'crepe-banane-chocolat',
        name: 'Crêpe Banane Chocolat',
        category: 'Crêpes Sucrées',
        price: '30 DH',
        description: 'Crêpe gourmande à la banane et au chocolat fondant.',
        image: crepeBananeChocolat,
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
        price: '30 DH',
        description: 'Poulet, sauce champignons, charcuterie et fromage.',
        image: crepeSaleePouletChampignons,
      },
    ],
  },
  {
    category: 'Jus Frais',
    eyebrow: 'Fresh Juice',
    description: 'Jus frais et limonade servis bien frais avec une finition visuelle premium.',
    items: [
      { id: 'jus-orange', name: "Jus d'Orange", category: 'Jus Frais', price: '20 DH', description: 'Orange fraîche pressée.', image: luxuryJusOrange },
      { id: 'jus-banane', name: 'Jus de Banane', category: 'Jus Frais', price: '20 DH', description: 'Banane onctueuse et fraîche.', image: luxuryJusBanane },
      { id: 'jus-pomme', name: 'Jus de Pomme', category: 'Jus Frais', price: '20 DH', description: 'Pomme fraîche et légère.', image: luxuryJusPommeBigCup },
      { id: 'jus-fraise', name: 'Jus de Fraise', category: 'Jus Frais', price: '30 DH', description: 'Fraise fraîche, douce et fruitée.', image: luxuryJusFraise },
      { id: 'jus-framboise', name: 'Jus Framboise', category: 'Jus Frais', price: '30 DH', description: 'Framboise fraîche, douce et rafraîchissante.', image: luxuryJusFramboise },
      { id: 'jus-mangue', name: 'Jus de Mangue', category: 'Jus Frais', price: '30 DH', description: 'Mangue fraîche, dense et tropicale.', image: luxuryJusMangue },
      { id: 'jus-ananas', name: 'Jus Ananas', category: 'Jus Frais', price: '30 DH', description: "Jus d'ananas frais aux notes tropicales.", image: luxuryJusAnanas },
      { id: 'jus-avocat', name: "Jus d'Avocat", category: 'Jus Frais', price: '25 DH', description: 'Avocat crémeux et équilibré.', image: luxuryJusAvocat },
      { id: 'limonade', name: 'Limonade', category: 'Jus Frais', price: '25 DH', description: 'Limonade fraîche et acidulée.', image: luxuryLimonade },
      { id: 'jus-citron', name: 'Jus de Citron', category: 'Jus Frais', price: '25 DH', description: 'Citron frais, vif et acidulé.', image: luxuryJusCitronBigCup },
      { id: 'jus-extra-vitamine', name: 'Jus Extra Vitamine', category: 'Jus Frais', price: '35 DH', description: 'Boisson vitaminée aux fruits, fraîche et lumineuse.', image: jusExtraVitamine },
    ],
  },
  {
    category: 'Boissons Chaudes',
    eyebrow: 'Hot Lounge',
    description: 'Cafés, thés, chocolat chaud et spécialités gourmandes pour une pause élégante.',
    items: [
      { id: 'espresso', name: 'Espresso', category: 'Boissons Chaudes', price: '13 DH', description: 'Espresso court et intense.', image: generatedEspresso },
      { id: 'double-espresso', name: 'Double Espresso', category: 'Boissons Chaudes', price: '18 DH', description: 'Double espresso riche et aromatique.', image: generatedDoubleEspressoSingleAi },
      { id: 'cappuccino-italien', name: 'Cappuccino Italien', category: 'Boissons Chaudes', price: '20 DH', description: 'Cappuccino italien crémeux et raffiné.', image: generatedCappuccinoItalianAi },
      { id: 'spanish-latte', name: 'Spanish Latte', category: 'Boissons Chaudes', price: '25 DH', description: 'Café latte espagnol gourmand et crémeux.', image: generatedSpanishLatteAi },
      { id: 'cafe-americain', name: 'Café Américain', category: 'Boissons Chaudes', price: '15 DH', description: 'Café américain riche et équilibré.', image: generatedCafeAmericainAi },
      { id: 'cafe-allonge', name: 'Café Allongé', category: 'Boissons Chaudes', price: '15 DH', description: 'Café allongé intense et aromatique.', image: generatedCafeAllongeAi },
      { id: 'cafe-aromatise', name: 'Café Aromatisé', category: 'Boissons Chaudes', price: '18 DH', description: 'Café parfumé aux saveurs gourmandes.', image: generatedCafeAromatiseAi },
      { id: 'the-anglais', name: 'Thé Anglais', category: 'Boissons Chaudes', price: '15 DH', description: 'Thé noir chaud raffiné et élégant.', image: generatedTheAnglaisAi },
      { id: 'chocolat-fondu', name: 'Chocolat Fondu', category: 'Boissons Chaudes', price: '25 DH', description: 'Chocolat chaud gourmand noir ou blanc.', image: generatedChocolatFonduAi },
      { id: 'cafe-creme', name: 'Café Crème', category: 'Boissons Chaudes', price: '15 DH', description: 'Café crème doux et équilibré.', image: generatedCafeCreme },
      { id: 'chocolat-chaud', name: 'Chocolat Chaud', category: 'Boissons Chaudes', price: '20 DH', description: 'Chocolat chaud dense et réconfortant.', image: generatedChocolatChaud },
      { id: 'the-marocain', name: 'Thé Marocain', category: 'Boissons Chaudes', price: '13 DH', description: 'Thé marocain parfumé.', image: generatedTheMarocain },
      { id: 'the-americain', name: 'Thé Américain', category: 'Boissons Chaudes', price: '15 DH', description: 'Thé américain servi chaud.', image: generatedTheAmericain },
      { id: 'moka', name: 'Moka', category: 'Boissons Chaudes', price: '20 DH', description: 'Moka doux aux notes chocolatées.', image: generatedMoka },
      { id: 'cafe-latte', name: 'Café Latte', category: 'Boissons Chaudes', price: '20 DH', description: 'Café latte onctueux et équilibré.', image: cafeLatte },
    ],
  },
  {
    category: 'Boissons Froides',
    eyebrow: 'Iced Lounge',
    description: 'Boissons froides gourmandes et rafraîchissantes servies dans un esprit café premium.',
    items: [
      { id: 'spanish-ice-latte', name: 'Spanish Ice Latte', category: 'Boissons Froides', price: '30 DH', description: 'Spanish latte glacé riche et crémeux.', image: generatedSpanishIceLatteAi },
      { id: 'ice-latte', name: 'Ice Latte', category: 'Boissons Froides', price: '20 DH', description: 'Ice latte frais et léger.', image: generatedIceLatteAi },
      { id: 'ice-latte-aromatise', name: 'Ice Latte Aromatisé', category: 'Boissons Froides', price: '25 DH', description: 'Ice latte aromatisé gourmand aux saveurs au choix.', image: generatedIceLatteAromatiseAi },
      { id: 'ice-mokka', name: 'Ice Mokka', category: 'Boissons Froides', price: '25 DH', description: 'Boisson glacée moka riche et chocolatée.', image: generatedIceMokkaAi },
      { id: 'milk-shake', name: 'Milk Shake', category: 'Boissons Froides', price: '30 DH', description: 'Milk shake gourmand et crémeux au choix.', image: generatedMilkshakeAi },
      { id: 'frappuccino', name: 'Frappuccino', category: 'Boissons Froides', price: '35 DH', description: 'Frappuccino glacé onctueux et rafraîchissant.', image: generatedFrappuccinoAi },
      { id: 'ice-tea', name: 'Ice Tea', category: 'Boissons Froides', price: '30 DH', description: 'Ice tea frais aux saveurs fruitées et rafraîchissantes.', image: generatedIceTeaAi },
      { id: 'smoothy', name: 'Smoothy', category: 'Boissons Froides', price: '30 DH', description: 'Smoothy naturel vitaminé aux fruits frais.', image: generatedSmoothyAi },
    ],
  },
  {
    category: 'Cocktails Signature',
    eyebrow: 'Signature Drinks',
    description: 'Cocktails sans alcool et créations fruitées servies dans une ambiance premium.',
    items: [
      { id: 'red-paradise', name: 'Red Paradise', category: 'Cocktails Signature', price: '35 DH', description: 'Cocktail rouge fruité, élégant et rafraîchissant.', image: redParadise },
      { id: 'bora-bora', name: 'Bora Bora', category: 'Cocktails Signature', price: '35 DH', description: 'Cocktail tropical généreux et premium.', image: boraBora },
      { id: 'pina-colada', name: 'Pina Colada', category: 'Cocktails Signature', price: '40 DH', description: "Cocktail tropical crémeux à base d'ananas et noix de coco.", image: generatedPinaColadaAi },
      { id: 'coco-dream', name: 'Coco Dream', category: 'Cocktails Signature', price: '40 DH', description: 'Cocktail exotique crémeux à la noix de coco.', image: generatedCocoDreamAi },
      { id: 'mojito-virgin', name: 'Mojito Virgin', category: 'Cocktails Signature', price: '35 DH', description: 'Mocktail frais et tropical aux saveurs au choix.', image: mojitoVergine },
      { id: 'prestige-cocktail', name: 'Prestige Cocktail', category: 'Cocktails Signature', price: '45 DH', description: 'Création maison Prestige de Jeux, raffinée et fruitée.', image: generatedPrestigeCocktail },
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

function MenuImage({ image, title, category }: { image?: string; title: string; category: Category }) {
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
        alt={title}
        loading="lazy"
        className="menu-carousel__image is-active"
        onError={() => {
          console.error(`[Menu] Image introuvable pour "${title}". Fallback appliqué.`, image);
          setSrc(snookerTable);
        }}
      />
      {isFallback ? (
        <div className="menu-carousel__fallback" aria-hidden="true">
          <Icon />
        </div>
      ) : null}
      <div className="menu-carousel__shade" />
    </div>
  );
}

const MenuCard: FC<{ item: MenuItem; index: number; onOpen: () => void }> = ({ item, index, onOpen }) => {
  const Icon = categoryIcons[item.category] ?? Coffee;
  const cardClassName = item.category === 'Jus Frais' ? 'menu-card menu-card--jus-frais' : 'menu-card';

  return (
    <motion.article
      className={cardClassName}
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, delay: Math.min(index * 0.025, 0.22) }}
    >
      <MenuImage image={item.image} title={item.name} category={item.category} />
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
        <MenuImage image={item.image} title={item.name} category={item.category} />
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
            <p>Petits déjeuners, crêpes, jus frais, boissons froides, cocktails signature & boissons chaudes</p>
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

          <div className="menu-sections" aria-live="polite">
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
                        onOpen={() => setSelectedItem(item)}
                      />
                    ))}
                  </div>
                </section>
              );
            })}
          </div>
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

import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
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
import fassi1 from '../assets/images/pic food/fassi1.jpg';
import fassi2 from '../assets/images/pic food/fassi2.jpg';
import francais from '../assets/images/pic food/francais.jpg';
import croqueMonsieur from '../assets/images/pic food/croque-monsieur.jpg';
import croqueMonsieur1 from '../assets/images/pic food/croque-monsieur1.jpg';
import croqueMadame from '../assets/images/pic food/optimized/croque-madame.optimized.jpg';
import omeletteFromage from '../assets/images/pic food/optimized/omelette fromage.optimized.jpg';
import crepeNutellaClassique from '../assets/images/pic food/optimized/crepe-nutella-classique.optimized.jpg';
import crepeNutella from '../assets/images/pic food/creppnutella.jpg';
import crepeBananeChocolat from '../assets/images/pic food/optimized/crepe-banane-chocolat.optimized.jpg';
import crepeNutellaBanane from '../assets/images/pic food/crepnutellabanane.jpg';
import crepeSaleePouletChampignons from '../assets/images/pic food/optimized/crepe-salee-poulet-champignons.optimized.jpg';
import redParadise from '../assets/images/pic food/optimized/paradise.optimized.jpg';
import jusExtraVitamine from '../assets/images/pic food/jus extra vitamine.jpeg';
import boraBora from '../assets/images/pic food/optimized/borabora.optimized.jpg';
import cappuccinoViennois from '../assets/images/pic food/cappuccino-viennois.jpeg';
import cafeLatte from '../assets/images/pic food/optimized/caffe lathe.optimized.jpg';
import generatedPrestigeBreakfast from '../assets/images/pic food/generated/prestige-breakfast.png';
import generatedJusOrange from '../assets/images/pic food/generated/jus-orange.png';
import generatedJusBanane from '../assets/images/pic food/generated/jus-banane.png';
import generatedJusPomme from '../assets/images/pic food/generated/jus-pomme.png';
import generatedJusFraise from '../assets/images/pic food/generated/jus-fraise.png';
import generatedJusFramboiseAi from '../assets/images/pic food/generated/jus-framboise-ai.jpg';
import generatedJusMangue from '../assets/images/pic food/generated/jus-mangue.png';
import generatedJusAnanasAi from '../assets/images/pic food/generated/jus-ananas-ai.jpg';
import generatedJusAvocat from '../assets/images/pic food/generated/jus-avocat.png';
import generatedLimonade from '../assets/images/pic food/generated/limonade.png';
import generatedJusCitron from '../assets/images/pic food/generated/jus-citron.png';
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
import generatedSmoothieAi from '../assets/images/pic food/generated/smoothie-ai.jpg';
import generatedMojitoVirginAi from '../assets/images/pic food/generated/mojito-virgin-ai.jpg';
import generatedPinnaColladaAi from '../assets/images/pic food/generated/pinna-collada-ai.jpg';
import generatedCocoDreamAi from '../assets/images/pic food/generated/coco-dream-ai.jpg';
import generatedSpanishLatteAi from '../assets/images/pic food/generated/spanish-latte-ai.jpg';
import generatedCafeAmericainAi from '../assets/images/pic food/generated/cafe-americain-ai.jpg';
import generatedCafeAllongeAi from '../assets/images/pic food/generated/cafe-allonge-ai.jpg';
import generatedCafeAromatiseAi from '../assets/images/pic food/generated/cafe-aromatise-ai.jpg';
import generatedTheAnglaisAi from '../assets/images/pic food/generated/the-anglais-ai.jpg';
import generatedChocolatFonduAi from '../assets/images/pic food/generated/chocolat-fondu-ai.jpg';
import generatedCaputshinoItalianAi from '../assets/images/pic food/generated/caputshino-italian-ai.jpg';
import generatedSpanishIceLatteAi from '../assets/images/pic food/generated/spanish-ice-latte-ai.jpg';
import generatedIceLatteAi from '../assets/images/pic food/generated/ice-latte-ai.jpg';
import generatedIceLatteAromatiseAi from '../assets/images/pic food/generated/ice-latte-aromatise-ai.jpg';
import generatedIceMookaAi from '../assets/images/pic food/generated/ice-mooka-ai.jpg';
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
  images?: string[];
  details?: string[];
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

const menuSections: MenuSection[] = [
  {
    category: 'Petits Déjeuners',
    eyebrow: 'Breakfast Prestige',
    description: 'Classiques matinaux, croques gourmands et assiettes premium pour commencer la journée avec élégance.',
    items: [
      {
        id: 'chamalli',
        name: 'Chamalli',
        category: 'Petits Déjeuners',
        price: '30 DH',
        description: "Œufs au choix, charcuterie, fromage rouge, jben, huile d'olive, olives noires et pain.",
        images: [chamalli],
      },
      {
        id: 'fassi-premium',
        name: 'Fassi Premium',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: "Tagine de khlii, œufs, jben, huile d'olive, olives noires et pain.",
        images: [fassi, fassi1, fassi2],
      },
      {
        id: 'french-breakfast',
        name: 'French Breakfast',
        category: 'Petits Déjeuners',
        price: '35 DH',
        description: 'Corbeille de viennoiseries, toast grillé, beurre et confiture.',
        images: [francais],
      },
      {
        id: 'croque-monsieur',
        name: 'Croque Monsieur',
        category: 'Petits Déjeuners',
        price: '32 DH',
        description: 'Toast grillé, cheddar, charcuterie et salade fraîche.',
        images: [croqueMonsieur, croqueMonsieur1],
      },
      {
        id: 'croque-madame',
        name: 'Croque Madame',
        category: 'Petits Déjeuners',
        price: '32 DH',
        description: 'Toast grillé, œuf, cheddar, charcuterie et salade fraîche.',
        images: [croqueMadame],
      },
      {
        id: 'oeufs-au-choix',
        name: 'Œufs au Choix',
        category: 'Petits Déjeuners',
        price: '26 DH',
        description: 'Œufs préparés selon votre envie, dont omelette fromage.',
        images: [omeletteFromage],
      },
      {
        id: 'prestige-breakfast',
        name: 'Prestige Breakfast',
        category: 'Petits Déjeuners',
        price: '55 DH',
        description: 'Formule premium généreuse dans l’esprit lounge Prestige de Jeux.',
        images: [generatedPrestigeBreakfast],
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
        images: [crepeNutellaClassique, crepeNutella],
      },
      {
        id: 'crepe-banane-chocolat',
        name: 'Crêpe Banane Chocolat',
        category: 'Crêpes Sucrées',
        price: '30 DH',
        description: 'Crêpe gourmande à la banane et au chocolat fondant.',
        images: [crepeBananeChocolat, crepeNutellaBanane],
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
        images: [crepeSaleePouletChampignons],
      },
    ],
  },
  {
    category: 'Jus Frais',
    eyebrow: 'Fresh Juice',
    description: 'Jus frais et limonade servis bien frais. Les jus sans photo utilisent une finition visuelle sobre.',
    items: [
      { id: 'jus-orange', name: "Jus d'Orange", category: 'Jus Frais', price: '20 DH', description: 'Orange fraîche pressée.', images: [generatedJusOrange] },
      { id: 'jus-banane', name: 'Jus de Banane', category: 'Jus Frais', price: '20 DH', description: 'Banane onctueuse et fraîche.', images: [generatedJusBanane] },
      { id: 'jus-pomme', name: 'Jus de Pomme', category: 'Jus Frais', price: '20 DH', description: 'Pomme fraîche et légère.', images: [generatedJusPomme] },
      { id: 'jus-fraise', name: 'Jus de Fraise', category: 'Jus Frais', price: '30 DH', description: 'Fraise fraîche, douce et fruitée.', images: [generatedJusFraise] },
      { id: 'jus-framboise', name: 'Jus Framboise', category: 'Jus Frais', price: '30 DH', description: 'Framboise fraîche, douce et rafraîchissante.', images: [generatedJusFramboiseAi] },
      { id: 'jus-mangue', name: 'Jus de Mangue', category: 'Jus Frais', price: '30 DH', description: 'Mangue fraîche, dense et tropicale.', images: [generatedJusMangue] },
      { id: 'jus-ananas', name: 'Jus Ananas', category: 'Jus Frais', price: '30 DH', description: 'Jus d’ananas frais aux notes tropicales.', images: [generatedJusAnanasAi] },
      { id: 'jus-avocat', name: "Jus d'Avocat", category: 'Jus Frais', price: '25 DH', description: 'Avocat crémeux et équilibré.', images: [generatedJusAvocat] },
      { id: 'limonade', name: 'Limonade', category: 'Jus Frais', price: '25 DH', description: 'Limonade fraîche et acidulée.', images: [generatedLimonade] },
      { id: 'jus-citron', name: 'Jus de Citron', category: 'Jus Frais', price: '25 DH', description: 'Citron frais, vif et acidulé.', images: [generatedJusCitron] },
      {
        id: 'jus-extra-vitamine',
        name: 'Jus Extra Vitamine',
        category: 'Jus Frais',
        price: '35 DH',
        description: 'Boisson vitaminée aux fruits, fraîche et lumineuse.',
        images: [jusExtraVitamine],
      },
    ],
  },
  {
    category: 'Boissons Chaudes',
    eyebrow: 'Hot Lounge',
    description: 'Cafés, thés, chocolat chaud et spécialités gourmandes pour une pause élégante.',
    items: [
      { id: 'espresso', name: 'Espresso', category: 'Boissons Chaudes', price: '13 DH', description: 'Espresso court et intense.', images: [generatedEspresso] },
      { id: 'double-espresso', name: 'Double Espresso', category: 'Boissons Chaudes', price: '18 DH', description: 'Double espresso riche et aromatique.', images: [generatedDoubleEspressoSingleAi] },
      { id: 'cafe-creme', name: 'Café Crème', category: 'Boissons Chaudes', price: '15 DH', description: 'Café crème doux et équilibré.', images: [generatedCafeCreme] },
      { id: 'spanish-latte', name: 'Spanish Latte', category: 'Boissons Chaudes', price: '25 DH', description: 'Café latte espagnol gourmand et crémeux.', images: [generatedSpanishLatteAi] },
      { id: 'cafe-americain', name: 'Café Américain', category: 'Boissons Chaudes', price: '15 DH', description: 'Café américain riche et équilibré.', images: [generatedCafeAmericainAi] },
      { id: 'cafe-allonge', name: 'Café Allongé', category: 'Boissons Chaudes', price: '15 DH', description: 'Café allongé intense et aromatique.', images: [generatedCafeAllongeAi] },
      { id: 'cafe-aromatise', name: 'Café Aromatisé', category: 'Boissons Chaudes', price: '18 DH', description: 'Café parfumé aux saveurs gourmandes.', images: [generatedCafeAromatiseAi] },
      { id: 'chocolat-chaud', name: 'Chocolat Chaud', category: 'Boissons Chaudes', price: '20 DH', description: 'Chocolat chaud dense et réconfortant.', images: [generatedChocolatChaud] },
      { id: 'chocolat-fondu', name: 'Chocolat Fondu', category: 'Boissons Chaudes', price: '25 DH', description: 'Chocolat chaud gourmand noir ou blanc.', images: [generatedChocolatFonduAi], details: ['Options: Noir / Blanc'] },
      { id: 'the-marocain', name: 'Thé Marocain', category: 'Boissons Chaudes', price: '13 DH', description: 'Thé marocain parfumé.', images: [generatedTheMarocain] },
      { id: 'the-anglais', name: 'Thé Anglais', category: 'Boissons Chaudes', price: '15 DH', description: 'Thé noir chaud raffiné et élégant.', images: [generatedTheAnglaisAi], details: ['Thé Noir'] },
      { id: 'the-americain', name: 'Thé Américain', category: 'Boissons Chaudes', price: '15 DH', description: 'Thé américain servi chaud.', images: [generatedTheAmericain] },
      {
        id: 'cappuccino-viennois',
        name: 'Cappuccino Viennois',
        category: 'Boissons Chaudes',
        price: '25 DH',
        description: 'Cappuccino gourmand avec une finition viennoise.',
        images: [cappuccinoViennois],
      },
      { id: 'moka', name: 'Moka', category: 'Boissons Chaudes', price: '20 DH', description: 'Moka doux aux notes chocolatées.', images: [generatedMoka] },
      { id: 'caputshino-italian', name: 'Caputshino Italian', category: 'Boissons Chaudes', price: '20 DH', description: 'Capuccino italien crémeux et raffiné.', images: [generatedCaputshinoItalianAi] },
      {
        id: 'cafe-latte',
        name: 'Café Latte',
        category: 'Boissons Chaudes',
        price: '20 DH',
        description: 'Café latte onctueux et équilibré.',
        images: [cafeLatte],
      },
    ],
  },
  {
    category: 'Boissons Froides',
    eyebrow: 'Iced Lounge',
    description: 'Boissons froides gourmandes et rafraîchissantes servies dans un esprit café premium.',
    items: [
      {
        id: 'spanish-ice-latte',
        name: 'Spanish Ice Latte',
        category: 'Boissons Froides',
        price: '30 DH',
        description: 'Spanish latte glacé riche et crémeux.',
        images: [generatedSpanishIceLatteAi],
      },
      {
        id: 'ice-latte',
        name: 'Ice Latte',
        category: 'Boissons Froides',
        price: '20 DH',
        description: 'Ice latte frais et léger.',
        images: [generatedIceLatteAi],
      },
      {
        id: 'ice-latte-aromatise',
        name: 'Ice Latte Aromatisé',
        category: 'Boissons Froides',
        price: '25 DH',
        description: 'Ice latte aromatisé gourmand aux saveurs au choix.',
        images: [generatedIceLatteAromatiseAi],
        details: ['Options: Chocolat / Caramelle / Noisette / Vanie'],
      },
      {
        id: 'ice-mooka',
        name: 'Ice Mooka',
        category: 'Boissons Froides',
        price: '25 DH',
        description: 'Boisson glacée moka riche et chocolatée.',
        images: [generatedIceMookaAi],
      },
      {
        id: 'milk-shake',
        name: 'Milk Shake',
        category: 'Boissons Froides',
        price: '30 DH',
        description: 'Milk shake gourmand et crémeux au choix.',
        images: [generatedMilkshakeAi],
        details: ['Options: Fraise / Caramel / Vanille / Chocolat / Oreo'],
      },
      {
        id: 'frappuccino',
        name: 'Frappuccino',
        category: 'Boissons Froides',
        price: '35 DH',
        description: 'Frappuccino glacé onctueux et rafraîchissant.',
        images: [generatedFrappuccinoAi],
        details: ['Options: Caramel / Vanille / Fraise / Chocolat'],
      },
      {
        id: 'ice-tea',
        name: 'Ice Tea',
        category: 'Boissons Froides',
        price: '30 DH',
        description: 'Ice tea frais aux saveurs fruitées et rafraîchissantes.',
        images: [generatedIceTeaAi],
        details: ['Options: Citron / Fruits Rouges'],
      },
      {
        id: 'smoothie',
        name: 'Smoothie',
        category: 'Boissons Froides',
        price: '30 DH',
        description: 'Smoothie naturel vitaminé aux fruits frais.',
        images: [generatedSmoothieAi],
        details: ['Options: Fraise / Banane / Orange / Au choix'],
      },
    ],
  },
  {
    category: 'Cocktails Signature',
    eyebrow: 'Signature Drinks',
    description: 'Cocktails sans alcool et créations fruitées servies dans une ambiance premium.',
    items: [
      {
        id: 'red-paradise',
        name: 'Red Paradise',
        category: 'Cocktails Signature',
        price: '35 DH',
        description: 'Cocktail rouge fruité, élégant et rafraîchissant.',
        images: [redParadise],
      },
      {
        id: 'mojito-virgin',
        name: 'Mojito Virgin',
        category: 'Cocktails Signature',
        price: '35 DH',
        description: 'Mocktail frais et tropical aux saveurs au choix.',
        images: [generatedMojitoVirginAi],
        details: ['Options: Fraise / Framboise / Bleu Curaçao / Noix de Coco'],
      },
      {
        id: 'bora-bora',
        name: 'Bora Bora',
        category: 'Cocktails Signature',
        price: '35 DH',
        description: 'Cocktail tropical généreux et premium.',
        images: [boraBora],
      },
      {
        id: 'pinna-collada',
        name: 'Pinna Collada',
        category: 'Cocktails Signature',
        price: '40 DH',
        description: 'Cocktail tropical crémeux à base d’ananas et noix de coco.',
        images: [generatedPinnaColladaAi],
      },
      {
        id: 'coco-dream',
        name: 'Coco Dream',
        category: 'Cocktails Signature',
        price: '40 DH',
        description: 'Cocktail exotique crémeux à la noix de coco.',
        images: [generatedCocoDreamAi],
      },
      {
        id: 'prestige-cocktail',
        name: 'Prestige Cocktail',
        category: 'Cocktails Signature',
        price: '45 DH',
        description: 'Création maison Prestige de Jeux, raffinée et fruitée.',
        images: [generatedPrestigeCocktail],
      },
    ],
  },
];

const allItems = menuSections.flatMap((section) => section.items);

function ImageCarousel({ images, title, category }: { images?: string[]; title: string; category: Category }) {
  const slides = images?.length ? images : [snookerTable];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const hasMultipleSlides = slides.length > 1;
  const Icon = categoryIcons[category];

  useEffect(() => {
    setActiveIndex(0);
  }, [title, slides.length]);

  useEffect(() => {
    if (!hasMultipleSlides || isPaused) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 3000);

    return () => window.clearInterval(timer);
  }, [hasMultipleSlides, isPaused, slides.length]);

  const showPrevious = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const showNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  const handleTouchEnd = (position: number) => {
    if (touchStart === null) {
      return;
    }

    const distance = touchStart - position;
    if (Math.abs(distance) > 42) {
      if (distance > 0) {
        showNext();
      } else {
        showPrevious();
      }
    }
    setTouchStart(null);
  };

  return (
    <div
      className="menu-carousel"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={(event) => setTouchStart(event.touches[0].clientX)}
      onTouchEnd={(event) => handleTouchEnd(event.changedTouches[0].clientX)}
    >
      {slides.map((image, index) => (
        <img
          key={`${title}-${image}`}
          src={image}
          alt={`${title} ${index + 1}`}
          loading="lazy"
          className={`menu-carousel__image${activeIndex === index ? ' is-active' : ''}`}
        />
      ))}
      {!images?.length ? (
        <div className="menu-carousel__fallback" aria-hidden="true">
          <Icon />
        </div>
      ) : null}
      <div className="menu-carousel__shade" />

      {hasMultipleSlides ? (
        <>
          <button className="menu-carousel__arrow menu-carousel__arrow--prev" type="button" onClick={showPrevious} aria-label="Image précédente">
            <ChevronLeft aria-hidden="true" />
          </button>
          <button className="menu-carousel__arrow menu-carousel__arrow--next" type="button" onClick={showNext} aria-label="Image suivante">
            <ChevronRight aria-hidden="true" />
          </button>
          <div className="menu-carousel__dots" aria-label={`Navigation des images ${title}`}>
            {slides.map((image, index) => (
              <button
                key={`${image}-dot`}
                type="button"
                className={activeIndex === index ? 'is-active' : ''}
                onClick={() => setActiveIndex(index)}
                aria-label={`Afficher l’image ${index + 1}`}
              />
            ))}
          </div>
        </>
      ) : null}
    </div>
  );
}

const MenuCard: FC<{ item: MenuItem; index: number; onOpen: () => void }> = ({ item, index, onOpen }) => {
  const Icon = categoryIcons[item.category];

  return (
    <motion.article
      className="menu-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, delay: Math.min(index * 0.025, 0.22) }}
    >
      <ImageCarousel images={item.images} title={item.name} category={item.category} />
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
        {item.details?.length ? (
          <ul className="menu-card__details" aria-label={`Options ${item.name}`}>
            {item.details.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
        ) : null}
        <button type="button" onClick={onOpen}>
          Voir les détails
        </button>
      </div>
    </motion.article>
  );
};

function MenuModal({ item, onClose }: { item: MenuItem; onClose: () => void }) {
  const Icon = categoryIcons[item.category];

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
        <ImageCarousel images={item.images} title={item.name} category={item.category} />
        <div className="menu-modal__content">
          <span className="menu-modal__category">
            <Icon aria-hidden="true" />
            {item.category}
          </span>
          <h2 id="menu-modal-title">{item.name}</h2>
          <strong>{item.price}</strong>
          <p>{item.description}</p>
          {item.details?.length ? (
            <ul className="menu-modal__details" aria-label={`Options ${item.name}`}>
              {item.details.map((detail) => (
                <li key={detail}>{detail}</li>
              ))}
            </ul>
          ) : null}
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
              const Icon = categoryIcons[section.category];

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
                    {section.items.map((item, index) => (
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

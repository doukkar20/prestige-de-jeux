import { useEffect, useMemo, useState } from 'react';
import type { FC } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import {
  ChevronLeft,
  ChevronRight,
  Coffee,
  Croissant,
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
import fransais from '../assets/images/pic food/fransais.jpg';
import croqueMonsieur from '../assets/images/pic food/croque-monsieur.jpg';
import croqueMonsieur1 from '../assets/images/pic food/croque-monsieur1.jpg';
import hollandaise from '../assets/images/pic food/hollandaise.jpg';
import crepeNutella from '../assets/images/pic food/creppnutella.jpg';
import crepeNutellaBanane from '../assets/images/pic food/crepnutellabanane.jpg';
import drinkSignature1 from '../assets/images/pic food/optimized/_DSF9387.optimized.jpg';
import milkshakeSignature from '../assets/images/pic food/optimized/_DSF9393.optimized.jpg';
import drinkSignature3 from '../assets/images/pic food/optimized/_DSF9395.optimized.jpg';
import drinkSignature4 from '../assets/images/pic food/optimized/_DSF9397 1.optimized.jpg';
import smoothieSignature from '../assets/images/pic food/optimized/_DSF9428.optimized.jpg';
import hotDrinkSignature from '../assets/images/pic food/optimized/_DSF9440 1.optimized.jpg';
import crepeBananeChocolat from '../assets/images/pic food/optimized/crepe-banane-chocolat.optimized.jpg';
import crepeNutellaClassique from '../assets/images/pic food/optimized/crepe-nutella-classique.optimized.jpg';
import crepeSaleePouletChampignons from '../assets/images/pic food/optimized/crepe-salee-poulet-champignons.optimized.jpg';
import croqueMadame from '../assets/images/pic food/optimized/croque-madame.optimized.jpg';
import fassiPremium from '../assets/images/pic food/optimized/petit-dejeuner-fassi-premium.optimized.jpg';
import './Menu.css';

type Category =
  | 'Petit-Déjeuner'
  | 'Brunch'
  | 'Crêpes Sucrées'
  | 'Crêpes Salées'
  | 'Jus'
  | 'Cocktails'
  | 'Milkshakes'
  | 'Smoothies'
  | 'Boissons Chaudes';

type MenuProduct = {
  id: number;
  name: string;
  category: Category;
  price: string;
  description: string;
  images?: string[];
};

type DrinkCategory = {
  id: string;
  title: string;
  category: Category;
  description: string;
  images?: string[];
  items: Array<Pick<MenuProduct, 'name' | 'price'>>;
};

const filterOptions = [
  'Tout',
  'Petit-Déjeuner',
  'Brunch',
  'Crêpes Sucrées',
  'Crêpes Salées',
  'Jus',
  'Cocktails',
  'Milkshakes',
  'Smoothies',
  'Boissons Chaudes',
] as const;

type FilterOption = (typeof filterOptions)[number];

const categoryIcons: Record<Category, typeof Coffee> = {
  'Petit-Déjeuner': EggFried,
  Brunch: Croissant,
  'Crêpes Sucrées': Sparkles,
  'Crêpes Salées': Utensils,
  Jus: GlassWater,
  Cocktails: Martini,
  Milkshakes: CupSoda,
  Smoothies: Sparkles,
  'Boissons Chaudes': Coffee,
};

const menuProducts: MenuProduct[] = [
  {
    id: 1,
    name: 'Petit-Déjeuner Chamali',
    category: 'Petit-Déjeuner',
    price: '30 DH',
    description: "Œufs au choix, charcuterie, fromage rouge, jben, huile d'olive, olives noires, pain.",
    images: [chamalli],
  },
  {
    id: 2,
    name: 'Petit-Déjeuner Fassi',
    category: 'Petit-Déjeuner',
    price: '35 DH',
    description: "Tagine de khlii, œufs, jben, huile d'olive, olives noires, pain.",
    images: [fassi, fassi1, fassi2, fassiPremium],
  },
  {
    id: 3,
    name: 'Croque Monsieur',
    category: 'Petit-Déjeuner',
    price: '40 DH',
    description: 'Toast grillé, œufs, cheddar, charcuterie, salade fraîche.',
    images: [croqueMonsieur, croqueMonsieur1],
  },
  {
    id: 47,
    name: 'Croque Madame',
    category: 'Petit-Déjeuner',
    price: '45 DH',
    description: 'Toast grillé, œuf, cheddar, charcuterie, salade fraîche.',
    images: [croqueMadame],
  },
  {
    id: 4,
    name: 'Petit-Déjeuner Français',
    category: 'Petit-Déjeuner',
    price: '35 DH',
    description: 'Corbeille de viennoiseries, toast grillé, beurre, confiture.',
    images: [fransais],
  },
  {
    id: 5,
    name: 'Petit-Déjeuner Prestige Avocat',
    category: 'Petit-Déjeuner',
    price: '55 DH',
    description:
      'Toast à l’avocat, fromage frais, œufs, salade, fruits frais, yaourt granola, graines de chia, jus d’orange.',
    images: [hollandaise],
  },
  {
    id: 6,
    name: 'Omelette Nature ou Fromage',
    category: 'Petit-Déjeuner',
    price: '35 DH',
    description: 'Omelette chaude et généreuse, préparée nature ou avec fromage fondant.',
  },
  {
    id: 7,
    name: 'Œufs au Plat',
    category: 'Petit-Déjeuner',
    price: '30 DH',
    description: 'Œufs servis minute, simples, savoureux et parfaits pour commencer la journée.',
  },
  {
    id: 8,
    name: 'Brunch Prestige',
    category: 'Brunch',
    price: '120 DH',
    description:
      'Œufs, merguez, steak de poulet, charcuterie, fromage, champignons sautés, pommes de terre, sauce maison, pancake Nutella, mini gâteaux, fruits frais, yaourt granola, graines de chia, jus d’orange, thé à la menthe.',
  },
  {
    id: 9,
    name: 'Crêpe Salée Poulet & Champignons',
    category: 'Crêpes Salées',
    price: '55 DH',
    description: 'Poulet, sauce champignons, charcuterie, fromage.',
    images: [crepeSaleePouletChampignons],
  },
  {
    id: 10,
    name: 'Crêpe Fromage & Charcuterie',
    category: 'Crêpes Salées',
    price: '45 DH',
    description: 'Crêpe salée fondante au fromage et charcuterie, servie chaude.',
  },
  {
    id: 11,
    name: 'Crêpe Nutella Classique',
    category: 'Crêpes Sucrées',
    price: '35 DH',
    description: 'Crêpe moelleuse garnie de Nutella, simple et irrésistible.',
    images: [crepeNutellaClassique],
  },
  {
    id: 48,
    name: 'Crêpe Banane Chocolat',
    category: 'Crêpes Sucrées',
    price: '45 DH',
    description: 'Crêpe gourmande à la banane et au chocolat fondant.',
    images: [crepeBananeChocolat],
  },
  {
    id: 12,
    name: 'Crêpe Nutella Prestige',
    category: 'Crêpes Sucrées',
    price: '55 DH',
    description: 'Nutella, banane, fraises, fruits frais, fruits secs.',
    images: [crepeNutella],
  },
  {
    id: 13,
    name: 'Crêpe Nutella Deluxe',
    category: 'Crêpes Sucrées',
    price: '65 DH',
    description:
      'Nutella, banane enrobée de chocolat, fraises enrobées de chocolat, fruits frais, fruits secs.',
    images: [crepeNutellaBanane],
  },
  {
    id: 14,
    name: 'Crêpe Miel & Amandes',
    category: 'Crêpes Sucrées',
    price: '40 DH',
    description: 'Crêpe dorée au miel et aux amandes croquantes.',
  },
  {
    id: 15,
    name: 'Crêpe Caramel Beurre Salé',
    category: 'Crêpes Sucrées',
    price: '40 DH',
    description: 'Crêpe nappée de caramel beurre salé, gourmande et élégante.',
  },
  {
    id: 16,
    name: 'Crêpe Fruits Rouges',
    category: 'Crêpes Sucrées',
    price: '45 DH',
    description: 'Crêpe fruitée avec une note acidulée de fruits rouges.',
  },
];

const drinkCategories: DrinkCategory[] = [
  {
    id: 'jus-frais',
    title: 'Jus Frais',
    category: 'Jus',
    description: 'Jus frais servis minute, sans images cocktails pour garder la carte claire.',
    items: [
      { name: 'Jus d’Orange Pressé', price: '20 DH' },
      { name: 'Jus d’Avocat', price: '30 DH' },
      { name: 'Jus Mangue', price: '30 DH' },
      { name: 'Jus Fraise', price: '30 DH' },
      { name: 'Jus Banane', price: '30 DH' },
      { name: 'Jus Kiwi', price: '30 DH' },
      { name: 'Jus Ananas', price: '30 DH' },
      { name: 'Jus Mix Fruits', price: '35 DH' },
    ],
  },
  {
    id: 'cocktails-signature',
    title: 'Cocktails Signature',
    category: 'Cocktails',
    description: 'Cocktails signature Prestige, visuels exclusifs à cette catégorie.',
    images: [drinkSignature1, drinkSignature3, drinkSignature4],
    items: [
      { name: 'Tropical Sunset', price: '40 DH' },
      { name: 'Red Paradise', price: '40 DH' },
      { name: 'Green Fresh', price: '40 DH' },
      { name: 'Coco Dream', price: '40 DH' },
    ],
  },
  {
    id: 'milkshakes',
    title: 'Milkshakes',
    category: 'Milkshakes',
    description: 'Milkshakes crémeux et généreux, regroupés dans une seule carte.',
    images: [milkshakeSignature],
    items: [
      { name: 'Milkshake Vanille', price: '35 DH' },
      { name: 'Milkshake Chocolat', price: '35 DH' },
      { name: 'Milkshake Fraise', price: '35 DH' },
      { name: 'Milkshake Oreo', price: '40 DH' },
      { name: 'Milkshake Caramel', price: '35 DH' },
    ],
  },
  {
    id: 'smoothies',
    title: 'Smoothies',
    category: 'Smoothies',
    description: 'Smoothies frais, fruités et équilibrés.',
    images: [smoothieSignature],
    items: [
      { name: 'Smoothie Rouge', price: '40 DH' },
      { name: 'Smoothie Tropical', price: '40 DH' },
      { name: 'Smoothie Green Detox', price: '40 DH' },
      { name: 'Smoothie Banana Energy', price: '40 DH' },
    ],
  },
  {
    id: 'boissons-chaudes',
    title: 'Boissons Chaudes',
    category: 'Boissons Chaudes',
    description: 'Cafés, chocolats chauds, thés et infusions pour une pause lounge.',
    images: [hotDrinkSignature],
    items: [
      { name: 'Espresso', price: '15 DH' },
      { name: 'Double Espresso', price: '20 DH' },
      { name: 'Café Crème', price: '20 DH' },
      { name: 'Cappuccino', price: '25 DH' },
      { name: 'Latte Macchiato', price: '25 DH' },
      { name: 'Chocolat Chaud', price: '25 DH' },
      { name: 'Thé à la Menthe', price: '20 DH' },
      { name: 'Thé Noir', price: '20 DH' },
      { name: 'Infusion', price: '20 DH' },
    ],
  },
];

function ImageCarousel({ images, title, category }: { images?: string[]; title: string; category: Category }) {
  const slides = images?.length ? images : [snookerTable];
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const hasMultipleSlides = slides.length > 1;
  const Icon = categoryIcons[category];

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

const MenuCard: FC<{ product: MenuProduct; index: number; onOpen: () => void }> = ({
  product,
  index,
  onOpen,
}) => {
  const Icon = categoryIcons[product.category];

  return (
    <motion.article
      className="menu-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, delay: Math.min(index * 0.035, 0.28) }}
    >
      <ImageCarousel images={product.images} title={product.name} category={product.category} />
      <div className="menu-card__body">
        <div className="menu-card__meta">
          <span>
            <Icon aria-hidden="true" />
            {product.category}
          </span>
          <strong>{product.price}</strong>
        </div>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <button type="button" onClick={onOpen}>
          Voir les détails
        </button>
      </div>
    </motion.article>
  );
};

const DrinkCategoryCard: FC<{ drink: DrinkCategory; index: number }> = ({ drink, index }) => {
  const Icon = categoryIcons[drink.category];

  return (
    <motion.article
      className="menu-card drink-category-card"
      initial={{ opacity: 0, y: 34 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.52, delay: Math.min(index * 0.035, 0.28) }}
    >
      <ImageCarousel images={drink.images} title={drink.title} category={drink.category} />
      <div className="menu-card__body">
        <div className="menu-card__meta">
          <span>
            <Icon aria-hidden="true" />
            {drink.title}
          </span>
          <strong>{drink.items.length}</strong>
        </div>
        <h2>{drink.title}</h2>
        <p>{drink.description}</p>
        <ul className="drink-category-card__items" aria-label={drink.title}>
          {drink.items.map((item) => (
            <li key={item.name}>
              <span>{item.name}</span>
              <strong>{item.price}</strong>
            </li>
          ))}
        </ul>
      </div>
    </motion.article>
  );
};

function MenuModal({ product, onClose }: { product: MenuProduct; onClose: () => void }) {
  const Icon = categoryIcons[product.category];

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
        <ImageCarousel images={product.images} title={product.name} category={product.category} />
        <div className="menu-modal__content">
          <span className="menu-modal__category">
            <Icon aria-hidden="true" />
            {product.category}
          </span>
          <h2 id="menu-modal-title">{product.name}</h2>
          <strong>{product.price}</strong>
          <p>{product.description}</p>
        </div>
      </motion.dialog>
    </motion.div>
  );
}

export default function Menu() {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('Tout');
  const [selectedProduct, setSelectedProduct] = useState<MenuProduct | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeFilter === 'Tout') {
      return menuProducts;
    }

    return menuProducts.filter((product) => product.category === activeFilter);
  }, [activeFilter]);

  const filteredDrinkCategories = useMemo(() => {
    if (activeFilter === 'Tout') {
      return drinkCategories;
    }

    return drinkCategories.filter((drink) => drink.category === activeFilter);
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
              Prestige Jeux Lounge
              <span />
            </span>
            <h1 id="menu-title">Notre Menu</h1>
            <p>Petit-déjeuner, Brunch, Crêpes, Jus, Cocktails & Boissons</p>
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

          <div className="menu-grid" aria-live="polite">
            {filteredProducts.map((product, index) => (
              <MenuCard
                key={product.id}
                product={product}
                index={index}
                onOpen={() => setSelectedProduct(product)}
              />
            ))}
            {filteredDrinkCategories.map((drink, index) => (
              <DrinkCategoryCard
                key={drink.id}
                drink={drink}
                index={filteredProducts.length + index}
              />
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selectedProduct ? (
          <MenuModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
        ) : null}
      </AnimatePresence>
    </main>
  );
}

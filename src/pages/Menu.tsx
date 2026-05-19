import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import React, { useState, useEffect, useRef } from 'react';
import {
  Coffee,
  Wine,
  CakeSlice,
  Salad,
  GlassWater,
  CupSoda,
  Leaf,
  Flame,
  X,
  ChevronDown,
} from 'lucide-react';

interface MenuItem {
  name: string;
  price: string;
}

interface MenuCategory {
  id: string;
  title: { fr: string; ar: string };
  description: { fr: string; ar: string };
  icon: React.ComponentType<{ className?: string }>;
  image: string;
  preview: MenuItem[];
  fullMenu: MenuItem[];
}

const menuCategories: MenuCategory[] = [
  {
    id: 'petit-dejeuner',
    title: { fr: 'Petits Déjeuners', ar: 'فطور الصباح' },
    description: {
      fr: 'Commencez votre journée avec nos formules raffinées.',
      ar: 'ابدأ يومك بتشكيلاتنا الراقية.',
    },
    icon: Coffee,
    image: 'images/menu/petit-dejeuner.jpg',
    preview: [
      { name: 'Petit-Déjeuner Chamali', price: '30 DH' },
      { name: 'Petit-Déjeuner Prestige Avocat', price: '55 DH' },
      { name: 'Petit-Déjeuner Français', price: '35 DH' },
    ],
    fullMenu: [
      { name: 'Petit-Déjeuner Chamali', price: '30 DH' },
      { name: 'Petit-Déjeuner Fassi', price: '35 DH' },
      { name: 'Petit-Déjeuner Croc Monsieur', price: '40 DH' },
      { name: 'Petit-Déjeuner Français', price: '35 DH' },
      { name: 'Petit-Déjeuner Prestige Avocat', price: '55 DH' },
      { name: 'Omelette Nature ou Fromage', price: '35 DH' },
      { name: 'Œufs au Plat', price: '30 DH' },
    ],
  },
  {
    id: 'brunch',
    title: { fr: 'Brunch Signature', ar: 'برانش مميز' },
    description: {
      fr: 'Une expérience brunch exclusive, signée Prestige.',
      ar: 'تجربة برانش حصرية بتوقيع بريستيج.',
    },
    icon: Salad,
    image: 'images/menu/brunch.jpg',
    preview: [{ name: 'Brunch Prestige', price: '120 DH' }],
    fullMenu: [{ name: 'Brunch Prestige', price: '120 DH' }],
  },
  {
    id: 'crepe-salee',
    title: { fr: 'Crêpes Salées', ar: 'كريب مالح' },
    description: {
      fr: 'Des crêpes généreuses aux saveurs salées irrésistibles.',
      ar: 'كريب سخي بنكهات مالحة لا تقاوم.',
    },
    icon: CakeSlice,
    image: 'images/menu/crepe-salee.jpg',
    preview: [
      { name: 'Crêpe Poulet & Champignons', price: '55 DH' },
      { name: 'Crêpe Fromage & Charcuterie', price: '45 DH' },
    ],
    fullMenu: [
      { name: 'Crêpe Salée Poulet & Champignons', price: '55 DH' },
      { name: 'Crêpe Fromage & Charcuterie', price: '45 DH' },
    ],
  },
  {
    id: 'crepe-sucree',
    title: { fr: 'Crêpes Sucrées', ar: 'كريب حلو' },
    description: {
      fr: 'La douceur artisanale pour les amateurs de sucré.',
      ar: 'حلاوة حرفية لعشاق الحلويات.',
    },
    icon: CakeSlice,
    image: 'images/menu/crepe-sucree.jpg',
    preview: [
      { name: 'Crêpe Nutella Classique', price: '35 DH' },
      { name: 'Crêpe Nutella Prestige', price: '55 DH' },
      { name: 'Crêpe Caramel Beurre Salé', price: '40 DH' },
    ],
    fullMenu: [
      { name: 'Crêpe Nutella Classique', price: '35 DH' },
      { name: 'Crêpe Nutella Prestige', price: '55 DH' },
      { name: 'Crêpe Nutella Deluxe', price: '65 DH' },
      { name: 'Crêpe Miel & Amandes', price: '40 DH' },
      { name: 'Crêpe Caramel Beurre Salé', price: '40 DH' },
      { name: 'Crêpe Fruits Rouges', price: '45 DH' },
    ],
  },
  {
    id: 'jus',
    title: { fr: 'Jus Frais', ar: 'عصائر طازجة' },
    description: {
      fr: 'Des jus pressés à la minute, 100% naturels.',
      ar: 'عصائر طازجة معصورة في الحال، طبيعية 100%.',
    },
    icon: GlassWater,
    image: 'images/menu/jus.jpg',
    preview: [
      { name: "Jus d'Orange Pressé", price: '20 DH' },
      { name: "Jus d'Avocat", price: '30 DH' },
      { name: 'Jus Mix Fruits', price: '35 DH' },
    ],
    fullMenu: [
      { name: "Jus d'Orange Pressé", price: '20 DH' },
      { name: "Jus d'Avocat", price: '30 DH' },
      { name: 'Jus Mangue', price: '30 DH' },
      { name: 'Jus Fraise', price: '30 DH' },
      { name: 'Jus Banane', price: '30 DH' },
      { name: 'Jus Kiwi', price: '30 DH' },
      { name: 'Jus Ananas', price: '30 DH' },
      { name: 'Jus Mix Fruits', price: '35 DH' },
    ],
  },
  {
    id: 'cocktail',
    title: { fr: 'Cocktails Signature', ar: 'كوكتيلات مميزة' },
    description: {
      fr: 'Des créations uniques aux couleurs vibrantes.',
      ar: 'إبداعات فريدة بألوان نابضة بالحياة.',
    },
    icon: Wine,
    image: 'images/menu/cocktail.jpg',
    preview: [
      { name: 'Tropical Sunset', price: '40 DH' },
      { name: 'Red Paradise', price: '40 DH' },
      { name: 'Green Fresh', price: '40 DH' },
    ],
    fullMenu: [
      { name: 'Tropical Sunset', price: '40 DH' },
      { name: 'Red Paradise', price: '40 DH' },
      { name: 'Green Fresh', price: '40 DH' },
      { name: 'Coco Dream', price: '40 DH' },
    ],
  },
  {
    id: 'milkshake',
    title: { fr: 'Milkshakes', ar: 'ميلك شيك' },
    description: {
      fr: 'Onctueux, crémeux et absolument décadents.',
      ar: 'كريمي وغني ولا يقاوم.',
    },
    icon: CupSoda,
    image: 'images/menu/milkshake.jpg',
    preview: [
      { name: 'Vanille', price: '35 DH' },
      { name: 'Chocolat', price: '35 DH' },
      { name: 'Oreo', price: '40 DH' },
    ],
    fullMenu: [
      { name: 'Vanille', price: '35 DH' },
      { name: 'Chocolat', price: '35 DH' },
      { name: 'Fraise', price: '35 DH' },
      { name: 'Oreo', price: '40 DH' },
      { name: 'Caramel', price: '35 DH' },
    ],
  },
  {
    id: 'smoothie',
    title: { fr: 'Smoothies', ar: 'سموذي' },
    description: {
      fr: 'Des mélanges vitaminés pour une énergie naturelle.',
      ar: 'مزيج غني بالفيتامينات لطاقة طبيعية.',
    },
    icon: Leaf,
    image: 'images/menu/smoothie.jpg',
    preview: [
      { name: 'Smoothie Rouge', price: '40 DH' },
      { name: 'Smoothie Tropical', price: '40 DH' },
      { name: 'Smoothie Green Detox', price: '40 DH' },
    ],
    fullMenu: [
      { name: 'Smoothie Rouge', price: '40 DH' },
      { name: 'Smoothie Tropical', price: '40 DH' },
      { name: 'Smoothie Green Detox', price: '40 DH' },
      { name: 'Smoothie Banana Energy', price: '40 DH' },
    ],
  },
  {
    id: 'boisson-chaude',
    title: { fr: 'Boissons Chaudes', ar: 'مشروبات ساخنة' },
    description: {
      fr: 'Le réconfort dans une tasse, préparé avec soin.',
      ar: 'دفء في فنجان، محضر بعناية.',
    },
    icon: Flame,
    image: 'images/menu/boisson-chaude.jpg',
    preview: [
      { name: 'Espresso', price: '15 DH' },
      { name: 'Cappuccino', price: '25 DH' },
      { name: 'Thé à la Menthe', price: '20 DH' },
    ],
    fullMenu: [
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

function MenuCard({
  category,
  index,
  onOpenModal,
}: {
  key?: React.Key;
  category: MenuCategory;
  index: number;
  onOpenModal: (category: MenuCategory) => void;
}) {
  const { isRTL } = useLanguage();
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      whileHover={{ scale: 1.03, y: -6 }}
      className="group relative rounded-[20px] overflow-hidden border border-[#d4af37]/30 hover:border-[#d4af37]/70 transition-all duration-500"
      style={{
        background: 'rgba(15, 15, 15, 0.6)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 0 0 1px rgba(212, 175, 55, 0.05)',
      }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-[20px]"
        style={{
          boxShadow: '0 0 40px rgba(212, 175, 55, 0.15), inset 0 0 40px rgba(212, 175, 55, 0.03)',
        }}
      />

      <div className="relative h-48 overflow-hidden">
        <img
          src={category.image}
          alt={isRTL ? category.title.ar : category.title.fr}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/40 to-transparent" />
        <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-[#0b0b0b]/60 backdrop-blur-sm border border-[#d4af37]/30 flex items-center justify-center">
          <Icon className="w-5 h-5 text-[#d4af37]" />
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-[#d4af37] font-display mb-2">
          {isRTL ? category.title.ar : category.title.fr}
        </h3>
        <p className="text-white/60 text-sm mb-5 leading-relaxed">
          {isRTL ? category.description.ar : category.description.fr}
        </p>

        <div className="space-y-2 mb-6">
          {category.preview.map((item) => (
            <div key={item.name} className="flex justify-between items-center text-sm">
              <span className="text-white/80">{item.name}</span>
              <span className="text-[#d4af37] font-semibold">{item.price}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => onOpenModal(category)}
          className="w-full py-3 rounded-xl border border-[#d4af37]/40 text-[#d4af37] font-semibold text-sm tracking-wide hover:bg-[#d4af37] hover:text-[#0b0b0b] transition-all duration-300 relative overflow-hidden group/btn"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isRTL ? 'عرض القائمة' : 'Voir le Menu'}
            <ChevronDown className="w-4 h-4 transition-transform group-hover/btn:translate-y-0.5" />
          </span>
          <div
            className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"
            style={{
              boxShadow: '0 0 25px rgba(212, 175, 55, 0.3)',
            }}
          />
        </button>
      </div>
    </motion.div>
  );
}

function MenuModal(props: {
  category: MenuCategory;
  onClose: () => void;
}) {
  const { category, onClose } = props;
  const { isRTL } = useLanguage();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.85)', backdropFilter: 'blur(8px)' }}
      onClick={handleBackdropClick}
    >
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-[20px] border border-[#d4af37]/30"
        style={{
          background: 'linear-gradient(145deg, rgba(15, 15, 15, 0.95), rgba(11, 11, 11, 0.98))',
          backdropFilter: 'blur(30px)',
          boxShadow: '0 0 60px rgba(212, 175, 55, 0.1), 0 25px 50px rgba(0, 0, 0, 0.5)',
        }}
      >
        <div className="relative h-40 overflow-hidden rounded-t-[20px]">
          <img
            src={category.image}
            alt={isRTL ? category.title.ar : category.title.fr}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0b] via-[#0b0b0b]/60 to-transparent" />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0b0b0b]/60 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-[#d4af37] hover:border-[#d4af37] hover:text-[#0b0b0b] text-white transition-all duration-300"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 pt-4">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#d4af37]" />
            </div>
            <h2 className="text-2xl font-bold text-[#d4af37] font-display">
              {isRTL ? category.title.ar : category.title.fr}
            </h2>
          </div>

          <div className="space-y-0">
            {category.fullMenu.map((item, i) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex justify-between items-center py-3.5 border-b border-white/5 last:border-b-0 group/item hover:border-[#d4af37]/20 transition-colors"
              >
                <span className="text-white/90 group-hover/item:text-white transition-colors text-[15px]">
                  {item.name}
                </span>
                <span className="text-[#d4af37] font-bold text-sm whitespace-nowrap ml-4">
                  {item.price}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Menu() {
  const { isRTL } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<MenuCategory | null>(null);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero Background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1615117950532-95934fef9f64?auto=format&fit=crop&w=2000&q=80")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(180deg, rgba(11,11,11,0.92) 0%, rgba(15,77,47,0.15) 40%, rgba(11,11,11,0.95) 100%)',
          }}
        />
        <div className="absolute inset-0 bg-[#0b0b0b]/70" />
      </div>

      {/* Ambient Glow Effects */}
      <div className="absolute top-20 left-1/4 w-[600px] h-[600px] bg-[#0f4d2f]/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-1/4 w-[500px] h-[500px] bg-[#d4af37]/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="relative z-10 pt-36 pb-24 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-20"
        >
          <motion.span
            initial={{ opacity: 0, letterSpacing: '0.1em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-[#d4af37] uppercase text-xs mb-4 block font-sans tracking-[0.4em]"
          >
            {isRTL ? 'بريستيج دو جو' : 'Prestige de Jeux'}
          </motion.span>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-none mb-6">
            <span className="gold-text">{isRTL ? 'قائمتنا' : 'Notre Menu'}</span>
          </h1>

          <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d4af37] to-transparent mx-auto mb-6" />

          <p className="text-white/50 text-lg sm:text-xl max-w-2xl mx-auto italic">
            {isRTL
              ? 'فطور، برانش، كريب، مشروبات وكوكتيلات'
              : 'Petit-déjeuner, Brunch, Crêpes, Boissons & Cocktails'}
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {menuCategories.map((category, index) => (
            <MenuCard
              key={category.id}
              category={category}
              index={index}
              onOpenModal={setActiveCategory}
            />
          ))}
        </div>

        {/* Bottom Note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-[#d4af37]/20 bg-[#0b0b0b]/40 backdrop-blur-sm">
            <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse-gold" />
            <p className="text-white/50 text-sm">
              {isRTL
                ? 'الأسعار بالدرهم المغربي. الخدمة متضمنة.'
                : 'Prix en Dirhams marocains. Service inclus.'}
            </p>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {activeCategory && (
          <MenuModal
            category={activeCategory}
            onClose={() => setActiveCategory(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

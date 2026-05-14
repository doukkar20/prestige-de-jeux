import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { X, Maximize2 } from 'lucide-react';
import { galleryImageList, imageAlt, type GalleryImage } from '../data/galleryImages';

const categories = ['all', 'billard', 'snooker', 'lounge', 'events'] as const;

export default function Gallery() {
  const { t, lang, isRTL } = useLanguage();
  const [filter, setFilter] = useState<(typeof categories)[number]>('all');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const filteredItems = filter === 'all' ? galleryImageList : galleryImageList.filter((item) => item.category === filter);

  return (
    <div className="pt-40 pb-20 bg-black min-h-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-20"
        >
          <span className="text-gold tracking-[0.4em] uppercase text-xs mb-4 block font-sans">{isRTL ? 'اكتشاف بصري' : 'Visual Discovery'}</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold gold-text mb-12">{t('gallery.title')}</h1>

          <div className="flex flex-wrap justify-center gap-3 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-5 md:px-6 py-2 text-[10px] tracking-widest uppercase border transition-all duration-500 ${
                  filter === cat ? 'bg-gold text-black border-gold' : 'border-gold/20 text-gold/60 hover:border-gold/50'
                }`}
              >
                {{
                  all: isRTL ? 'الكل' : 'all',
                  billard: isRTL ? 'بلياردو' : 'billard',
                  snooker: isRTL ? 'سنوكر' : 'snooker',
                  lounge: isRTL ? 'لاونج' : 'lounge',
                  events: isRTL ? 'مناسبات' : 'events',
                }[cat]}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div layout className="columns-1 md:columns-2 xl:columns-3 gap-6 [column-fill:_balance]">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.button
                type="button"
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.45 }}
                className="group relative mb-6 block w-full break-inside-avoid overflow-hidden rounded-2xl border border-gold/25 bg-black text-left shadow-[0_0_28px_rgba(212,175,55,0.08)]"
                onClick={() => setSelectedImage(item)}
              >
                <img
                  src={item.src}
                  width={item.width}
                  height={item.height}
                  loading="lazy"
                  alt={imageAlt(item, lang)}
                  className="h-auto w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity group-hover:opacity-100" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <Maximize2 className="mb-4 h-7 w-7 text-gold opacity-0 transition-opacity group-hover:opacity-100" />
                  <h3 className="text-xl font-display font-bold uppercase tracking-widest">{item.title[lang]}</h3>
                  <div className="mt-4 h-[1px] w-12 bg-gold" />
                </div>
              </motion.button>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedImage(null)}
          >
            <button
              type="button"
              aria-label="Close gallery image"
              className="absolute top-6 right-6 md:top-8 md:right-8 text-white hover:text-gold transition-colors"
              onClick={() => setSelectedImage(null)}
            >
              <X className="w-9 h-9 md:w-10 md:h-10" />
            </button>
            <motion.img
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              src={selectedImage.src}
              width={selectedImage.width}
              height={selectedImage.height}
              alt={imageAlt(selectedImage, lang)}
              className="max-w-full max-h-full rounded-2xl border border-gold/30 object-contain shadow-2xl"
              onClick={(event) => event.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

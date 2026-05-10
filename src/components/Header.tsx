import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { X, Globe, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { publicAsset } from '../utils/assets';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t, isRTL } = useLanguage();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'nav.home', path: '/' },
    { name: 'nav.about', path: '/#about' },
    { name: 'nav.experiences', path: '/#services' },
    { name: 'nav.gastronomy', path: '/menu' },
    { name: 'nav.gallery', path: '/gallery' },
    { name: 'nav.tournaments', path: '/tournaments' },
    { name: 'nav.reservation', path: '/reservation' },
    { name: 'nav.contact', path: '/contact' },
  ];

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl py-4 border-b border-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="hidden lg:flex items-center gap-6">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className={`group flex items-center gap-2 text-[10px] font-bold hover:text-gold transition-colors ${
                isRTL ? 'tracking-normal' : 'uppercase tracking-[0.2em]'
              }`}
            >
              <Globe className="w-3 h-3 text-gold/60 group-hover:text-gold transition-colors" />
              <span>{t('meta.languageLabel')}</span>
            </button>
            <div className="w-[1px] h-4 bg-white/10" />
            <span className={`text-[10px] text-white/40 ${isRTL ? 'tracking-normal' : 'tracking-[0.2em] uppercase'}`}>{t('meta.location')}</span>
          </div>

          <Link to="/" className="flex flex-col items-center group relative translate-y-2 md:translate-y-0">
            <motion.div animate={isScrolled ? { scale: 0.6 } : { scale: 1 }} className="flex flex-col items-center">
              <img
                src={publicAsset('images/regenerated_image_1778347088731.jpg')}
                className="h-12 md:h-[90px] max-h-[50px] md:max-h-[90px] object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                alt="Prestige de Jeux"
              />
            </motion.div>
          </Link>

          <div className="flex items-center gap-8">
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.slice(1, 6).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-[10px] font-bold hover:text-gold transition-all relative group ${
                    isRTL ? 'tracking-normal' : 'uppercase tracking-[0.2em]'
                  } ${
                    location.pathname === link.path ? 'text-gold' : 'text-white/70'
                  }`}
                >
                  {t(link.name)}
                  <span
                    className={`absolute -bottom-1 ${
                      isRTL ? 'right-0' : 'left-0'
                    } w-0 h-[1px] bg-gold transition-all duration-300 group-hover:w-full ${
                      location.pathname === link.path ? 'w-full' : ''
                    }`}
                  />
                </Link>
              ))}
            </nav>

            <Link
              to="/reservation"
              className={`hidden lg:flex items-center gap-2 border border-gold/30 px-6 py-2 text-[10px] hover:bg-gold hover:text-black transition-all duration-500 font-bold ${
                isRTL ? 'tracking-normal' : 'uppercase tracking-widest'
              }`}
            >
              <Crown className="w-3 h-3" />
              <span>{t('nav.reservation')}</span>
            </Link>

            <button
              className="lg:hidden w-10 h-10 flex flex-col justify-center items-center gap-2 group"
              onClick={() => setIsMenuOpen(true)}
              aria-label="Open menu"
            >
              <div className="w-8 h-[1px] bg-gold group-hover:w-6 transition-all" />
              <div className="w-6 h-[1px] bg-gold group-hover:w-8 transition-all" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col p-12 overflow-hidden"
          >
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/5 via-transparent to-black pointer-events-none" />

            <div className="relative z-10 flex justify-between items-center mb-20">
              <span className="text-2xl font-display font-bold gold-text">{isRTL ? t('hero.title') : 'PRESTIGE'}</span>
              <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-gold/20 rounded-full text-gold">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="relative z-10 flex flex-col gap-8 text-4xl font-display">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsMenuOpen(false)}
                    className="flex items-center gap-4 text-white/60 hover:text-gold"
                  >
                    <span className="text-xs font-sans text-gold/30 tracking-widest">0{i + 1}</span>
                    <span>{t(link.name)}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-auto relative z-10 grid grid-cols-2 gap-4">
              <button
                onClick={() => {
                  setLang(lang === 'fr' ? 'ar' : 'fr');
                  setIsMenuOpen(false);
                }}
                className={`flex items-center justify-center gap-2 border border-gold/30 p-4 text-[10px] text-gold font-bold ${
                  isRTL ? 'tracking-normal' : 'tracking-widest uppercase'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span>{t('meta.languageLabel')}</span>
              </button>
              <Link
                to="/reservation"
                onClick={() => setIsMenuOpen(false)}
                className={`bg-gold text-black flex items-center justify-center p-4 text-[10px] font-bold ${
                  isRTL ? 'tracking-normal' : 'tracking-widest uppercase'
                }`}
              >
                {t('nav.reservation')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

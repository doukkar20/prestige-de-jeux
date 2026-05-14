import { useEffect, useState } from 'react';
import type { MouseEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { X, Globe, Crown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { brandLogo } from '../data/brandAssets';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [mobileLogoFailed, setMobileLogoFailed] = useState(false);
  const { lang, setLang, t, isRTL } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

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

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, path: string) => {
    if (!path.startsWith('/#')) {
      setIsMenuOpen(false);
      return;
    }

    event.preventDefault();
    const hash = path.slice(1);
    const id = hash.replace('#', '');
    setIsMenuOpen(false);

    const scrollToTarget = () => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash });
      window.setTimeout(scrollToTarget, 120);
      return;
    }

    navigate({ pathname: '/', hash });
    window.setTimeout(scrollToTarget, 0);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-700 ${
          isScrolled
            ? 'bg-black/90 backdrop-blur-xl py-3 border-b border-gold/10 shadow-[0_10px_30px_rgba(0,0,0,0.5)]'
            : 'bg-transparent py-5 md:py-7'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 md:px-8">
          <Link to="/" className="group flex min-w-0 shrink-0 items-center">
            <motion.div animate={isScrolled ? { scale: 0.9 } : { scale: 1 }} className="relative flex items-center justify-center">
              <span className="absolute inset-1 rounded-full bg-gold/20 blur-2xl opacity-70 transition-opacity duration-300 group-hover:opacity-100" />
              {logoFailed ? (
                <span className="relative max-w-[160px] font-display text-lg font-bold leading-none gold-text sm:max-w-none sm:text-2xl">Prestige de jeux</span>
              ) : (
                <img
                  src={brandLogo.src}
                  width={brandLogo.width}
                  height={brandLogo.height}
                  alt={brandLogo.alt}
                  onError={() => setLogoFailed(true)}
                  className="relative h-14 w-14 rounded-full object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-[1.03] sm:h-16 sm:w-16 lg:h-[74px] lg:w-[74px]"
                />
              )}
            </motion.div>
          </Link>

          <div className="hidden min-w-0 flex-1 items-center justify-end gap-5 lg:flex xl:gap-7">
            <div className="hidden items-center gap-4 xl:flex">
            <button
              onClick={() => setLang(lang === 'fr' ? 'ar' : 'fr')}
              className={`group flex items-center gap-2 text-[10px] font-bold hover:text-gold transition-colors ${
                isRTL ? 'tracking-normal' : 'uppercase tracking-[0.12em]'
              }`}
            >
              <Globe className="w-3 h-3 text-gold/60 group-hover:text-gold transition-colors" />
              <span>{t('meta.languageLabel')}</span>
            </button>
            <div className="w-[1px] h-4 bg-white/10" />
            <span className={`text-[10px] text-white/40 ${isRTL ? 'tracking-normal' : 'tracking-[0.12em] uppercase'}`}>{t('meta.location')}</span>
            </div>

            <nav className="flex min-w-0 items-center justify-end gap-4 xl:gap-6">
              {navLinks.slice(0, 6).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(event) => handleNavClick(event, link.path)}
                  className={`group relative max-w-[112px] text-center text-[10px] font-bold leading-tight hover:text-gold transition-all ${
                    isRTL ? 'tracking-normal' : 'uppercase tracking-[0.12em]'
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
              className={`hidden shrink-0 items-center gap-2 border border-gold/30 px-5 py-2 text-[10px] hover:bg-gold hover:text-black transition-all duration-500 font-bold xl:flex ${
                isRTL ? 'tracking-normal' : 'uppercase tracking-[0.12em]'
              }`}
            >
              <Crown className="w-3 h-3" />
              <span>{t('nav.reservation')}</span>
            </Link>
          </div>

          <div className="flex items-center justify-end lg:hidden">
            <button
              className="w-10 h-10 flex flex-col justify-center items-center gap-2 group"
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
            className="fixed inset-0 z-[100] bg-black flex flex-col overflow-y-auto p-6 sm:p-10 md:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.14),transparent_35%)] pointer-events-none" />
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/5 via-transparent to-black pointer-events-none" />

            <div className="relative z-10 flex justify-between items-center mb-12 sm:mb-16">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="group relative flex items-center">
                <span className="absolute inset-0 rounded-full bg-gold/20 blur-2xl opacity-70" />
                {mobileLogoFailed ? (
                  <span className="relative text-2xl font-display font-bold gold-text">Prestige de jeux</span>
                ) : (
                  <img
                    src={brandLogo.src}
                    width={brandLogo.width}
                    height={brandLogo.height}
                    alt={brandLogo.alt}
                    onError={() => setMobileLogoFailed(true)}
                    className="relative h-16 w-16 rounded-full object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                )}
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center border border-gold/20 rounded-full text-gold">
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="relative z-10 flex flex-col gap-5 text-[clamp(1.8rem,9vw,3rem)] leading-tight font-display">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.path}
                  initial={{ x: isRTL ? 20 : -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    onClick={(event) => handleNavClick(event, link.path)}
                    className="flex min-w-0 items-center gap-4 text-white/60 hover:text-gold"
                  >
                    <span className="shrink-0 text-xs font-sans text-gold/30 tracking-widest">0{i + 1}</span>
                    <span className="min-w-0 break-words">{t(link.name)}</span>
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

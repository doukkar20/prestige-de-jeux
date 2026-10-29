import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { MapPin, Phone, Mail, Crown } from 'lucide-react';
import { useState } from 'react';
import LocationMap from './LocationMap';
import { brandLogo } from '../data/brandAssets';

export default function Footer() {
  const { t, isRTL } = useLanguage();
  const [logoFailed, setLogoFailed] = useState(false);



  return (
    <footer className="bg-black pt-32 pb-12 overflow-hidden relative border-t border-gold/10">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gold/5 blur-[150px] rounded-full -z-10" />

      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-20 mb-32">
          <div className="lg:col-span-2 space-y-10">
            <Link to="/" className="inline-flex flex-col">
              <span className="relative inline-flex w-max items-center">
                <span className="absolute inset-0 rounded-full bg-gold/20 blur-2xl opacity-70" />
                {logoFailed ? (
                  <span className="relative font-display text-3xl font-bold leading-none gold-text">Prestige de jeux</span>
                ) : (
                  <img
                    src={brandLogo.src}
                    width={brandLogo.width}
                    height={brandLogo.height}
                    alt={brandLogo.alt}
                    onError={() => setLogoFailed(true)}
                    className="relative h-16 w-auto object-contain drop-shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-transform duration-300 hover:scale-[1.03]"
                  />
                )}
              </span>
            </Link>
            <p className="text-white/40 max-w-sm leading-relaxed text-sm">
              {isRTL
                ? 'التميز في الترفيه الراقي بمكناس. تجربة غامرة يلتقي فيها شغف اللعب بالفخامة.'
                : "L'excellence du divertissement haut de gamme à Meknès. Une expérience immersive où la passion du jeu rencontre le luxe absolu."}
            </p>

          </div>

          <div className="space-y-10">
            <h4 className="text-xs tracking-[0.3em] font-bold text-white uppercase border-b border-gold/20 pb-4">
              {isRTL ? 'التنقل' : 'Navigation'}
            </h4>
            <ul className="space-y-4">
              {['home', 'about', 'blog', 'services', 'gallery', 'reservation', 'contact'].map((link) => (
                <li key={link}>
                  <Link
                    to={link === 'home' ? '/' : link === 'services' ? `/#${link}` : `/${link}`}
                    className="text-sm text-white/40 hover:text-gold transition-colors flex items-center group"
                  >
                    <div className="w-0 group-hover:w-4 h-[1px] bg-gold mr-0 group-hover:mr-3 transition-all duration-300" />
                    {t(`nav.${link}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="space-y-10">
            <h4 className="text-xs tracking-[0.3em] font-bold text-white uppercase border-b border-gold/20 pb-4">
              {isRTL ? 'الكونسيرج' : 'Conciergerie'}
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start space-x-4 rtl:space-x-reverse group">
                <MapPin className="w-5 h-5 text-gold/60 mt-1 group-hover:text-gold" />
                <span className="text-sm text-white/40 group-hover:text-white transition-colors">
                  {isRTL ? 'زاوية شارع القوات المسلحة الملكية وشارع الحرية،' : 'Angle Avenue FAR et Rue de la Liberté,'}
                  <br />
                  {isRTL ? 'مكناس، المغرب' : 'Meknès, Maroc'}
                </span>
              </li>
              <li className="flex items-center space-x-4 rtl:space-x-reverse group">
                <Phone className="w-5 h-5 text-gold/60 group-hover:text-gold" />
                <span className="text-sm text-white/40 group-hover:text-white transition-colors"><a href="tel:+212663650333">0663650333</a></span>
              </li>
              <li className="flex items-center space-x-4 rtl:space-x-reverse group">
                <Mail className="w-5 h-5 text-gold/60 group-hover:text-gold" />
                <span className="text-sm text-white/40 group-hover:text-white transition-colors"><a className="break-all" href="mailto:contact@prestigedejeux.ma">contact@prestigedejeux.ma</a></span>
              </li>
            </ul>
          </div>

          <div className="space-y-10 lg:col-span-4">
            <h4 className="text-xs tracking-[0.3em] font-bold text-white uppercase border-b border-gold/20 pb-4">
              {isRTL ? 'الموقع' : 'Localisation'}
            </h4>
            <LocationMap />
          </div>
        </div>

        <div className="border-t border-white/5 pt-12 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2 text-[10px] text-white/20 tracking-widest uppercase">
            <Crown className="w-4 h-4 text-gold/20" />
            <span>{isRTL ? '© 2026 Prestige de Jeux. جميع الحقوق محفوظة.' : '© 2026 Prestige de Jeux. Tous droits réservés.'}</span>
          </div>

          <div className="flex flex-wrap justify-center gap-5 text-xs text-white/70">
            <Link to="/terms" className="hover:text-gold transition-colors">{isRTL ? 'الشروط' : 'Conditions d’utilisation'}</Link>
            <Link to="/privacy-policy" className="hover:text-gold transition-colors">{isRTL ? 'الخصوصية' : 'Politique de confidentialité'}</Link>
            <Link to="/admin" className="hover:text-gold transition-colors">Admin</Link>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] text-gold/40 italic">{isRTL ? 'مرجع الفخامة' : 'La référence du luxe'}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

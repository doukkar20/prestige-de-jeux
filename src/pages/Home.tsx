import { motion, useScroll, useTransform } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronRight, Coffee, Utensils, Play, Star, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useRef, useEffect, useState } from 'react';
import Magnetic from '../components/Magnetic';
import { aboutImage, heroImage, imageAlt, serviceImages } from '../data/galleryImages';
import { brandLogo } from '../data/brandAssets';

export default function Home() {
  const { t, isRTL, lang } = useLanguage();
  const containerRef = useRef(null);
  const { scrollY } = useScroll();
  
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useTransform(scrollY, [0, 300], [1, 0.8]);

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative bg-black select-none overflow-x-hidden" ref={containerRef}>
      {/* Cinematic Hero */}
      <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden px-[6vw] pt-40 pb-20 md:py-32">
        {/* Background Layers */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ x: mousePos.x * -0.2, y: y1.get() * 0.5 }}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.16),transparent_34%),linear-gradient(180deg,#050505_0%,#000_58%,#050505_100%)]" />
        </motion.div>

        <div className={`relative z-20 w-full max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[55%_45%] gap-12 lg:gap-20 items-center ${isRTL ? 'rtl-hero' : ''}`}>
          {/* Left Side: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className={`flex flex-col items-center space-y-8 md:space-y-12 ${isRTL ? 'lg:items-end text-center lg:text-right' : 'lg:items-start text-center lg:text-left'}`}
          >
            <motion.span 
              initial={{ opacity: 0, letterSpacing: '0.1em' }}
              animate={{ opacity: 1, letterSpacing: isRTL ? '0' : '0.4em' }}
              transition={{ duration: 1.2 }}
              className={`inline-block text-gold text-[10px] md:text-xs font-bold ${isRTL ? 'font-arabic tracking-normal' : 'font-sans uppercase tracking-[0.4em]'}`}
            >
              {t('hero.eyebrow')}
            </motion.span>
            
            <h1 className={isRTL ? 'font-arabic text-white max-w-[900px] text-5xl md:text-7xl font-bold leading-[1.15] tracking-normal' : 'hero-title text-white max-w-[900px]'}>
              {isRTL ? (
                <span className="gold-text block">{t('hero.title')}</span>
              ) : (
                <>
                  <span className="hero-title-line mb-2 text-white md:mb-4">PRESTIGE</span>
                  <span className="hero-title-gold">DE JEUX</span>
                </>
              )}
            </h1>

            <p className="hidden">
              {isRTL
                ? 'التميز في البلياردو والسنوكر بمكناس. فضاء فاخر يلتقي فيه اللعب بالرقي.'
                : "L'excellence du billard et du snooker à Meknès. Un sanctuaire de luxe où le jeu rencontre le raffinement absolu."}
            </p>

            {!isRTL && (
              <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed font-sans">
                {t('hero.subtitle')}
              </p>
            )}

            {isRTL && (
              <p className="text-white/60 text-base md:text-lg max-w-lg leading-relaxed whitespace-pre-line font-arabic text-center lg:text-right">
                {t('hero.subtitle')}
              </p>
            )}

            <div className={`flex flex-col sm:flex-row items-stretch sm:items-center gap-6 w-full sm:w-auto ${isRTL ? 'sm:self-end' : 'sm:self-start'}`}>
              <Magnetic>
                <Link to="/reservation" className="btn-gold group relative w-full sm:w-auto overflow-hidden text-center block">
                  <span className={`relative z-10 ${isRTL ? 'font-arabic' : 'uppercase tracking-widest'}`}>{t('hero.ctaPrimary')}</span>
                  <motion.div 
                    className="absolute inset-0 bg-white/20 translate-x-[-101%] group-hover:translate-x-[101%] transition-transform duration-700 skew-x-12"
                  />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link to="/gallery" className="btn-outline-gold group flex items-center justify-center gap-3 w-full sm:w-auto">
                  {isRTL && <span className="font-arabic">{t('hero.ctaSecondary')}</span>}
                  <Play className="w-4 h-4 text-gold fill-gold group-hover:fill-black transition-colors" />
                  {!isRTL && <span className="uppercase tracking-widest">{t('hero.ctaSecondary')}</span>}
                </Link>
              </Magnetic>
            </div>
          </motion.div>

          {/* Right Side: Visual */}
          <motion.div 
             initial={{ opacity: 0, scale: 0.9, x: 30 }}
             animate={{ opacity: 1, scale: 1, x: 0 }}
             transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="relative flex justify-center items-center h-full min-h-[200px] md:min-h-[500px] pointer-events-none"
          >
            {/* Ambient Background Glow */}
            <motion.div
              animate={{ 
                scale: [1, 1.2, 1], 
                opacity: [0.1, 0.2, 0.1] 
              }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="absolute w-[60%] aspect-square bg-gold/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none"
            />
            
            <div className="relative group w-full max-w-[min(340px,76vw)] md:max-w-[min(520px,42vw)]">
              <motion.img 
                src={brandLogo.src}
                width={brandLogo.width}
                height={brandLogo.height}
                alt={brandLogo.alt}
                loading="eager"
                className="w-full aspect-square rounded-full border border-gold/30 bg-black/70 object-contain p-4 shadow-[0_0_35px_rgba(212,175,55,0.22)] md:p-6 md:shadow-[0_0_60px_rgba(212,175,55,0.3)]"
                animate={{ 
                  y: [0, -15, 0],
                  filter: [
                    "drop-shadow(0 0 30px rgba(212,175,55,0.3))",
                    "drop-shadow(0 0 60px rgba(212,175,55,0.6))",
                    "drop-shadow(0 0 30px rgba(212,175,55,0.3))"
                  ]
                }}
                transition={{ 
                  y: { repeat: Infinity, duration: 6, ease: "easeInOut" },
                  filter: { repeat: Infinity, duration: 3, ease: "easeInOut" }
                }}
              />
              
              {/* Flame overlay animation refined */}
              <motion.div
                animate={{ opacity: [0.2, 0.5, 0.2] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="absolute inset-0 bg-gradient-to-t from-gold/10 to-transparent mix-blend-overlay pointer-events-none"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll Reveal Hint */}
        <motion.div 
          animate={{ opacity: [0.2, 0.5, 0.2], y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 z-30 flex flex-col items-center pointer-events-none md:flex hidden"
        >
          <div className="w-[1px] h-16 bg-gradient-to-b from-gold via-gold/40 to-transparent" />
        </motion.div>
      </section>

      {/* About Section - Overlapping style */}
      <section id="about" className="relative py-40 z-10 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute -top-10 -left-10 text-[200px] font-display font-bold text-white/[0.03] select-none pointer-events-none">
              01
            </div>
            <div className="relative z-10 space-y-8">
              <span className="inline-block px-4 py-1 border border-gold/30 text-gold text-[10px] tracking-widest uppercase">
                {isRTL ? 'روح بريستيج' : "L'âme du Prestige"}
              </span>
              <h2 className="text-5xl md:text-7xl font-display font-bold leading-tight">
                {isRTL ? (
                  <span className="gold-text">شغف محفور في الفخامة</span>
                ) : (
                  <>
                    Une passion <br />
                    <span className="gold-text">gravée</span> dans l'or
                  </>
                )}
              </h2>
              <p className="text-white/60 text-lg leading-relaxed max-w-lg">
                {isRTL
                  ? 'بريستيج دو جو ليس مجرد مكان للترفيه. إنه فضاء مخصص للرقي، حيث يتوقف الوقت ليترك المجال للاستراتيجية والدقة ومتعة الحواس.'
                  : "Prestige de jeux n'est pas seulement un lieu de divertissement. C'est une institution dédiée au raffinement. Ici, le temps s'arrête pour laisser place à la stratégie, à la précision et au plaisir des sens."}
              </p>
              <div className="flex gap-12 pt-8">
                <div>
                  <h4 className="text-4xl font-display font-bold gold-text">12</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{isRTL ? 'طاولات مستوردة' : 'Tables Importées'}</p>
                </div>
                <div>
                  <h4 className="text-4xl font-display font-bold gold-text">20+</h4>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">{isRTL ? 'اختيارات قهوة فاخرة' : 'Grands Crus Café'}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative overflow-hidden rounded-2xl border border-gold/30 bg-black shadow-[0_0_45px_rgba(212,175,55,0.12)]"
          >
             <img
               src={aboutImage.src}
               width={aboutImage.width}
               height={aboutImage.height}
               loading="lazy"
               className="h-full min-h-[520px] w-full object-cover transition-transform duration-700 hover:scale-105"
               alt={imageAlt(aboutImage, lang)}
             />
             <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent pointer-events-none" />
          </motion.div>
        </div>
      </section>

      {/* Services Showcase - Horizontal Scroll Concept style */}
      <section id="services" className="py-40 bg-luxury-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(212,175,55,0.12),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.04),transparent_42%)] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
           <span className="text-gold tracking-[.4em] uppercase text-xs mb-4 block font-sans">{isRTL ? 'الخدمات' : 'Services'}</span>
           <h2 className="text-5xl md:text-8xl font-display font-bold gold-text">{isRTL ? 'تميز الخدمة' : "L'Excellence du Service"}</h2>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { id: '01', title: t('services.billiard.title'), icon: Trophy, image: serviceImages.billiard, desc: isRTL ? 'أفضل الطاولات لتجربة لعب راقية لا تضاهى.' : 'L\'élite des tables pour une expérience inégalée.' },
            { id: '02', title: t('services.snooker.title'), icon: Star, image: serviceImages.snooker, desc: isRTL ? 'فضاء دقيق مصمم للاعبين الباحثين عن التركيز والاحتراف.' : 'Un espace de précision pensé pour les joueurs exigeants.' },
            { id: '03', title: isRTL ? 'مقهى ومطعم' : 'Café Restaurant', icon: Coffee, image: serviceImages.cafeRestaurant, desc: isRTL ? 'استراحة لاونج راقية بين اللعب والقهوة والمذاق الرفيع.' : 'Une pause lounge raffinée entre jeu, café et gastronomie.' },
            { id: '04', title: t('services.events.title'), icon: Utensils, image: serviceImages.events, desc: isRTL ? 'مناسباتكم الخاصة بتنظيم يليق بها.' : 'Vos évènements, notre mise en scène.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass group overflow-hidden rounded-2xl border-gold/15 hover:border-gold/50 transition-all duration-500 hover:-translate-y-4"
            >
              <div className="relative aspect-[4/3] overflow-hidden border-b border-gold/20">
                <img
                  src={item.image.src}
                  width={item.image.width}
                  height={item.image.height}
                  loading="lazy"
                  alt={imageAlt(item.image, lang)}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
              <div className="p-8">
              <div className="flex justify-between items-start mb-12">
                <item.icon className="w-12 h-12 text-gold group-hover:scale-110 group-hover:text-fire transition-all duration-500" />
                <span className="text-4xl font-display font-bold text-white/5 group-hover:text-gold/20 transition-colors">{item.id}</span>
              </div>
              <h3 className="text-2xl font-bold mb-6 group-hover:gold-text transition-colors">{item.title}</h3>
              <p className="text-white/50 text-sm leading-relaxed mb-8">{item.desc}</p>
              <Link to="/services" className="text-xs tracking-widest text-gold flex items-center group/link">
                <span>{isRTL ? 'اعرف المزيد' : 'EN SAVOIR PLUS'}</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover/link:translate-x-2" />
              </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Local SEO Experience Section */}
      <section className="py-28 bg-black border-y border-white/5">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[42%_58%] gap-14 items-start">
          <div className={isRTL ? 'text-right' : 'text-left'}>
            <span className={`text-gold text-xs mb-5 block font-sans ${isRTL ? 'tracking-normal' : 'tracking-[.4em] uppercase'}`}>
              {isRTL ? 'في قلب مكناس' : 'Au coeur de Meknès'}
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold leading-tight gold-text">
              {isRTL ? 'وجهتك الراقية للبلياردو والسنوكر' : 'Votre adresse premium pour le billard et le snooker'}
            </h2>
          </div>

          <div className={`space-y-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <p className="text-white/60 text-lg leading-relaxed">
              {isRTL
                ? 'بريستيج دو جو في مكناس ليس مجرد قاعة ألعاب، بل فضاء فاخر يجمع بين طاولات بلياردو احترافية، سنوكر، مقهى راقٍ، مطعم، وخدمة حجز مصممة للباحثين عن تجربة مميزة في المغرب.'
                : 'Prestige de Jeux à Meknès n’est pas une simple salle de jeux. C’est un lounge premium pensé pour les amateurs de billard professionnel, de snooker, de café raffiné, de gastronomie et de réservations VIP au Maroc.'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: Trophy, label: isRTL ? 'بلياردو احترافي' : 'Billard professionnel' },
                { icon: Star, label: isRTL ? 'سنوكر فاخر' : 'Snooker premium' },
                { icon: Coffee, label: isRTL ? 'مقهى ولاونج' : 'Café lounge' },
              ].map((item) => (
                <div key={item.label} className="border border-white/10 bg-white/[0.03] p-5 flex items-center gap-4">
                  <item.icon className="w-6 h-6 text-gold shrink-0" />
                  <span className="text-sm font-bold text-white/80">{item.label}</span>
                </div>
              ))}
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 ${isRTL ? 'sm:justify-end' : ''}`}>
              <Link to="/reservation" className="btn-gold text-center">
                {isRTL ? 'احجز طاولتك' : 'Réserver une table'}
              </Link>
              <Link to="/services" className="btn-outline-gold text-center">
                {isRTL ? 'اكتشف التجارب' : 'Découvrir les expériences'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section id="reviews" className="py-40 bg-black">
        <div className="max-w-4xl mx-auto px-6 text-center">
           <span className="text-gold tracking-[.4em] uppercase text-xs mb-4 block font-sans">{isRTL ? 'آراء العملاء' : 'Témoignages'}</span>
           <h2 className="text-4xl md:text-6xl font-display font-bold mb-20 italic">"{isRTL ? 'تجربة حسية بلا تنازل.' : 'Une expérience sensorielle sans compromis.'}"</h2>
           
           <div className="relative min-h-40">
             <motion.div 
               initial={{ opacity: 0 }}
               whileInView={{ opacity: 1 }}
               className="text-white/60"
             >
                <div className="elfsight-app-20f14f7e-fa9b-4206-9c42-65f46fb7a97d" data-elfsight-app-lazy />
             </motion.div>
           </div>
        </div>
      </section>
      
      {/* Visual CTA */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden grayscale hover:grayscale-0 transition-all duration-1000">
        <img
          src={heroImage.src}
          width={heroImage.width}
          height={heroImage.height}
          loading="lazy"
          alt={imageAlt(heroImage, lang)}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 text-center px-6">
           <h2 className="text-5xl md:text-8xl font-display font-bold mb-12">{isRTL ? 'جاهز للعب؟' : 'Prêt à jouer ?'}</h2>
           <Link to="/reservation" className="btn-gold">{isRTL ? 'احجز طاولتك' : 'RÉSERVER VOTRE TABLE'}</Link>
        </div>
      </section>
    </div>
  );
}

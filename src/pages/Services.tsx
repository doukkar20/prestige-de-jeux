import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Coffee, Clock, Shield, Star, Trophy, Users } from 'lucide-react';
import { imageAlt, serviceImages } from '../data/galleryImages';

const services = [
  {
    id: 'billiard',
    icon: Trophy,
    title: (t: (key: string) => string, _isRTL: boolean) => t('services.billiard.title'),
    desc: {
      fr: "L'excellence du billard avec des tables de compétition, un éclairage précis et des accessoires haut de gamme.",
      ar: 'تميز البلياردو مع طاولات منافسة، إضاءة دقيقة، وإكسسوارات راقية.',
    },
    image: serviceImages.billiard,
    features: {
      fr: ['Tables de tournoi', 'Accessoires premium', 'Coaching privé'],
      ar: ['طاولات بطولات', 'إكسسوارات فاخرة', 'تدريب خاص'],
    },
  },
  {
    id: 'snooker',
    icon: Star,
    title: (t: (key: string) => string, _isRTL: boolean) => t('services.snooker.title'),
    desc: {
      fr: 'Un espace dédié au snooker professionnel, pensé pour la concentration, la précision et le confort.',
      ar: 'فضاء مخصص للسنوكر الاحترافي، مصمم للتركيز والدقة والراحة.',
    },
    image: serviceImages.snooker,
    features: {
      fr: ['Dimensions officielles', 'Ambiance feutrée', 'Espace VIP'],
      ar: ['مقاسات رسمية', 'أجواء هادئة', 'فضاء VIP'],
    },
  },
  {
    id: 'cafe-restaurant',
    icon: Coffee,
    title: (t: (key: string) => string, isRTL: boolean) =>
      isRTL ? `${t('services.cafe.title')} / ${t('services.restaurant.title')}` : 'Café Restaurant',
    desc: {
      fr: 'Café, restauration et lounge se rencontrent dans une atmosphère premium pour accompagner chaque partie.',
      ar: 'مقهى ومطعم ولاونج في أجواء راقية ترافق كل جولة لعب.',
    },
    image: serviceImages.cafeRestaurant,
    features: {
      fr: ['Barista expert', 'Grands crus', 'Dîners privés'],
      ar: ['باريستا خبير', 'قهوة مختارة', 'عشاء خاص'],
    },
  },
  {
    id: 'events',
    icon: Users,
    title: (t: (key: string) => string, _isRTL: boolean) => t('services.events.title'),
    desc: {
      fr: 'Privatisez nos espaces pour vos tournois, soirées corporatives et célébrations privées.',
      ar: 'خصصوا فضاءاتنا لبطولاتكم، أمسياتكم المهنية، واحتفالاتكم الخاصة.',
    },
    image: serviceImages.events,
    features: {
      fr: ['Service traiteur', 'Équipement AV', 'Sécurité privée'],
      ar: ['خدمة ضيافة', 'معدات صوت وصورة', 'أمن خاص'],
    },
  },
];

export default function Services() {
  const { t, isRTL, lang } = useLanguage();

  return (
    <div className="pt-40 pb-20 bg-black">
      <div className="max-w-7xl mx-auto px-8 mb-32">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="text-gold tracking-[0.4em] uppercase text-xs mb-6 block font-sans">{isRTL ? 'التجربة' : "L'Expérience"}</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold gold-text mb-8">{isRTL ? 'فضاءاتنا الراقية' : <>Nos Espaces <br />de Prestige</>}</h1>
          <p className="text-white/40 text-xl leading-relaxed">
            {isRTL
              ? 'كل تفصيل صمم ليقدم لحظة استثنائية. اكتشفوا التوازن بين رياضة الدقة وفن العيش.'
              : "Chaque détail a été pensé pour offrir une parenthèse d'exception. Découvrez l'alliance parfaite entre sport de précision et art de vivre."}
          </p>
        </motion.div>
      </div>

      <div className="space-y-40">
        {services.map((service, i) => (
          <section key={service.id} className="relative">
            <div className={`max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center ${i % 2 !== 0 ? 'lg:flex-row-reverse' : ''}`}>
              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={`${i % 2 !== 0 ? 'lg:order-2' : ''}`}
              >
                <div className="relative group overflow-hidden rounded-2xl border border-gold/30 bg-black shadow-[0_0_40px_rgba(212,175,55,0.12)]">
                  <motion.img
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.8 }}
                    src={service.image.src}
                    width={service.image.width}
                    height={service.image.height}
                    loading={i === 0 ? 'eager' : 'lazy'}
                    className="w-full aspect-[4/5] object-cover"
                    alt={imageAlt(service.image, lang)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: i % 2 === 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="space-y-10"
              >
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                  <service.icon className="w-10 h-10 text-gold" />
                  <span className="text-gold/40 font-display italic text-2xl">0{i + 1}</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-display font-bold">{service.title(t, isRTL)}</h2>
                <p className="text-white/60 text-lg leading-relaxed">{isRTL ? service.desc.ar : service.desc.fr}</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {(isRTL ? service.features.ar : service.features.fr).map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-3 rtl:space-x-reverse group">
                      <div className="w-1.5 h-1.5 bg-gold rounded-full group-hover:scale-150 transition-transform" />
                      <span className="text-xs uppercase tracking-widest text-white/80 group-hover:text-gold transition-colors">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-10">
                  <button className="btn-outline-gold">{isRTL ? 'اعرف المزيد' : 'EN SAVOIR PLUS'}</button>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      <section className="py-40 mt-40 bg-luxury-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(212,175,55,0.12),transparent_36%)] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-3 gap-12 relative">
          {[
            { icon: Shield, title: isRTL ? 'الخصوصية' : 'Confidentialité', desc: isRTL ? 'فضاءات مصممة لضمان راحتكم وخصوصيتكم.' : 'Des espaces pensés pour votre discrétion absolue.' },
            { icon: Clock, title: isRTL ? 'التوفر' : 'Disponibilité', desc: isRTL ? 'خدمة كونسيرج ترافقكم حتى آخر الليل.' : "Une conciergerie à votre écoute jusqu'au bout de la nuit." },
            { icon: Star, title: isRTL ? 'التميز' : 'Exclusivité', desc: isRTL ? 'امتيازات خاصة موجهة لأوفى أعضائنا.' : 'Des privilèges réservés à nos membres les plus fidèles.' },
          ].map((item, i) => (
            <div key={i} className="text-center space-y-6 group">
              <div className="w-20 h-20 bg-black border border-gold/20 flex items-center justify-center mx-auto group-hover:border-gold transition-colors rotate-45 group-hover:rotate-0 duration-500">
                <item.icon className="w-8 h-8 text-gold -rotate-45 group-hover:rotate-0 transition-all duration-500" />
              </div>
              <h3 className="text-xl font-bold pt-4">{item.title}</h3>
              <p className="text-white/40 text-sm max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

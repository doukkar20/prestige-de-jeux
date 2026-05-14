import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Crown, Star, Shield, Zap } from 'lucide-react';

const plans = [
  {
    name: { fr: 'Classique', ar: 'كلاسيكي' },
    price: '100 MAD',
    period: { fr: '/ heure', ar: '/ الساعة' },
    icon: Star,
    features: {
      fr: ['Table Standard', 'Accessoires Inclus', 'Service Café', 'Accès Lounge'],
      ar: ['طاولة عادية', 'إكسسوارات مشمولة', 'خدمة مقهى', 'ولوج اللاونج'],
    },
    color: 'border-white/10',
  },
  {
    name: { fr: 'Prestige', ar: 'بريستيج' },
    price: '180 MAD',
    period: { fr: '/ heure', ar: '/ الساعة' },
    icon: Crown,
    features: {
      fr: ['Table Professionnelle', 'Queue Individuelle', 'Service Prioritaire', 'Accès Salons VIP', 'Boisson au choix'],
      ar: ['طاولة احترافية', 'عصا فردية', 'خدمة أولوية', 'ولوج صالونات VIP', 'مشروب من اختيارك'],
    },
    color: 'border-gold/50 shadow-[0_0_30px_rgba(212,175,55,0.1)]',
  },
  {
    name: { fr: 'Membre Club', ar: 'عضوية النادي' },
    price: '2500 MAD',
    period: { fr: '/ mois', ar: '/ الشهر' },
    icon: Shield,
    features: {
      fr: ['Accès Illimité', 'Coach Privé (4h/mois)', 'Évènements Réservés', 'Vestiaire Privatif', 'Tarifs invités spéciaux'],
      ar: ['ولوج غير محدود', 'مدرب خاص (4 ساعات/الشهر)', 'مناسبات حصرية', 'خزانة خاصة', 'أسعار خاصة للضيوف'],
    },
    color: 'border-gold',
  },
];

export default function Pricing() {
  const { t, isRTL } = useLanguage();

  return (
    <div className="pt-40 pb-20 bg-black min-h-screen relative overflow-hidden">
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-gold/5 blur-[120px] rounded-full -translate-x-1/2 -translate-y-1/2 -z-10" />

      <div className="max-w-7xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-32">
          <span className="text-gold tracking-[0.4em] uppercase text-xs mb-4 block font-sans">{isRTL ? 'الحصرية' : "L'Exclusivité"}</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold gold-text mb-8">{t('pricing.title')}</h1>
          <p className="text-white/40 text-xl max-w-2xl mx-auto leading-relaxed">
            {isRTL
              ? 'اختاروا التجربة التي تناسب طموحكم. عروض مصممة لتجربة راقية ومتكاملة.'
              : "Choisissez l'expérience qui correspond à vos ambitions. Des forfaits sur-mesure pour une immersion totale."}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name.fr}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`p-12 border bg-luxury-gray relative group flex flex-col ${plan.color}`}
            >
              {i === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gold text-black px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                  {isRTL ? 'الأكثر طلبا' : 'La plus prisée'}
                </div>
              )}

              <div className="flex justify-between items-start mb-12">
                <plan.icon className="w-12 h-12 text-gold group-hover:scale-110 transition-transform duration-500" />
                <h3 className="text-3xl font-display font-bold uppercase">{isRTL ? plan.name.ar : plan.name.fr}</h3>
              </div>

              <div className="mb-12">
                <span className="text-5xl font-display font-bold gold-text">{plan.price}</span>
                <span className="text-white/40 ml-2 font-display italic">{isRTL ? plan.period.ar : plan.period.fr}</span>
              </div>

              <ul className="space-y-6 flex-grow mb-12">
                {(isRTL ? plan.features.ar : plan.features.fr).map((feature) => (
                  <li key={feature} className="flex items-center gap-4 text-sm text-white/60 group-hover:text-white transition-colors">
                    <Zap className="w-4 h-4 text-gold/40 group-hover:text-gold" />
                    {feature}
                  </li>
                ))}
              </ul>

              <button className={`w-full py-5 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 ${i === 2 ? 'btn-gold' : 'btn-outline-gold'}`}>
                {isRTL ? 'ابدأ تجربة التميز' : "Pratiquer l'Excellence"}
              </button>
            </motion.div>
          ))}
        </div>

        <div className="mt-32 text-center">
          <p className="text-white/20 text-xs italic tracking-widest uppercase">
            {isRTL ? '* كل جلسات البلياردو تشمل خدمة مساعد القاعة.' : "* Toutes les sessions de billard incluent le service d'un assistant de salle."}
          </p>
        </div>
      </div>
    </div>
  );
}

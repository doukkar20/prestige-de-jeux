import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Plus, Minus, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: { fr: "Faut-il réserver à l'avance ?", ar: 'هل يجب الحجز مسبقا؟' },
    answer: {
      fr: 'La réservation est fortement recommandée le soir et les week-ends pour garantir la disponibilité de nos tables de billard et snooker professionnelles.',
      ar: 'ننصح بالحجز مسبقا في المساء ونهاية الأسبوع لضمان توفر طاولات البلياردو والسنوكر الاحترافية.',
    },
  },
  {
    question: { fr: "Quels sont vos horaires d'ouverture ?", ar: 'ما هي أوقات العمل؟' },
    answer: {
      fr: "Nous sommes ouverts du lundi au dimanche, de 10h00 à 02h00 du matin en semaine, et jusqu'à 04h00 du matin les vendredis et samedis.",
      ar: 'نحن مفتوحون من الاثنين إلى الأحد، من 10:00 صباحا إلى 02:00 ليلا، وإلى 04:00 صباحا يومي الجمعة والسبت.',
    },
  },
  {
    question: { fr: 'Proposez-vous des espaces privés ?', ar: 'هل توفرون فضاءات خاصة؟' },
    answer: {
      fr: 'Oui, nous disposons de salons VIP et de zones privatisables pour vos évènements corporatifs ou célébrations personnelles.',
      ar: 'نعم، نوفر صالونات VIP وفضاءات قابلة للتخصيص لمناسباتكم المهنية أو احتفالاتكم الخاصة.',
    },
  },
  {
    question: { fr: 'Avez-vous un service voiturier ?', ar: 'هل توجد خدمة صف السيارات؟' },
    answer: {
      fr: "Absolument. Un service de voiturier sécurisé est à votre disposition dès votre arrivée devant l'établissement.",
      ar: 'نعم. خدمة صف سيارات آمنة متاحة لكم عند الوصول إلى المؤسسة.',
    },
  },
  {
    question: { fr: 'Le restaurant est-il accessible sans jouer ?', ar: 'هل يمكن دخول المطعم بدون اللعب؟' },
    answer: {
      fr: "Bien sûr. Notre restaurant gastronomique et notre café lounge accueillent tous les clients souhaitant passer un moment d'exception.",
      ar: 'بكل تأكيد. مطعمنا ومقهانا يرحبان بكل الزبائن الراغبين في قضاء لحظة مميزة.',
    },
  },
];

export default function FAQ() {
  const { isRTL } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="pt-40 pb-20 bg-black min-h-screen">
      <div className="max-w-4xl mx-auto px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-24">
          <span className="text-gold tracking-[0.4em] uppercase text-xs mb-4 block font-sans">{isRTL ? 'الدعم' : 'Support'}</span>
          <h1 className="text-6xl md:text-8xl font-display font-bold gold-text mb-12">{isRTL ? 'أسئلة شائعة' : 'Questions Fréquentes'}</h1>
          <div className="w-24 h-[1px] bg-gold mx-auto mb-8" />
        </motion.div>

        <div className="space-y-6">
          {faqs.map((faq, i) => (
            <motion.div
              key={faq.question.fr}
              initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="border border-white/5 bg-luxury-gray group"
            >
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-8 text-left transition-colors hover:text-gold"
              >
                <div className="flex items-center gap-6">
                  <HelpCircle className={`w-6 h-6 transition-colors ${openIndex === i ? 'text-gold' : 'text-white/20'}`} />
                  <span className="text-xl font-display font-medium">{isRTL ? faq.question.ar : faq.question.fr}</span>
                </div>
                {openIndex === i ? <Minus className="text-gold" /> : <Plus className="text-gold/40 group-hover:text-gold" />}
              </button>

              <AnimatePresence>
                {openIndex === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                    <div className="p-8 pt-0 text-white/40 leading-relaxed border-t border-white/5 bg-black/20">
                      {isRTL ? faq.answer.ar : faq.answer.fr}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState } from 'react';
import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { Calendar, Users, Clock, Phone, User, MessageSquare, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { heroImage, imageAlt } from '../data/galleryImages';

const reservationSchema = z.object({
  name: z.string().min(2, 'Le nom est trop court'),
  phone: z.string().min(10, 'Numéro de téléphone invalide'),
  date: z.string().min(1, 'La date est requise'),
  time: z.string().min(1, "L'heure est requise"),
  guests: z.number().min(1).max(50),
  message: z.string().optional(),
});

type ReservationData = z.infer<typeof reservationSchema>;

export default function Reservation() {
  const { t, lang, isRTL } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<ReservationData>({
    resolver: zodResolver(reservationSchema),
    defaultValues: { guests: 2 },
  });

  const onSubmit = async (data: ReservationData) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (res.ok) setIsSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
            <span className="text-gold tracking-[.4em] uppercase text-xs font-sans">{isRTL ? 'احجز طاولتك' : 'Réservez votre table'}</span>
            <h1 className="text-5xl md:text-7xl font-display font-bold">
              {isRTL ? 'لحظة استثنائية في انتظارك' : <>Un moment d'<span className="gold-text">exception</span> vous attend</>}
            </h1>
            <p className="text-white/60 text-lg leading-relaxed">
              {isRTL
                ? 'سواء لجولة بلياردو قوية، عشاء هادئ، أو لقاء بين الأصدقاء، نضمن لكم طاولة تليق بتوقعاتكم.'
                : 'Que ce soit pour une partie acharnée de billard, un diner intime ou un cocktail entre amis, nous vous assurons une table à la hauteur de vos attentes.'}
            </p>

            <div className="relative aspect-video overflow-hidden border border-gold/20 group">
              <img
                src={heroImage.src}
                width={heroImage.width}
                height={heroImage.height}
                loading="lazy"
                className="w-full h-full rounded-2xl border border-gold/30 object-cover grayscale hover:scale-105 hover:grayscale-0 transition-all duration-700"
                alt={imageAlt(heroImage, lang)}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <p className="text-[10px] tracking-widest text-gold uppercase font-bold">{isRTL ? 'أجواء راقية' : 'Ambiance Premium'}</p>
              </div>
            </div>

            <div className="space-y-6 pt-8">
              {[
                {
                  icon: CheckCircle,
                  title: isRTL ? 'تأكيد سريع' : 'Confirmation Rapide',
                  body: isRTL ? 'توصلوا برد في أقل من 15 دقيقة.' : 'Recevez une réponse en moins de 15 minutes.',
                },
                {
                  icon: MessageSquare,
                  title: isRTL ? 'مساعدة واتساب' : 'Assistance WhatsApp',
                  body: isRTL ? 'خدمة العملاء متوفرة على واتساب.' : 'Service client disponible 24/7 sur WhatsApp.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center space-x-4 rtl:space-x-reverse">
                  <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-gold border border-gold/10">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold">{item.title}</h4>
                    <p className="text-white/40 text-sm">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-luxury-gray p-8 md:p-12 border border-gold/10 shadow-2xl relative">
            {isSubmitted ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
                <CheckCircle className="w-20 h-20 text-gold mx-auto mb-6" />
                <h2 className="text-3xl font-display font-bold mb-4">{isRTL ? 'تم استلام الحجز!' : 'Réservation Reçue !'}</h2>
                <p className="text-white/60 mb-10">
                  {isRTL ? 'شكرا لثقتكم. سيتواصل معكم فريقنا في أقرب وقت لتأكيد الطاولة.' : 'Merci pour votre confiance. Notre équipe vous contactera dans les plus brefs délais pour confirmer votre table.'}
                </p>
                <button onClick={() => setIsSubmitted(false)} className="btn-outline-gold">{isRTL ? 'حجز جديد' : 'Nouvelle Réservation'}</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Field label={isRTL ? 'الاسم الكامل' : 'Nom Complet'} icon={User} error={errors.name?.message}>
                    <input {...register('name')} className="w-full bg-luxury-black border border-white/10 p-3 pl-10 focus:border-gold outline-none transition-all" placeholder={isRTL ? 'الاسم الكامل' : 'John Doe'} />
                  </Field>
                  <Field label={isRTL ? 'الهاتف' : 'Téléphone'} icon={Phone} error={errors.phone?.message}>
                    <input {...register('phone')} className="w-full bg-luxury-black border border-white/10 p-3 pl-10 focus:border-gold outline-none transition-all" placeholder="+212 6XX..." />
                  </Field>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Field label={isRTL ? 'التاريخ' : 'Date'} icon={Calendar} error={errors.date?.message}>
                    <input type="date" {...register('date')} className="w-full bg-luxury-black border border-white/10 p-3 pl-10 focus:border-gold outline-none transition-all" />
                  </Field>
                  <Field label={isRTL ? 'الوقت' : 'Heure'} icon={Clock} error={errors.time?.message}>
                    <input type="time" {...register('time')} className="w-full bg-luxury-black border border-white/10 p-3 pl-10 focus:border-gold outline-none transition-all" />
                  </Field>
                  <Field label={isRTL ? 'الأشخاص' : 'Personnes'} icon={Users} error={errors.guests?.message}>
                    <input type="number" {...register('guests', { valueAsNumber: true })} className="w-full bg-luxury-black border border-white/10 p-3 pl-10 focus:border-gold outline-none transition-all" placeholder="2" />
                  </Field>
                </div>

                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-gold font-bold">{isRTL ? 'رسالة (اختياري)' : 'Message (Optionnel)'}</label>
                  <textarea
                    {...register('message')}
                    className="w-full bg-luxury-black border border-white/10 p-3 min-h-[120px] focus:border-gold outline-none transition-all"
                    placeholder={isRTL ? 'اذكروا مناسبة خاصة أو طاولة مفضلة...' : 'Précisez un évènement particulier ou une table préférée...'}
                  />
                </div>

                <button type="submit" disabled={isLoading} className="w-full btn-gold !py-4 flex items-center justify-center space-x-2">
                  {isLoading ? (isRTL ? 'جار الإرسال...' : 'Envoi en cours...') : t('hero.cta')}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  icon: Icon,
  error,
  children,
}: {
  label: string;
  icon: typeof User;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-xs uppercase tracking-widest text-gold font-bold">{label}</label>
      <div className="relative">
        <Icon className="absolute left-3 top-3 w-4 h-4 text-gold/50" />
        {children}
      </div>
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}

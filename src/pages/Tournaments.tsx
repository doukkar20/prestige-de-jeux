import { FormEvent, useEffect, useMemo, useState } from 'react';
import { motion } from 'motion/react';
import { Award, CalendarDays, Clock3, Crown, Medal, Trophy, Users } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { participants, rewards, tournaments } from '../data/tournaments';
import { publicAsset } from '../utils/assets';

function useCountdown(targetDate: string) {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(timer);
  }, []);

  return useMemo(() => {
    const distance = Math.max(new Date(targetDate).getTime() - now, 0);
    return {
      days: Math.floor(distance / 86400000),
      hours: Math.floor((distance % 86400000) / 3600000),
      minutes: Math.floor((distance % 3600000) / 60000),
      seconds: Math.floor((distance % 60000) / 1000),
    };
  }, [now, targetDate]);
}

export default function Tournaments() {
  const { t, isRTL } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const nextTournament = tournaments[0];
  const countdown = useCountdown(nextTournament.date);

  const gameLabel = (gameType: string) => t(gameType === 'Snooker' ? 'tournaments.game.snooker' : 'tournaments.game.billard');
  const prizeLabel = (id: string) => t(id === 'snooker-elite' ? 'tournaments.prize.snookerElite' : 'tournaments.prize.prestige8');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitted(true);
    window.setTimeout(() => setIsSubmitted(false), 4000);
  };

  return (
    <div className="bg-black text-white overflow-hidden">
      <section className="relative min-h-screen flex items-center pt-40 pb-24 px-6">
        <div className="absolute inset-0">
          <img src={publicAsset('images/regenerated_image_1778342982723.png')} className="w-full h-full object-cover opacity-25" alt="" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(212,175,55,0.18),transparent_38%)]" />
        </div>

        <motion.div
          animate={{ y: [0, -16, 0], rotate: [0, 4, 0] }}
          transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut' }}
          className={`absolute top-32 ${isRTL ? 'left-[8vw]' : 'right-[8vw]'} hidden md:flex w-28 h-28 rounded-full bg-black border border-gold/40 shadow-[0_0_50px_rgba(212,175,55,0.45)] items-center justify-center`}
        >
          <div className="w-12 h-12 rounded-full bg-white text-black flex items-center justify-center text-3xl font-black">8</div>
        </motion.div>

        <div className={`relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[58%_42%] gap-14 items-center ${isRTL ? 'text-right' : 'text-left'}`}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="space-y-8">
            <span className={`text-gold text-xs font-bold ${isRTL ? 'tracking-normal' : 'tracking-[0.4em] uppercase'}`}>
              {t('tournaments.hero.kicker')}
            </span>
            <h1 className="text-5xl md:text-8xl font-display font-bold leading-tight gold-text">{t('tournaments.hero.title')}</h1>
            <p className="text-white/65 text-lg md:text-xl leading-relaxed max-w-2xl">{t('tournaments.hero.subtitle')}</p>
            <div className={`flex flex-col sm:flex-row gap-5 ${isRTL ? 'sm:justify-end' : ''}`}>
              <a href="#tournament-registration" className="btn-gold text-center">{t('tournaments.hero.primary')}</a>
              <a href="#tournament-rewards" className="btn-outline-gold text-center">{t('tournaments.hero.secondary')}</a>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.15, duration: 0.8 }} className="glass p-8 border-gold/20 relative overflow-hidden">
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-gold/10 blur-3xl rounded-full" />
            <Trophy className="w-14 h-14 text-gold animate-pulse-gold mb-8" />
            <p className="text-white/40 text-sm mb-5">{t('tournaments.countdown.label')}</p>
            <div className="grid grid-cols-4 gap-3">
              {[
                [countdown.days, t('tournaments.countdown.days')],
                [countdown.hours, t('tournaments.countdown.hours')],
                [countdown.minutes, t('tournaments.countdown.minutes')],
                [countdown.seconds, t('tournaments.countdown.seconds')],
              ].map(([value, label]) => (
                <div key={label.toString()} className="bg-black/60 border border-white/10 p-4 text-center">
                  <div className="text-2xl md:text-3xl font-bold gold-text">{String(value).padStart(2, '0')}</div>
                  <div className="text-[10px] text-white/40 mt-2">{label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-12 gold-text ${isRTL ? 'text-right' : 'text-left'}`}>{t('tournaments.sections.upcoming')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tournaments.map((item, index) => (
              <motion.article
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass p-8 hover:border-gold/40 transition-all duration-500"
              >
                <div className="flex items-start justify-between gap-6 mb-8">
                  <div>
                    <span className="text-gold/60 text-xs font-bold">{gameLabel(item.gameType)}</span>
                    <h3 className="text-3xl font-display font-bold mt-3">{isRTL ? item.titleAr : item.titleFr}</h3>
                  </div>
                  <span className="text-[10px] bg-gold/10 text-gold px-3 py-2 rounded-full font-bold">{t(`tournaments.status.${item.status}`)}</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                  {[
                    [CalendarDays, t('tournaments.card.date'), isRTL ? item.dateAr : item.dateFr],
                    [Clock3, t('tournaments.card.time'), item.time],
                    [Users, t('tournaments.card.participants'), `${item.maxParticipants} ${t('tournaments.card.players')}`],
                    [Crown, t('tournaments.card.entryFee'), `${item.entryFee} ${t('tournaments.money.mad')}`],
                    [Award, t('tournaments.card.prizePool'), prizeLabel(item.id)],
                  ].map(([Icon, label, value]) => (
                    <div key={label.toString()} className="flex items-center gap-3 bg-black/40 border border-white/5 p-4">
                      <Icon className="w-5 h-5 text-gold shrink-0" />
                      <div>
                        <p className="text-white/35 text-xs">{label}</p>
                        <p className="font-bold text-white/85">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="tournament-rewards" className="py-24 px-6 bg-luxury-gray relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
        <div className="max-w-7xl mx-auto relative">
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-12 gold-text ${isRTL ? 'text-right' : 'text-left'}`}>{t('tournaments.sections.rewards')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass p-8 text-center hover:-translate-y-3 transition-transform duration-500 ${reward.position === 1 ? 'border-gold/60 shadow-[0_0_45px_rgba(212,175,55,0.12)]' : ''}`}
              >
                {reward.position === 1 && (
                  <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(14)].map((_, i) => (
                      <span key={i} className="absolute w-1.5 h-1.5 bg-gold rounded-full animate-ping" style={{ left: `${8 + i * 6}%`, top: `${15 + (i % 5) * 12}%`, animationDelay: `${i * 0.18}s` }} />
                    ))}
                  </div>
                )}
                <Medal className="w-14 h-14 text-gold mx-auto mb-6" />
                <h3 className="text-2xl font-display font-bold mb-4">{isRTL ? reward.titleAr : reward.titleFr}</h3>
                <p className="text-white/70">{isRTL ? reward.descriptionAr : reward.descriptionFr}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-12 gold-text ${isRTL ? 'text-right' : 'text-left'}`}>{t('tournaments.sections.participants')}</h2>
          <div className="overflow-x-auto glass">
            <table className={`w-full min-w-[760px] ${isRTL ? 'text-right' : 'text-left'}`}>
              <thead className="bg-white/[0.03] text-white/40 text-xs">
                <tr>
                  <th className="p-5">{t('tournaments.participants.rank')}</th>
                  <th className="p-5">{t('tournaments.participants.name')}</th>
                  <th className="p-5">{t('tournaments.participants.phone')}</th>
                  <th className="p-5">{t('tournaments.participants.status')}</th>
                  <th className="p-5">{t('tournaments.participants.score')}</th>
                  <th className="p-5">{t('tournaments.participants.wins')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {participants.map((participant, index) => (
                  <motion.tr
                    key={participant.id}
                    initial={{ opacity: 0, x: isRTL ? 24 : -24 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="hover:bg-white/[0.03] transition-colors"
                  >
                    <td className="p-5 text-gold font-bold">#{index + 1}</td>
                    <td className="p-5 font-bold">{participant.fullName}</td>
                    <td className="p-5 text-white/55">{participant.phone}</td>
                    <td className="p-5">
                      <span className={`text-[10px] px-3 py-1 rounded-full font-bold ${participant.status === 'confirmed' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'}`}>
                        {t(`tournaments.participants.${participant.status}`)}
                      </span>
                    </td>
                    <td className="p-5">{participant.score}</td>
                    <td className="p-5">{participant.wins}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section id="tournament-registration" className="py-24 px-6 bg-luxury-gray">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-12 gold-text ${isRTL ? 'text-right' : 'text-left'}`}>{t('tournaments.sections.registration')}</h2>
          <form onSubmit={handleSubmit} className="glass p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            <input className="bg-black/50 border border-white/10 p-4 outline-none focus:border-gold" placeholder={t('tournaments.form.fullName')} required />
            <input className="bg-black/50 border border-white/10 p-4 outline-none focus:border-gold" placeholder={t('tournaments.form.phone')} required />
            <select className="bg-black/50 border border-white/10 p-4 outline-none focus:border-gold" defaultValue="">
              <option value="" disabled>{t('tournaments.form.gameType')}</option>
              <option>{t('tournaments.game.billard')}</option>
              <option>{t('tournaments.game.snooker')}</option>
            </select>
            <select className="bg-black/50 border border-white/10 p-4 outline-none focus:border-gold" defaultValue="">
              <option value="" disabled>{t('tournaments.form.tournament')}</option>
              {tournaments.map((item) => <option key={item.id}>{isRTL ? item.titleAr : item.titleFr}</option>)}
            </select>
            <select className="bg-black/50 border border-white/10 p-4 outline-none focus:border-gold" defaultValue="">
              <option value="" disabled>{t('tournaments.form.level')}</option>
              <option>{t('tournaments.form.level.beginner')}</option>
              <option>{t('tournaments.form.level.intermediate')}</option>
              <option>{t('tournaments.form.level.advanced')}</option>
            </select>
            <textarea className="md:col-span-2 bg-black/50 border border-white/10 p-4 min-h-[140px] outline-none focus:border-gold resize-none" placeholder={t('tournaments.form.messagePlaceholder')} />
            {isSubmitted && <p className="md:col-span-2 text-green-400 font-bold">{t('tournaments.form.success')}</p>}
            <button className="md:col-span-2 btn-gold">{t('tournaments.form.submit')}</button>
          </form>
        </div>
      </section>

      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <h2 className={`text-4xl md:text-6xl font-display font-bold mb-12 gold-text ${isRTL ? 'text-right' : 'text-left'}`}>{t('tournaments.sections.rules')}</h2>
          <div className="grid grid-cols-1 gap-4">
            {[1, 2, 3, 4, 5].map((item) => (
              <motion.div key={item} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="glass p-5 flex items-center gap-4">
                <span className="w-8 h-8 rounded-full bg-gold text-black flex items-center justify-center font-bold shrink-0">{item}</span>
                <p className="text-white/70">{t(`tournaments.rules.${item}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

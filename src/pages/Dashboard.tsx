import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Calendar, CheckCircle2, ChevronRight, Clock, Crown, Download,
  Edit3, LogOut, Medal, Plus, Search, Settings, Trash2, Trophy, Users, Utensils, XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { participants as seedParticipants, rewards as seedRewards, tournaments as seedTournaments } from '../data/tournaments';
import type { Participant, Reward, Tournament } from '../types/tournament';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('reservations');
  const [stats, setStats] = useState({ reservations: 0, menuItems: 0 });
  const [reservations, setReservations] = useState<any[]>([]);
  const [adminTournaments, setAdminTournaments] = useState<Tournament[]>(seedTournaments);
  const [adminParticipants, setAdminParticipants] = useState<Participant[]>(seedParticipants);
  const [adminRewards, setAdminRewards] = useState<Reward[]>(seedRewards);
  const [winnerId, setWinnerId] = useState<string | null>(null);
  const [adminNotice, setAdminNotice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  useEffect(() => {
    const token = localStorage.getItem('prestige_token');
    if (!token) {
      navigate('/admin');
      return;
    }

    const fetchData = async () => {
      try {
        const [statsRes, resRes] = await Promise.all([
          fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } }),
          fetch('/api/admin/reservations', { headers: { Authorization: `Bearer ${token}` } }),
        ]);

        if (statsRes.status === 401) {
          localStorage.removeItem('prestige_token');
          navigate('/admin');
          return;
        }

        setStats(await statsRes.json());
        setReservations(await resRes.json());
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  const showNotice = (message: string) => {
    setAdminNotice(message);
    window.setTimeout(() => setAdminNotice(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('prestige_token');
    navigate('/admin');
  };

  const createTournament = () => {
    const tournament: Tournament = {
      id: `tournament-${Date.now()}`,
      titleFr: 'Tournoi Prestige Elite',
      titleAr: 'بطولة بريستيج النخبوية',
      date: '2026-06-20T20:30:00',
      dateFr: 'Samedi 20 Juin',
      dateAr: 'السبت 20 يونيو',
      time: '20:30',
      gameType: 'Billard',
      maxParticipants: 24,
      entryFee: 120,
      prizePool: '1 800 MAD + trophée',
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setAdminTournaments((current) => [tournament, ...current]);
    showNotice(t('tournaments.admin.created'));
  };

  const editTournament = (id: string) => {
    setAdminTournaments((current) =>
      current.map((item) => item.id === id ? { ...item, status: item.status === 'open' ? 'closed' : 'open' } : item)
    );
  };

  const deleteTournament = (id: string) => {
    setAdminTournaments((current) => current.filter((item) => item.id !== id));
    setAdminParticipants((current) => current.filter((item) => item.tournamentId !== id));
    setAdminRewards((current) => current.filter((item) => item.tournamentId !== id));
  };

  const addParticipant = () => {
    const target = adminTournaments[0];
    if (!target) return;
    const participant: Participant = {
      id: `participant-${Date.now()}`,
      tournamentId: target.id,
      fullName: 'Participant Prestige',
      phone: '+212 6 00 00 00 00',
      level: 'intermediate',
      status: 'waiting',
      score: 0,
      wins: 0,
      createdAt: new Date().toISOString(),
    };
    setAdminParticipants((current) => [participant, ...current]);
    showNotice(t('tournaments.admin.participantAdded'));
  };

  const confirmParticipants = () => {
    setAdminParticipants((current) => current.map((item) => ({ ...item, status: 'confirmed' })));
  };

  const manageRewards = () => {
    setAdminRewards((current) => current.map((item) => item.position === 1 ? { ...item, amount: item.amount + 100 } : item));
  };

  const updateScores = () => {
    setAdminParticipants((current) =>
      current.map((item, index) => ({ ...item, score: item.score + Math.max(1, 3 - index), wins: item.wins + (index === 0 ? 1 : 0) }))
    );
  };

  const markWinner = () => {
    const winner = [...adminParticipants].sort((a, b) => b.score - a.score)[0];
    if (!winner) return;
    setWinnerId(winner.id);
    showNotice(t('tournaments.admin.winnerMarked'));
  };

  const exportParticipants = () => {
    const rows = [
      ['Rank', 'Player', 'Phone', 'Status', 'Score', 'Wins'],
      ...adminParticipants.map((item, index) => [index + 1, item.fullName, item.phone, item.status, item.score, item.wins]),
    ];
    const blob = new Blob([rows.map((row) => row.join(',')).join('\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prestige-tournament-participants.csv';
    link.click();
    URL.revokeObjectURL(url);
  };

  const gameLabel = (gameType: string) => t(gameType === 'Snooker' ? 'tournaments.game.snooker' : 'tournaments.game.billard');

  const renderReservations = () => (
    <div className="bg-luxury-gray border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
        <h3 className="font-bold">Réservations Récentes</h3>
        <button className="text-xs text-gold flex items-center space-x-1 hover:underline">
          <span>Voir tout</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-white/30 bg-white/[0.02]">
              <th className="p-6 font-medium">Client</th>
              <th className="p-6 font-medium">Date & Heure</th>
              <th className="p-6 font-medium">Convives</th>
              <th className="p-6 font-medium">Statut</th>
              <th className="p-6 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reservations.map((res: any) => (
              <tr key={res.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-6">
                  <div className="font-medium">{res.name}</div>
                  <div className="text-xs text-white/30">{res.phone}</div>
                </td>
                <td className="p-6">
                  <div className="text-sm">{res.date}</div>
                  <div className="text-xs text-white/30">{res.time}</div>
                </td>
                <td className="p-6"><span className="bg-white/5 px-2 py-1 rounded-md text-xs">{res.guests} pers.</span></td>
                <td className="p-6">
                  <span className="inline-flex items-center space-x-1.5 text-[10px] bg-yellow-500/10 text-yellow-500 px-2 py-1 rounded-full uppercase tracking-widest font-bold">
                    <Clock className="w-3 h-3" />
                    <span>Attente</span>
                  </span>
                </td>
                <td className="p-6">
                  <div className="flex space-x-3">
                    <button className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all" title="Confirmer"><CheckCircle2 className="w-4 h-4" /></button>
                    <button className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Annuler"><XCircle className="w-4 h-4" /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderTournamentAdmin = () => (
    <div className="space-y-8">
      <div className="bg-luxury-gray border border-white/5 rounded-2xl p-6 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-8">
          <div>
            <h3 className="text-2xl font-display font-bold gold-text">{t('tournaments.admin.title')}</h3>
            <p className="text-white/40 text-sm">{t('tournaments.admin.subtitle')}</p>
          </div>
          {adminNotice && <span className="bg-green-500/10 text-green-400 px-4 py-2 text-xs rounded-full">{adminNotice}</span>}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {[
            [createTournament, Plus, t('tournaments.admin.create')],
            [addParticipant, Users, t('tournaments.admin.addParticipant')],
            [confirmParticipants, CheckCircle2, t('tournaments.admin.confirmParticipants')],
            [manageRewards, Medal, t('tournaments.admin.manageRewards')],
            [updateScores, BarChart3, t('tournaments.admin.updateScores')],
            [markWinner, Crown, t('tournaments.admin.markWinner')],
            [exportParticipants, Download, t('tournaments.admin.export')],
          ].map(([action, Icon, label]) => (
            <button key={label as string} onClick={action as () => void} className="bg-white/5 border border-white/10 p-4 rounded-xl hover:border-gold/40 hover:text-gold transition-all flex items-center gap-3 text-sm">
              <Icon className="w-4 h-4" />
              <span>{label as string}</span>
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
          {adminTournaments.map((item) => (
            <div key={item.id} className="border border-white/10 bg-black/30 p-6 rounded-2xl">
              <div className="flex justify-between gap-4">
                <div>
                  <p className="text-gold text-xs font-bold">{gameLabel(item.gameType)}</p>
                  <h4 className="text-xl font-bold mt-2">{isRTL ? item.titleAr : item.titleFr}</h4>
                  <p className="text-white/40 text-sm mt-1">{isRTL ? item.dateAr : item.dateFr} · {item.time}</p>
                </div>
                <span className="h-fit bg-gold/10 text-gold text-[10px] rounded-full px-3 py-1">{t(`tournaments.status.${item.status}`)}</span>
              </div>
              <div className="grid grid-cols-2 gap-3 mt-6 text-sm">
                <div className="bg-white/[0.03] p-3 rounded-lg">{item.maxParticipants} {t('tournaments.card.participants')}</div>
                <div className="bg-white/[0.03] p-3 rounded-lg">{item.entryFee} {t('tournaments.money.mad')}</div>
              </div>
              <div className="flex gap-3 mt-6">
                <button onClick={() => editTournament(item.id)} className="p-3 bg-gold/10 text-gold rounded-lg hover:bg-gold hover:text-black transition-all" title={t('tournaments.admin.edit')}><Edit3 className="w-4 h-4" /></button>
                <button onClick={() => deleteTournament(item.id)} className="p-3 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500 hover:text-white transition-all" title={t('tournaments.admin.delete')}><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.4fr_0.6fr] gap-8">
        <div className="bg-luxury-gray border border-white/5 rounded-2xl overflow-hidden">
          <div className="p-6 border-b border-white/5 font-bold">{t('tournaments.sections.participants')}</div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left">
              <thead className="text-xs uppercase tracking-widest text-white/30 bg-white/[0.02]">
                <tr>
                  <th className="p-5">{t('tournaments.participants.rank')}</th>
                  <th className="p-5">{t('tournaments.participants.name')}</th>
                  <th className="p-5">{t('tournaments.participants.status')}</th>
                  <th className="p-5">{t('tournaments.participants.score')}</th>
                  <th className="p-5">{t('tournaments.participants.wins')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {adminParticipants.map((item, index) => (
                  <tr key={item.id} className={winnerId === item.id ? 'bg-gold/10' : 'hover:bg-white/[0.02]'}>
                    <td className="p-5 text-gold font-bold">#{index + 1}</td>
                    <td className="p-5">
                      <div className="font-medium flex items-center gap-2">{winnerId === item.id && <Crown className="w-4 h-4 text-gold" />}{item.fullName}</div>
                      <div className="text-xs text-white/30">{item.phone}</div>
                    </td>
                    <td className="p-5">{t(`tournaments.participants.${item.status}`)}</td>
                    <td className="p-5">{item.score}</td>
                    <td className="p-5">{item.wins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-luxury-gray border border-white/5 rounded-2xl p-6">
          <h3 className="font-bold mb-6">{t('tournaments.admin.manageRewards')}</h3>
          <div className="space-y-4">
            {adminRewards.map((reward) => (
              <div key={reward.id} className="bg-black/30 border border-white/10 p-4 rounded-xl">
                <div className="text-gold font-bold">{isRTL ? reward.titleAr : reward.titleFr}</div>
                <div className="text-white/60 text-sm mt-1">{reward.amount} {t('tournaments.money.mad')}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Initialisation du Dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#020202] flex text-white font-sans">
      <aside className="w-64 bg-luxury-gray border-r border-white/5 flex flex-col p-6 fixed h-full z-10">
        <div className="mb-12">
          <h1 className="text-xl font-display font-bold gold-text">PRESTIGE</h1>
          <p className="text-[10px] text-white/30 tracking-[0.2em]">ADMIN CONSOLE</p>
        </div>

        <nav className="flex-grow space-y-2">
          {[
            { id: 'stats', label: 'Vue d’ensemble', icon: BarChart3 },
            { id: 'reservations', label: 'Réservations', icon: Calendar },
            { id: 'tournaments', label: t('nav.tournaments'), icon: Trophy },
            { id: 'menu', label: 'Carte & Menu', icon: Utensils },
            { id: 'users', label: 'Clients', icon: Users },
            { id: 'settings', label: 'Configuration', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-gold text-black' : 'text-white/60 hover:bg-white/5 hover:text-gold'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-auto flex items-center space-x-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Déconnexion</span>
        </button>
      </aside>

      <main className="flex-grow ml-64 p-10">
        <header className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-display font-bold">Dashboard</h2>
            <p className="text-white/40 text-sm">Gestion de l’établissement en temps réel</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/30" />
              <input className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-gold/50" placeholder="Rechercher..." />
            </div>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">A</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Réservations', value: stats.reservations, sub: '+12% ce mois', icon: Calendar, color: 'text-blue-400' },
            { label: t('nav.tournaments'), value: adminTournaments.length, sub: `${adminParticipants.length} ${t('tournaments.card.players')}`, icon: Trophy, color: 'text-gold' },
            { label: 'Menu Items', value: stats.menuItems, sub: '5 catégories', icon: Utensils, color: 'text-orange-400' },
            { label: 'Nouveaux Avis', value: 8, sub: 'Rating 4.9/5', icon: CheckCircle2, color: 'text-green-400' },
          ].map((s) => (
            <div key={s.label} className="bg-luxury-gray border border-white/5 p-6 rounded-2xl">
              <div className="flex justify-between mb-4">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/40 uppercase tracking-widest">Live</span>
              </div>
              <h3 className="text-white/50 text-sm mb-1">{s.label}</h3>
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <p className="text-[10px] text-green-400">{s.sub}</p>
            </div>
          ))}
        </div>

        {activeTab === 'tournaments' ? renderTournamentAdmin() : renderReservations()}
      </main>
    </div>
  );
}

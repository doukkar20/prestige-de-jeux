import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  BarChart3, Calendar, CheckCircle2, ChevronRight, Clock, Crown, Download,
  Edit3, LogOut, Medal, Plus, Search, Settings, Trash2, Trophy, Users, Utensils, XCircle
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { participants as seedParticipants, rewards as seedRewards, tournaments as seedTournaments } from '../data/tournaments';
import type { Participant, Reward, Tournament, TournamentStatus } from '../types/tournament';
import { brandLogo } from '../data/brandAssets';

type AdminTab = 'stats' | 'reservations' | 'tournaments' | 'menu' | 'users' | 'settings';
type ReservationStatus = 'waiting' | 'confirmed' | 'cancelled';

interface AdminReservation {
  id: string;
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: ReservationStatus;
  message?: string;
}

const storageKeys = {
  reservations: 'prestige_admin_reservations',
  tournaments: 'prestige_admin_tournaments',
  participants: 'prestige_admin_participants',
  rewards: 'prestige_admin_rewards',
  winner: 'prestige_admin_winner',
};

const seedReservations: AdminReservation[] = [
  {
    id: 'res-1',
    name: 'Yassine Amrani',
    phone: '+212 6 11 22 33 44',
    date: '2026-05-18',
    time: '20:30',
    guests: 4,
    status: 'waiting',
    message: 'Table billard VIP',
  },
  {
    id: 'res-2',
    name: 'Sara El Mansouri',
    phone: '+212 6 20 30 40 50',
    date: '2026-05-19',
    time: '21:00',
    guests: 2,
    status: 'confirmed',
    message: 'Snooker',
  },
];

function readStorage<T>(key: string, fallback: T): T {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) as T : fallback;
  } catch {
    return fallback;
  }
}

function writeStorage<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<AdminTab>('stats');
  const [reservations, setReservations] = useState<AdminReservation[]>(() => readStorage(storageKeys.reservations, seedReservations));
  const [adminTournaments, setAdminTournaments] = useState<Tournament[]>(() => readStorage(storageKeys.tournaments, seedTournaments));
  const [adminParticipants, setAdminParticipants] = useState<Participant[]>(() => readStorage(storageKeys.participants, seedParticipants));
  const [adminRewards, setAdminRewards] = useState<Reward[]>(() => readStorage(storageKeys.rewards, seedRewards));
  const [winnerId, setWinnerId] = useState<string | null>(() => readStorage(storageKeys.winner, null));
  const [adminNotice, setAdminNotice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [logoFailed, setLogoFailed] = useState(false);
  const navigate = useNavigate();
  const { t, isRTL } = useLanguage();

  const stats = useMemo(() => ({
    reservations: reservations.length,
    confirmedReservations: reservations.filter((item) => item.status === 'confirmed').length,
    clients: new Set(reservations.map((item) => item.phone)).size + adminParticipants.length,
    menuItems: 9,
  }), [adminParticipants.length, reservations]);

  useEffect(() => {
    const token = localStorage.getItem('prestige_token');
    if (!token) {
      navigate('/admin');
      return;
    }
    setIsLoading(false);
  }, [navigate]);

  useEffect(() => writeStorage(storageKeys.reservations, reservations), [reservations]);
  useEffect(() => writeStorage(storageKeys.tournaments, adminTournaments), [adminTournaments]);
  useEffect(() => writeStorage(storageKeys.participants, adminParticipants), [adminParticipants]);
  useEffect(() => writeStorage(storageKeys.rewards, adminRewards), [adminRewards]);
  useEffect(() => writeStorage(storageKeys.winner, winnerId), [winnerId]);

  const showNotice = (message: string) => {
    setAdminNotice(message);
    window.setTimeout(() => setAdminNotice(''), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem('prestige_token');
    navigate('/admin');
  };

  const addReservation = () => {
    const next: AdminReservation = {
      id: `res-${Date.now()}`,
      name: 'Nouveau client',
      phone: '+212 6 00 00 00 00',
      date: new Date().toISOString().slice(0, 10),
      time: '20:00',
      guests: 2,
      status: 'waiting',
      message: 'Reservation ajoutee depuis le dashboard',
    };
    setReservations((current) => [next, ...current]);
    showNotice('Reservation ajoutee');
  };

  const setReservationStatus = (id: string, status: ReservationStatus) => {
    setReservations((current) => current.map((item) => item.id === id ? { ...item, status } : item));
    showNotice(status === 'confirmed' ? 'Reservation confirmee' : 'Reservation annulee');
  };

  const deleteReservation = (id: string) => {
    setReservations((current) => current.filter((item) => item.id !== id));
    showNotice('Reservation supprimee');
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
      prizePool: '1 800 MAD + trophee',
      status: 'open',
      createdAt: new Date().toISOString(),
    };
    setAdminTournaments((current) => [tournament, ...current]);
    showNotice(t('tournaments.admin.created'));
  };

  const editTournament = (id: string) => {
    const order: TournamentStatus[] = ['open', 'soon', 'closed'];
    setAdminTournaments((current) =>
      current.map((item) => item.id === id ? { ...item, status: order[(order.indexOf(item.status) + 1) % order.length] } : item)
    );
    showNotice(t('tournaments.admin.edit'));
  };

  const deleteTournament = (id: string) => {
    setAdminTournaments((current) => current.filter((item) => item.id !== id));
    setAdminParticipants((current) => current.filter((item) => item.tournamentId !== id));
    setAdminRewards((current) => current.filter((item) => item.tournamentId !== id));
    showNotice(t('tournaments.admin.delete'));
  };

  const addParticipant = () => {
    const target = adminTournaments[0];
    if (!target) {
      showNotice('Creez un tournoi avant d ajouter un participant');
      return;
    }
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
    showNotice(t('tournaments.admin.confirmParticipants'));
  };

  const manageRewards = () => {
    setAdminRewards((current) => current.map((item) => item.position === 1 ? { ...item, amount: item.amount + 100 } : item));
    showNotice(t('tournaments.admin.manageRewards'));
  };

  const updateScores = () => {
    setAdminParticipants((current) =>
      current.map((item, index) => ({ ...item, score: item.score + Math.max(1, 3 - index), wins: item.wins + (index === 0 ? 1 : 0) }))
    );
    showNotice(t('tournaments.admin.updateScores'));
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
    showNotice(t('tournaments.admin.export'));
  };

  const gameLabel = (gameType: string) => t(gameType === 'Snooker' ? 'tournaments.game.snooker' : 'tournaments.game.billard');

  const renderReservations = () => (
    <div className="bg-luxury-gray border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
      <div className="p-6 border-b border-white/5 flex flex-col gap-4 bg-white/[0.01] sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="font-bold">Reservations recentes</h3>
          <p className="text-sm text-white/50">Confirmez, annulez ou supprimez les demandes.</p>
        </div>
        <button onClick={addReservation} className="btn-outline-gold !px-5 !py-3 text-xs">
          <Plus className="inline h-4 w-4" /> Ajouter
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead>
            <tr className="text-xs uppercase tracking-widest text-white/60 bg-white/[0.02]">
              <th className="p-5 font-medium">Client</th>
              <th className="p-5 font-medium">Date & Heure</th>
              <th className="p-5 font-medium">Convives</th>
              <th className="p-5 font-medium">Statut</th>
              <th className="p-5 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {reservations.map((res) => (
              <tr key={res.id} className="group hover:bg-white/[0.02] transition-colors">
                <td className="p-5">
                  <div className="font-medium">{res.name}</div>
                  <div className="text-xs text-white/50">{res.phone}</div>
                  {res.message && <div className="mt-1 text-xs text-gold/70">{res.message}</div>}
                </td>
                <td className="p-5">
                  <div className="text-sm">{res.date}</div>
                  <div className="text-xs text-white/50">{res.time}</div>
                </td>
                <td className="p-5"><span className="bg-white/5 px-2 py-1 rounded-md text-xs">{res.guests} pers.</span></td>
                <td className="p-5">
                  <span className={`inline-flex items-center space-x-1.5 text-[10px] px-2 py-1 rounded-full uppercase tracking-widest font-bold ${
                    res.status === 'confirmed'
                      ? 'bg-green-500/10 text-green-400'
                      : res.status === 'cancelled'
                        ? 'bg-red-500/10 text-red-400'
                        : 'bg-yellow-500/10 text-yellow-400'
                  }`}>
                    <Clock className="w-3 h-3" />
                    <span>{res.status === 'confirmed' ? 'Confirmee' : res.status === 'cancelled' ? 'Annulee' : 'Attente'}</span>
                  </span>
                </td>
                <td className="p-5">
                  <div className="flex space-x-3">
                    <button onClick={() => setReservationStatus(res.id, 'confirmed')} className="p-2 bg-green-500/10 text-green-500 hover:bg-green-500 hover:text-white rounded-lg transition-all" title="Confirmer"><CheckCircle2 className="w-4 h-4" /></button>
                    <button onClick={() => setReservationStatus(res.id, 'cancelled')} className="p-2 bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white rounded-lg transition-all" title="Annuler"><XCircle className="w-4 h-4" /></button>
                    <button onClick={() => deleteReservation(res.id)} className="p-2 bg-white/5 text-white/60 hover:bg-white/10 hover:text-white rounded-lg transition-all" title="Supprimer"><Trash2 className="w-4 h-4" /></button>
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
            <p className="text-white/60 text-sm">{t('tournaments.admin.subtitle')}</p>
          </div>
          {adminNotice && <span className="bg-green-500/10 text-green-400 px-4 py-2 text-xs rounded-full">{adminNotice}</span>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 mb-8">
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
                  <p className="text-white/60 text-sm mt-1">{isRTL ? item.dateAr : item.dateFr} - {item.time}</p>
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
              <thead className="text-xs uppercase tracking-widest text-white/60 bg-white/[0.02]">
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
                      <div className="text-xs text-white/50">{item.phone}</div>
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

  const renderOverview = () => (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="bg-luxury-gray border border-white/5 rounded-2xl p-8">
        <h3 className="text-2xl font-display font-bold gold-text mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button onClick={() => { setActiveTab('reservations'); addReservation(); }} className="btn-outline-gold !px-5 !py-4">Ajouter reservation</button>
          <button onClick={() => { setActiveTab('tournaments'); createTournament(); }} className="btn-outline-gold !px-5 !py-4">Creer tournoi</button>
          <button onClick={() => { setActiveTab('tournaments'); addParticipant(); }} className="btn-outline-gold !px-5 !py-4">Ajouter participant</button>
          <button onClick={exportParticipants} className="btn-outline-gold !px-5 !py-4">Exporter CSV</button>
        </div>
      </div>
      <div className="bg-luxury-gray border border-white/5 rounded-2xl p-8">
        <h3 className="text-2xl font-display font-bold gold-text mb-4">Etat local</h3>
        <p className="text-white/70 leading-relaxed">
          Le dashboard fonctionne en mode local. Les reservations, tournois, participants et recompenses sont sauvegardes dans ce navigateur.
        </p>
      </div>
    </div>
  );

  const renderSimplePanel = (title: string, body: string, action: () => void, actionLabel: string) => (
    <div className="bg-luxury-gray border border-white/5 rounded-2xl p-8">
      <h3 className="text-2xl font-display font-bold gold-text mb-4">{title}</h3>
      <p className="text-white/70 mb-8 max-w-2xl">{body}</p>
      <button onClick={action} className="btn-outline-gold !px-5 !py-4">{actionLabel}</button>
    </div>
  );

  const renderContent = () => {
    if (activeTab === 'stats') return renderOverview();
    if (activeTab === 'reservations') return renderReservations();
    if (activeTab === 'tournaments') return renderTournamentAdmin();
    if (activeTab === 'menu') return renderSimplePanel('Carte & Menu', 'Section de suivi local du menu. Le site affiche actuellement 9 elements de carte repartis en 3 categories.', () => showNotice('Menu synchronise localement'), 'Synchroniser');
    if (activeTab === 'users') return renderSimplePanel('Clients', `${stats.clients} clients et participants sont suivis localement.`, addReservation, 'Ajouter client test');
    return renderSimplePanel('Configuration', 'Parametres locaux du dashboard admin.', () => {
      Object.values(storageKeys).forEach((key) => localStorage.removeItem(key));
      setReservations(seedReservations);
      setAdminTournaments(seedTournaments);
      setAdminParticipants(seedParticipants);
      setAdminRewards(seedRewards);
      setWinnerId(null);
      showNotice('Donnees locales reinitialisees');
    }, 'Reinitialiser les donnees');
  };

  if (isLoading) return <div className="min-h-screen bg-black flex items-center justify-center text-gold">Initialisation du Dashboard...</div>;

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans lg:flex">
      <aside className="bg-luxury-gray border-r border-white/5 p-5 lg:fixed lg:h-full lg:w-64">
        <div className="mb-8">
          <div className="relative mb-3 inline-flex items-center">
            <span className="absolute inset-0 rounded-full bg-gold/20 blur-xl opacity-70" />
            {logoFailed ? (
              <span className="relative text-xl font-display font-bold gold-text">Prestige de jeux</span>
            ) : (
              <img
                src={brandLogo.src}
                width={brandLogo.width}
                height={brandLogo.height}
                alt={brandLogo.alt}
                onError={() => setLogoFailed(true)}
                className="relative h-14 w-auto object-contain drop-shadow-[0_0_20px_rgba(212,175,55,0.35)]"
              />
            )}
          </div>
          <p className="text-[10px] text-white/50 tracking-[0.2em]">ADMIN CONSOLE</p>
        </div>

        <nav className="grid grid-cols-2 gap-2 lg:block lg:space-y-2">
          {[
            { id: 'stats', label: 'Vue ensemble', icon: BarChart3 },
            { id: 'reservations', label: 'Reservations', icon: Calendar },
            { id: 'tournaments', label: t('nav.tournaments'), icon: Trophy },
            { id: 'menu', label: 'Carte & Menu', icon: Utensils },
            { id: 'users', label: 'Clients', icon: Users },
            { id: 'settings', label: 'Configuration', icon: Settings },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as AdminTab)}
              className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all ${
                activeTab === item.id ? 'bg-gold text-black' : 'text-white/70 hover:bg-white/5 hover:text-gold'
              }`}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="mt-6 flex w-full items-center space-x-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg transition-all">
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Deconnexion</span>
        </button>
      </aside>

      <main className="flex-grow p-5 lg:ml-64 lg:p-10">
        <header className="flex flex-col gap-5 mb-10 xl:flex-row xl:items-center xl:justify-between">
          <div>
            <h2 className="text-3xl font-display font-bold">Dashboard</h2>
            <p className="text-white/60 text-sm">Gestion de l'etablissement en temps reel</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {adminNotice && <span className="bg-green-500/10 text-green-400 px-4 py-2 text-xs rounded-full">{adminNotice}</span>}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/40" />
              <input className="w-full bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm outline-none focus:border-gold/50 sm:w-64" placeholder="Rechercher..." />
            </div>
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">A</div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Reservations', value: stats.reservations, sub: `${stats.confirmedReservations} confirmees`, icon: Calendar, color: 'text-blue-400' },
            { label: t('nav.tournaments'), value: adminTournaments.length, sub: `${adminParticipants.length} ${t('tournaments.card.players')}`, icon: Trophy, color: 'text-gold' },
            { label: 'Menu Items', value: stats.menuItems, sub: '3 categories', icon: Utensils, color: 'text-orange-400' },
            { label: 'Clients', value: stats.clients, sub: 'local', icon: CheckCircle2, color: 'text-green-400' },
          ].map((s) => (
            <button key={s.label} onClick={() => s.label === 'Reservations' ? setActiveTab('reservations') : undefined} className="bg-luxury-gray border border-white/5 p-6 rounded-2xl text-left hover:border-gold/30 transition-colors">
              <div className="flex justify-between mb-4">
                <s.icon className={`w-8 h-8 ${s.color}`} />
                <span className="text-[10px] bg-white/5 px-2 py-1 rounded text-white/60 uppercase tracking-widest">Live</span>
              </div>
              <h3 className="text-white/70 text-sm mb-1">{s.label}</h3>
              <div className="text-3xl font-bold mb-1">{s.value}</div>
              <p className="text-[10px] text-green-400">{s.sub}</p>
            </button>
          ))}
        </div>

        {renderContent()}
      </main>
    </div>
  );
}

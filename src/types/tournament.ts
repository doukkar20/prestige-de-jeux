export type GameType = 'Billard' | 'Snooker';
export type TournamentStatus = 'open' | 'soon' | 'closed';
export type ParticipantStatus = 'confirmed' | 'waiting';

export interface Tournament {
  id: string;
  titleFr: string;
  titleAr: string;
  date: string;
  dateFr: string;
  dateAr: string;
  time: string;
  gameType: GameType;
  maxParticipants: number;
  entryFee: number;
  prizePool: string;
  status: TournamentStatus;
  createdAt: string;
}

export interface Participant {
  id: string;
  tournamentId: string;
  fullName: string;
  phone: string;
  level: string;
  status: ParticipantStatus;
  score: number;
  wins: number;
  createdAt: string;
}

export interface Reward {
  id: string;
  tournamentId: string;
  position: number;
  titleFr: string;
  titleAr: string;
  amount: number;
  descriptionFr: string;
  descriptionAr: string;
}

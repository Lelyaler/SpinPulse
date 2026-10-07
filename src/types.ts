export type GameCategory = 
  | 'all' 
  | 'slots' 
  | 'live' 
  | 'crash' 
  | 'table' 
  | 'jackpot' 
  | 'bonusbuy'
  | 'favorites';

export type GameProvider = 
  | 'Pragmatic Play'
  | 'Evolution'
  | 'NetEnt'
  | 'Hacksaw Gaming'
  | 'Play\'n GO'
  | 'NoLimit City'
  | 'Spribe';

export interface GameItem {
  id: string;
  title: string;
  category: GameCategory;
  provider: GameProvider;
  coverImage: string;
  rtp: number;
  volatility: 'Very High' | 'High' | 'Medium' | 'Low';
  maxWin: string;
  isHot?: boolean;
  isNew?: boolean;
  isBonusBuy?: boolean;
  type: 'slot' | 'crash' | 'live' | 'table';
  rating: number;
}

export interface LiveWinner {
  id: string;
  user: string;
  gameTitle: string;
  amount: number;
  multiplier: number;
  time: string;
  avatar: string;
}

export interface SlotSymbol {
  id: string;
  name: string;
  multiplier: number;
  icon: string;
  color: string;
}

export interface PlacedCasinoBet {
  id: string;
  gameTitle: string;
  betAmount: number;
  winAmount: number;
  timestamp: string;
  status: 'won' | 'lost';
}

export interface TournamentLeader {
  rank: number;
  user: string;
  points: number;
  prize: string;
  avatar: string;
}

export interface Tournament {
  id: string;
  title: string;
  subtitle: string;
  prizePool: string;
  totalCoins: number;
  status: 'ACTIVE' | 'UPCOMING';
  endsInSeconds: number;
  participantsCount: number;
  leaderboard: TournamentLeader[];
}

export interface BonusOffer {
  id: string;
  title: string;
  description: string;
  reward: string;
  tag: string;
  bonusCode: string;
  minDeposit: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'bonus' | 'win' | 'tournament';
}

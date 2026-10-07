export type GameCategory = 'all' | 'slots' | 'live' | 'crash' | 'table' | 'jackpot';

export type GameProvider = 
  | 'Pragmatic Play'
  | 'Evolution'
  | 'NetEnt'
  | 'Hacksaw Gaming'
  | 'Play\'n GO'
  | 'NoLimit City';

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
  icon: string; // emoji or SVG key
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

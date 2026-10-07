export type SportId = 'all' | 'football' | 'basketball' | 'tennis' | 'cs2' | 'dota2';

export type MatchStatus = 'live' | 'upcoming';

export type OddTrend = 'up' | 'down' | 'steady';

export interface OddSelection {
  id: string;
  name: string;
  value: number;
  initialValue: number;
  trend: OddTrend;
}

export interface Market {
  id: string;
  name: string;
  selections: OddSelection[];
}

export interface MatchStats {
  possession?: [number, number];
  shotsOnTarget?: [number, number];
  corners?: [number, number];
  kills?: [number, number];
  currentMap?: string;
}

export interface Match {
  id: string;
  sport: SportId;
  league: string;
  homeTeam: {
    name: string;
    shortName: string;
    logo?: string;
  };
  awayTeam: {
    name: string;
    shortName: string;
    logo?: string;
  };
  status: MatchStatus;
  minute?: number;
  period?: string;
  homeScore: number;
  awayScore: number;
  markets: Market[];
  stats?: MatchStats;
  isHot?: boolean;
  bannerImage?: string;
}

export interface BetSelection {
  matchId: string;
  matchTitle: string;
  sport: SportId;
  marketName: string;
  selectionId: string;
  selectionName: string;
  odds: number;
}

export type BetType = 'single' | 'parlay';

export interface PlacedBet {
  id: string;
  type: BetType;
  items: BetSelection[];
  totalOdds: number;
  stake: number;
  potentialPayout: number;
  status: 'pending' | 'won' | 'lost';
  placedAt: string;
}

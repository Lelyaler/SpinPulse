import { Match } from '../types';

export const initialMatches: Match[] = [
  // FOOTBALL
  {
    id: 'fb-1',
    sport: 'football',
    league: 'UEFA Champions League',
    status: 'live',
    minute: 68,
    period: '2nd Half',
    homeScore: 2,
    awayScore: 1,
    isHot: true,
    homeTeam: {
      name: 'Real Madrid',
      shortName: 'RMA',
    },
    awayTeam: {
      name: 'Bayern Munich',
      shortName: 'BAY',
    },
    stats: {
      possession: [54, 46],
      shotsOnTarget: [7, 5],
      corners: [6, 4],
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (1X2)',
        selections: [
          { id: 'sel-1', name: '1 (Real Madrid)', value: 1.82, initialValue: 1.82, trend: 'steady' },
          { id: 'sel-x', name: 'X (Draw)', value: 3.55, initialValue: 3.55, trend: 'steady' },
          { id: 'sel-2', name: '2 (Bayern Munich)', value: 4.40, initialValue: 4.40, trend: 'steady' },
        ],
      },
      {
        id: 'm-totals',
        name: 'Total Goals (Over/Under 3.5)',
        selections: [
          { id: 'sel-o35', name: 'Over 3.5', value: 1.95, initialValue: 1.95, trend: 'steady' },
          { id: 'sel-u35', name: 'Under 3.5', value: 1.85, initialValue: 1.85, trend: 'steady' },
        ],
      },
      {
        id: 'm-handicap',
        name: 'Handicap (-0.5)',
        selections: [
          { id: 'sel-h-home', name: 'RMA (-0.5)', value: 1.80, initialValue: 1.80, trend: 'steady' },
          { id: 'sel-h-away', name: 'BAY (+0.5)', value: 2.05, initialValue: 2.05, trend: 'steady' },
        ],
      },
    ],
  },
  {
    id: 'fb-2',
    sport: 'football',
    league: 'English Premier League',
    status: 'live',
    minute: 34,
    period: '1st Half',
    homeScore: 1,
    awayScore: 1,
    isHot: true,
    homeTeam: {
      name: 'Arsenal FC',
      shortName: 'ARS',
    },
    awayTeam: {
      name: 'Manchester City',
      shortName: 'MCI',
    },
    stats: {
      possession: [48, 52],
      shotsOnTarget: [4, 6],
      corners: [3, 5],
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (1X2)',
        selections: [
          { id: 'sel-1', name: '1 (Arsenal)', value: 2.65, initialValue: 2.65, trend: 'steady' },
          { id: 'sel-x', name: 'X (Draw)', value: 3.10, initialValue: 3.10, trend: 'steady' },
          { id: 'sel-2', name: '2 (Man City)', value: 2.75, initialValue: 2.75, trend: 'steady' },
        ],
      },
      {
        id: 'm-totals',
        name: 'Total Goals (Over/Under 2.5)',
        selections: [
          { id: 'sel-o25', name: 'Over 2.5', value: 1.70, initialValue: 1.70, trend: 'steady' },
          { id: 'sel-u25', name: 'Under 2.5', value: 2.15, initialValue: 2.15, trend: 'steady' },
        ],
      },
    ],
  },
  {
    id: 'fb-3',
    sport: 'football',
    league: 'Italian Serie A',
    status: 'upcoming',
    period: 'Today 21:45',
    homeScore: 0,
    awayScore: 0,
    homeTeam: {
      name: 'Inter Milan',
      shortName: 'INT',
    },
    awayTeam: {
      name: 'AC Milan',
      shortName: 'ACM',
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (1X2)',
        selections: [
          { id: 'sel-1', name: '1 (Inter)', value: 2.10, initialValue: 2.10, trend: 'steady' },
          { id: 'sel-x', name: 'X (Draw)', value: 3.40, initialValue: 3.40, trend: 'steady' },
          { id: 'sel-2', name: '2 (AC Milan)', value: 3.50, initialValue: 3.50, trend: 'steady' },
        ],
      },
    ],
  },

  // BASKETBALL
  {
    id: 'bb-1',
    sport: 'basketball',
    league: 'NBA Regular Season',
    status: 'live',
    minute: 9,
    period: 'Q3',
    homeScore: 84,
    awayScore: 81,
    isHot: true,
    homeTeam: {
      name: 'Boston Celtics',
      shortName: 'BOS',
    },
    awayTeam: {
      name: 'Golden State Warriors',
      shortName: 'GSW',
    },
    stats: {
      shotsOnTarget: [42, 39], // FG%
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Moneyline (Winner)',
        selections: [
          { id: 'sel-1', name: 'Boston Celtics', value: 1.62, initialValue: 1.62, trend: 'steady' },
          { id: 'sel-2', name: 'GS Warriors', value: 2.30, initialValue: 2.30, trend: 'steady' },
        ],
      },
      {
        id: 'm-totals',
        name: 'Total Points (Over/Under 224.5)',
        selections: [
          { id: 'sel-o', name: 'Over 224.5', value: 1.90, initialValue: 1.90, trend: 'steady' },
          { id: 'sel-u', name: 'Under 224.5', value: 1.90, initialValue: 1.90, trend: 'steady' },
        ],
      },
      {
        id: 'm-handicap',
        name: 'Point Spread (-4.5)',
        selections: [
          { id: 'sel-h-home', name: 'BOS (-4.5)', value: 1.88, initialValue: 1.88, trend: 'steady' },
          { id: 'sel-h-away', name: 'GSW (+4.5)', value: 1.92, initialValue: 1.92, trend: 'steady' },
        ],
      },
    ],
  },
  {
    id: 'bb-2',
    sport: 'basketball',
    league: 'NBA Regular Season',
    status: 'upcoming',
    period: 'Tonight 02:30',
    homeScore: 0,
    awayScore: 0,
    homeTeam: {
      name: 'Los Angeles Lakers',
      shortName: 'LAL',
    },
    awayTeam: {
      name: 'Denver Nuggets',
      shortName: 'DEN',
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Moneyline (Winner)',
        selections: [
          { id: 'sel-1', name: 'LA Lakers', value: 2.25, initialValue: 2.25, trend: 'steady' },
          { id: 'sel-2', name: 'Denver Nuggets', value: 1.67, initialValue: 1.67, trend: 'steady' },
        ],
      },
    ],
  },

  // TENNIS
  {
    id: 'tn-1',
    sport: 'tennis',
    league: 'Roland Garros Grand Slam',
    status: 'live',
    period: 'Set 3 (6-4, 4-6, 3-2)',
    homeScore: 1,
    awayScore: 1,
    isHot: true,
    homeTeam: {
      name: 'Carlos Alcaraz',
      shortName: 'ALC',
    },
    awayTeam: {
      name: 'Jannik Sinner',
      shortName: 'SIN',
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner',
        selections: [
          { id: 'sel-1', name: 'Carlos Alcaraz', value: 1.74, initialValue: 1.74, trend: 'steady' },
          { id: 'sel-2', name: 'Jannik Sinner', value: 2.10, initialValue: 2.10, trend: 'steady' },
        ],
      },
      {
        id: 'm-totals',
        name: 'Total Games (Over/Under 38.5)',
        selections: [
          { id: 'sel-o', name: 'Over 38.5', value: 1.85, initialValue: 1.85, trend: 'steady' },
          { id: 'sel-u', name: 'Under 38.5', value: 1.95, initialValue: 1.95, trend: 'steady' },
        ],
      },
    ],
  },

  // CS2 (ESPORTS)
  {
    id: 'cs-1',
    sport: 'cs2',
    league: 'BLAST Premier Spring Finals',
    status: 'live',
    period: 'Map 2 (Inferno)',
    homeScore: 1,
    awayScore: 0,
    isHot: true,
    homeTeam: {
      name: 'Natus Vincere',
      shortName: 'NAVI',
    },
    awayTeam: {
      name: 'FaZe Clan',
      shortName: 'FAZE',
    },
    stats: {
      currentMap: 'Inferno (10 : 8)',
      kills: [58, 51],
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (BO3)',
        selections: [
          { id: 'sel-1', name: 'NaVi', value: 1.48, initialValue: 1.48, trend: 'steady' },
          { id: 'sel-2', name: 'FaZe Clan', value: 2.65, initialValue: 2.65, trend: 'steady' },
        ],
      },
      {
        id: 'm-map2',
        name: 'Map 2 Winner (Inferno)',
        selections: [
          { id: 'sel-m2-1', name: 'NaVi Map 2', value: 1.62, initialValue: 1.62, trend: 'steady' },
          { id: 'sel-m2-2', name: 'FaZe Map 2', value: 2.28, initialValue: 2.28, trend: 'steady' },
        ],
      },
      {
        id: 'm-rounds',
        name: 'Total Rounds Map 2 (Over/Under 21.5)',
        selections: [
          { id: 'sel-ro', name: 'Over 21.5 Rounds', value: 1.88, initialValue: 1.88, trend: 'steady' },
          { id: 'sel-ru', name: 'Under 21.5 Rounds', value: 1.92, initialValue: 1.92, trend: 'steady' },
        ],
      },
    ],
  },
  {
    id: 'cs-2',
    sport: 'cs2',
    league: 'ESL Pro League',
    status: 'upcoming',
    period: 'Today 19:00',
    homeScore: 0,
    awayScore: 0,
    homeTeam: {
      name: 'Team Vitality',
      shortName: 'VIT',
    },
    awayTeam: {
      name: 'Team Spirit',
      shortName: 'TS',
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (BO3)',
        selections: [
          { id: 'sel-1', name: 'Vitality', value: 1.95, initialValue: 1.95, trend: 'steady' },
          { id: 'sel-2', name: 'Team Spirit', value: 1.85, initialValue: 1.85, trend: 'steady' },
        ],
      },
    ],
  },

  // DOTA 2 (ESPORTS)
  {
    id: 'dota-1',
    sport: 'dota2',
    league: 'The International Champions',
    status: 'live',
    period: 'Game 1 (24:15 min)',
    homeScore: 0,
    awayScore: 0,
    isHot: true,
    homeTeam: {
      name: 'Team Spirit',
      shortName: 'TS',
    },
    awayTeam: {
      name: 'Team Liquid',
      shortName: 'TL',
    },
    stats: {
      kills: [19, 14],
    },
    markets: [
      {
        id: 'm-1x2',
        name: 'Match Winner (BO3)',
        selections: [
          { id: 'sel-1', name: 'Team Spirit', value: 1.55, initialValue: 1.55, trend: 'steady' },
          { id: 'sel-2', name: 'Team Liquid', value: 2.45, initialValue: 2.45, trend: 'steady' },
        ],
      },
      {
        id: 'm-game1',
        name: 'Game 1 Winner',
        selections: [
          { id: 'sel-g1-1', name: 'Team Spirit Game 1', value: 1.40, initialValue: 1.40, trend: 'steady' },
          { id: 'sel-g1-2', name: 'Team Liquid Game 1', value: 2.90, initialValue: 2.90, trend: 'steady' },
        ],
      },
    ],
  },
];

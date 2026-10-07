import React from 'react';
import { 
  Trophy, 
  Flame, 
  Activity, 
  Crosshair, 
  ShieldAlert, 
  Layers, 
  Search, 
  X,
  Radio
} from 'lucide-react';
import { SportId } from '../types';

interface SportTabsProps {
  activeSport: SportId;
  onSelectSport: (sport: SportId) => void;
  statusFilter: 'all' | 'live' | 'upcoming';
  onSelectStatusFilter: (status: 'all' | 'live' | 'upcoming') => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  liveMatchesCount: number;
}

const sportsConfig: { id: SportId; name: string; icon: React.ReactNode; badge?: string }[] = [
  { id: 'all', name: 'All Sports', icon: <Layers className="w-4 h-4" /> },
  { id: 'football', name: 'Football', icon: <Flame className="w-4 h-4" /> },
  { id: 'basketball', name: 'Basketball', icon: <Trophy className="w-4 h-4" /> },
  { id: 'tennis', name: 'Tennis', icon: <Activity className="w-4 h-4" /> },
  { id: 'cs2', name: 'CS2 Esports', icon: <Crosshair className="w-4 h-4" />, badge: 'Major' },
  { id: 'dota2', name: 'Dota 2', icon: <ShieldAlert className="w-4 h-4" />, badge: 'TI' },
];

export const SportTabs: React.FC<SportTabsProps> = ({
  activeSport,
  onSelectSport,
  statusFilter,
  onSelectStatusFilter,
  searchQuery,
  onSearchChange,
  liveMatchesCount,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Navigation Pills */}
      <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
        <div className="flex items-center gap-2">
          {sportsConfig.map((item) => {
            const isActive = activeSport === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectSport(item.id)}
                className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all border ${
                  isActive
                    ? 'bg-slate-900 text-white border-slate-900 shadow-sm shadow-slate-900/10'
                    : 'bg-white text-slate-600 border-slate-200/90 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <span className={isActive ? 'text-emerald-400' : 'text-slate-400'}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
                {item.badge && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md uppercase tracking-wider ${
                    isActive ? 'bg-indigo-500/30 text-indigo-300' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filter Toolbar: Status tabs + Search input */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-2 sm:p-2.5 rounded-2xl border border-slate-200/80 shadow-xs">
        {/* Status Toggle Buttons */}
        <div className="flex items-center gap-1 bg-slate-100/80 p-1 rounded-xl">
          <button
            type="button"
            onClick={() => onSelectStatusFilter('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'all'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            All Events
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('live')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'live'
                ? 'bg-red-500 text-white shadow-xs'
                : 'text-slate-600 hover:text-red-600'
            }`}
          >
            <Radio className="w-3.5 h-3.5 animate-pulse" />
            <span>Live Now</span>
            <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
              statusFilter === 'live' ? 'bg-white/20 text-white' : 'bg-red-100 text-red-700'
            }`}>
              {liveMatchesCount}
            </span>
          </button>
          <button
            type="button"
            onClick={() => onSelectStatusFilter('upcoming')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
              statusFilter === 'upcoming'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Upcoming
          </button>
        </div>

        {/* Live Search Box */}
        <div className="relative flex-1 max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search teams, leagues..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/90 rounded-xl pl-9 pr-8 py-1.5 text-xs font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

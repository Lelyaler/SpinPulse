import React from 'react';
import { 
  Search,
  Filter
} from 'lucide-react';
import { GameCategory, GameProvider } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface CategoryNavProps {
  activeCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  selectedProvider: string;
  onSelectProvider: (prov: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  totalGames: number;
}

const categories: { id: GameCategory; label: string; icon: string; count?: number }[] = [
  { id: 'all', label: 'All Games', icon: '🌟' },
  { id: 'slots', label: 'Slots', icon: '🎰' },
  { id: 'live', label: 'Live Casino', icon: '🎲' },
  { id: 'crash', label: 'Crash Games', icon: '🚀' },
  { id: 'table', label: 'Table Games', icon: '🃏' },
  { id: 'jackpot', label: 'Jackpots', icon: '💰' },
];

const providers: (GameProvider | 'All Providers')[] = [
  'All Providers',
  'Pragmatic Play',
  'Evolution',
  'NetEnt',
  'Hacksaw Gaming',
  'Play\'n GO',
  'NoLimit City',
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  selectedProvider,
  onSelectProvider,
  searchQuery,
  onSearchChange,
  totalGames,
}) => {
  return (
    <div className="space-y-4">
      {/* Category Pills & Search Row */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Category horizontal scrolling bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playButtonClick();
                  onSelectCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-linear-to-r from-amber-500 to-amber-600 text-white shadow-md shadow-amber-500/25 scale-[1.02]'
                    : 'bg-white hover:bg-amber-50/80 text-slate-700 hover:text-amber-800 border border-slate-200/80 hover:border-amber-300'
                }`}
              >
                <span className="text-base">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search Bar */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder={`Search ${totalGames} games, slots, live...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm font-semibold rounded-2xl bg-white border border-slate-200 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/60 shadow-xs transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Provider Filter bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1 mr-1">
          <Filter className="w-3 h-3 text-amber-500" />
          Provider:
        </span>
        {providers.map((prov) => {
          const isSelected = selectedProvider === prov;
          return (
            <button
              key={prov}
              onClick={() => {
                playButtonClick();
                onSelectProvider(prov);
              }}
              className={`px-3 py-1.5 rounded-xl font-bold transition-all shrink-0 cursor-pointer ${
                isSelected
                  ? 'bg-amber-100 text-amber-900 border border-amber-300 shadow-xs'
                  : 'bg-white/80 hover:bg-amber-50 text-slate-600 border border-slate-200/70 hover:border-amber-200'
              }`}
            >
              {prov}
            </button>
          );
        })}
      </div>
    </div>
  );
};

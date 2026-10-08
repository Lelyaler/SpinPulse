import React, { useRef, useState, useEffect } from 'react';
import { 
  Search,
  Filter,
  ChevronLeft,
  ChevronRight
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
  favoritesCount: number;
  isRu: boolean;
}

const providers: (GameProvider | 'All Providers')[] = [
  'All Providers',
  'Pragmatic Play',
  'Hacksaw Gaming',
  'Push Gaming',
  'NoLimit City',
  '3 Oaks',
  'SmartSoft',
  'BGaming',
  'Belatra',
  'Endorphina',
  'Evoplay',
  'Spinomenal',
  'Gamzix',
  'Turbo Games',
  'Amusnet',
  'Evolution',
  'Yggdrasil',
  'PG Soft',
  'NetEnt',
];

export const CategoryNav: React.FC<CategoryNavProps> = ({
  activeCategory,
  onSelectCategory,
  selectedProvider,
  onSelectProvider,
  searchQuery,
  onSearchChange,
  totalGames,
  favoritesCount,
  isRu,
}) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const categories: { id: GameCategory; label: string; icon: string; badge?: string }[] = [
    { id: 'all', label: isRu ? 'Все игры' : 'All Games', icon: '🌟' },
    { id: 'slots', label: isRu ? 'Слоты' : 'Slots', icon: '🎰', badge: 'HOT' },
    { id: 'live', label: isRu ? 'Live Казино' : 'Live Casino', icon: '🎲', badge: 'HD' },
    { id: 'crash', label: isRu ? 'Краш' : 'Crash Games', icon: '🚀', badge: 'NEW' },
    { id: 'bonusbuy', label: 'Bonus Buy', icon: '⚡' },
    { id: 'jackpot', label: isRu ? 'Джекпоты' : 'Jackpots', icon: '💰' },
    { id: 'table', label: isRu ? 'Настольные' : 'Table Games', icon: '🃏' },
    { id: 'favorites', label: isRu ? 'Избранное' : 'Favorites', icon: '❤️' },
  ];

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -260 : 260;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      playButtonClick();
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative group/nav">
        {canScrollLeft && (
          <button
            onClick={() => handleScroll('left')}
            aria-label={isRu ? 'Прокрутить категории влево' : 'Scroll categories left'}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-amber-200 text-slate-700 hover:text-orange-600 hover:bg-amber-50 flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
        )}

        <div
          ref={scrollContainerRef}
          onScroll={checkScroll}
          className="flex items-center gap-2 overflow-x-auto pb-1 pt-0.5 scrollbar-none scroll-smooth w-full px-0.5"
        >
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  playButtonClick();
                  onSelectCategory(cat.id);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm sm:text-[15px] font-bold transition-all shrink-0 cursor-pointer min-h-[44px] ${
                  isActive
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.03] border border-amber-300'
                    : 'bg-white hover:bg-amber-50/70 text-slate-800 hover:text-orange-600 shadow-2xs border border-amber-200/60 hover:border-amber-300'
                }`}
              >
                <span className="text-base select-none">{cat.icon}</span>
                <span>{cat.label}</span>
                {cat.badge && (
                  <span className={`text-[10px] font-extrabold px-1.5 py-0.5 rounded-md ${
                    isActive ? 'bg-white/20 text-white' : 'bg-linear-to-r from-rose-500 to-orange-500 text-white font-black shadow-2xs'
                  }`}>
                    {cat.badge}
                  </span>
                )}
                {cat.id === 'favorites' && favoritesCount > 0 && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-slate-950' : 'bg-rose-500 text-white'
                  }`}>
                    {favoritesCount}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {canScrollRight && (
          <button
            onClick={() => handleScroll('right')}
            aria-label={isRu ? 'Прокрутить категории вправо' : 'Scroll categories right'}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white shadow-md border border-amber-200 text-slate-700 hover:text-orange-600 hover:bg-amber-50 flex items-center justify-center transition-all cursor-pointer hidden sm:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
        <div className="relative flex-1 min-w-0">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            placeholder={isRu ? `Поиск среди ${totalGames} игр и слотов...` : `Search ${totalGames} games, slots...`}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            aria-label={isRu ? 'Поиск игр' : 'Search games'}
            className="w-full pl-10 pr-10 py-2.5 text-sm font-semibold rounded-xl bg-white border border-amber-200/80 hover:border-amber-300 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-200/50 shadow-2xs transition-all min-h-[44px]"
          />
          {searchQuery && (
            <button
              onClick={() => {
                playButtonClick();
                onSearchChange('');
              }}
              aria-label={isRu ? 'Очистить строку поиска' : 'Clear search input'}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 font-bold cursor-pointer"
            >
              ✕
            </button>
          )}
        </div>

        <div className="relative flex items-center shrink-0">
          <Filter className="w-3.5 h-3.5 absolute left-3 text-amber-600 pointer-events-none" />
          <select
            value={selectedProvider}
            onChange={(e) => {
              playButtonClick();
              onSelectProvider(e.target.value);
            }}
            aria-label={isRu ? 'Фильтр по провайдеру софта' : 'Filter by game provider'}
            className="w-full sm:w-auto pl-8 pr-8 py-2.5 bg-white border border-amber-200/80 hover:border-amber-300 rounded-xl text-xs sm:text-sm font-bold text-slate-800 shadow-2xs focus:outline-none focus:ring-2 focus:ring-amber-200/50 cursor-pointer min-h-[44px] appearance-none"
          >
            {providers.map((prov) => (
              <option key={prov} value={prov}>
                {prov === 'All Providers' && isRu ? 'Все провайдеры (20)' : prov}
              </option>
            ))}
          </select>
          <div className="absolute right-3 pointer-events-none text-slate-400 text-[10px]">▼</div>
        </div>
      </div>

      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs scrollbar-none">
        <span className="text-slate-500 font-bold uppercase tracking-wider text-[11px] shrink-0 flex items-center gap-1 mr-1">
          {isRu ? 'Студии:' : 'Studios:'}
        </span>
        {providers.slice(0, 10).map((prov) => {
          const isSelected = selectedProvider === prov;
          const provLabel = prov === 'All Providers' && isRu ? 'Все' : prov;
          return (
            <button
              key={prov}
              onClick={() => {
                playButtonClick();
                onSelectProvider(prov);
              }}
              aria-label={`Выбрать провайдера: ${provLabel}`}
              className={`px-3 py-1.5 rounded-xl text-xs sm:text-[13px] font-semibold transition-all shrink-0 cursor-pointer min-h-[34px] ${
                isSelected
                  ? 'bg-slate-900 text-white font-bold'
                  : 'bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/70'
              }`}
            >
              {provLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

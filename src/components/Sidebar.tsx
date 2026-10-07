import React from 'react';
import { 
  Crown, 
  Trophy, 
  Gift, 
  Sparkles, 
  MessageSquare, 
  Smartphone, 
  Globe, 
  X,
  Heart
} from 'lucide-react';
import { GameCategory } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
  activeCategory: GameCategory;
  onSelectCategory: (cat: GameCategory) => void;
  onOpenTournaments: () => void;
  onOpenBonuses: () => void;
  onOpenVip: () => void;
  onOpenLuckyWheel: () => void;
  onOpenSupport: () => void;
  currentLanguage: 'RU' | 'EN';
  onToggleLanguage: () => void;
  favoritesCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  isOpen,
  onClose,
  activeCategory,
  onSelectCategory,
  onOpenTournaments,
  onOpenBonuses,
  onOpenVip,
  onOpenLuckyWheel,
  onOpenSupport,
  currentLanguage,
  onToggleLanguage,
  favoritesCount,
}) => {
  const isRu = currentLanguage === 'RU';

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-slate-100 shadow-sm flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="h-20 px-5 flex items-center justify-between border-b border-slate-100 bg-white">
          <a href="#" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center text-amber-400">
              <Crown className="w-5 h-5 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Spin<span className="text-amber-500">Pulse</span>
                </span>
                <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase bg-slate-100 text-slate-700">
                  VIP
                </span>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block leading-none">
                CASINO LOBBY
              </span>
            </div>
          </a>

          <button
            onClick={onClose}
            aria-label={isRu ? 'Закрыть меню' : 'Close menu'}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6">
          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {isRu ? 'Игры и Лобби' : 'Games & Lobby'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('all');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'all'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🌟</span>
                  <span>{isRu ? 'Все игры' : 'All Games'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('slots');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'slots'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎰</span>
                  <span>{isRu ? 'Слоты' : 'Slots'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-500 text-white uppercase">
                  HOT
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('live');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'live'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎲</span>
                  <span>{isRu ? 'Live Казино' : 'Live Casino'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  HD
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('crash');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'crash'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🚀</span>
                  <span>{isRu ? 'Краш / Instant' : 'Instant Games'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  NEW
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('bonusbuy');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'bonusbuy'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">⚡</span>
                  <span>{isRu ? 'Bonus Buy' : 'Bonus Buy'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('jackpot');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'jackpot'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">💰</span>
                  <span>{isRu ? 'Джекпоты' : 'Jackpots'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('table');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'table'
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🃏</span>
                  <span>{isRu ? 'Настольные' : 'Table Games'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('favorites');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-bold text-xs transition-colors cursor-pointer min-h-[44px] ${
                  activeCategory === 'favorites'
                    ? 'bg-rose-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{isRu ? 'Избранное' : 'Favorites'}</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {isRu ? 'События и Промо' : 'Events & Promos'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenTournaments();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>{isRu ? 'Турниры' : 'Tournaments'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-800">
                  $50,000
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenBonuses();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-rose-500" />
                  <span>{isRu ? 'Бонусы' : 'Bonuses'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-rose-50 text-rose-700">
                  100%
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenVip();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-amber-500" />
                  <span>{isRu ? 'VIP Клуб' : 'VIP Club'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-slate-100 text-slate-700">
                  Gold
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenLuckyWheel();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer group min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  <span>{isRu ? 'Колесо Удачи' : 'Lucky Wheel'}</span>
                </div>
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-400 text-slate-950">
                  FREE
                </span>
              </button>
            </div>
          </div>

          <div>
            <span className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
              {isRu ? 'Сервис и Помощь' : 'Service & Support'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenSupport();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-semibold text-xs text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer min-h-[44px]"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>{isRu ? 'Поддержка 24/7' : '24/7 Support'}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              <div className="px-3 py-2.5 rounded-xl bg-slate-50 text-[11px] font-medium text-slate-700">
                <div className="flex items-center gap-2 font-bold mb-0.5 text-slate-900">
                  <Smartphone className="w-3.5 h-3.5 text-slate-600" />
                  <span>{isRu ? 'Мобильное приложение' : 'Mobile Web App'}</span>
                </div>
                <p className="text-[10px] text-slate-500">
                  {isRu ? 'Установите PWA на iPhone и Android в один клик' : 'Install PWA app on iPhone & Android with zero download'}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={() => {
              playButtonClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors cursor-pointer min-h-[36px]"
          >
            <Globe className="w-3.5 h-3.5 text-slate-600" />
            <span>{currentLanguage === 'RU' ? 'Русский (RU)' : 'English (EN)'}</span>
          </button>

          <span className="text-[10px] font-bold text-slate-400">
            v2.4
          </span>
        </div>
      </aside>
    </>
  );
};

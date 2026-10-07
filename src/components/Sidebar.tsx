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
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      {/* Sidebar container */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-amber-200/80 shadow-xl flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="h-20 px-5 flex items-center justify-between border-b border-amber-100 bg-amber-50/40">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 via-amber-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform">
              <Crown className="w-5 h-5 fill-amber-100 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-black tracking-tight text-slate-900">
                  Spin<span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Pulse</span>
                </span>
                <span className="px-1.5 py-0.2 rounded text-[9px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                  IZZI
                </span>
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-600 block leading-none">
                VIP CASINO LOBBY
              </span>
            </div>
          </a>

          {/* Mobile close button */}
          <button
            onClick={onClose}
            aria-label={isRu ? 'Закрыть меню' : 'Close menu'}
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 hover:bg-slate-100 lg:hidden cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation scroll area */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-6 scrollbar-thin scrollbar-thumb-amber-200">
          {/* Section: Games */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              {isRu ? 'Игры и Лобби' : 'Games & Lobby'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('all');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'all'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
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
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'slots'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎰</span>
                  <span>{isRu ? 'Слоты' : 'Slots'}</span>
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-rose-500 text-white uppercase">
                  HOT
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('live');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'live'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🎲</span>
                  <span>{isRu ? 'Live Казино' : 'Live Casino'}</span>
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                  HD
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('crash');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'crash'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-base">🚀</span>
                  <span>{isRu ? 'Краш / Instant' : 'Instant Games'}</span>
                </div>
                <span className="text-[10px] font-extrabold px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  NEW
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('bonusbuy');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'bonusbuy'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
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
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'jackpot'
                    ? 'bg-amber-500 text-white shadow-md shadow-amber-500/20'
                    : 'text-slate-700 hover:bg-amber-50 hover:text-amber-900'
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
                  onSelectCategory('favorites');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs transition-all cursor-pointer ${
                  activeCategory === 'favorites'
                    ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20'
                    : 'text-slate-700 hover:bg-rose-50 hover:text-rose-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Heart className={`w-4 h-4 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{isRu ? 'Избранное' : 'Favorites'}</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-rose-100 text-rose-700">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Section: Events & Promo */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              {isRu ? 'События и Промо' : 'Events & Promos'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenTournaments();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  <span>{isRu ? 'Турниры' : 'Tournaments'}</span>
                </div>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-900">
                  $50,000
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenBonuses();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Gift className="w-4 h-4 text-rose-500" />
                  <span>{isRu ? 'Бонусы' : 'Bonuses'}</span>
                </div>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-rose-100 text-rose-800">
                  100%
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenVip();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <Crown className="w-4 h-4 text-amber-600" />
                  <span>{isRu ? 'VIP Клуб' : 'VIP Club'}</span>
                </div>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-amber-100 text-amber-800">
                  Gold
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenLuckyWheel();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-45 transition-transform" />
                  <span>{isRu ? 'Колесо Удачи' : 'Lucky Wheel'}</span>
                </div>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded-md bg-linear-to-r from-amber-400 to-rose-400 text-white">
                  FREE
                </span>
              </button>
            </div>
          </div>

          {/* Section: Support & Info */}
          <div>
            <span className="px-3 text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              {isRu ? 'Сервис и Помощь' : 'Service & Support'}
            </span>
            <div className="space-y-1">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenSupport();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3 py-2.5 rounded-2xl font-bold text-xs text-slate-700 hover:bg-amber-50 hover:text-amber-900 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-slate-500" />
                  <span>{isRu ? 'Поддержка 24/7' : '24/7 Support'}</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
              </button>

              <div className="px-3 py-2.5 rounded-2xl bg-amber-50/60 border border-amber-200/50 text-[11px] font-medium text-amber-900">
                <div className="flex items-center gap-2 font-bold mb-0.5">
                  <Smartphone className="w-3.5 h-3.5 text-amber-600" />
                  <span>{isRu ? 'Мобильное приложение' : 'Mobile Web App'}</span>
                </div>
                <p className="text-[10px] text-amber-700/80">
                  {isRu ? 'Установите PWA на iPhone и Android в один клик' : 'Install PWA app on iPhone & Android with zero download'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Footer: Language Switcher */}
        <div className="p-3.5 border-t border-amber-100 bg-amber-50/30 flex items-center justify-between">
          <button
            onClick={() => {
              playButtonClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold bg-white border border-amber-200 text-slate-700 hover:text-amber-800 transition-colors cursor-pointer"
          >
            <Globe className="w-3.5 h-3.5 text-amber-600" />
            <span>{currentLanguage === 'RU' ? 'Русский (RU)' : 'English (EN)'}</span>
          </button>

          <span className="text-[10px] font-extrabold text-slate-400">
            v2.4 VIP
          </span>
        </div>
      </aside>
    </>
  );
};

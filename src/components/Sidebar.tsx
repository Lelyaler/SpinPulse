import React, { useState, useEffect } from 'react';
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
  const [isLg, setIsLg] = useState(() => typeof window !== 'undefined' && window.innerWidth >= 1024);

  useEffect(() => {
    const handleResize = () => setIsLg(window.innerWidth >= 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!isOpen && !isLg) {
    return null;
  }

  return (
    <>
      {isOpen && (
        <div 
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 backdrop-blur-xs lg:hidden transition-opacity"
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-full w-80 bg-white border-r border-slate-100 shadow-md flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header Branding */}
        <div className="h-18 sm:h-20 px-6 flex items-center justify-between border-b border-orange-800/60 bg-linear-to-r from-orange-950 via-orange-900 to-amber-950 text-white shadow-xs">
          <a href="#" className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-slate-950/90 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-sm">
              <Crown className="w-6 h-6 fill-amber-400 text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-black tracking-tight text-white drop-shadow-xs">
                  Spin<span className="text-amber-400">Pulse</span>
                </span>
                <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase bg-slate-950/70 text-amber-300 border border-amber-300/30 tracking-wider">
                  VIP
                </span>
              </div>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange-200/80 block leading-none mt-0.5">
                CASINO LOBBY
              </span>
            </div>
          </a>

          <button
            onClick={onClose}
            aria-label={isRu ? 'Закрыть меню' : 'Close menu'}
            className="p-2 rounded-xl text-orange-200/80 hover:text-white hover:bg-white/15 lg:hidden cursor-pointer active:scale-95 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation with Custom Luxury Gold Scrollbar */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-7 sidebar-luxury-scroll">
          {/* Main Lobby Categories */}
          <div>
            <span className="px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
              {isRu ? 'Игры и Лобби' : 'Games & Lobby'}
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('all');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'all'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🌟</span>
                  <span>{isRu ? 'Все игры' : 'All Games'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('slots');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'slots'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎰</span>
                  <span>{isRu ? 'Слоты' : 'Slots'}</span>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-lg uppercase shadow-xs ${
                  activeCategory === 'slots' ? 'bg-white text-orange-600' : 'bg-rose-500 text-white'
                }`}>
                  HOT
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('live');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'live'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🎲</span>
                  <span>{isRu ? 'Live Казино' : 'Live Casino'}</span>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                  activeCategory === 'live' ? 'bg-white text-orange-600' : 'bg-emerald-100 text-emerald-800'
                }`}>
                  HD
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('crash');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'crash'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🚀</span>
                  <span>{isRu ? 'Краш / Instant' : 'Instant Games'}</span>
                </div>
                <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                  activeCategory === 'crash' ? 'bg-white text-orange-600' : 'bg-amber-100 text-amber-900'
                }`}>
                  NEW
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('bonusbuy');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'bonusbuy'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">⚡</span>
                  <span>{isRu ? 'Bonus Buy' : 'Bonus Buy'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('jackpot');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'jackpot'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">💰</span>
                  <span>{isRu ? 'Джекпоты' : 'Jackpots'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('table');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'table'
                    ? 'bg-linear-to-r from-orange-500 via-amber-500 to-amber-600 text-white shadow-md shadow-orange-500/25 scale-[1.02] border border-amber-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-lg">🃏</span>
                  <span>{isRu ? 'Настольные' : 'Table Games'}</span>
                </div>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onSelectCategory('favorites');
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] transition-all cursor-pointer min-h-[48px] ${
                  activeCategory === 'favorites'
                    ? 'bg-linear-to-r from-rose-500 to-pink-600 text-white shadow-md shadow-rose-500/25 scale-[1.02] border border-rose-400/40'
                    : 'text-slate-700 hover:bg-amber-50/70 hover:text-orange-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Heart className={`w-5 h-5 ${favoritesCount > 0 ? 'fill-rose-500 text-rose-500' : 'text-slate-400'}`} />
                  <span>{isRu ? 'Избранное' : 'Favorites'}</span>
                </div>
                {favoritesCount > 0 && (
                  <span className="text-xs font-black px-2 py-0.5 rounded-full bg-rose-100 text-rose-700">
                    {favoritesCount}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Events & Promos */}
          <div>
            <span className="px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
              {isRu ? 'События и Промо' : 'Events & Promos'}
            </span>
            <div className="space-y-1.5">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenTournaments();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] text-slate-700 hover:bg-amber-50 hover:text-amber-950 transition-colors cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <span>{isRu ? 'Турниры' : 'Tournaments'}</span>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-amber-100 text-amber-900 border border-amber-200/60">
                  $50,000
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenBonuses();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] text-slate-700 hover:bg-rose-50 hover:text-rose-950 transition-colors cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <Gift className="w-5 h-5 text-rose-500" />
                  <span>{isRu ? 'Бонусы' : 'Bonuses'}</span>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-rose-100 text-rose-800 border border-rose-200/60">
                  100%
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenVip();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] text-slate-700 hover:bg-amber-50 hover:text-amber-950 transition-colors cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <Crown className="w-5 h-5 text-amber-500" />
                  <span>{isRu ? 'VIP Клуб' : 'VIP Club'}</span>
                </div>
                <span className="text-xs font-black px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 shadow-2xs">
                  Gold
                </span>
              </button>

              <button
                onClick={() => {
                  playButtonClick();
                  onOpenLuckyWheel();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] bg-linear-to-r from-amber-50 to-orange-50 border border-amber-300 text-orange-950 hover:border-amber-400 hover:shadow-xs transition-all cursor-pointer group min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 group-hover:rotate-12 transition-transform" />
                  <span>{isRu ? 'Колесо Удачи' : 'Lucky Wheel'}</span>
                </div>
                <span className="text-xs font-black px-2.5 py-0.5 rounded-lg bg-amber-400 text-slate-950 shadow-xs">
                  FREE
                </span>
              </button>
            </div>
          </div>

          {/* Support & Services */}
          <div>
            <span className="px-3 text-xs font-extrabold uppercase tracking-wider text-slate-400 block mb-2.5">
              {isRu ? 'Сервис и Помощь' : 'Service & Support'}
            </span>
            <div className="space-y-2">
              <button
                onClick={() => {
                  playButtonClick();
                  onOpenSupport();
                  onClose();
                }}
                className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl font-bold text-sm sm:text-[15px] text-slate-700 hover:bg-slate-100 hover:text-slate-950 transition-colors cursor-pointer min-h-[48px]"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-5 h-5 text-slate-500" />
                  <span>{isRu ? 'Поддержка 24/7' : '24/7 Support'}</span>
                </div>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-xs" />
              </button>

              <div className="p-4 rounded-2xl bg-slate-50/90 border border-slate-100 text-slate-700">
                <div className="flex items-center gap-2.5 font-bold mb-1 text-slate-900 text-sm">
                  <Smartphone className="w-4 h-4 text-slate-700" />
                  <span>{isRu ? 'Мобильное приложение' : 'Mobile Web App'}</span>
                </div>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {isRu ? 'Установите PWA на iPhone и Android в один клик' : 'Install PWA app on iPhone & Android with zero download'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer info & language selector */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
          <button
            onClick={() => {
              playButtonClick();
              onToggleLanguage();
            }}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-sm font-bold bg-slate-100 hover:bg-slate-200/80 text-slate-800 transition-colors cursor-pointer min-h-[42px]"
          >
            <Globe className="w-4 h-4 text-slate-600" />
            <span>{currentLanguage === 'RU' ? 'Русский (RU)' : 'English (EN)'}</span>
          </button>

          <span className="text-xs font-bold text-slate-400">
            v2.4 VIP
          </span>
        </div>
      </aside>
    </>
  );
};

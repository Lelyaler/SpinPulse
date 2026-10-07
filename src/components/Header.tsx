import React, { useState } from 'react';
import { 
  Menu,
  Coins, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  History, 
  Gift,
  Bell,
  Search,
  Crown
} from 'lucide-react';
import { setSoundEnabled, playButtonClick, playWinCoinsSound } from '../utils/casinoAudio';

interface HeaderProps {
  onToggleSidebar: () => void;
  balance: number;
  onTopUp: () => void;
  onOpenHistory: () => void;
  soundActive: boolean;
  onToggleSound: (enabled: boolean) => void;
  onClaimDailyBonus: () => void;
  hasClaimedDaily: boolean;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  isRu: boolean;
  onOpenVip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onToggleSidebar,
  balance,
  onTopUp,
  onOpenHistory,
  soundActive,
  onToggleSound,
  onClaimDailyBonus,
  hasClaimedDaily,
  searchQuery,
  onSearchChange,
  isRu,
  onOpenVip,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    { id: 1, title: isRu ? 'Турнир стартовал!' : 'Tournament Live!', time: '5m ago', unread: true },
    { id: 2, title: isRu ? 'Кэшбэк начислен: +$125' : 'Weekly Cashback: +$125', time: '1h ago', unread: false },
    { id: 3, title: isRu ? 'Новинка: Sugar Rush 1000' : 'New Game: Sugar Rush 1000', time: '3h ago', unread: false },
  ];

  const toggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    onToggleSound(next);
    if (next) playButtonClick();
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-18 sm:h-20 flex items-center justify-between gap-2.5 sm:gap-4">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => {
              playButtonClick();
              onToggleSidebar();
            }}
            aria-label={isRu ? 'Открыть меню навигации' : 'Toggle navigation menu'}
            className="p-2 sm:p-2.5 rounded-xl text-slate-700 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            title="Toggle Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative hidden md:block w-56 lg:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder={isRu ? 'Поиск игр и слотов...' : 'Search games, providers...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-8 py-2 text-xs font-semibold rounded-xl bg-slate-100 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-slate-200 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => onSearchChange('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-700 font-bold"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => {
              playButtonClick();
              onClaimDailyBonus();
            }}
            disabled={hasClaimedDaily}
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              hasClaimedDaily 
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : 'bg-slate-100 hover:bg-slate-200/80 text-slate-800'
            }`}
          >
            <Gift className={`w-3.5 h-3.5 ${hasClaimedDaily ? 'text-slate-400' : 'text-rose-500'}`} />
            <span>{hasClaimedDaily ? (isRu ? 'Бонус взят' : 'Claimed') : (isRu ? 'Бонус +$250' : 'Free +$250')}</span>
          </button>

          <div className="flex items-center bg-slate-100/90 rounded-xl pl-3 pr-1.5 py-1.5">
            <div className="flex items-center gap-1.5 sm:gap-2 mr-2">
              <Coins className="w-4 h-4 sm:w-5 sm:h-5 text-amber-500" />
              <div>
                <span className="hidden sm:block text-[9px] uppercase font-bold tracking-wider text-slate-500 leading-none">
                  {isRu ? 'Демо Баланс' : 'Demo Balance'}
                </span>
                <span className="text-sm sm:text-base font-black tracking-tight text-slate-900">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                playWinCoinsSound();
                onTopUp();
              }}
              aria-label={isRu ? 'Пополнить демо баланс на 500 долларов' : 'Deposit $500 demo coins'}
              title="Add $500 Demo Coins"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white font-bold text-xs shadow-2xs transition-colors cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span>{isRu ? 'Депозит' : 'Deposit'}</span>
            </button>
          </div>

          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              aria-label={isRu ? 'Уведомления' : 'Notifications'}
              className="w-10 h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors relative cursor-pointer flex items-center justify-center"
              title="Notifications"
            >
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-100 shadow-xl p-3 z-50 animate-in fade-in zoom-in-95">
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
                  <span className="text-xs font-black text-slate-900">
                    {isRu ? 'Уведомления' : 'Notifications'}
                  </span>
                  <span className="text-[10px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-full">
                    3 New
                  </span>
                </div>
                <div className="space-y-1.5">
                  {notifications.map((n) => (
                    <div key={n.id} className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/70 transition-colors text-xs">
                      <div className="font-bold text-slate-800">{n.title}</div>
                      <span className="text-[10px] text-slate-500">{n.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={toggleSound}
            aria-label={soundActive ? (isRu ? 'Выключить звук' : 'Mute sound') : (isRu ? 'Включить звук' : 'Unmute sound')}
            title={soundActive ? 'Mute' : 'Unmute'}
            className="w-10 h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center"
          >
            {soundActive ? <Volume2 className="w-4 h-4 sm:w-5 sm:h-5 text-slate-800" /> : <VolumeX className="w-4 h-4 sm:w-5 sm:h-5 text-slate-400" />}
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onOpenHistory();
            }}
            aria-label={isRu ? 'История вращений' : 'Recent spins history'}
            title="Recent Spins"
            className="w-10 h-10 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors cursor-pointer flex items-center justify-center"
          >
            <History className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onOpenVip();
            }}
            aria-label={isRu ? 'Открыть статус VIP программы' : 'Open VIP status'}
            className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-100 hover:opacity-80 transition-opacity cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-amber-400 text-xs font-black">
              <Crown className="w-4 h-4 fill-amber-400 text-amber-400" />
            </div>
            <div className="text-left leading-none">
              <span className="block text-xs font-black text-slate-900">Gold VIP</span>
              <span className="text-[10px] font-bold text-slate-500">Tier 3 • 10% Cash</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};

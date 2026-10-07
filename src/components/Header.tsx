import React from 'react';
import { 
  Crown, 
  Coins, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  History, 
  Gift
} from 'lucide-react';
import { setSoundEnabled, playButtonClick, playWinCoinsSound } from '../utils/casinoAudio';

interface HeaderProps {
  balance: number;
  onTopUp: () => void;
  onOpenHistory: () => void;
  soundActive: boolean;
  onToggleSound: (enabled: boolean) => void;
  onClaimDailyBonus: () => void;
  hasClaimedDaily: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  balance,
  onTopUp,
  onOpenHistory,
  soundActive,
  onToggleSound,
  onClaimDailyBonus,
  hasClaimedDaily,
}) => {
  const toggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    onToggleSound(next);
    if (next) playButtonClick();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-amber-200/70 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-3">
        {/* Brand Logo & VIP status */}
        <div className="flex items-center gap-3">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-11 h-11 rounded-2xl bg-linear-to-tr from-amber-500 via-amber-600 to-rose-500 flex items-center justify-center text-white shadow-md shadow-amber-500/25 group-hover:scale-105 transition-transform duration-200">
              <Crown className="w-6 h-6 fill-amber-100 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-2xl font-black tracking-tight text-slate-900">
                  Spin<span className="bg-linear-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">Pulse</span>
                </span>
                <span className="px-1.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-100 text-rose-700 border border-rose-200">
                  VIP
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-amber-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LOBBY ONLINE • 1,420 PLAYERS</span>
              </div>
            </div>
          </a>
        </div>

        {/* Center / Right controls */}
        <div className="flex items-center gap-2.5 sm:gap-4">
          {/* Daily Bonus Button */}
          <button
            onClick={() => {
              playButtonClick();
              onClaimDailyBonus();
            }}
            disabled={hasClaimedDaily}
            className={`hidden md:inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold border transition-all duration-200 ${
              hasClaimedDaily 
                ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
                : 'bg-linear-to-r from-amber-50 to-rose-50 text-amber-900 border-amber-300 hover:border-amber-400 hover:shadow-sm shadow-xs'
            }`}
          >
            <Gift className={`w-4 h-4 ${hasClaimedDaily ? 'text-slate-400' : 'text-rose-500 animate-bounce'}`} />
            <span>{hasClaimedDaily ? 'Bonus Claimed' : 'Daily Free +$250'}</span>
          </button>

          {/* Balance Pill */}
          <div className="flex items-center bg-linear-to-r from-amber-50 to-amber-100/60 border border-amber-300/80 rounded-2xl pl-3 pr-1.5 py-1.5 shadow-xs">
            <div className="flex items-center gap-2 mr-2.5">
              <Coins className="w-5 h-5 text-amber-600" />
              <div>
                <span className="block text-[10px] uppercase font-bold tracking-wider text-amber-700 leading-none">
                  Demo Balance
                </span>
                <span className="text-base sm:text-lg font-black tracking-tight text-slate-900">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                playWinCoinsSound();
                onTopUp();
              }}
              title="Add $500 Demo Coins"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-bold text-xs shadow-xs transition-transform"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+$500</span>
            </button>
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            title={soundActive ? 'Mute Sounds' : 'Unmute Sounds'}
            className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors shadow-xs"
          >
            {soundActive ? <Volume2 className="w-4 h-4 text-amber-600" /> : <VolumeX className="w-4 h-4 text-slate-400" />}
          </button>

          {/* Spin History Drawer button */}
          <button
            onClick={() => {
              playButtonClick();
              onOpenHistory();
            }}
            title="Recent Plays"
            className="p-2.5 rounded-xl border border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50 text-slate-600 hover:text-amber-700 transition-colors shadow-xs"
          >
            <History className="w-4 h-4" />
          </button>

          {/* VIP Level Badge */}
          <div className="hidden lg:flex items-center gap-2 pl-3 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-linear-to-tr from-amber-400 to-yellow-300 flex items-center justify-center text-amber-900 text-xs font-black shadow-xs">
              👑
            </div>
            <div className="text-left leading-none">
              <span className="block text-xs font-bold text-slate-900">Gold VIP</span>
              <span className="text-[10px] font-semibold text-amber-600">Tier 3 • 1.5x Boost</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

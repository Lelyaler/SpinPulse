import React from 'react';
import { 
  Zap, 
  Wallet, 
  PlusCircle, 
  Volume2, 
  VolumeX, 
  Receipt, 
  Pause, 
  Play, 
  Sparkles 
} from 'lucide-react';
import { setSoundEnabled, playClickSound } from '../utils/soundEffects';

interface HeaderProps {
  balance: number;
  onTopUp: () => void;
  activeBetsCount: number;
  onOpenMyBets: () => void;
  isSimulating: boolean;
  onToggleSimulating: () => void;
  onTriggerEvent: () => void;
  soundActive: boolean;
  onToggleSound: (enabled: boolean) => void;
  slipItemsCount: number;
  onOpenMobileSlip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  balance,
  onTopUp,
  activeBetsCount,
  onOpenMyBets,
  isSimulating,
  onToggleSimulating,
  onTriggerEvent,
  soundActive,
  onToggleSound,
  slipItemsCount,
  onOpenMobileSlip,
}) => {
  const toggleSound = () => {
    const next = !soundActive;
    setSoundEnabled(next);
    onToggleSound(next);
    if (next) playClickSound();
  };

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand Logo & Live status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-linear-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
              <Zap className="w-5 h-5 fill-white text-white" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
                Match<span className="text-emerald-600">Pulse</span>
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>LIVE FEED</span>
              </div>
            </div>
          </div>

          {/* Quick Simulation Toggles (Desktop) */}
          <div className="hidden lg:flex items-center gap-1.5 ml-4 pl-4 border-l border-slate-200">
            <button
              type="button"
              onClick={onToggleSimulating}
              title={isSimulating ? "Pause live odds tick" : "Resume live odds"}
              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                isSimulating 
                  ? 'bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100'
                  : 'bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100'
              }`}
            >
              {isSimulating ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              {isSimulating ? 'Ticking Live' : 'Paused'}
            </button>

            <button
              type="button"
              onClick={onTriggerEvent}
              title="Simulate sudden goal/point"
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-100 text-slate-700 border border-slate-200 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Sim Goal
            </button>
          </div>
        </div>

        {/* Right side: Wallet, Sounds, Bets */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Audio FX Toggle */}
          <button
            type="button"
            onClick={toggleSound}
            title={soundActive ? "Mute Web Audio effects" : "Enable Web Audio effects"}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors border border-transparent hover:border-slate-200"
          >
            {soundActive ? (
              <Volume2 className="w-4.5 h-4.5 text-emerald-600" />
            ) : (
              <VolumeX className="w-4.5 h-4.5 text-slate-400" />
            )}
          </button>

          {/* Wallet Balance Chip */}
          <div className="flex items-center bg-slate-100/90 border border-slate-200/90 rounded-2xl p-1 pl-3 gap-2">
            <div className="flex items-center gap-1.5">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none">
                  Balance
                </span>
                <span className="text-sm font-extrabold text-slate-900 font-mono-nums leading-tight">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={onTopUp}
              title="Top up $500 free demo credits"
              className="inline-flex items-center gap-1 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white px-2.5 py-1.5 rounded-xl text-xs font-bold shadow-xs transition-all"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+$500</span>
            </button>
          </div>

          {/* My Bets Button */}
          <button
            type="button"
            onClick={onOpenMyBets}
            className="relative inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-sm font-bold bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-xs transition-all"
          >
            <Receipt className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">My Bets</span>
            {activeBetsCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500 text-white">
                {activeBetsCount}
              </span>
            )}
          </button>

          {/* Mobile Betslip Float Trigger */}
          <button
            type="button"
            onClick={onOpenMobileSlip}
            className="lg:hidden relative p-2.5 rounded-xl bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
          >
            <Zap className="w-4.5 h-4.5" />
            {slipItemsCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-indigo-600 text-white text-[11px] flex items-center justify-center font-extrabold ring-2 ring-white">
                {slipItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

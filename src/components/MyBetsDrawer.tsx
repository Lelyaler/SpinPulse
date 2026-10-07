import React, { useState } from 'react';
import { 
  X, 
  Receipt, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Sparkles
} from 'lucide-react';
import { PlacedBet } from '../types';
import { playWinSound, playClickSound } from '../utils/soundEffects';

interface MyBetsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bets: PlacedBet[];
  onSettleBet: (betId: string, status: 'won' | 'lost') => void;
}

export const MyBetsDrawer: React.FC<MyBetsDrawerProps> = ({
  isOpen,
  onClose,
  bets,
  onSettleBet,
}) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'settled'>('pending');

  if (!isOpen) return null;

  const pendingBets = bets.filter((b) => b.status === 'pending');
  const settledBets = bets.filter((b) => b.status !== 'pending');

  const displayedBets = activeTab === 'pending' ? pendingBets : settledBets;

  const handleSimulateResolution = (bet: PlacedBet) => {
    // 70% win rate for satisfying demo experience
    const won = Math.random() > 0.3;
    if (won) playWinSound();
    onSettleBet(bet.id, won ? 'won' : 'lost');
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-slate-200">
        {/* Drawer Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-slate-900">
                My Bets History
              </h2>
              <span className="text-xs text-slate-400">
                {bets.length} Total Tickets Placed
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Filters */}
        <div className="grid grid-cols-2 p-2 bg-slate-100/70 border-b border-slate-100">
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('pending');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'pending'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Active / Pending ({pendingBets.length})
          </button>
          <button
            type="button"
            onClick={() => {
              playClickSound();
              setActiveTab('settled');
            }}
            className={`py-2 text-xs font-bold rounded-lg transition-all ${
              activeTab === 'settled'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            Settled / Closed ({settledBets.length})
          </button>
        </div>

        {/* Bets Scrollable List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-3.5">
          {displayedBets.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center text-slate-400 p-4">
              <Receipt className="w-10 h-10 text-slate-300 stroke-1 mb-2" />
              <p className="text-sm font-bold text-slate-600">
                No {activeTab} bets
              </p>
              <p className="text-xs text-slate-400 max-w-[220px] mt-1">
                {activeTab === 'pending'
                  ? 'Placed bets will appear here with live updates.'
                  : 'Completed bets with results and payouts appear here.'}
              </p>
            </div>
          ) : (
            displayedBets.map((bet) => (
              <div
                key={bet.id}
                className="bg-slate-50 border border-slate-200/90 rounded-2xl p-4 space-y-3 shadow-xs"
              >
                {/* Bet Header */}
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 font-bold uppercase text-slate-500 text-[11px]">
                    <span className="px-1.5 py-0.5 rounded bg-slate-200/80 text-slate-700">
                      {bet.type}
                    </span>
                    <span>• {bet.placedAt}</span>
                  </div>

                  {bet.status === 'pending' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Clock className="w-3 h-3 text-amber-500" />
                      In Play
                    </span>
                  )}
                  {bet.status === 'won' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <CheckCircle className="w-3 h-3 text-emerald-600" />
                      WON
                    </span>
                  )}
                  {bet.status === 'lost' && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full border border-slate-200">
                      <XCircle className="w-3 h-3 text-slate-400" />
                      LOST
                    </span>
                  )}
                </div>

                {/* Items in ticket */}
                <div className="space-y-2 pt-1 border-t border-slate-200/60">
                  {bet.items.map((it, idx) => (
                    <div key={idx} className="text-xs space-y-0.5">
                      <div className="font-semibold text-slate-800 flex items-center justify-between">
                        <span className="truncate pr-2">{it.selectionName}</span>
                        <span className="font-mono-nums font-bold text-emerald-700">
                          {it.odds.toFixed(2)}
                        </span>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate">
                        {it.matchTitle} ({it.marketName})
                      </div>
                    </div>
                  ))}
                </div>

                {/* Stake & Return summary */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-200/60 text-xs">
                  <div>
                    <span className="text-slate-400 text-[11px]">Stake: </span>
                    <span className="font-bold text-slate-800 font-mono-nums">
                      ${bet.stake.toFixed(2)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 text-[11px]">
                      {bet.status === 'won' ? 'Payout: ' : 'Potential: '}
                    </span>
                    <span className={`font-extrabold font-mono-nums ${
                      bet.status === 'won' ? 'text-emerald-700 text-sm' : 'text-slate-900'
                    }`}>
                      ${bet.potentialPayout.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Resolution Simulator Button for Pending Bets */}
                {bet.status === 'pending' && (
                  <button
                    type="button"
                    onClick={() => handleSimulateResolution(bet)}
                    className="w-full mt-2 py-2 px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200/80 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Simulate Match Outcome</span>
                  </button>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, History, Trophy, TrendingDown, TrendingUp, Trash2 } from 'lucide-react';
import { PlacedCasinoBet } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface RecentPlaysDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: PlacedCasinoBet[];
  onClearHistory: () => void;
  isRu?: boolean;
}

export const RecentPlaysDrawer: React.FC<RecentPlaysDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onClearHistory,
  isRu = false,
}) => {
  if (!isOpen) return null;

  const totalWon = history.filter((h) => h.status === 'won').reduce((sum, h) => sum + h.winAmount, 0);
  const totalBet = history.reduce((sum, h) => sum + h.betAmount, 0);
  const netPnL = totalWon - totalBet;

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/50 backdrop-blur-xs flex justify-end animate-in fade-in duration-200">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-amber-200/80 animate-in slide-in-from-right duration-300">
        {/* Drawer Header */}
        <div className="p-5 border-b border-amber-100 flex items-center justify-between bg-amber-50/50">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-300/40 flex items-center justify-center text-amber-700">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-slate-900 text-base">
                {isRu ? 'История спинов' : 'Session Spin History'}
              </h3>
              <span className="text-xs text-slate-500 font-semibold">
                {history.length} {isRu ? 'спинов за сессию' : 'spins logged'}
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              playButtonClick();
              onClose();
            }}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* PnL Snapshot */}
        <div className="p-4 bg-linear-to-r from-amber-50/60 to-white border-b border-amber-100 grid grid-cols-2 gap-3">
          <div className="p-3 rounded-2xl bg-white border border-amber-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isRu ? 'Сумма ставок' : 'Total Wagered'}
            </span>
            <span className="text-sm font-black text-slate-800">${totalBet.toFixed(2)}</span>
          </div>
          <div className="p-3 rounded-2xl bg-white border border-amber-200/60">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
              {isRu ? 'Итог сессии' : 'Net Session Return'}
            </span>
            <span className={`text-sm font-black flex items-center gap-1 ${netPnL >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              {netPnL >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
              {netPnL >= 0 ? `+$${netPnL.toFixed(2)}` : `-$${Math.abs(netPnL).toFixed(2)}`}
            </span>
          </div>
        </div>

        {/* History List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5">
          {history.length === 0 ? (
            <div className="h-64 flex flex-col items-center justify-center text-center p-6 text-slate-400">
              <Trophy className="w-12 h-12 text-amber-200 mb-2 stroke-1" />
              <p className="font-bold text-slate-600 text-sm">
                {isRu ? 'Спинов пока нет' : 'No spins yet this session'}
              </p>
              <p className="text-xs mt-1">
                {isRu ? 'Откройте любой слот и начните игру!' : 'Open any slot game in demo mode to start spinning!'}
              </p>
            </div>
          ) : (
            history.map((bet) => (
              <div
                key={bet.id}
                className="p-3.5 rounded-2xl border border-slate-100 bg-white hover:border-amber-200 transition-all shadow-xs flex items-center justify-between"
              >
                <div>
                  <h4 className="text-xs font-black text-slate-900">{bet.gameTitle}</h4>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-0.5 font-semibold">
                    <span>{isRu ? 'Ставка' : 'Bet'}: ${bet.betAmount.toFixed(2)}</span>
                    <span>•</span>
                    <span>{bet.timestamp}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`text-xs font-black px-2 py-0.5 rounded-lg ${
                      bet.status === 'won'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                        : 'bg-slate-50 text-slate-500'
                    }`}
                  >
                    {bet.status === 'won' ? `+$${bet.winAmount.toFixed(2)}` : (isRu ? 'Без выигрыша' : 'No win')}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {history.length > 0 && (
          <div className="p-4 border-t border-slate-100 bg-slate-50/50 flex justify-end">
            <button
              onClick={() => {
                playButtonClick();
                onClearHistory();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>{isRu ? 'Очистить историю' : 'Clear History'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

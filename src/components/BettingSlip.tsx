import React, { useState } from 'react';
import { 
  Zap, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Percent
} from 'lucide-react';
import { BetSelection, BetType, PlacedBet } from '../types';
import { playBetPlacedSound, playClickSound } from '../utils/soundEffects';

interface BettingSlipProps {
  selections: BetSelection[];
  onRemoveSelection: (selectionId: string) => void;
  onClearAll: () => void;
  balance: number;
  onPlaceBet: (bet: PlacedBet) => boolean;
  onCloseMobile?: () => void;
}

export const BettingSlip: React.FC<BettingSlipProps> = ({
  selections,
  onRemoveSelection,
  onClearAll,
  balance,
  onPlaceBet,
  onCloseMobile,
}) => {
  const [betType, setBetType] = useState<BetType>('parlay');
  const [stake, setStake] = useState<string>('25');
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const numericStake = parseFloat(stake) || 0;

  // Calculate total odds
  const totalOdds = selections.reduce((acc, curr) => acc * curr.odds, 1);
  const formattedTotalOdds = selections.length > 0 ? Number(totalOdds.toFixed(2)) : 1.0;

  // Parlay bonus (if 3+ selections, add 5% boost)
  const hasParlayBonus = betType === 'parlay' && selections.length >= 3;
  const bonusMultiplier = hasParlayBonus ? 1.05 : 1.0;

  const potentialPayout = Number((numericStake * formattedTotalOdds * bonusMultiplier).toFixed(2));

  const handleQuickStake = (amount: number) => {
    playClickSound();
    setStake(amount.toString());
    setErrorMessage(null);
  };

  const handleMaxStake = () => {
    playClickSound();
    setStake(Math.floor(balance).toString());
    setErrorMessage(null);
  };

  const handlePlaceBet = () => {
    if (selections.length === 0) return;

    if (numericStake <= 0) {
      setErrorMessage('Please enter a valid stake amount.');
      return;
    }

    if (numericStake > balance) {
      setErrorMessage('Insufficient balance. Please top up your wallet.');
      return;
    }

    const newBet: PlacedBet = {
      id: `bet-${Date.now()}`,
      type: betType,
      items: [...selections],
      totalOdds: formattedTotalOdds,
      stake: numericStake,
      potentialPayout,
      status: 'pending',
      placedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    };

    const success = onPlaceBet(newBet);
    if (success) {
      playBetPlacedSound();
      setIsSuccess(true);
      setErrorMessage(null);
      setTimeout(() => {
        setIsSuccess(false);
        if (onCloseMobile) onCloseMobile();
      }, 1600);
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-slate-200/90 shadow-md p-5 flex flex-col h-full max-h-[820px]">
      {/* Header with Title & Clear All */}
      <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-700">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <h2 className="text-base font-extrabold text-slate-900 leading-tight">
              Betting Slip
            </h2>
            <span className="text-[11px] font-semibold text-slate-400">
              {selections.length} {selections.length === 1 ? 'Selection' : 'Selections'}
            </span>
          </div>
        </div>

        {selections.length > 0 && (
          <button
            type="button"
            onClick={onClearAll}
            className="text-xs font-bold text-slate-400 hover:text-rose-600 transition-colors inline-flex items-center gap-1"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear</span>
          </button>
        )}
      </div>

      {/* Bet Type Tabs: Single vs Parlay (Express) */}
      <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-xl mt-3.5">
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setBetType('single');
          }}
          className={`py-1.5 text-xs font-bold rounded-lg transition-all ${
            betType === 'single'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          Single
        </button>
        <button
          type="button"
          onClick={() => {
            playClickSound();
            setBetType('parlay');
          }}
          className={`relative py-1.5 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1 ${
            betType === 'parlay'
              ? 'bg-white text-slate-900 shadow-xs'
              : 'text-slate-500 hover:text-slate-800'
          }`}
        >
          <span>Parlay / Express</span>
          {selections.length >= 3 && (
            <span className="px-1 py-0.2 rounded-full text-[9px] font-extrabold bg-indigo-600 text-white">
              +5%
            </span>
          )}
        </button>
      </div>

      {/* Selected Items List */}
      <div className="flex-1 overflow-y-auto space-y-2.5 my-3.5 pr-1">
        {selections.length === 0 ? (
          <div className="h-44 flex flex-col items-center justify-center text-center p-4 text-slate-400">
            <Zap className="w-8 h-8 text-slate-300 stroke-1 mb-2" />
            <p className="text-xs font-bold text-slate-600">Your slip is empty</p>
            <p className="text-[11px] text-slate-400 max-w-[190px] mt-0.5">
              Select any live or upcoming odds to build your ticket.
            </p>
          </div>
        ) : (
          selections.map((item) => (
            <div
              key={`${item.matchId}-${item.selectionId}`}
              className="bg-slate-50/80 hover:bg-slate-50 border border-slate-200/90 rounded-2xl p-3 relative group transition-all"
            >
              <button
                type="button"
                onClick={() => onRemoveSelection(item.selectionId)}
                title="Remove selection"
                className="absolute top-2.5 right-2.5 text-slate-400 hover:text-rose-600 p-1 rounded-lg transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>

              <div className="pr-6 space-y-1">
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider truncate">
                  {item.matchTitle}
                </div>
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-bold text-slate-900 truncate">
                    {item.selectionName}
                  </span>
                  <span className="text-sm font-extrabold text-emerald-700 font-mono-nums">
                    {item.odds.toFixed(2)}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500">
                  {item.marketName}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Slip Footer: Stakes, Calculation, Payout */}
      {selections.length > 0 && (
        <div className="border-t border-slate-100 pt-3 space-y-3">
          {/* Quick Stake Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
            {[10, 25, 50, 100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleQuickStake(amt)}
                className={`px-2.5 py-1 text-xs font-bold rounded-lg border transition-all ${
                  numericStake === amt
                    ? 'bg-slate-900 text-white border-slate-900'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
                }`}
              >
                ${amt}
              </button>
            ))}
            <button
              type="button"
              onClick={handleMaxStake}
              className="px-2.5 py-1 text-xs font-bold rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 transition-all"
            >
              Max
            </button>
          </div>

          {/* Stake Input Field */}
          <div className="flex items-center justify-between gap-3 bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
            <span className="text-xs font-bold text-slate-500">Stake ($)</span>
            <input
              type="number"
              min="1"
              max={balance}
              step="1"
              value={stake}
              onChange={(e) => {
                setStake(e.target.value);
                setErrorMessage(null);
              }}
              placeholder="0.00"
              className="w-28 text-right bg-white border border-slate-200/90 rounded-xl px-2.5 py-1 text-sm font-extrabold text-slate-900 font-mono-nums focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            />
          </div>

          {/* Bonus badge */}
          {hasParlayBonus && (
            <div className="flex items-center justify-between bg-indigo-50 border border-indigo-200/80 rounded-xl px-2.5 py-1.5 text-xs text-indigo-900">
              <span className="inline-flex items-center gap-1 font-bold">
                <Percent className="w-3.5 h-3.5 text-indigo-600" />
                Combo Boost Bonus
              </span>
              <span className="font-extrabold text-indigo-700">+5% Extra</span>
            </div>
          )}

          {/* Odds & Potential Win Summary */}
          <div className="space-y-1.5 bg-slate-50/60 p-3 rounded-2xl border border-slate-100">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Total Odds:</span>
              <span className="font-bold text-slate-800 font-mono-nums">
                {formattedTotalOdds.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="font-bold text-slate-700">Potential Return:</span>
              <span className="text-base font-extrabold text-emerald-700 font-mono-nums">
                ${potentialPayout.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-1.5 text-xs font-semibold text-rose-600 bg-rose-50 p-2 rounded-xl border border-rose-200">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Place Bet Action Button */}
          <button
            type="button"
            onClick={handlePlaceBet}
            disabled={isSuccess}
            className={`w-full py-3.5 rounded-2xl font-extrabold text-sm flex items-center justify-center gap-2 shadow-sm transition-all active:scale-[0.98] ${
              isSuccess
                ? 'bg-emerald-600 text-white'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20'
            }`}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-white animate-bounce" />
                <span>Bet Placed Successfully!</span>
              </>
            ) : (
              <>
                <span>Place Bet (${numericStake > 0 ? numericStake : 0})</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

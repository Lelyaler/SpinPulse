import React, { useState } from 'react';
import { X, Heart, Sparkles, RotateCw, Volume2, VolumeX } from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameItem, PlacedCasinoBet } from '../types';
import {
  playButtonClick,
  playReelSpinSound,
  playReelStopSound,
  playWinCoinsSound,
  playBigJackpotFanfare,
  isSoundEnabled,
  setSoundEnabled,
} from '../utils/casinoAudio';

interface SlotGameModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onDeductBalance: (amount: number) => boolean;
  onAddBalance: (amount: number) => void;
  onRecordBet: (bet: PlacedCasinoBet) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  isRu: boolean;
}

interface SlotSymbol {
  id: string;
  name: string;
  icon: string;
  weight: number;
  payout: number;
}

const symbols: SlotSymbol[] = [
  { id: 'zeus', name: 'Zeus', icon: '⚡', weight: 8, payout: 20 },
  { id: 'crown', name: 'Crown', icon: '👑', weight: 12, payout: 15 },
  { id: 'gem', name: 'Diamond', icon: '💎', weight: 16, payout: 10 },
  { id: 'fire', name: 'Phoenix', icon: '🔥', weight: 20, payout: 6 },
  { id: 'bell', name: 'Golden Bell', icon: '🔔', weight: 24, payout: 4 },
  { id: 'cherry', name: 'Cherry', icon: '🍒', weight: 30, payout: 2 },
  { id: 'seven', name: 'Seven', icon: '7️⃣', weight: 15, payout: 8 },
];

function getRandomSymbol(): SlotSymbol {
  const totalWeight = symbols.reduce((acc, s) => acc + s.weight, 0);
  let rand = Math.random() * totalWeight;
  for (const sym of symbols) {
    if (rand < sym.weight) return sym;
    rand -= sym.weight;
  }
  return symbols[symbols.length - 1];
}

export const SlotGameModal: React.FC<SlotGameModalProps> = ({
  game,
  isOpen,
  onClose,
  balance,
  onDeductBalance,
  onAddBalance,
  onRecordBet,
  isFavorite,
  onToggleFavorite,
  isRu,
}) => {
  const [betAmount, setBetAmount] = useState<number>(25);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [reels, setReels] = useState<SlotSymbol[][]>(() => [
    [symbols[0], symbols[1], symbols[2]],
    [symbols[1], symbols[2], symbols[3]],
    [symbols[2], symbols[0], symbols[1]],
    [symbols[3], symbols[4], symbols[5]],
    [symbols[4], symbols[1], symbols[6]],
  ]);
  const [stoppedReels, setStoppedReels] = useState<boolean[]>([true, true, true, true, true]);
  const [lastWin, setLastWin] = useState<number>(0);
  const [winMultiplier, setWinMultiplier] = useState<number>(0);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(() => isSoundEnabled());

  if (!isOpen || !game) return null;

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundOn(next);
    setSoundEnabled(next);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    if (balance < betAmount) {
      setWinMessage(isRu ? 'Недостаточно демо-баланса!' : 'Insufficient demo balance!');
      return;
    }

    const deducted = onDeductBalance(betAmount);
    if (!deducted) return;

    playButtonClick();
    playReelSpinSound();
    setIsSpinning(true);
    setWinMessage(null);
    setLastWin(0);
    setWinMultiplier(0);
    setStoppedReels([false, false, false, false, false]);

    const newReels: SlotSymbol[][] = Array.from({ length: 5 }, () => [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ]);

    // Progressive reel stopping
    [0, 1, 2, 3, 4].forEach((colIdx) => {
      setTimeout(() => {
        playReelStopSound();
        setStoppedReels((prev) => {
          const next = [...prev];
          next[colIdx] = true;
          return next;
        });

        if (colIdx === 4) {
          setReels(newReels);
          setIsSpinning(false);

          // Calculate matches on 3 rows
          let totalMultiplier = 0;
          for (let row = 0; row < 3; row++) {
            const firstSym = newReels[0][row];
            let matchCount = 1;
            for (let c = 1; c < 5; c++) {
              if (newReels[c][row].id === firstSym.id) {
                matchCount++;
              } else {
                break;
              }
            }
            if (matchCount >= 3) {
              const rowMult = firstSym.payout * (matchCount - 2);
              totalMultiplier += rowMult;
            }
          }

          if (totalMultiplier > 0) {
            const wonAmount = Number((betAmount * totalMultiplier).toFixed(2));
            setLastWin(wonAmount);
            setWinMultiplier(totalMultiplier);
            onAddBalance(wonAmount);

            if (totalMultiplier >= 15) {
              playBigJackpotFanfare();
              confetti({
                particleCount: 90,
                spread: 70,
                origin: { y: 0.6 },
              });
              setWinMessage(
                isRu
                  ? `🔥 ДЖЕКПОТ x${totalMultiplier}! +$${wonAmount}`
                  : `🔥 MEGA WIN x${totalMultiplier}! +$${wonAmount}`
              );
            } else {
              playWinCoinsSound();
              setWinMessage(
                isRu
                  ? `ВЫИГРЫШ x${totalMultiplier}! +$${wonAmount}`
                  : `WIN x${totalMultiplier}! +$${wonAmount}`
              );
            }

            onRecordBet({
              id: `bet-${Date.now()}`,
              gameTitle: game.title,
              betAmount: betAmount,
              winAmount: wonAmount,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'won',
            });
          } else {
            setWinMessage(isRu ? 'Попробуйте снова!' : 'Try again!');
            onRecordBet({
              id: `bet-${Date.now()}`,
              gameTitle: game.title,
              betAmount: betAmount,
              winAmount: 0,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
              status: 'lost',
            });
          }
        }
      }, 550 + colIdx * 220);
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden flex flex-col text-white"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-slate-800 shrink-0">
              <img src={game.coverImage} alt={game.title} className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm sm:text-base font-extrabold text-white truncate max-w-[200px] sm:max-w-xs">
                  {game.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-400 border border-amber-400/30">
                  DEMO
                </span>
              </div>
              <span className="text-xs text-slate-400">
                {game.provider} • RTP: {game.rtp}%
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => onToggleFavorite(game.id)}
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl transition-colors"
              title={isRu ? 'В избранное' : 'Favorite'}
            >
              <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500 text-rose-500' : ''}`} />
            </button>
            <button
              type="button"
              onClick={handleToggleSound}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors"
              title={isRu ? 'Звук' : 'Sound'}
            >
              {soundOn ? <Volume2 className="w-5 h-5 text-amber-400" /> : <VolumeX className="w-5 h-5" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slot Cabinet Display */}
        <div className="p-4 sm:p-6 flex flex-col items-center gap-5">
          {/* Win Status Banner */}
          <div className="h-8 flex items-center justify-center">
            {winMessage ? (
              <span className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold bg-amber-500/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-4 h-4 text-amber-400" />
                {winMessage}
              </span>
            ) : (
              <span className="text-xs text-slate-400 font-medium">
                {isRu
                  ? 'Соберите 3 одинаковых символа в ряд для выигрыша'
                  : 'Match 3 or more symbols horizontally to win'}
              </span>
            )}
          </div>

          {/* 5-Reel Matrix */}
          <div className="w-full bg-slate-950 p-3 sm:p-4 rounded-2xl border border-slate-800 shadow-inner">
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {reels.map((col, colIdx) => {
                const isStopped = stoppedReels[colIdx];
                return (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-2 bg-slate-900/80 rounded-xl p-1.5 sm:p-2 border border-slate-800/80"
                  >
                    {col.map((sym, rowIdx) => (
                      <div
                        key={rowIdx}
                        className={`h-16 sm:h-20 rounded-lg flex flex-col items-center justify-center gap-1 transition-all ${
                          !isStopped
                            ? 'animate-pulse opacity-40 blur-[1px]'
                            : 'bg-slate-800/60 hover:bg-slate-800/90 border border-slate-700/40'
                        }`}
                      >
                        <span className="text-2xl sm:text-3xl select-none">{sym.icon}</span>
                        <span className="text-[9px] font-bold text-slate-400 truncate max-w-[90%]">
                          {sym.name}
                        </span>
                      </div>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Control Bar */}
          <div className="w-full bg-slate-950/70 border border-slate-800 p-3.5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-6 w-full sm:w-auto justify-around sm:justify-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isRu ? 'Демо-баланс' : 'Demo Balance'}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-amber-400 font-mono">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-l border-slate-800 pl-6">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  {isRu ? 'Выигрыш' : 'Last Win'} {winMultiplier > 0 ? `(${winMultiplier}x)` : ''}
                </span>
                <span className="text-sm sm:text-base font-extrabold text-emerald-400 font-mono">
                  +${lastWin.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-xl border border-slate-800">
                {[10, 25, 50, 100].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    disabled={isSpinning}
                    onClick={() => {
                      playButtonClick();
                      setBetAmount(amt);
                    }}
                    className={`px-2.5 py-1 text-xs font-bold rounded-lg transition-all ${
                      betAmount === amt
                        ? 'bg-amber-500 text-slate-950 shadow-xs'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className={`px-7 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 text-slate-950 transition-all active:scale-95 cursor-pointer ${
                  isSpinning
                    ? 'bg-amber-500/50 cursor-not-allowed'
                    : 'bg-linear-to-r from-amber-400 via-amber-500 to-amber-600 hover:brightness-110 shadow-lg shadow-amber-500/20'
                }`}
              >
                <RotateCw className={`w-4 h-4 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>{isRu ? 'КРУТИТЬ' : 'SPIN'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

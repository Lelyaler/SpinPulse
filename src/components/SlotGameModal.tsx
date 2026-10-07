import React, { useState } from 'react';
import { 
  X, 
  RotateCw, 
  Sparkles, 
  Volume2, 
  VolumeX
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { GameItem, SlotSymbol, PlacedCasinoBet } from '../types';
import { 
  playReelSpinSound, 
  playReelStopSound, 
  playWinCoinsSound, 
  playBigJackpotFanfare, 
  playButtonClick,
  isSoundEnabled,
  setSoundEnabled
} from '../utils/casinoAudio';

interface SlotGameModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  balance: number;
  onUpdateBalance: (newBalance: number) => void;
  onRecordBet?: (bet: PlacedCasinoBet) => void;
}

const symbols: SlotSymbol[] = [
  { id: 'crown', name: 'Royal Crown', multiplier: 25, icon: '👑', color: 'text-amber-500' },
  { id: 'diamond', name: 'Blue Diamond', multiplier: 15, icon: '💎', color: 'text-sky-500' },
  { id: 'lightning', name: 'Zeus Lightning', multiplier: 10, icon: '⚡', color: 'text-yellow-400' },
  { id: 'seven', name: 'Lucky 7', multiplier: 8, icon: '7️⃣', color: 'text-rose-500' },
  { id: 'bell', name: 'Golden Bell', multiplier: 5, icon: '🔔', color: 'text-amber-400' },
  { id: 'cherry', name: 'Cherry', multiplier: 3, icon: '🍒', color: 'text-red-500' },
  { id: 'coin', name: 'Gold Coin', multiplier: 2, icon: '🪙', color: 'text-yellow-500' },
];

function getRandomSymbol(): SlotSymbol {
  const rand = Math.random();
  if (rand < 0.05) return symbols[0]; // Crown
  if (rand < 0.12) return symbols[1]; // Diamond
  if (rand < 0.22) return symbols[2]; // Lightning
  if (rand < 0.35) return symbols[3]; // Seven
  if (rand < 0.50) return symbols[4]; // Bell
  if (rand < 0.72) return symbols[5]; // Cherry
  return symbols[6]; // Coin
}

export const SlotGameModal: React.FC<SlotGameModalProps> = ({
  game,
  isOpen,
  onClose,
  balance,
  onUpdateBalance,
  onRecordBet,
}) => {
  const [betAmount, setBetAmount] = useState<number>(25);
  const [reels, setReels] = useState<SlotSymbol[][]>([
    [symbols[0], symbols[1], symbols[2]],
    [symbols[1], symbols[2], symbols[3]],
    [symbols[0], symbols[0], symbols[4]],
    [symbols[2], symbols[3], symbols[1]],
    [symbols[4], symbols[5], symbols[6]],
  ]);

  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [stoppedReels, setStoppedReels] = useState<boolean[]>([true, true, true, true, true]);
  const [lastWin, setLastWin] = useState<number>(0);
  const [winMultiplier, setWinMultiplier] = useState<number>(0);
  const [winMessage, setWinMessage] = useState<string | null>(null);
  const [soundOn, setSoundOn] = useState<boolean>(isSoundEnabled());
  const [winningRows, setWinningRows] = useState<number[]>([]);

  if (!isOpen || !game) return null;

  const handleToggleSound = () => {
    const next = !soundOn;
    setSoundEnabled(next);
    setSoundOn(next);
  };

  const handleSpin = () => {
    if (isSpinning) return;
    if (balance < betAmount) {
      alert('Insufficient demo balance! Please top up.');
      return;
    }

    playButtonClick();
    playReelSpinSound();

    // Deduct bet
    onUpdateBalance(balance - betAmount);
    setIsSpinning(true);
    setLastWin(0);
    setWinMultiplier(0);
    setWinMessage(null);
    setWinningRows([]);
    setStoppedReels([false, false, false, false, false]);

    // Generate new random symbols for 5 reels x 3 rows
    const newReels: SlotSymbol[][] = Array.from({ length: 5 }, () => [
      getRandomSymbol(),
      getRandomSymbol(),
      getRandomSymbol(),
    ]);

    // Force occasional exciting 3+ match win for demo thrill
    if (Math.random() < 0.45) {
      const luckySym = symbols[Math.floor(Math.random() * symbols.length)];
      const targetRow = Math.floor(Math.random() * 3);
      newReels[0][targetRow] = luckySym;
      newReels[1][targetRow] = luckySym;
      newReels[2][targetRow] = luckySym;
      if (Math.random() < 0.5) newReels[3][targetRow] = luckySym;
      if (Math.random() < 0.25) newReels[4][targetRow] = luckySym;
    }

    // Stop reels one by one with mechanical delays
    [0, 1, 2, 3, 4].forEach((idx) => {
      setTimeout(() => {
        setStoppedReels((prev) => {
          const next = [...prev];
          next[idx] = true;
          return next;
        });
        playReelStopSound(1 + idx * 0.1);

        // All reels stopped: calculate win
        if (idx === 4) {
          setIsSpinning(false);
          setReels(newReels);

          // Check winning paylines (Horizontal Rows 0, 1, 2)
          let totalMultiplier = 0;
          const wins: number[] = [];

          for (let row = 0; row < 3; row++) {
            const sym = newReels[0][row];
            let matchCount = 1;
            for (let c = 1; c < 5; c++) {
              if (newReels[c][row].id === sym.id) {
                matchCount++;
              } else {
                break;
              }
            }

            if (matchCount >= 3) {
              wins.push(row);
              const lineMult = sym.multiplier * (matchCount === 5 ? 3 : matchCount === 4 ? 2 : 1);
              totalMultiplier += lineMult;
            }
          }

          if (totalMultiplier > 0) {
            const winVal = betAmount * totalMultiplier;
            setLastWin(winVal);
            setWinMultiplier(totalMultiplier);
            setWinningRows(wins);
            onUpdateBalance(balance - betAmount + winVal);

            onRecordBet?.({
              id: `bet-${Date.now()}`,
              gameTitle: game.title,
              betAmount,
              winAmount: winVal,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              status: 'won',
            });

            if (totalMultiplier >= 15) {
              setWinMessage(`🔥 MEGA WIN! ${totalMultiplier}x MULTIPLIER!`);
              playBigJackpotFanfare();
              confetti({
                particleCount: 80,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#f59e0b', '#10b981', '#3b82f6', '#ec4899'],
              });
            } else {
              setWinMessage(`Nice Hit! Won $${winVal.toFixed(2)}`);
              playWinCoinsSound();
            }
          } else {
            onRecordBet?.({
              id: `bet-${Date.now()}`,
              gameTitle: game.title,
              betAmount,
              winAmount: 0,
              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
              status: 'lost',
            });
          }
        }
      }, 700 + idx * 280);
    });
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-linear-to-b from-amber-50 via-white to-amber-50/40 rounded-3xl border border-amber-200/80 shadow-2xl overflow-hidden flex flex-col">
        {/* Slot Cabinet Topbar */}
        <div className="flex items-center justify-between px-6 py-4 bg-white/90 border-b border-amber-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/10 border border-amber-400/30 flex items-center justify-center text-xl shadow-xs">
              🎰
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-black text-slate-900 leading-tight">
                  {game.title}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/15 text-amber-800 border border-amber-300/40 uppercase tracking-wider">
                  DEMO PLAY
                </span>
              </div>
              <span className="text-xs font-semibold text-slate-400">
                {game.provider} • RTP: {game.rtp}% • Max: {game.maxWin}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleToggleSound}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              {soundOn ? <Volume2 className="w-4.5 h-4.5 text-amber-600" /> : <VolumeX className="w-4.5 h-4.5 text-slate-400" />}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-xl transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Slot Machine Main Display Cabinet */}
        <div className="p-4 sm:p-8 flex flex-col items-center gap-6">
          {/* Win Announcement Banner */}
          <div className="h-10 flex items-center justify-center">
            {winMessage ? (
              <div className="animate-bounce flex items-center gap-2 px-5 py-1.5 rounded-full bg-linear-to-r from-amber-500 to-rose-500 text-white font-extrabold text-sm shadow-lg shadow-amber-500/20">
                <Sparkles className="w-4 h-4 text-amber-200" />
                <span>{winMessage}</span>
              </div>
            ) : (
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Match 3 or more symbols horizontally across reels to win
              </span>
            )}
          </div>

          {/* 5-Reel Physical Slot Cabinet */}
          <div className="w-full max-w-2xl bg-slate-900 p-3 sm:p-4 rounded-3xl shadow-2xl border-4 border-amber-400/80 relative">
            <div className="grid grid-cols-5 gap-2 sm:gap-3 bg-slate-950 p-2 sm:p-3 rounded-2xl border border-amber-500/20">
              {reels.map((reelCol, colIdx) => {
                const stopped = stoppedReels[colIdx];
                return (
                  <div
                    key={colIdx}
                    className="flex flex-col gap-2 relative overflow-hidden bg-slate-900/90 rounded-xl p-1 sm:p-2 border border-slate-800"
                  >
                    {reelCol.map((sym, rowIdx) => {
                      const isWinningLine = winningRows.includes(rowIdx);
                      return (
                        <div
                          key={rowIdx}
                          className={`h-16 sm:h-22 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all select-none ${
                            !stopped
                              ? 'animate-pulse opacity-40 blur-[1px]'
                              : isWinningLine
                              ? 'bg-amber-500/20 border-2 border-amber-400 shadow-md shadow-amber-500/30 scale-105'
                              : 'bg-slate-800/80 hover:bg-slate-800 border border-slate-700/60'
                          }`}
                        >
                          <span className="text-2xl sm:text-4xl filter drop-shadow">
                            {sym.icon}
                          </span>
                          <span className="text-[9px] sm:text-[10px] font-extrabold text-slate-400 truncate max-w-[90%]">
                            {sym.name.split(' ')[0]}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Control Dashboard: Balance, Bet Size, Big Spin Button */}
          <div className="w-full max-w-2xl bg-white border border-amber-200/80 p-4 rounded-2xl shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Balance & Win readout */}
            <div className="flex items-center gap-6 w-full sm:w-auto justify-around sm:justify-start">
              <div>
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  DEMO BALANCE
                </span>
                <span className="text-base sm:text-lg font-black text-slate-900 font-mono-nums">
                  ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className="border-l border-slate-200 pl-6">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block">
                  LAST WIN {winMultiplier > 0 && `(${winMultiplier}x)`}
                </span>
                <span className="text-base sm:text-lg font-black text-emerald-600 font-mono-nums">
                  +${lastWin.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Bet Selectors & Spin Button */}
            <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
              {/* Bet Amount Selector */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
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
                        ? 'bg-amber-500 text-white shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    ${amt}
                  </button>
                ))}
              </div>

              {/* Big Golden Spin Button */}
              <button
                type="button"
                onClick={handleSpin}
                disabled={isSpinning}
                className={`px-8 py-3 rounded-2xl font-black text-base flex items-center gap-2 text-white shadow-lg transition-all active:scale-95 ${
                  isSpinning
                    ? 'bg-amber-300 cursor-not-allowed'
                    : 'bg-linear-to-r from-amber-500 via-amber-600 to-rose-500 hover:brightness-105 shadow-amber-500/30'
                }`}
              >
                <RotateCw className={`w-5 h-5 ${isSpinning ? 'animate-spin' : ''}`} />
                <span>SPIN</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

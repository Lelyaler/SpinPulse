import React, { useState, useEffect } from 'react';
import { Trophy, Zap } from 'lucide-react';
import { LiveWinner } from '../types';
import { initialWinners } from '../data/gamesCatalog';

interface JackpotAndWinsProps {
  isRu: boolean;
}

const mockNames = ['Alex_Pro', 'Elena_Lucky', 'Dmitry_99', 'Viktor_VIP', 'Anna_Gold', 'Roman_Spin', 'Max_Highroller', 'CasinoKing'];
const mockGames = [
  'Gates of Olympus 1000',
  'Sweet Rush Bonanza',
  'Sugar Rush 1000',
  'Aviator Sky High 100x',
  'Space Rocket Crash X',
  'Roulette Royale Live VIP',
  'Cyberpunk Neon Megaways',
];
const mockAvatars = ['💎', '👑', '⚡', '🔥', '🎰', '🚀', '🌟', '🎯'];

export const JackpotAndWins: React.FC<JackpotAndWinsProps> = ({ isRu }) => {
  const [grandJackpot, setGrandJackpot] = useState<number>(4821590.84);
  const [majorJackpot, setMajorJackpot] = useState<number>(248190.15);
  const [miniJackpot, setMiniJackpot] = useState<number>(14850.50);
  const [winners, setWinners] = useState<LiveWinner[]>(initialWinners);

  // Progressive jackpot ticking increments
  useEffect(() => {
    const timer = setInterval(() => {
      setGrandJackpot((prev) => prev + (Math.random() * 2.5 + 0.5));
      setMajorJackpot((prev) => prev + (Math.random() * 0.8 + 0.1));
      setMiniJackpot((prev) => prev + (Math.random() * 0.2 + 0.05));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  // Periodic new live winner simulated
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomGame = mockGames[Math.floor(Math.random() * mockGames.length)];
      const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
      const randomMult = Number((Math.random() * 95 + 6.5).toFixed(1));
      const randomAmount = Number((randomMult * (Math.random() * 25 + 10)).toFixed(2));

      const newWinner: LiveWinner = {
        id: `win-${Date.now()}`,
        user: randomName,
        gameTitle: randomGame,
        amount: randomAmount,
        multiplier: randomMult,
        time: isRu ? 'Только что' : 'Just now',
        avatar: randomAvatar,
      };

      setWinners((prev) => [newWinner, ...prev.slice(0, 5)]);
    }, 8000);

    return () => clearInterval(interval);
  }, [isRu]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      {/* Left: Izzi Multi-Tier Jackpot Box (5 cols) */}
      <div className="lg:col-span-5 rounded-3xl bg-linear-to-br from-amber-500 via-amber-600 to-amber-700 p-5 text-white shadow-lg relative overflow-hidden flex flex-col justify-between">
        {/* Ambient glow */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/20 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                {isRu ? 'Прогрессивный Джекпот' : 'Progressive Jackpot'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/25 tracking-widest animate-pulse">
              LIVE
            </span>
          </div>

          {/* Grand Jackpot */}
          <div className="mt-2 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200 block">
              GRAND PRIZE
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span className="text-amber-200 text-lg">$</span>
              <span className="tabular-nums font-mono drop-shadow-xs">
                {grandJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        {/* Major & Mini Tiers */}
        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/20 text-xs">
          <div className="p-2.5 rounded-xl bg-black/15 backdrop-blur-xs">
            <span className="text-[9px] uppercase font-bold text-amber-200 block">MAJOR POT</span>
            <span className="font-black text-sm text-white font-mono">
              ${majorJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/15 backdrop-blur-xs">
            <span className="text-[9px] uppercase font-bold text-amber-200 block">MINI POT</span>
            <span className="font-black text-sm text-white font-mono">
              ${miniJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {/* Right: "Now Winning" Real-Time Strip (7 cols) */}
      <div className="lg:col-span-7 bg-white rounded-3xl border border-amber-200/80 p-4 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-800">
                {isRu ? 'Сейчас выигрывают' : 'Now Winning Live'}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-400">
            {isRu ? 'Прямой стрим побед' : 'Live casino feed'}
          </span>
        </div>

        {/* Live winners carousel / cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {winners.slice(0, 3).map((win) => (
            <div
              key={win.id}
              className="p-3 rounded-2xl bg-linear-to-b from-amber-50/50 to-white border border-amber-200/60 shadow-xs hover:border-amber-300 transition-all flex flex-col justify-between animate-in fade-in"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-sm">{win.avatar}</span>
                <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                  {win.multiplier}x
                </span>
              </div>
              <div>
                <span className="text-xs font-black text-slate-900 block truncate">
                  {win.user}
                </span>
                <span className="text-[10px] text-slate-400 block truncate">
                  {win.gameTitle}
                </span>
                <span className="text-xs font-black text-emerald-600 block mt-1">
                  +${win.amount.toFixed(2)}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

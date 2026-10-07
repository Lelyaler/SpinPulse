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

  // Progressive jackpot ticking increments (deferred start to free initial main thread)
  useEffect(() => {
    let timer: NodeJS.Timeout;
    const initialDelay = setTimeout(() => {
      timer = setInterval(() => {
        setGrandJackpot((prev) => prev + (Math.random() * 2.5 + 0.5));
        setMajorJackpot((prev) => prev + (Math.random() * 0.8 + 0.1));
        setMiniJackpot((prev) => prev + (Math.random() * 0.2 + 0.05));
      }, 1500);
    }, 2500);
    return () => {
      clearTimeout(initialDelay);
      if (timer) clearInterval(timer);
    };
  }, []);

  // Periodic new live winner simulated
  useEffect(() => {
    let interval: NodeJS.Timeout;
    const initialDelay = setTimeout(() => {
      interval = setInterval(() => {
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
    }, 3000);

    return () => {
      clearTimeout(initialDelay);
      if (interval) clearInterval(interval);
    };
  }, [isRu]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
      <div className="lg:col-span-5 rounded-3xl bg-linear-to-br from-amber-600 via-amber-700 to-amber-950 p-6 text-white shadow-md relative overflow-hidden flex flex-col justify-between">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-overlay pointer-events-none scale-105"
          style={{ backgroundImage: `url("${import.meta.env.BASE_URL}banners/jackpot-bg.webp")` }}
        />
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/15 rounded-full blur-2xl pointer-events-none" />

        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                <Trophy className="w-4 h-4 text-white" />
              </div>
              <span className="text-xs font-black uppercase tracking-wider text-amber-100">
                {isRu ? 'Прогрессивный Джекпот' : 'Progressive Jackpot'}
              </span>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-white/20 tracking-wider">
              LIVE
            </span>
          </div>

          <div className="mt-2 mb-4">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-200 block">
              GRAND PRIZE
            </span>
            <div className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-baseline gap-1">
              <span className="text-amber-200 text-lg">$</span>
              <span className="tabular-nums font-mono">
                {grandJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/15 text-xs">
          <div className="p-2.5 rounded-xl bg-black/20 backdrop-blur-xs">
            <span className="text-[9px] uppercase font-bold text-amber-200 block">MAJOR POT</span>
            <span className="font-black text-sm text-white font-mono">
              ${majorJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
          <div className="p-2.5 rounded-xl bg-black/20 backdrop-blur-xs">
            <span className="text-[9px] uppercase font-bold text-amber-200 block">MINI POT</span>
            <span className="font-black text-sm text-white font-mono">
              ${miniJackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-5 shadow-xs flex flex-col justify-between">
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600">
              <Zap className="w-4 h-4" />
            </div>
            <div>
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                {isRu ? 'Сейчас выигрывают' : 'Now Winning Live'}
              </span>
            </div>
          </div>
          <span className="text-[11px] font-semibold text-slate-500">
            {isRu ? 'Прямой стрим побед' : 'Live casino feed'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
          {winners.slice(0, 3).map((win) => (
            <div
              key={win.id}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/70 transition-all flex sm:flex-col items-center sm:items-stretch justify-between gap-2"
            >
              <div className="flex items-center justify-between sm:mb-1.5 w-auto sm:w-full gap-2">
                <span className="text-base select-none">{win.avatar}</span>
                <span className="text-[10px] font-black px-1.5 py-0.5 rounded bg-white text-slate-800 shadow-2xs shrink-0">
                  {win.multiplier}x
                </span>
              </div>
              <div className="flex-1 min-w-0 text-left sm:text-left">
                <span className="text-xs font-black text-slate-900 block truncate">
                  {win.user}
                </span>
                <span className="text-[11px] text-slate-500 block truncate font-medium">
                  {win.gameTitle}
                </span>
              </div>
              <div className="sm:mt-1 shrink-0 text-right sm:text-left">
                <span className="text-xs sm:text-sm font-black text-emerald-600 block">
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

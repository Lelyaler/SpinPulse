import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { LiveWinner } from '../types';
import { initialWinners } from '../data/gamesCatalog';

const mockNames = ['Alex_Pro', 'Elena_Lucky', 'Dmitry_99', 'Viktor_VIP', 'Anna_Gold', 'Roman_Spin', 'Max_Highroller'];
const mockGames = [
  'Gates of Olympus 1000',
  'Sweet Rush Bonanza',
  'Space Rocket Crash X',
  'Roulette Royale Live VIP',
  'Cyberpunk Neon Megaways',
  'Book of Pharaoh Gold'
];
const mockAvatars = ['💎', '👑', '⚡', '🔥', '🎰', '🚀', '🌟'];

export const LiveWinnersTicker: React.FC = () => {
  const [winners, setWinners] = useState<LiveWinner[]>(initialWinners);

  // Periodically add new winner simulated in real time
  useEffect(() => {
    const interval = setInterval(() => {
      const randomName = mockNames[Math.floor(Math.random() * mockNames.length)];
      const randomGame = mockGames[Math.floor(Math.random() * mockGames.length)];
      const randomAvatar = mockAvatars[Math.floor(Math.random() * mockAvatars.length)];
      const randomMult = Number((Math.random() * 85 + 5.5).toFixed(1));
      const randomAmount = Number((randomMult * (Math.random() * 30 + 10)).toFixed(2));

      const newWinner: LiveWinner = {
        id: `win-${Date.now()}`,
        user: randomName,
        gameTitle: randomGame,
        amount: randomAmount,
        multiplier: randomMult,
        time: 'Just now',
        avatar: randomAvatar,
      };

      setWinners((prev) => [newWinner, ...prev.slice(0, 7)]);
    }, 9000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white/80 border border-amber-200/80 rounded-2xl p-3 shadow-xs">
      <div className="flex items-center gap-3 mb-2.5 px-2">
        <div className="w-6 h-6 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-600">
          <Trophy className="w-3.5 h-3.5" />
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-black uppercase tracking-wider text-slate-800">
            Real-Time Live Drops
          </span>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <span className="text-[11px] font-semibold text-slate-400 ml-auto hidden sm:inline">
          Live stream from certified studios
        </span>
      </div>

      {/* Horizontal scrolling strip */}
      <div className="flex items-center gap-3 overflow-x-auto pb-1 scrollbar-thin scrollbar-thumb-amber-200">
        {winners.map((win) => (
          <div
            key={win.id}
            className="shrink-0 flex items-center gap-3 px-3 py-2 rounded-xl bg-linear-to-r from-amber-50/70 to-white border border-amber-200/60 shadow-xs hover:border-amber-300 transition-colors animate-in fade-in duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white border border-amber-200 flex items-center justify-center text-base shadow-xs">
              {win.avatar}
            </div>
            <div>
              <div className="flex items-center gap-1.5 leading-tight">
                <span className="text-xs font-black text-slate-900">{win.user}</span>
                <span className="text-[10px] font-extrabold px-1.5 py-0.2 rounded bg-amber-100 text-amber-800">
                  {win.multiplier}x
                </span>
              </div>
              <div className="flex items-center gap-2 text-[11px] leading-tight">
                <span className="text-slate-500 truncate max-w-[110px]" title={win.gameTitle}>
                  {win.gameTitle}
                </span>
                <span className="font-black text-emerald-600">
                  +${win.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

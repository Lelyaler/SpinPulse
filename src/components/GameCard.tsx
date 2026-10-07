import React from 'react';
import { 
  Play, 
  Flame, 
  Sparkles, 
  Star, 
  Radio, 
  Rocket 
} from 'lucide-react';
import { GameItem } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface GameCardProps {
  game: GameItem;
  onPlay: (game: GameItem) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onPlay }) => {
  return (
    <div className="group relative bg-white rounded-3xl border border-amber-200/80 shadow-md hover:shadow-xl hover:border-amber-400 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Game Image Banner Container with 4:3 or 16:10 Aspect */}
      <div className="relative aspect-4/3 w-full overflow-hidden bg-slate-900">
        <img
          src={game.coverImage}
          alt={game.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Ambient subtle vignette overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-slate-950/80 via-transparent to-black/20" />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
          <div className="flex items-center gap-1.5">
            {game.isHot && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md shadow-rose-500/30">
                <Flame className="w-3 h-3 fill-white" />
                HOT
              </span>
            )}
            {game.isNew && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md shadow-amber-500/30">
                <Sparkles className="w-3 h-3 fill-slate-950" />
                NEW
              </span>
            )}
            {game.category === 'live' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md">
                <Radio className="w-3 h-3 text-white animate-pulse" />
                LIVE VIP
              </span>
            )}
            {game.category === 'crash' && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                <Rocket className="w-3 h-3 text-white" />
                CRASH X
              </span>
            )}
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-md text-[11px] font-black text-amber-300 border border-amber-400/30">
            <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            <span>{game.rating}</span>
          </div>
        </div>

        {/* Bottom Banner Stats on Image */}
        <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between text-white text-[11px] font-bold">
          <span className="px-2 py-0.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/10">
            {game.provider}
          </span>
          <span className="px-2 py-0.5 rounded-lg bg-amber-500/90 text-slate-950 font-black backdrop-blur-md">
            {game.maxWin}
          </span>
        </div>

        {/* Hover Interactive Overlay */}
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-4 gap-3">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            className="w-14 h-14 rounded-full bg-linear-to-tr from-amber-500 via-amber-400 to-yellow-300 hover:scale-110 active:scale-95 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transition-transform cursor-pointer"
            title="Launch Demo Game"
          >
            <Play className="w-6 h-6 fill-slate-950 translate-x-0.5" />
          </button>
          <span className="text-xs font-black uppercase tracking-wider text-amber-300">
            DEMO LAUNCH
          </span>
        </div>
      </div>

      {/* Card Footer Info */}
      <div className="p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 className="font-black text-slate-900 text-sm sm:text-base leading-snug group-hover:text-amber-700 transition-colors line-clamp-1">
            {game.title}
          </h3>
          <div className="flex items-center gap-2 mt-1 text-xs text-slate-500 font-semibold">
            <span>RTP {game.rtp}%</span>
            <span>•</span>
            <span className="text-amber-700 font-bold">{game.volatility}</span>
          </div>
        </div>

        {/* Quick Launch Button */}
        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            className="w-full py-2 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/80 hover:border-amber-300 text-amber-900 font-extrabold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Play className="w-3.5 h-3.5 fill-amber-800 text-amber-800" />
            <span>PLAY DEMO</span>
          </button>
        </div>
      </div>
    </div>
  );
};

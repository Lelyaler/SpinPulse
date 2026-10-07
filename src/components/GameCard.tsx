import React from 'react';
import { 
  Play, 
  Flame, 
  Sparkles, 
  Heart,
  Radio, 
  Rocket,
  Zap
} from 'lucide-react';
import { GameItem } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface GameCardProps {
  game: GameItem;
  onPlay: (game: GameItem) => void;
  isFavorite: boolean;
  onToggleFavorite: (gameId: string) => void;
  isRu: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  onPlay, 
  isFavorite, 
  onToggleFavorite,
  isRu
}) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-amber-200/80 shadow-xs hover:shadow-xl hover:border-amber-400 hover:-translate-y-0.5 transition-all duration-200 overflow-hidden flex flex-col">
      {/* Game Image Container - Exact 216x233 aspect ratio with 100% visible, uncropped artwork */}
      <div className="relative aspect-[216/233] w-full overflow-hidden bg-slate-950 flex items-center justify-center">
        {/* Subtle ambient blur of the slot colors to eliminate harsh borders */}
        <div 
          className="absolute inset-0 bg-cover bg-center blur-md opacity-35 scale-125 pointer-events-none"
          style={{ backgroundImage: `url("${game.coverImage}")` }}
        />

        {/* Main Slot Artwork - 100% visible, completely uncropped */}
        <img
          src={game.coverImage}
          alt={game.title}
          className="relative z-10 w-full h-full object-contain object-center group-hover:scale-105 transition-transform duration-300 ease-out select-none"
          loading="lazy"
          decoding="async"
        />

        {/* Minimal Corner Badges (Top-Left only) */}
        <div className="absolute top-2 left-2 flex items-center gap-1 pointer-events-none z-10">
          {game.isHot ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-md">
              <Flame className="w-2.5 h-2.5 fill-white" />
              HOT
            </span>
          ) : game.isNew ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow-md">
              <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
              NEW
            </span>
          ) : game.category === 'crash' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-indigo-600 text-white shadow-md">
              <Rocket className="w-2.5 h-2.5" />
              CRASH
            </span>
          ) : game.category === 'live' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-emerald-600 text-white shadow-md">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              LIVE
            </span>
          ) : null}

          {game.isBonusBuy && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-black uppercase tracking-wider bg-purple-700 text-white shadow-md">
              <Zap className="w-2.5 h-2.5" />
              BUY
            </span>
          )}
        </div>

        {/* Favorite Heart Button (Top-Right) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            playButtonClick();
            onToggleFavorite(game.id);
          }}
          aria-label={isFavorite ? `Удалить ${game.title} из избранного` : `Добавить ${game.title} в избранное`}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-950/70 hover:bg-white text-white hover:text-rose-500 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        {/* Hover Launch Overlay */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 gap-2 z-20">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            aria-label={`Запустить ${game.title}`}
            className="w-12 h-12 rounded-full bg-linear-to-tr from-amber-400 via-amber-300 to-yellow-300 hover:scale-110 active:scale-95 text-slate-950 flex items-center justify-center shadow-xl shadow-amber-500/40 transition-transform cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />
          </button>
          
          <span className="px-3 py-1 rounded-lg bg-white/20 text-white font-black text-[11px] tracking-wide border border-white/20">
            {isRu ? 'ДЕМО' : 'DEMO'}
          </span>
        </div>
      </div>

      {/* Card Info Footer: Title & Provider completely outside image */}
      <div className="p-3.5 sm:p-4 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 
            className="font-black text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-amber-700 transition-colors truncate"
            title={game.title}
          >
            {game.title}
          </h3>
          <div className="flex items-center justify-between gap-1 mt-1.5 text-[11px] text-slate-500 font-medium">
            <span className="truncate">{game.provider}</span>
            <span className="px-1.5 py-0.5 rounded font-extrabold text-[10px] bg-amber-100 text-amber-900 shrink-0">
              {game.maxWin}
            </span>
          </div>
        </div>

        {/* Quick Launch Button */}
        <div className="mt-3 pt-2.5 border-t border-slate-100">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            aria-label={`Играть в слот ${game.title}`}
            className="w-full py-2.5 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200/90 hover:border-amber-300 text-amber-950 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
          >
            <Play className="w-3 h-3 fill-amber-900 text-amber-900" />
            <span>{isRu ? 'ИГРАТЬ' : 'PLAY'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

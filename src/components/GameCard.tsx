import React from 'react';
import { GameItem } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface GameCardProps {
  game: GameItem;
  isFavorite: boolean;
  onToggleFavorite: (gameId: string) => void;
  isRu: boolean;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  isFavorite, 
  onToggleFavorite,
  isRu
}) => {
  return (
    <div className="group relative bg-white rounded-2xl shadow-xs hover:shadow-xl hover:shadow-orange-500/15 hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col border border-amber-200/70 hover:border-amber-400">
      <div className="relative aspect-[216/233] w-full overflow-hidden bg-slate-100">
        <img
          src={game.coverImage}
          alt={game.title}
          width={216}
          height={233}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ease-out select-none"
          loading="lazy"
          decoding="async"
        />

        <div className="absolute top-2 left-2 flex items-center gap-1 pointer-events-none z-10">
          {game.isHot ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-rose-500 text-white shadow-xs">
              🔥 HOT
            </span>
          ) : game.isNew ? (
            <span className="px-2 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-linear-to-r from-amber-400 to-orange-400 text-slate-950 shadow-xs">
              ✨ NEW
            </span>
          ) : game.category === 'crash' ? (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
              🚀 CRASH
            </span>
          ) : game.category === 'live' ? (
            <span className="px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              🔴 LIVE
            </span>
          ) : null}

          {game.isBonusBuy && (
            <span className="px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-purple-700 text-white shadow-xs">
              ⚡ BUY
            </span>
          )}
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            playButtonClick();
            onToggleFavorite(game.id);
          }}
          aria-label={isFavorite ? `Удалить ${game.title} из избранного` : `Добавить ${game.title} в избранное`}
          className="absolute top-2 right-2 w-8 h-8 rounded-full bg-slate-950/60 hover:bg-white text-white hover:text-rose-500 flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer z-10"
        >
          <svg className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'fill-none text-white'}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </button>

        {/* Hover overlay with interactive Play and DEMO buttons */}
        <div className="absolute inset-0 bg-slate-950/50 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex flex-col items-center justify-center p-3 gap-2 z-20">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playButtonClick();
            }}
            aria-label={`Play ${game.title}`}
            className="w-12 h-12 rounded-full bg-linear-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 text-slate-950 flex items-center justify-center shadow-lg shadow-orange-500/40 transform hover:scale-110 active:scale-95 transition-all cursor-pointer"
          >
            <svg className="w-5 h-5 fill-slate-950 translate-x-0.5" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playButtonClick();
            }}
            className="px-3.5 py-1 rounded-lg bg-white/20 hover:bg-white/30 text-white font-bold text-[11px] tracking-wide transition-all cursor-pointer active:scale-95"
          >
            {isRu ? 'ДЕМО' : 'DEMO'}
          </button>
        </div>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 
            className="font-black text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-orange-600 transition-colors truncate"
            title={game.title}
          >
            {game.title}
          </h3>
          <div className="flex items-center justify-between gap-1 mt-1 text-[11px] text-slate-500 font-medium">
            <span className="truncate font-semibold text-slate-600">{game.provider}</span>
            <span className="px-1.5 py-0.5 rounded-md font-black text-[10px] bg-amber-50 text-amber-900 border border-amber-200/80 shrink-0">
              {game.maxWin}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              playButtonClick();
            }}
            aria-label={`Play ${game.title}`}
            className="w-full py-2.5 rounded-xl bg-amber-50/90 hover:bg-linear-to-r hover:from-amber-400 hover:to-orange-500 text-slate-900 hover:text-slate-950 font-black text-xs flex items-center justify-center gap-1.5 border border-amber-200/80 hover:border-transparent transition-all cursor-pointer active:scale-98 shadow-2xs hover:shadow-xs min-h-[44px]"
          >
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <polygon points="5 3 19 12 5 21 5 3" />
            </svg>
            <span>{isRu ? 'Играть' : 'Play'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

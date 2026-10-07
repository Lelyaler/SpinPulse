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
    <div className="group relative bg-white rounded-2xl shadow-xs hover:shadow-lg hover:-translate-y-1 transition-all duration-200 overflow-hidden flex flex-col border border-slate-100">
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
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-rose-500 text-white shadow-xs">
              <Flame className="w-2.5 h-2.5 fill-white" />
              HOT
            </span>
          ) : game.isNew ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 shadow-xs">
              <Sparkles className="w-2.5 h-2.5 fill-slate-950" />
              NEW
            </span>
          ) : game.category === 'crash' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-xs">
              <Rocket className="w-2.5 h-2.5" />
              CRASH
            </span>
          ) : game.category === 'live' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-emerald-600 text-white shadow-xs">
              <Radio className="w-2.5 h-2.5 animate-pulse" />
              LIVE
            </span>
          ) : null}

          {game.isBonusBuy && (
            <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider bg-purple-700 text-white shadow-xs">
              <Zap className="w-2.5 h-2.5" />
              BUY
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
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-white'}`} />
        </button>

        <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-3 gap-2 z-20">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            aria-label={`Запустить ${game.title}`}
            className="w-12 h-12 rounded-full bg-amber-400 hover:bg-amber-300 hover:scale-110 active:scale-95 text-slate-950 flex items-center justify-center shadow-lg transition-transform cursor-pointer"
          >
            <Play className="w-5 h-5 fill-slate-950 translate-x-0.5" />
          </button>
          
          <span className="px-3 py-1 rounded-lg bg-white/20 text-white font-bold text-[11px] tracking-wide">
            {isRu ? 'ДЕМО' : 'DEMO'}
          </span>
        </div>
      </div>

      <div className="p-3.5 flex flex-col justify-between flex-1 bg-white">
        <div>
          <h3 
            className="font-bold text-slate-900 text-xs sm:text-sm leading-snug group-hover:text-amber-600 transition-colors truncate"
            title={game.title}
          >
            {game.title}
          </h3>
          <div className="flex items-center justify-between gap-1 mt-1 text-[11px] text-slate-500 font-medium">
            <span className="truncate">{game.provider}</span>
            <span className="px-1.5 py-0.5 rounded font-bold text-[10px] bg-slate-100 text-slate-700 shrink-0">
              {game.maxWin}
            </span>
          </div>
        </div>

        <div className="mt-3 pt-2">
          <button
            onClick={() => {
              playButtonClick();
              onPlay(game);
            }}
            aria-label={`Играть в слот ${game.title}`}
            className="w-full py-2.5 rounded-xl bg-slate-100 hover:bg-slate-900 text-slate-800 hover:text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer min-h-[44px]"
          >
            <Play className="w-3 h-3 fill-current" />
            <span>{isRu ? 'Играть' : 'Play'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { X, Heart, Sparkles, ShieldCheck, Flame, Zap, BarChart2 } from 'lucide-react';
import { GameItem } from '../types';
import { playButtonClick } from '../utils/casinoAudio';

interface SlotGameModalProps {
  game: GameItem | null;
  isOpen: boolean;
  onClose: () => void;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  isRu?: boolean;
}

export const SlotGameModal: React.FC<SlotGameModalProps> = ({
  game,
  isOpen,
  onClose,
  isFavorite = false,
  onToggleFavorite,
  isRu = false,
}) => {
  if (!isOpen || !game) return null;

  return (
    <div 
      className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl border border-slate-100 shadow-2xl overflow-hidden flex flex-col relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={() => {
            playButtonClick();
            onClose();
          }}
          aria-label={isRu ? 'Закрыть' : 'Close'}
          className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-950/60 hover:bg-slate-900 text-white flex items-center justify-center backdrop-blur-md transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="relative w-full aspect-16/9 bg-slate-950 overflow-hidden">
          {game.coverImage ? (
            <img 
              src={game.coverImage} 
              alt={game.title}
              className="w-full h-full object-cover" 
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl">
              🎰
            </div>
          )}

          <div className="absolute inset-0 bg-linear-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none" />

          <div className="absolute top-4 left-4 flex items-center gap-2">
            {game.isHot && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500 text-white shadow-xs">
                <Flame className="w-3.5 h-3.5" />
                <span>HOT</span>
              </span>
            )}
            {game.isNew && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-500 text-slate-950 shadow-xs">
                <Sparkles className="w-3.5 h-3.5" />
                <span>NEW</span>
              </span>
            )}
            {game.isBonusBuy && (
              <span className="flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-500 text-white shadow-xs">
                <Zap className="w-3.5 h-3.5" />
                <span>BUY BONUS</span>
              </span>
            )}
          </div>

          <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
            <div>
              <span className="text-xs font-bold text-amber-400 uppercase tracking-widest block mb-1">
                {game.provider}
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {game.title}
              </h2>
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isRu ? 'Провайдер' : 'Studio'}
              </span>
              <span className="text-sm font-black text-slate-900 mt-1 block truncate">
                {game.provider}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                RTP
              </span>
              <span className="text-sm font-black text-emerald-600 mt-1 block font-mono">
                {game.rtp}%
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isRu ? 'Волатильность' : 'Volatility'}
              </span>
              <span className="text-sm font-black text-slate-900 mt-1 block">
                {game.volatility}
              </span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100 text-center">
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                {isRu ? 'Макс. выигрыш' : 'Max Multiplier'}
              </span>
              <span className="text-sm font-black text-amber-600 mt-1 block font-mono">
                {game.maxWin}
              </span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
              <span className="font-medium">
                {isRu ? 'Сертифицированный генератор чисел RNG' : 'Certified Fair Random Number Generator'}
              </span>
            </div>
            <div className="flex items-center gap-1.5 font-bold text-slate-700">
              <BarChart2 className="w-4 h-4 text-slate-400" />
              <span>{isRu ? 'Категория' : 'Type'}: {game.type.toUpperCase()}</span>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {onToggleFavorite && (
              <button
                type="button"
                onClick={() => {
                  playButtonClick();
                  onToggleFavorite(game.id);
                }}
                className={`flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer border min-h-[48px] ${
                  isFavorite
                    ? 'bg-rose-50 text-rose-600 border-rose-200'
                    : 'bg-white hover:bg-slate-50 text-slate-800 border-slate-200'
                }`}
              >
                <Heart className={`w-4 h-4 ${isFavorite ? 'fill-rose-500 text-rose-500' : 'text-slate-600'}`} />
                <span>{isFavorite ? (isRu ? 'В избранном' : 'In Favorites') : (isRu ? 'В избранное' : 'Add to Favorites')}</span>
              </button>
            )}

            <button
              type="button"
              onClick={() => {
                playButtonClick();
                onClose();
              }}
              className="flex-1 py-3.5 px-4 rounded-2xl font-bold text-xs sm:text-sm bg-slate-900 hover:bg-slate-800 text-white transition-all cursor-pointer min-h-[48px]"
            >
              {isRu ? 'Закрыть' : 'Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

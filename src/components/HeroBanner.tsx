import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Trophy, 
  Play, 
  ShieldCheck, 
  Zap, 
  Gem,
  Coins
} from 'lucide-react';
import { playButtonClick } from '../utils/casinoAudio';

interface HeroBannerProps {
  onQuickPlay: () => void;
  onClaimBonus: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onQuickPlay,
  onClaimBonus,
}) => {
  // Live ticking progressive mega jackpot
  const [jackpot, setJackpot] = useState<number>(4821590.84);

  useEffect(() => {
    const timer = setInterval(() => {
      setJackpot((prev) => prev + (Math.random() * 2.8 + 0.4));
    }, 1200);
    return () => clearInterval(timer);
  }, []);

  const baseUrl = import.meta.env.BASE_URL.endsWith('/')
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border border-amber-200/90 bg-linear-to-br from-amber-900 via-amber-950 to-slate-900 text-white">
      {/* Background Graphic Image with luxurious overlays */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay scale-105 transition-transform duration-1000"
        style={{ backgroundImage: `url("${baseUrl}banners/casino-hero.jpg")` }}
      />
      
      {/* Warm Golden Glow Gradients */}
      <div className="absolute inset-0 bg-linear-to-r from-amber-950/95 via-amber-900/80 to-transparent" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

      {/* Main Hero Content */}
      <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 max-w-3xl">
        {/* Hot Promotion Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-linear-to-r from-amber-500/25 to-rose-500/25 border border-amber-300/40 backdrop-blur-md mb-4 text-xs font-black tracking-wide text-amber-200 uppercase">
          <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
          <span>Mega Jackpot Fever • Active Network Pot</span>
        </div>

        {/* Ticking Jackpot Display */}
        <div className="mb-4">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-300/90 block mb-1">
            Progressive Grand Prize Pool
          </span>
          <div className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white flex items-baseline gap-2">
            <span className="text-amber-400">$</span>
            <span className="tabular-nums drop-shadow-md">
              {jackpot.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs sm:text-sm font-bold text-amber-300/80 uppercase tracking-widest animate-pulse">
              LIVE
            </span>
          </div>
        </div>

        {/* Catchy Description */}
        <p className="text-sm sm:text-base text-amber-100/90 font-medium leading-relaxed mb-6 max-w-xl">
          Experience world-class online slots, high-stakes live tables, and multiplier crash games with real-time physics, zero latency, and verified 97.4% average return.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-3.5 mb-8">
          <button
            onClick={() => {
              playButtonClick();
              onQuickPlay();
            }}
            className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-linear-to-r from-amber-500 via-amber-400 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-sm tracking-wide shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer group"
          >
            <Play className="w-4 h-4 fill-slate-950 group-hover:scale-110 transition-transform" />
            <span>PLAY FEATURED DEMO</span>
          </button>

          <button
            onClick={() => {
              playButtonClick();
              onClaimBonus();
            }}
            className="inline-flex items-center gap-2 px-5 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-sm border border-amber-300/30 backdrop-blur-md transition-all cursor-pointer"
          >
            <Coins className="w-4 h-4 text-amber-300" />
            <span>Reload Demo Vault (+$500)</span>
          </button>
        </div>

        {/* Trust & Spec Badges */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-amber-400/20 text-xs">
          <div className="flex items-center gap-2 text-amber-200/90 font-semibold">
            <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Provably Fair RNG</span>
          </div>
          <div className="flex items-center gap-2 text-amber-200/90 font-semibold">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Instant Demo Drops</span>
          </div>
          <div className="flex items-center gap-2 text-amber-200/90 font-semibold">
            <Trophy className="w-4 h-4 text-amber-400 shrink-0" />
            <span>97.4% Studio RTP</span>
          </div>
          <div className="flex items-center gap-2 text-amber-200/90 font-semibold">
            <Gem className="w-4 h-4 text-amber-400 shrink-0" />
            <span>VIP Multipliers</span>
          </div>
        </div>
      </div>
    </div>
  );
};

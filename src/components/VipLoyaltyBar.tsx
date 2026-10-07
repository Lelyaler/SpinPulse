import React from 'react';
import { Crown } from 'lucide-react';

interface VipLoyaltyBarProps {
  isRu: boolean;
}

export const VipLoyaltyBar: React.FC<VipLoyaltyBarProps> = ({ isRu }) => {
  return (
    <div className="rounded-3xl bg-linear-to-r from-amber-500 via-amber-600 to-rose-600 p-6 sm:p-8 text-white shadow-xl relative overflow-hidden">
      {/* Background ambient pattern */}
      <div className="absolute right-0 top-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        {/* Left: VIP Status info */}
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/20 backdrop-blur-md mb-2 text-xs font-black uppercase tracking-wider text-amber-200">
            <Crown className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
            <span>{isRu ? 'Программа Лояльности' : 'VIP Loyalty Club'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isRu ? 'Ваш статус: Gold VIP (Уровень 3)' : 'Current Rank: Gold VIP (Tier 3)'}
          </h3>
          <p className="text-xs sm:text-sm text-amber-100/90 mt-1 font-medium">
            {isRu 
              ? 'Накапливайте баллы за каждую ставку, чтобы открыть Platinum статус и повышенный кэшбэк 15%!'
              : 'Earn points on every spin to unlock Platinum tier and boosted 15% weekly cashback!'}
          </p>

          {/* Progress Bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-bold text-amber-100 mb-1.5">
              <span>2,850 / 5,000 pts</span>
              <span>57% {isRu ? 'до Platinum' : 'to Platinum'}</span>
            </div>
            <div className="w-full h-3 rounded-full bg-black/25 overflow-hidden p-0.5 border border-white/20">
              <div 
                className="h-full rounded-full bg-linear-to-r from-yellow-300 to-amber-200 shadow-sm transition-all duration-500"
                style={{ width: '57%' }}
              />
            </div>
          </div>
        </div>

        {/* Right: Active VIP Perks cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-xl mb-1 block">💸</span>
            <span className="text-sm font-black text-white block">10%</span>
            <span className="text-[10px] text-amber-100 font-semibold">
              {isRu ? 'Еженедельный кэшбэк' : 'Weekly Cashback'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center">
            <span className="text-xl mb-1 block">⚡</span>
            <span className="text-sm font-black text-white block">Instant</span>
            <span className="text-[10px] text-amber-100 font-semibold">
              {isRu ? 'Быстрые выплаты' : 'Priority Payouts'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-center col-span-2 sm:col-span-1">
            <span className="text-xl mb-1 block">🎁</span>
            <span className="text-sm font-black text-white block">$500</span>
            <span className="text-[10px] text-amber-100 font-semibold">
              {isRu ? 'Подарок на др' : 'Birthday Gift'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

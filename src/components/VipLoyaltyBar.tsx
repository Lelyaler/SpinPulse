import React from 'react';
import { Crown } from 'lucide-react';

interface VipLoyaltyBarProps {
  isRu: boolean;
}

export const VipLoyaltyBar: React.FC<VipLoyaltyBarProps> = ({ isRu }) => {
  return (
    <div className="rounded-3xl bg-slate-900 p-6 sm:p-8 text-white shadow-xs relative overflow-hidden">
      <div className="relative z-10 flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
        <div className="max-w-md">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 mb-2 text-xs font-bold uppercase tracking-wider text-amber-400">
            <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{isRu ? 'Программа Лояльности' : 'VIP Loyalty Club'}</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
            {isRu ? 'Ваш статус: Gold VIP (Уровень 3)' : 'Current Rank: Gold VIP (Tier 3)'}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 font-medium">
            {isRu 
              ? 'Накапливайте баллы за каждую ставку, чтобы открыть Platinum статус и повышенный кэшбэк 15%!'
              : 'Earn points on every spin to unlock Platinum tier and boosted 15% weekly cashback!'}
          </p>

          <div className="mt-4">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
              <span>2,850 / 5,000 pts</span>
              <span className="text-amber-400 font-bold">57% {isRu ? 'до Platinum' : 'to Platinum'}</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
              <div 
                className="h-full rounded-full bg-amber-400 transition-all duration-500"
                style={{ width: '57%' }}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
            <span className="text-xl mb-1 block">💸</span>
            <span className="text-sm font-black text-white block">10%</span>
            <span className="text-[10px] text-slate-400 font-medium">
              {isRu ? 'Еженедельный кэшбэк' : 'Weekly Cashback'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center">
            <span className="text-xl mb-1 block">⚡</span>
            <span className="text-sm font-black text-white block">Instant</span>
            <span className="text-[10px] text-slate-400 font-medium">
              {isRu ? 'Быстрые выплаты' : 'Priority Payouts'}
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-center col-span-2 sm:col-span-1">
            <span className="text-xl mb-1 block">🎁</span>
            <span className="text-sm font-black text-white block">$500</span>
            <span className="text-[10px] text-slate-400 font-medium">
              {isRu ? 'Подарок на др' : 'Birthday Gift'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

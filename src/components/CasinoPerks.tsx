import React from 'react';
import { ShieldCheck, Zap, Crown, Radio } from 'lucide-react';

interface CasinoPerksProps {
  isRu?: boolean;
}

export const CasinoPerks: React.FC<CasinoPerksProps> = ({ isRu = false }) => {
  const perks = [
    {
      icon: ShieldCheck,
      title: isRu ? 'Контроль честности RNG' : 'Provably Fair Gaming',
      desc: isRu 
        ? 'Криптографический алгоритм SHA-256 для 100% случайных и честных результатов.'
        : 'Cryptographic SHA-256 random seeds verified on-chain for 100% fair outcomes.',
      badge: 'Certified RNG',
    },
    {
      icon: Zap,
      title: isRu ? 'Движок нулевой задержки' : 'Zero Latency Engine',
      desc: isRu
        ? 'Мгновенный отклик барабанов и плавная анимация спинов 60 FPS на всех устройствах.'
        : 'Sub-millisecond spin response with high framerate CSS3 & WebGL rendering.',
      badge: '60 FPS',
    },
    {
      icon: Radio,
      title: isRu ? 'Студии HD трансляций' : 'Studio HD Streams',
      desc: isRu
        ? 'Прямой эфир рулетки и блэкджека от Evolution Gaming и Pragmatic Play Live.'
        : 'Multi-angle VIP tables powered by Evolution Gaming & Pragmatic Play Live.',
      badge: '4K Ultra-HD',
    },
    {
      icon: Crown,
      title: isRu ? 'VIP Привилегии' : 'Royal VIP Tiers',
      desc: isRu
        ? 'Повышайте уровень лояльности для эксклюзивных бонусов, кэшбэка и подарков.'
        : 'Level up your rank to unlock higher spin multipliers, daily drops, and exclusive events.',
      badge: 'Gold Tier Active',
    },
  ];

  return (
    <div className="mt-14 mb-8">
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-widest text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
          {isRu ? 'СТАНДАРТ КАЧЕСТВА' : 'Industry Standard'}
        </span>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
          {isRu ? 'Преимущества' : 'Why Players Choose'}{' '}
          <span className="text-amber-500">
            SpinPulse
          </span>
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
          {isRu 
            ? 'Создано для ценителей качественного визуального оформления и честного демо-геймплея.'
            : 'Built for gaming enthusiasts who appreciate clean visual design and fair gameplay.'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {perks.map((p, idx) => {
          const Icon = p.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-3xl bg-white hover:bg-linear-to-b hover:from-white hover:to-amber-50/40 border border-amber-200/70 hover:border-amber-400 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-linear-to-tr from-amber-500 to-orange-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 border border-amber-200/80">
                    {p.badge}
                  </span>
                </div>
                <h3 className="font-black text-slate-900 text-sm mb-1.5 group-hover:text-orange-600 transition-colors">{p.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed font-medium">{p.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
